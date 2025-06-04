
# MedApp - Medical Appointment Platform

A comprehensive frontend application for medical appointment booking and healthcare management built with React, TypeScript, and modern web technologies.

![MedApp](https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop)

## 🌟 Features

### ✅ Must Have Features (Fully Implemented)
- **User Authentication System**
  - Login/signup with role-based access (Patient/Doctor)
  - Password validation and forgot password flow
  - Role-based redirect logic and protected routes
  
- **Doctor Appointment Booking**
  - Interactive calendar with time slot selection
  - Comprehensive doctor profile views
  - Smart booking form with appointment types
  - Complete appointment management system

- **Medical Report Management**
  - Document/image upload with frontend preview
  - OCR text extraction simulation
  - Report archive and management

- **Responsive Design**
  - Mobile-first approach with Tailwind CSS
  - Optimized for all device sizes
  - Modern, healthcare-focused UI

- **Git Integration Guidelines**
  - Structured branching strategy
  - Commit message conventions
  - PR workflow examples

### 🟡 Should Have Features (Implemented)
- **Appointment History** - Complete appointment tracking
- **User Profiles** - Editable profiles with image upload
- **Role-Based Dashboards**
  - Patient dashboard: bookings, history, reports
  - Doctor dashboard: schedule, patients, analytics
- **Appointment Notifications** - Status indicators and badges

### 🟠 Could Have Features (UI Mockups)
- Doctor availability management
- Medical record timeline view
- Billing & payment interfaces
- Chat system UI
- Video consultation interface
- Analytics dashboard
- Push notification system

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router DOM v6
- **State Management**: Context API with useReducer
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Development**: ESLint, TypeScript

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Layout.tsx      # Main layout wrapper
│   └── ProtectedRoute.tsx
├── contexts/           # React Context providers
│   ├── AuthContext.tsx
│   └── AppointmentContext.tsx
├── pages/              # Page components
│   ├── Index.tsx       # Landing page
│   ├── Login.tsx       # Authentication
│   ├── Dashboard.tsx   # Main dashboard
│   ├── BookAppointment.tsx
│   └── ...
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── types/              # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/medapp.git
   cd medapp
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
   Navigate to `http://localhost:8080`

### Demo Accounts

Use these demo credentials to explore the application:

**Patient Account:**
- Email: `patient@demo.com`
- Password: `password`

**Doctor Account:**
- Email: `doctor@demo.com`
- Password: `password`

## 🔀 Git Workflow & Best Practices

### Branching Strategy

We follow the **GitFlow** branching model:

```
main                    # Production-ready code
├── develop            # Integration branch
├── feature/           # New features
│   ├── feature/user-auth
│   ├── feature/appointment-booking
│   └── feature/medical-reports
├── release/           # Release preparation
└── hotfix/           # Emergency fixes
```

### Branch Naming Convention

```bash
# Features
feature/user-authentication
feature/appointment-booking
feature/medical-reports-upload

# Bug fixes
bugfix/login-validation-error
bugfix/appointment-time-conflict

# Hotfixes
hotfix/security-patch-auth
hotfix/critical-booking-bug

# Releases
release/v1.0.0
release/v1.1.0
```

### Commit Message Format

Follow the **Conventional Commits** specification:

```bash
# Format
<type>(<scope>): <description>

[optional body]

[optional footer]

# Examples
feat(auth): add user registration with email verification
fix(booking): resolve time slot conflict validation
docs(readme): update installation instructions
style(ui): improve button hover states
refactor(context): optimize appointment state management
test(auth): add unit tests for login validation
```

#### Commit Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Pull Request Workflow

1. **Create Feature Branch**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes & Commit**
   ```bash
   git add .
   git commit -m "feat(feature): implement user authentication"
   ```

3. **Push Branch**
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Create Pull Request**
   - Target: `develop` branch
   - Title: Clear, descriptive summary
   - Description: What changes were made and why
   - Include screenshots for UI changes

#### PR Template Example

```markdown
## 📋 Description
Brief description of changes made.

## 🔄 Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## 🧪 Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## 📱 Screenshots
(Include before/after screenshots for UI changes)

## 📝 Additional Notes
Any additional information or context.
```

### Example Git History

```bash
* 2f8a1b4 (HEAD -> develop) feat(dashboard): add patient appointment overview
* 1a7c3d2 fix(auth): resolve password validation edge case
* 9e5f6b8 docs(readme): add git workflow documentation
* 7c4a1f3 feat(booking): implement time slot selection
* 5b2d9e1 style(ui): improve mobile responsiveness
* 3a8f7c4 refactor(context): optimize state management
* 1f9b5d7 feat(auth): add role-based authentication
* 8e3c2a9 Initial project setup with Vite and TypeScript
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#2563eb) - Trust and professionalism
- **Secondary**: Green (#059669) - Health and wellness
- **Accent**: Yellow (#eab308) - Attention and warnings
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Headings**: Inter font family, various weights
- **Body**: System fonts with fallbacks
- **Code**: Monospace fonts

### Component Standards
- Consistent spacing using Tailwind's scale
- Rounded corners for modern appearance
- Subtle shadows and transitions
- Accessible color contrast ratios

## 📱 Mobile Responsiveness

The application is built with a mobile-first approach:

- **Mobile (320px+)**: Single column layout, touch-friendly buttons
- **Tablet (768px+)**: Two-column layouts, expanded navigation
- **Desktop (1024px+)**: Multi-column layouts, sidebar navigation
- **Large Desktop (1280px+)**: Maximum content width with margins

## 🔒 Security Features

- Client-side form validation
- Protected route implementation
- Role-based access control
- Secure local storage usage
- Input sanitization

## 🚀 Performance Optimizations

- React.lazy() for code splitting
- Image optimization and lazy loading
- Efficient state management
- Memoization where appropriate
- Bundle size optimization

## 📋 Testing Strategy

### Test Types
- **Unit Tests**: Component logic and utilities
- **Integration Tests**: Component interactions
- **E2E Tests**: User workflow testing
- **Accessibility Tests**: WCAG compliance

### Test Files Structure
```
src/
├── __tests__/
│   ├── components/
│   ├── pages/
│   ├── contexts/
│   └── utils/
└── cypress/
    ├── integration/
    ├── fixtures/
    └── support/
```

## 🔮 Future Enhancements

### Phase 2 Features
- Real-time chat system
- Video consultation integration
- Payment gateway integration
- Advanced analytics dashboard
- Push notification system

### Phase 3 Features
- AI-powered symptom checker
- Telemedicine capabilities
- Integration with EHR systems
- Multi-language support
- Advanced reporting tools

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Write or update tests
5. Ensure all tests pass
6. Submit a pull request

### Code Style Guidelines
- Use TypeScript for type safety
- Follow ESLint configuration
- Use Prettier for code formatting
- Write self-documenting code
- Add comments for complex logic

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Frontend Development**: React/TypeScript specialists
- **UI/UX Design**: Healthcare-focused design team
- **DevOps**: CI/CD and deployment automation
- **Quality Assurance**: Testing and validation

## 📞 Support

For support and questions:
- 📧 Email: support@medapp.com
- 💬 Slack: #medapp-support
- 📖 Documentation: [docs.medapp.com](https://docs.medapp.com)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/medapp/issues)

---

**Built with ❤️ for better healthcare accessibility**
