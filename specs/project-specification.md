# Simple TODO Application Specification

**Version:** 1.1.0  
**Purpose:** A minimal, self-contained TODO web application

## Overview
A straightforward TODO application where users can register, login, and manage their personal task list through a web interface. The application prioritizes simplicity, ease of deployment, and core functionality over advanced features.

### Project Goals
- Provide a clean, intuitive task management interface
- Enable quick deployment without complex configuration
- Demonstrate modern web development practices
- Maintain a small, understandable codebase

### Target Use Cases
- Personal task tracking
- Learning project for web development
- Foundation for extending with additional features
- Quick prototype for task management concepts

## Technology Stack
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (standard v3 configuration)
- **Database:** SQLite (local file, zero configuration)
- **Authentication:** Simple email/password with session cookies
- **Environment Variables:** None required! Everything is self-contained

## Application Structure

### 1. Pages & Routes

#### 1.1 Public Pages
- `/` - Landing page with app title, description, and "Get Started" button
- `/login` - User login form
- `/register` - User registration form

#### 1.2 Protected Pages
- `/dashboard` - Main TODO list interface (requires authentication via middleware)

### 2. User Interface Requirements

#### 2.1 Landing Page (`/`)
- App title: "Welcome to TODOs"
- Brief description of the app
- "Get Started" button → redirects to `/login`
- "Register here" link for new users

#### 2.2 Login Page (`/login`)
- Email input field (type="email")
- Password input field (type="password")
- "Login" button
- Link to registration page ("Don't have an account? Register")
- Error message display area (red text below form)
- Client-side validation for email format
- Successful login → redirect to `/dashboard`

#### 2.3 Registration Page (`/register`)
- Name input field (text, 1-50 characters)
- Email input field (valid email format)
- Password input field (minimum 6 characters)
- "Register" button
- Link to login page ("Already have an account? Login")
- Error message display area
- Both client and server-side validation
- Successful registration → auto-login and redirect to `/dashboard`

#### 2.4 Dashboard Page (`/dashboard`)
**Header Section:**
- App title: "My TODOs"
- Display user's name (right side)
- Logout button (functional, clears session)

**Task Input Section:**
- Single text input for new task title
- "Add Task" button
- Validation: Required, max 100 characters
- Error message display below input

**Statistics Bar:**
- Three metrics displayed horizontally:
  - Total tasks count
  - Completed tasks count  
  - Completion percentage
- Use cards/boxes for visual separation

**Task List Section:**
- Display all user's tasks in a vertical list
- Each task item shows:
  - Checkbox (left) to toggle completion
  - Task title (center, strikethrough when completed)
  - Delete button "✕" (right, red on hover)
- Tasks sorted by creation date (newest first)
- Empty state: "No tasks yet. Add your first task above!"

### 3. Core Functionality

#### 3.1 Authentication
- Email/password authentication using bcryptjs for password hashing
- Sessions stored in httpOnly cookies (7-day expiry)
- Session cookie name: `todo-session`
- Middleware protection for `/dashboard` routes
- Logout endpoint clears session from database and cookie

#### 3.2 Task Management
Users can:
- **Create tasks**: Title required, validated on client and server
- **Toggle completion**: Updates task state and UI immediately
- **Delete tasks**: Removes from database and UI
- **View all tasks**: Only see their own tasks, sorted newest first

#### 3.3 Data Persistence
- SQLite database file: `todos.db`
- Three tables: `users`, `tasks`, `sessions`
- Foreign key relationships enforced
- Tasks linked to user via `userId`
- Sessions linked to user via `userId`

### 4. Required Quality Standards

#### 4.1 Input Validation
**Registration Form:**
- Name: Required, 1-50 characters
- Email: Required, valid email format (regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
- Password: Required, minimum 6 characters

**Login Form:**
- Email: Required, valid format
- Password: Required

**Task Creation:**
- Title: Required, 1-100 characters
- Validation on both client (immediate feedback) and server

**Error Display:**
- Show validation errors below relevant fields
- Use red text color for errors
- Clear, user-friendly messages

#### 4.2 Error Handling
- Consistent error response format:
  ```json
  {
    "error": {
      "code": "ERROR_CODE",
      "message": "Human-readable message"
    }
  }
  ```
- Common error codes:
  - `MISSING_FIELDS` - Required fields missing
  - `INVALID_EMAIL` - Email format invalid
  - `WEAK_PASSWORD` - Password too short
  - `EMAIL_EXISTS` - Email already registered
  - `INVALID_CREDENTIALS` - Login failed
  - `UNAUTHORIZED` - Authentication required
  - `NOT_FOUND` - Resource not found
- Network errors handled with user-friendly fallback messages

#### 4.3 Database Transactions
- Bulk operations wrapped in transactions using `db.transaction()`
- Examples that must be atomic:
  - Clear all completed tasks
  - Delete all tasks
  - Toggle all tasks
- No partial updates on transaction failure

#### 4.4 Responsive Design
- Breakpoints: Mobile (375px), Desktop (1024px+)
- Mobile requirements:
  - Single column layout
  - Touch-friendly button sizes (min 44x44px)
  - Task list scrollable
  - Statistics bar stacks vertically
- Desktop requirements:
  - Centered content with max-width
  - Statistics bar horizontal
  - Comfortable spacing

## Data Models

```typescript
interface User {
  id: string;        // UUID
  name: string;      // Display name
  email: string;     // Unique, used for login
  passwordHash: string;
  createdAt: string; // ISO timestamp
}

interface Task {
  id: string;        // UUID
  userId: string;    // Foreign key to User
  title: string;
  completed: boolean;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}

interface Session {
  id: string;        // UUID
  userId: string;    // Foreign key to User
  expiresAt: string; // ISO timestamp
}
```

## API Endpoints

All API routes under `/api/`:

### Authentication
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Authenticate user
- `POST /api/auth/logout` - Clear user session

### Tasks (Protected - Require Authentication)
- `GET /api/tasks` - List all tasks for current user
- `POST /api/tasks` - Create new task
- `GET /api/tasks/[id]` - Get single task
- `PUT /api/tasks/[id]` - Update task (title or completion)
- `DELETE /api/tasks/[id]` - Delete task

## File Structure
```
/src
  /app
    /(auth)
      /login/page.tsx      # Login page
      /register/page.tsx   # Registration page
    /dashboard/page.tsx    # Main TODO interface
    /api
      /auth/*              # Auth endpoints
      /tasks/*             # Task CRUD endpoints
    layout.tsx             # Root layout with global styles
    page.tsx               # Landing page
  /components
    Header.tsx             # Dashboard header component
    TaskInput.tsx          # New task input component
    TaskList.tsx           # Task list container
    TaskItem.tsx           # Individual task component
    /ui                    # Reusable UI components
      button.tsx
      input.tsx
      checkbox.tsx
      label.tsx
  /lib
    db.ts                  # Database setup and queries
    auth.ts                # Authentication utilities
    validation.ts          # Input validation functions
```

## Implementation Notes

### Database Initialization
The SQLite database should auto-create tables on first run:
```sql
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  passwordHash TEXT NOT NULL,
  createdAt TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS tasks (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL,
  title TEXT NOT NULL,
  completed INTEGER DEFAULT 0,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL,
  expiresAt TEXT NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id)
);
```

### Middleware Configuration
Protect routes using Next.js middleware:
- Check for session cookie on protected routes
- Redirect to `/login` if not authenticated
- Redirect to `/dashboard` if authenticated user visits login/register

### Type Safety
- Define TypeScript interfaces for all data models
- Export types from `db.ts` for reuse across components
- Use proper return types for all functions
- Avoid using `any` type

## User Flow

### Primary Flow: Complete Task Lifecycle
1. User lands on homepage (`/`)
2. Clicks "Get Started" → redirected to login
3. New user clicks "Register" link
4. Fills registration form with validation
5. Account created, auto-logged in → dashboard
6. Dashboard shows empty state message
7. User types task title, clicks "Add Task"
8. Task appears at top of list
9. User clicks checkbox → task marked complete with strikethrough
10. User clicks "✕" → task deleted
11. User clicks "Logout" → session cleared, redirected to homepage

## Deployment & Configuration

### Environment Variables
**None required!** This application is completely self-contained:
- No API keys needed
- No external service configuration
- No database connection strings
- NODE_ENV is automatically set by Next.js

### Database
- SQLite database auto-creates as `todos.db` in the project root
- No setup or migration commands needed
- Database persists between server restarts

### Running the Application
```bash
# Development
npm install
npm run dev

# Production
npm run build
npm start
```

## Success Criteria
A complete implementation should:
- ✅ Allow user registration and login
- ✅ Persist sessions across page refreshes
- ✅ Create, read, update, delete tasks
- ✅ Show real-time UI updates
- ✅ Validate all user inputs
- ✅ Handle errors gracefully
- ✅ Work on mobile and desktop
- ✅ Use atomic database transactions
- ✅ Follow the specified file structure
- ✅ Implement all UI components as specified
- ✅ Require zero configuration to run

## Summary
This is a minimal but complete TODO application focusing on core functionality. It's designed to be simple to understand, quick to deploy, and easy to maintain while still following proper software engineering practices like validation, error handling, and database transactions. The zero-configuration approach ensures it can be run anywhere with minimal setup.