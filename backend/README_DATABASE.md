# MoodMate Database Setup

This guide will help you set up the PostgreSQL database for the MoodMate application.

## 🐘 PostgreSQL Setup Options

### Option 1: Using Docker (Recommended)

1. **Start PostgreSQL with Docker Compose:**
   ```bash
   docker-compose up -d
   ```

2. **Access pgAdmin (Optional):**
   - URL: http://localhost:5050
   - Email: admin@moodmate.com
   - Password: admin123

### Option 2: Local PostgreSQL Installation

1. **Install PostgreSQL:**
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install postgresql postgresql-contrib

   # macOS with Homebrew
   brew install postgresql
   brew services start postgresql
   ```

2. **Create Database:**
   ```bash
   sudo -u postgres psql
   CREATE DATABASE moodmate_db;
   CREATE USER moodmate_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE moodmate_db TO moodmate_user;
   \q
   ```

## 🔧 Environment Configuration

1. **Create .env file:**
   ```bash
   cp env.example .env
   ```

2. **Update .env with your database settings:**
   ```env
   # For Docker setup
   DATABASE_URL=postgresql://postgres:password@localhost:5432/moodmate_db

   # For local PostgreSQL
   DATABASE_URL=postgresql://moodmate_user:your_password@localhost:5432/moodmate_db

   # Security settings
   SECRET_KEY=your-super-secret-key-change-this-in-production
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   ```

## 🚀 Database Initialization

1. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run database setup script:**
   ```bash
   python scripts/setup_db.py
   ```

3. **Start the FastAPI server:**
   ```bash
   uvicorn app.main:app --reload
   ```

## 🧪 Testing the Setup

1. **Visit API documentation:**
   - http://localhost:8000/docs

2. **Test authentication endpoints:**
   - Register: POST /api/v1/auth/register
   - Login: POST /api/v1/auth/login
   - Get user info: GET /api/v1/auth/me

3. **Default admin user:**
   - Email: admin@moodmate.com
   - Password: admin123

## 🔍 Database Schema

The application creates the following tables:

### Users Table
- `id`: Primary key
- `email`: Unique email address
- `name`: User's full name
- `hashed_password`: Bcrypt hashed password
- `avatar_url`: User's avatar URL
- `is_active`: Account status
- `created_at`: Account creation timestamp
- `updated_at`: Last update timestamp
- `last_login`: Last login timestamp

## 🛠️ Troubleshooting

### Common Issues:

1. **Connection refused:**
   - Make sure PostgreSQL is running
   - Check if the port 5432 is available
   - Verify DATABASE_URL in .env file

2. **Authentication failed:**
   - Check username/password in DATABASE_URL
   - Ensure user has proper permissions

3. **Database does not exist:**
   - Create the database manually
   - Or use the setup script

### Useful Commands:

```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Connect to PostgreSQL
psql -h localhost -U postgres -d moodmate_db

# List databases
\l

# List tables
\dt

# Exit psql
\q
```

## 📊 Database Management

### Backup Database:
```bash
pg_dump -h localhost -U postgres moodmate_db > backup.sql
```

### Restore Database:
```bash
psql -h localhost -U postgres moodmate_db < backup.sql
```

### Reset Database:
```bash
# Drop and recreate
dropdb -h localhost -U postgres moodmate_db
createdb -h localhost -U postgres moodmate_db
python scripts/setup_db.py
``` 