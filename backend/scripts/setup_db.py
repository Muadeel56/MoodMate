#!/usr/bin/env python3
"""
Database setup script for MoodMate
This script helps set up the PostgreSQL database
"""

import os
import sys
from dotenv import load_dotenv

# Add the app directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from app.database import engine, Base
from app.models import User, PasswordResetToken, RefreshToken

def setup_database():
    """Create all database tables"""
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created successfully!")

def create_admin_user():
    """Create an admin user for testing"""
    from sqlalchemy.orm import Session
    from app.core.auth import get_password_hash
    from app.database import SessionLocal
    
    db = SessionLocal()
    try:
        # Check if admin user already exists
        admin = db.query(User).filter(User.email == "admin@moodmate.com").first()
        if admin:
            print("✅ Admin user already exists")
            return
        
        # Create admin user
        admin_user = User(
            email="admin@moodmate.com",
            name="Admin User",
            hashed_password=get_password_hash("admin123"),
            avatar_url="https://api.dicebear.com/7.x/avataaars/svg?seed=admin@moodmate.com",
            is_active=True
        )
        
        db.add(admin_user)
        db.commit()
        print("✅ Admin user created successfully!")
        print("   Email: admin@moodmate.com")
        print("   Password: admin123")
        
    except Exception as e:
        print(f"❌ Error creating admin user: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    load_dotenv()
    
    print("🚀 Setting up MoodMate Database...")
    print("=" * 50)
    
    try:
        setup_database()
        create_admin_user()
        print("\n🎉 Database setup completed successfully!")
        print("\nNext steps:")
        print("1. Start the FastAPI server: uvicorn app.main:app --reload")
        print("2. Visit http://localhost:8000/docs for API documentation")
        print("3. Test the authentication endpoints")
        
    except Exception as e:
        print(f"❌ Database setup failed: {e}")
        print("\nMake sure:")
        print("1. PostgreSQL is running")
        print("2. Database 'moodmate_db' exists")
        print("3. Your .env file has correct DATABASE_URL")
        sys.exit(1) 