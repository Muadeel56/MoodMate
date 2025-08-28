#!/bin/bash

# Database Setup Script for MoodMate
# This script sets up PostgreSQL database and initializes Alembic migrations

set -e  # Exit on any error

echo "🚀 Setting up MoodMate Database..."
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    print_warning "PostgreSQL is not installed. Installing..."
    
    # Update package list
    sudo apt-get update
    
    # Install PostgreSQL
    sudo apt-get install -y postgresql postgresql-contrib
    
    print_status "PostgreSQL installed successfully"
else
    print_status "PostgreSQL is already installed"
fi

# Start PostgreSQL service
echo "Starting PostgreSQL service..."
sudo systemctl start postgresql
sudo systemctl enable postgresql
print_status "PostgreSQL service started"

# Create database and user
echo "Setting up database and user..."

# Create database
sudo -u postgres createdb moodmate_db 2>/dev/null || print_warning "Database 'moodmate_db' already exists"

# Create user (optional - you can use postgres user)
sudo -u postgres createuser --interactive moodmate_user 2>/dev/null || print_warning "User 'moodmate_user' already exists or creation skipped"

print_status "Database and user setup completed"

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    print_warning "Virtual environment not found. Creating..."
    python3 -m venv venv
    print_status "Virtual environment created"
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt
print_status "Dependencies installed"

# Check if .env file exists
if [ ! -f ".env" ]; then
    print_warning ".env file not found. Creating from example..."
    cp env.example .env
    print_status ".env file created from example"
    print_warning "Please update the DATABASE_URL in .env file with your credentials"
fi

# Initialize Alembic (if not already done)
if [ ! -d "alembic" ]; then
    echo "Initializing Alembic..."
    alembic init alembic
    print_status "Alembic initialized"
else
    print_status "Alembic already initialized"
fi

# Create initial migration
echo "Creating initial migration..."
alembic revision --autogenerate -m "Initial migration"
print_status "Initial migration created"

# Run migrations
echo "Running migrations..."
alembic upgrade head
print_status "Migrations completed"

# Run database setup script
echo "Running database setup script..."
python scripts/setup_db.py
print_status "Database setup script completed"

echo ""
echo "🎉 Database setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Update your .env file with correct database credentials"
echo "2. Start the FastAPI server: uvicorn app.main:app --reload"
echo "3. Visit http://localhost:8000/docs for API documentation"
echo "4. Test the authentication endpoints"
echo ""
echo "Default admin credentials:"
echo "   Email: admin@moodmate.com"
echo "   Password: admin123" 