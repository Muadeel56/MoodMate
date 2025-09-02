# Authentication System Documentation

## Overview

MoodMate uses a JWT-based authentication system built with FastAPI on the backend and React on the frontend. The system provides secure user registration, login, password reset, and token management.

## Architecture

### Backend (FastAPI)
- **JWT Tokens**: Access tokens (30 min) and refresh tokens (7 days)
- **Password Hashing**: bcrypt with salt
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Email Service**: SMTP-based password reset emails

### Frontend (React)
- **Context API**: Global authentication state management
- **Local Storage**: Secure token storage
- **Protected Routes**: Route-level authentication guards
- **Form Validation**: Client-side input validation

## Features

### ✅ Implemented
- User registration with email verification
- User login with JWT tokens
- Password reset via email
- Token refresh mechanism
- User profile management
- Secure logout with token revocation
- Protected routes
- Form validation and error handling
- Responsive UI with theme support

### 🔄 Future Enhancements
- Social login (Google OAuth) - when implemented
- Email verification for new accounts - when email service is added
- Two-factor authentication
- Session management

## API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/auth/register` | User registration | No |
| POST | `/api/v1/auth/login` | User login | No |
| POST | `/api/v1/auth/logout` | User logout | Yes |
| GET | `/api/v1/auth/me` | Get current user | Yes |
| PUT | `/api/v1/auth/me` | Update user profile | Yes |
| POST | `/api/v1/auth/refresh` | Refresh access token | No |
| POST | `/api/v1/auth/forgot-password` | Request password reset | No |
| POST | `/api/v1/auth/reset-password` | Reset password | No |
| POST | `/api/v1/auth/change-password` | Change password | Yes |

### Request/Response Examples

#### Registration
```json
POST /api/v1/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}

Response:
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "refresh_token": "refresh_token_here",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=john@example.com",
    "is_active": true,
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

#### Login
```json
POST /api/v1/auth/login
{
  "email": "john@example.com",
  "password": "securepassword123"
}

Response: Same as registration
```

#### Password Reset Request
```json
POST /api/v1/auth/forgot-password
{
  "email": "john@example.com"
}

Response:
{
  "message": "If the email exists, a password reset link has been sent"
}
```

## Security Features

### Password Security
- **Hashing**: bcrypt with salt rounds
- **Validation**: Minimum 8 characters
- **Strength Indicator**: Real-time password strength feedback

### Token Security
- **Access Token**: Short-lived (30 minutes) for API calls
- **Refresh Token**: Long-lived (7 days) for token renewal
- **Secure Storage**: HTTP-only cookies (production) or localStorage (development)
- **Token Revocation**: Immediate logout with backend token invalidation

### CORS Configuration
```python
allowed_origins = [
    "http://localhost:5173",  # Frontend dev
    "http://localhost:3000",  # Frontend alt
    "https://yourdomain.com"  # Production
]
```

## Environment Variables

### Backend (.env)
```bash
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/moodmate_db

# Security
SECRET_KEY=your-super-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# CORS
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
FRONTEND_URL=http://localhost:5173

# Environment
ENVIRONMENT=development

# Note: Email service removed - password reset tokens are logged to console in development
```

### Frontend (.env)
```bash
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_FRONTEND_URL=http://localhost:5173
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR UNIQUE NOT NULL,
    name VARCHAR NOT NULL,
    hashed_password VARCHAR NOT NULL,
    avatar_url VARCHAR,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);
```

### Refresh Tokens Table
```sql
CREATE TABLE refresh_tokens (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    token VARCHAR UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    is_revoked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Password Reset Tokens Table
```sql
CREATE TABLE password_reset_tokens (
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL,
    token VARCHAR UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Frontend Usage

### Authentication Context
```jsx
import { useAuth } from '../contexts';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }
  
  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Protected Routes
```jsx
import { ProtectedRoute } from '../components';

<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute isAuthenticated={isAuthenticated}>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```

### Form Handling
```jsx
const { login, error, clearError } = useAuth();

const handleSubmit = async (e) => {
  e.preventDefault();
  const result = await login(email, password);
  
  if (result.success) {
    navigate('/dashboard');
  }
};
```

## Testing

### Backend Tests
```bash
cd backend
pytest tests/ -v
```

### Frontend Tests
```bash
cd frontend
npm test
```

### Test Coverage
- Authentication endpoints
- User registration and login
- Password reset flow
- Token validation
- Error handling
- Frontend components
- Context providers

## Error Handling

### Common Error Responses
```json
{
  "detail": "Email already registered"
}

{
  "detail": "Incorrect email or password"
}

{
  "detail": "Invalid or expired reset token"
}
```

### Frontend Error States
- Form validation errors
- Network errors
- Authentication errors
- Server errors

## Production Considerations

### Security
- Use HTTPS in production
- Set secure, HTTP-only cookies
- Implement rate limiting
- Add request logging
- Use environment-specific secrets

### Performance
- Implement token caching
- Add database indexing
- Use connection pooling
- Monitor API response times

### Monitoring
- Log authentication attempts
- Track failed login attempts
- Monitor token usage
- Set up alerts for suspicious activity

## Troubleshooting

### Common Issues

#### Token Expired
- Check `ACCESS_TOKEN_EXPIRE_MINUTES` setting
- Verify refresh token is valid
- Clear localStorage and re-login

#### CORS Errors
- Verify `ALLOWED_ORIGINS` includes frontend URL
- Check frontend is making requests to correct backend URL
- Ensure credentials are included in requests

#### Password Reset Not Working
- Check SMTP configuration
- Verify email templates
- Check token expiration settings
- Monitor email delivery logs

### Debug Mode
Set `ENVIRONMENT=development` to:
- See password reset tokens in console
- Enable detailed error messages
- Log authentication attempts
- Show development-specific features

## Future Enhancements

### Planned Features
- [ ] Google OAuth integration (when implemented)
- [ ] GitHub OAuth integration (when implemented)
- [ ] Email verification (when email service is added)
- [ ] Two-factor authentication
- [ ] Social login (when OAuth is implemented)
- [ ] Account linking
- [ ] Session management
- [ ] Audit logging

### Technical Improvements
- [ ] Redis for token storage
- [ ] WebSocket for real-time auth updates
- [ ] GraphQL integration
- [ ] Microservices architecture
- [ ] Kubernetes deployment
- [ ] CI/CD pipeline

## Contributing

### Development Setup
1. Clone the repository
2. Set up environment variables
3. Install dependencies
4. Run database migrations
5. Start development servers
6. Run tests

### Code Standards
- Follow PEP 8 (Python)
- Use ESLint (JavaScript)
- Write comprehensive tests
- Document new features
- Update this documentation

### Testing Guidelines
- Test all authentication flows
- Verify error handling
- Test edge cases
- Ensure security measures
- Validate UI/UX

## Support

For authentication-related issues:
1. Check this documentation
2. Review error logs
3. Test with minimal setup
4. Check environment variables
5. Verify database connectivity
6. Contact development team

## References

- [FastAPI Security](https://fastapi.tiangolo.com/tutorial/security/)
- [JWT Best Practices](https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/)
- [React Authentication](https://reactjs.org/docs/context.html)
- [PostgreSQL Security](https://www.postgresql.org/docs/current/security.html) 