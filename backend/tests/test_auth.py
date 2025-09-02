import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.main import app
from app.database import get_db, Base
from app.core.auth import get_password_hash
from app.models.user import User

# Create in-memory database for testing
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create tables
Base.metadata.create_all(bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

@pytest.fixture
def test_db():
    """Create a test database session"""
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

@pytest.fixture
def test_user(test_db):
    """Create a test user"""
    # Clear any existing data first
    from app.models.user import RefreshToken, PasswordResetToken
    test_db.query(RefreshToken).delete()
    test_db.query(PasswordResetToken).delete()
    test_db.query(User).delete()
    test_db.commit()
    
    user = User(
        email="test@example.com",
        name="Test User",
        hashed_password=get_password_hash("testpassword123"),
        is_active=True
    )
    test_db.add(user)
    test_db.commit()
    test_db.refresh(user)
    return user

def test_register_success():
    """Test successful user registration"""
    response = client.post(
        "/api/v1/auth/register",
        json={
            "name": "New User",
            "email": "newuser@example.com",
            "password": "newpassword123"
        }
    )
    
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert "refresh_token" in data
    assert "user" in data
    assert data["user"]["email"] == "newuser@example.com"
    assert data["user"]["name"] == "New User"

def test_register_duplicate_email(test_user):
    """Test registration with duplicate email"""
    response = client.post(
        "/api/v1/auth/register",
        json={
            "name": "Another User",
            "email": "test@example.com",
            "password": "anotherpassword123"
        }
    )
    
    assert response.status_code == 400
    assert "Email already registered" in response.json()["detail"]

def test_login_success(test_user):
    """Test successful login"""
    response = client.post(
        "/api/v1/auth/login",
        json={
            "email": "test@example.com",
            "password": "testpassword123"
        }
    )
    
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert "refresh_token" in data
    assert "user" in data

def test_login_invalid_credentials():
    """Test login with invalid credentials"""
    response = client.post(
        "/api/v1/auth/login",
        json={
            "email": "nonexistent@example.com",
            "password": "wrongpassword"
        }
    )
    
    assert response.status_code == 401
    assert "Incorrect email or password" in response.json()["detail"]

def test_get_current_user(test_user):
    """Test getting current user info"""
    # First login to get token
    login_response = client.post(
        "/api/v1/auth/login",
        json={
            "email": "test@example.com",
            "password": "testpassword123"
        }
    )
    
    token = login_response.json()["access_token"]
    
    # Use token to get user info
    response = client.get(
        "/api/v1/auth/me",
        headers={"Authorization": f"Bearer {token}"}
    )
    
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "test@example.com"
    assert data["name"] == "Test User"

def test_get_current_user_unauthorized():
    """Test getting current user without token"""
    response = client.get("/api/v1/auth/me")
    
    assert response.status_code == 403

def test_forgot_password():
    """Test forgot password request"""
    response = client.post(
        "/api/v1/auth/forgot-password",
        json={"email": "test@example.com"}
    )
    
    assert response.status_code == 200
    data = response.json()
    assert "If the email exists, a password reset link has been sent" in data["message"]

def test_health_check():
    """Test health check endpoint"""
    response = client.get("/health")
    
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "MoodMate API is running" in data["message"] 