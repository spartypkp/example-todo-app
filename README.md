# Simple TODO Application

A minimal TODO web application built with Next.js 14, TypeScript, and SQLite.

## Features

- User registration and login
- Create, update, and delete tasks
- Mark tasks as complete/incomplete
- Task statistics (total, completed, percentage)
- Simple session-based authentication

## Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Database:** SQLite (local file)
- **Styling:** Tailwind CSS
- **Authentication:** Session cookies

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# No environment variables needed! 🎉
```

The app will be available at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
  app/
    (auth)/
      login/page.tsx      # Login page
      register/page.tsx   # Registration page
    dashboard/page.tsx    # Main TODO interface
    api/
      auth/               # Authentication endpoints
      tasks/              # Task CRUD endpoints
    layout.tsx            # Root layout
    page.tsx              # Landing page
  components/
    ui/                   # Basic UI components
  lib/
    db.ts                 # SQLite database setup
    auth.ts               # Authentication utilities
    validation.ts         # Input validation
```

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login  
- `POST /api/auth/logout` - User logout
- `GET /api/tasks` - List user tasks
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get single task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Features

- User registration and login with session-based authentication
- Create, read, update, and delete tasks
- Mark tasks as complete/incomplete
- Task statistics display
- Responsive design for mobile and desktop
- Input validation on all forms
- Consistent error handling
- Database transactions for bulk operations

## License

MIT