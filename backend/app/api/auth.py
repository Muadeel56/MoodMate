from datetime import datetime, timedelta
import os
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from ..database import get_db
from ..models import User
from ..schemas import UserCreate, UserLogin, UserResponse, Token, UserUpdate, PasswordResetRequest, PasswordReset, PasswordChange, RefreshToken
from ..core.auth import (
    get_password_hash, 
    verify_password, 
    create_access_token, 
    get_current_active_user,
    create_password_reset_token,
    verify_password_reset_token,
    create_refresh_token,
    verify_refresh_token
)

router = APIRouter(prefix="/auth", tags=["authentication"])

def generate_avatar_url(email: str) -> str:
    """Generate avatar URL using DiceBear API"""
    return f"https://api.dicebear.com/7.x/avataaars/svg?seed={email}"

@router.post("/register", response_model=Token)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    """Register a new user"""
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    hashed_password = get_password_hash(user_data.password)
    avatar_url = generate_avatar_url(user_data.email)
    
    db_user = User(
        email=user_data.email,
        name=user_data.name,
        hashed_password=hashed_password,
        avatar_url=avatar_url,
        last_login=datetime.utcnow()
    )
    
    try:
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create access token and refresh token
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": db_user.email}, expires_delta=access_token_expires
    )
    refresh_token = create_refresh_token(db_user.id)
    
    # Store refresh token in database
    from ..models import RefreshToken
    db_refresh_token = RefreshToken(
        user_id=db_user.id,
        token=refresh_token,
        expires_at=datetime.utcnow() + timedelta(days=7)
    )
    db.add(db_refresh_token)
    db.commit()
    
    # Log welcome message (email service removed)
    print(f"Welcome email would be sent to {user_data.email} for user {user_data.name}")
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user": db_user
    }

@router.post("/login", response_model=Token)
def login(user_credentials: UserLogin, db: Session = Depends(get_db)):
    """Login user"""
    # Find user by email
    user = db.query(User).filter(User.email == user_credentials.email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Verify password
    if not verify_password(user_credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Check if user is active
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user"
        )
    
    # Update last login
    user.last_login = datetime.utcnow()
    db.commit()
    
    # Create access token and refresh token
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    refresh_token = create_refresh_token(user.id)
    
    # Store refresh token in database
    from ..models import RefreshToken
    db_refresh_token = RefreshToken(
        user_id=user.id,
        token=refresh_token,
        expires_at=datetime.utcnow() + timedelta(days=7)
    )
    db.add(db_refresh_token)
    db.commit()
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user": user
    }

@router.get("/me", response_model=UserResponse)
def get_current_user_info(current_user: User = Depends(get_current_active_user)):
    """Get current user information"""
    return current_user

@router.put("/me", response_model=UserResponse)
def update_current_user(
    user_update: UserUpdate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Update current user information"""
    # Update user fields
    if user_update.name is not None:
        current_user.name = user_update.name
    if user_update.avatar_url is not None:
        current_user.avatar_url = user_update.avatar_url
    
    db.commit()
    db.refresh(current_user)
    return current_user

@router.post("/refresh")
def refresh_token(refresh_data: RefreshToken, db: Session = Depends(get_db)):
    """Refresh access token using refresh token"""
    # Verify refresh token
    user_id = verify_refresh_token(refresh_data.refresh_token)
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token"
        )
    
    # Check if refresh token exists and is not revoked
    from ..models import RefreshToken
    db_refresh_token = db.query(RefreshToken).filter(
        RefreshToken.token == refresh_data.refresh_token,
        RefreshToken.is_revoked == False,
        RefreshToken.expires_at > datetime.utcnow()
    ).first()
    
    if not db_refresh_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token"
        )
    
    # Get user
    user = db.query(User).filter(User.id == user_id).first()
    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found or inactive"
        )
    
    # Create new access token
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

@router.post("/logout")
def logout(refresh_data: RefreshToken, db: Session = Depends(get_db)):
    """Logout user and revoke refresh token"""
    # Revoke refresh token
    from ..models import RefreshToken
    db_refresh_token = db.query(RefreshToken).filter(
        RefreshToken.token == refresh_data.refresh_token
    ).first()
    
    if db_refresh_token:
        db_refresh_token.is_revoked = True
        db.commit()
    
    return {"message": "Successfully logged out"}

@router.post("/forgot-password")
def forgot_password(request: PasswordResetRequest, db: Session = Depends(get_db)):
    """Request password reset"""
    # Check if user exists
    user = db.query(User).filter(User.email == request.email).first()
    if not user:
        # Don't reveal if email exists or not for security
        return {"message": "If the email exists, a password reset link has been sent"}
    
    # Create password reset token
    reset_token = create_password_reset_token(request.email)
    
    # Store token in database
    from ..models import PasswordResetToken
    db_token = PasswordResetToken(
        email=request.email,
        token=reset_token,
        expires_at=datetime.utcnow() + timedelta(hours=1)
    )
    
    try:
        db.add(db_token)
        db.commit()
    except IntegrityError:
        db.rollback()
        return {"message": "If the email exists, a password reset link has been sent"}
    
    # Log password reset request (email service removed)
    print(f"Password reset email would be sent to {request.email}")
    print(f"Reset token: {reset_token}")
    
    # In development, return token for testing
    if os.getenv("ENVIRONMENT") == "development":
        return {
            "message": "If the email exists, a password reset link has been sent",
            "reset_token": reset_token  # Only in development
        }
    return {"message": "If the email exists, a password reset link has been sent"}

@router.post("/reset-password")
def reset_password(reset_data: PasswordReset, db: Session = Depends(get_db)):
    """Reset password using token"""
    # Verify token
    email = verify_password_reset_token(reset_data.token)
    if not email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset token"
        )
    
    # Check if token exists and is not used
    from ..models import PasswordResetToken
    db_token = db.query(PasswordResetToken).filter(
        PasswordResetToken.token == reset_data.token,
        PasswordResetToken.used == False,
        PasswordResetToken.expires_at > datetime.utcnow()
    ).first()
    
    if not db_token:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset token"
        )
    
    # Update user password
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User not found"
        )
    
    user.hashed_password = get_password_hash(reset_data.new_password)
    db_token.used = True
    
    try:
        db.commit()
        return {"message": "Password reset successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to reset password"
        )

@router.post("/change-password")
def change_password(
    password_data: PasswordChange,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Change password for authenticated user"""
    # Verify current password
    if not verify_password(password_data.current_password, current_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Current password is incorrect"
        )
    
    # Update password
    current_user.hashed_password = get_password_hash(password_data.new_password)
    
    try:
        db.commit()
        return {"message": "Password changed successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to change password"
        ) 