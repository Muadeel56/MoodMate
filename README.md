# MoodMate - Full Stack Application

A comprehensive mood tracking application built with React frontend and FastAPI backend.

## 🏗️ Project Structure

```
MoodMate/
├── frontend/           # React application
├── backend/            # FastAPI application
├── docker/             # Docker configurations
├── docs/              # Documentation
├── scripts/           # Build and deployment scripts
└── .github/           # GitHub workflows
```

## 🚀 Quick Start

### Frontend Development
```bash
cd frontend
npm install
npm run dev
```

### Backend Development
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Docker Development
```bash
docker-compose up -d
```

## 📚 Documentation

- [Frontend Documentation](docs/FRONTEND.md)
- [Backend Documentation](docs/BACKEND.md)
- [API Documentation](docs/API.md)
- [Deployment Guide](docs/DEPLOYMENT.md)

## 🛠️ Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- React Router DOM
- Vitest for testing

### Backend
- FastAPI
- PostgreSQL
- SQLAlchemy
- Alembic
- Pydantic

### DevOps
- Docker
- Docker Compose
- GitHub Actions

## 📋 Development Workflow

1. **Frontend Development**: Work in `frontend/` directory
2. **Backend Development**: Work in `backend/` directory
3. **Docker Development**: Use `docker-compose.yml`
4. **Documentation**: Add to `docs/` directory

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
