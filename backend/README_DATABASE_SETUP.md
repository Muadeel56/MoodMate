# Database Setup Guide for MoodMate

This guide will help you set up the PostgreSQL database for the MoodMate application.

## Prerequisites

- Ubuntu/Debian Linux (or similar)
- Python 3.8+
- sudo privileges

## Quick Setup

### Option 1: Automated Setup (Recommended)

Run the automated setup script:

```bash
cd backend
./scripts/setup_database.sh
```

This script will:
- Install PostgreSQL if not already installed
- Create the database and user
- Set up the virtual environment
- Install Python dependencies
- Initialize Alembic migrations
- Create and run initial migrations
- Set up the database tables

### Option 2: Manual Setup

If you prefer to set up manually, follow these steps:

#### 1. Install PostgreSQL

```bash
# Update package list
sudo apt-get update

# Install PostgreSQL
sudo apt-get install -y postgresql postgresql-contrib

# Start and enable PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

#### 2. Create Database and User

```bash
# Create database
sudo -u postgres createdb moodmate_db

# Create user (optional - you can use postgres user)
sudo -u postgres createuser --interactive moodmate_user
```

#### 3. Set Up Python Environment

```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

#### 4. Configure Environment Variables

```bash
# Copy environment example
cp env.example .env

# Edit .env file with your database credentials
nano .env
```

Update the `DATABASE_URL` in your `.env` file:
```
DATABASE_URL=postgresql://username:password@localhost:5432/moodmate_db
```

#### 5. Initialize Alembic

```bash
# Initialize Alembic
alembic init alembic

# Create initial migration
alembic revision --autogenerate -m "Initial migration"

# Run migrations
alembic upgrade head
```

#### 6. Set Up Database Tables

```bash
# Run the database setup script
python scripts/setup_db.py
```

## Database Configuration

### Environment Variables

The following environment variables are used for database configuration:

- `DATABASE_URL`: PostgreSQL connection string
- `SECRET_KEY`: JWT secret key for authentication
- `ALGORITHM`: JWT algorithm (default: HS256)
- `ACCESS_TOKEN_EXPIRE_MINUTES`: Token expiration time

### Default Admin User

After running the setup, a default admin user is created:

- **Email**: admin@moodmate.com
- **Password**: admin123

**Important**: Change these credentials in production!

## Database Models

The application includes the following models:

- **User**: User accounts with authentication
- **PasswordResetToken**: Password reset functionality
- **RefreshToken**: JWT refresh tokens

## Migration Commands

### Create a new migration

```bash
alembic revision --autogenerate -m "Description of changes"
```

### Apply migrations

```bash
alembic upgrade head
```

### Rollback migrations

```bash
alembic downgrade -1
```

### View migration history

```bash
alembic history
```

## Troubleshooting

### Common Issues

1. **PostgreSQL connection refused**
   - Ensure PostgreSQL service is running: `sudo systemctl status postgresql`
   - Check if the database exists: `sudo -u postgres psql -l`

2. **Permission denied errors**
   - Ensure you have sudo privileges
   - Check file permissions on setup scripts

3. **Import errors**
   - Ensure virtual environment is activated
   - Check if all dependencies are installed: `pip list`

4. **Migration errors**
   - Check if database URL is correct in `.env`
   - Ensure all models are imported in `alembic/env.py`

### Getting Help

If you encounter issues:

1. Check the logs for error messages
2. Verify all prerequisites are met
3. Ensure environment variables are correctly set
4. Try running the setup script with verbose output

## Production Considerations

For production deployment:

1. **Security**:
   - Use strong passwords
   - Enable SSL connections
   - Restrict database access
   - Use environment-specific configuration

2. **Performance**:
   - Configure connection pooling
   - Set up database backups
   - Monitor database performance

3. **Scalability**:
   - Consider database clustering
   - Set up read replicas if needed
   - Implement proper indexing

## Next Steps

After completing the database setup:

1. Start the FastAPI server: `uvicorn app.main:app --reload`
2. Visit http://localhost:8000/docs for API documentation
3. Test the authentication endpoints
4. Set up the frontend application 