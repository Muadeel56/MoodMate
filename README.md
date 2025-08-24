# 🌟 MoodMate - AI-Powered Mood Companion

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.11-38B2AC.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-7.0.4-646CFF.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> An AI-powered mood companion web app that helps you track and elevate your mood through personalized suggestions, music, and mindful practices.

## ✨ Features

- 📔 **Mood Journal** - Track your daily moods with emoji-based input
- 🧠 **AI Suggestions** - Get personalized recommendations based on your mood patterns
- 🎵 **Music Integration** - Listen to mood-based playlists and lofi music
- 💭 **Mindful Quotes** - Daily inspiration and motivation
- 🎨 **Beautiful UI** - Responsive, animated interface with dark/light themes
- 🔐 **User Authentication** - Secure login and personalized experience
- 📱 **Mobile Responsive** - Works perfectly on all devices

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/MoodMate.git
   cd MoodMate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

---

## 🛠️ Development Workflow

### 📋 Issue Management

#### Creating Issues
Use GitHub CLI to create issues directly from the command line:

```bash
# Create a feature request
gh issue create --title "Add mood tracking feature" --body "Implement mood input with emoji selector" --label "enhancement,frontend"

# Create a bug report
gh issue create --title "Fix navbar not responsive on mobile" --body "Navbar breaks on screens smaller than 768px" --label "bug,ui/ux"

# Create a good first issue
gh issue create --title "Setup folder structure" --body "Create organized folder structure for components" --label "good first issue,frontend"
```

#### Available Labels
- `frontend` - React components and UI
- `backend` - Backend services and API
- `ui/ux` - User interface and experience
- `bug` - Bug reports and fixes
- `enhancement` - Feature requests and improvements
- `documentation` - Documentation updates
- `good first issue` - Beginner-friendly issues
- `discussion` - General discussions

#### Working on Issues

1. **Create a feature branch**
   ```bash
   # Create and switch to a new branch
   git checkout -b feature/issue-number-description
   
   # Example: git checkout -b feature/123-setup-folder-structure
   ```

2. **Make your changes**
   ```bash
   # Make your code changes
   # Test your changes
   npm run dev
   ```

3. **Commit your changes**
   ```bash
   # Add your changes
   git add .
   
   # Commit with descriptive message
   git commit -m "feat: setup organized folder structure
   
   - Create components/, pages/, hooks/ directories
   - Add index files for clean imports
   - Update import paths in existing files
   
   Closes #123"
   ```

4. **Push and create PR**
   ```bash
   # Push your branch
   git push origin feature/123-setup-folder-structure
   
   # Create pull request
   gh pr create --title "Setup folder structure" --body "Closes #123"
   ```

### 📝 Commit Message Convention

Use conventional commits format:
```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks

**Examples:**
```bash
git commit -m "feat(auth): add user registration form"
git commit -m "fix(navbar): resolve mobile menu not closing"
git commit -m "docs(readme): update installation instructions"
```

---

## 📋 Project Issues & Roadmap

### 🏷️ GitHub Labels

| Label | Color | Description |
|-------|-------|-------------|
| `frontend` | `#28a745` (green) | Frontend React components and UI |
| `backend` | `#6f42c1` (purple) | Backend services and API |
| `ui/ux` | `#e83e8c` (pink) | User interface and experience |
| `bug` | `#dc3545` (red) | Bug reports and fixes |
| `enhancement` | `#007bff` (blue) | Feature requests and improvements |
| `documentation` | `#6c757d` (gray) | Documentation updates |
| `good first issue` | `#20c997` (teal) | Beginner-friendly issues |
| `discussion` | `#ffc107` (yellow) | General discussions |

### 🎯 Development Phases

#### Phase 1: Project Setup & UI Skeleton
**Status**: 🟡 In Progress  
**Timeline**: Week 1-2

**Issues to Create:**
```bash
# Setup folder structure
gh issue create --title "Setup organized folder structure" --body "Create proper folder structure for components, pages, hooks, etc." --label "good first issue,frontend"

# Setup routing
gh issue create --title "Setup React Router DOM" --body "Implement client-side routing for navigation between pages" --label "frontend"

# Create navbar
gh issue create --title "Create responsive navigation bar" --body "Build responsive navbar with logo, menu, and theme toggle" --label "frontend,ui/ux"

# Implement theme system
gh issue create --title "Implement dark/light theme system" --body "Add theme switching with localStorage persistence" --label "frontend,ui/ux"

# Create hero section
gh issue create --title "Create engaging hero section" --body "Build landing page hero with compelling copy and CTAs" --label "frontend,ui/ux"
```

#### Phase 2: Authentication & User Flow
**Status**: ⚪ Todo  
**Timeline**: Week 3-4

**Issues to Create:**
```bash
# Implement authentication
gh issue create --title "Implement user authentication" --body "Setup Firebase Auth or Auth0 for user registration and login" --label "backend,frontend"

# Create auth forms
gh issue create --title "Create authentication forms" --body "Build login, register, and password reset forms" --label "frontend,ui/ux"

# Add protected routes
gh issue create --title "Add protected routes" --body "Implement route protection for authenticated users" --label "frontend,backend"
```

#### Phase 3: Mood Journal Module
**Status**: ⚪ Todo  
**Timeline**: Week 5-6

**Issues to Create:**
```bash
# Create mood input component
gh issue create --title "Create mood input component" --body "Build emoji-based mood selector with scale and categories" --label "frontend,ui/ux"

# Create journal entry component
gh issue create --title "Create journal entry component" --body "Build rich text editor with auto-save and tags" --label "frontend,ui/ux"

# Store journal entries
gh issue create --title "Store journal entries" --body "Implement data persistence for mood and journal data" --label "backend,frontend"
```

#### Phase 4: AI Suggestions & Motivation
**Status**: ⚪ Todo  
**Timeline**: Week 7-8

**Issues to Create:**
```bash
# Integrate AI suggestions
gh issue create --title "Integrate AI suggestions" --body "Connect OpenAI API for personalized mood recommendations" --label "backend,frontend"

# Show motivational content
gh issue create --title "Show motivational content" --body "Display AI-generated motivation based on user mood" --label "frontend,ui/ux"
```

#### Phase 5: Music & Quotes Integration
**Status**: ⚪ Todo  
**Timeline**: Week 9-10

**Issues to Create:**
```bash
# Integrate music APIs
gh issue create --title "Integrate music APIs" --body "Connect Spotify/YouTube APIs for mood-based playlists" --label "backend,frontend"

# Add quotes system
gh issue create --title "Add quotes system" --body "Display inspirational quotes based on user mood" --label "frontend,ui/ux"
```

#### Phase 6: Final Polish & Deployment
**Status**: ⚪ Todo  
**Timeline**: Week 11-12

**Issues to Create:**
```bash
# Polish UI/UX
gh issue create --title "Polish UI/UX" --body "Final UI improvements and accessibility enhancements" --label "frontend,ui/ux"

# Deploy application
gh issue create --title "Deploy application" --body "Deploy to Vercel/Netlify with CI/CD pipeline" --label "documentation"
```

---

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

---

## 📁 Project Structure

```
MoodMate/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── sections/      # Page sections
│   ├── hooks/         # Custom React hooks
│   ├── context/       # React context providers
│   ├── utils/         # Utility functions
│   ├── services/      # API services
│   ├── constants/     # App constants
│   ├── styles/        # Custom styles

│   ├── assets/        # Static assets
│   ├── App.jsx        # Main app component
│   ├── main.jsx       # App entry point
│   └── index.css      # Global styles
├── public/            # Public assets
├── docs/              # Documentation
└── README.md          # This file
```

---

## 🤝 Contributing

### Getting Started

1. **Fork the repository**
2. **Pick an issue** from the roadmap above
3. **Create a branch** for your feature
4. **Submit a pull request** with your changes

### Good First Issues

Look for issues labeled with `good first issue` - perfect for newcomers!

### Code Style

- Use functional components with hooks
- Follow React best practices
- Use Tailwind CSS for styling
- Write clean, readable code
- Add comments for complex logic

---

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

---

## 📚 Documentation

- [Project Roadmap](PROJECT_ROADMAP.md) - Detailed development plans
- [Contributing Guide](CONTRIBUTING.md) - How to contribute
- [API Documentation](docs/API.md) - API endpoints and usage
- [User Guide](docs/USER_GUIDE.md) - How to use MoodMate

---

## 🛡️ Security

If you discover a security vulnerability, please email us at security@moodmate.app instead of using the issue tracker.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [React](https://react.dev/) - The web framework used
- [Tailwind CSS](https://tailwindcss.com/) - The CSS framework used
- [Vite](https://vitejs.dev/) - The build tool used
- [Framer Motion](https://www.framer.com/motion/) - For animations
- [OpenAI](https://openai.com/) - For AI-powered suggestions

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/MoodMate/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/MoodMate/discussions)
- **Email**: hello@moodmate.app

---

Made with ❤️ by the MoodMate team. Together, we're building a better world, one mood at a time. 🌟
