# ProjectFlow - VAERDIA Project Management Platform

A comprehensive full-stack project management application built with React, NestJS, and PostgreSQL. Manage projects, tasks, sprints, and collaborate with your team efficiently.

## Features

### Phase 1 (Current)
- **Project Management**: Create and manage Scrum/Kanban projects
- **Task Management**: Create, assign, and track tasks with priorities and status
- **Sprint Management**: Organize tasks into sprints for better planning
- **Task Board**: Visual Kanban board for task management
- **Comments & Communication**: Task-level discussions and updates
- **Documents**: File management and document uploads
- **Activity Logging**: Track all project changes and activities
- **Authentication**: Secure JWT-based user authentication
- **Role-Based Access**: Project member roles (Owner, Lead, Member, Viewer)

### Phase 2 (Future)
- Aura IA - AI Assistant for intelligent recommendations
- Client Portal - Dedicated client access interface
- Leave Management - Team time-off management
- Advanced Reporting & Analytics
- Real-time Notifications & WebSockets
- Gantt Charts & Timeline Views

## Technology Stack

### Frontend
- **React 19** - UI framework
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **SWR** - Data fetching & caching
- **shadcn/ui** - Component library
- **Axios** - HTTP client

### Backend
- **NestJS** - Node.js framework
- **TypeORM** - ORM for database management
- **PostgreSQL** - Relational database
- **JWT** - Authentication
- **Passport.js** - Authentication middleware
- **Class Validator** - Input validation
- **Swagger** - API documentation

## Project Structure

```
projectflow/
├── app/                          # Next.js application
│   ├── (auth)/                   # Authentication routes
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/              # Protected dashboard routes
│   │   └── dashboard/
│   │       ├── page.tsx
│   │       ├── projects/
│   │       ├── tasks/
│   │       ├── documents/
│   │       └── reports/
│   ├── context/                  # React context providers
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   ├── sidebar.tsx               # Navigation sidebar
│   ├── header.tsx                # Top header
│   ├── project/                  # Project-related components
│   └── dialogs/                  # Dialog components
├── lib/                          # Utilities
│   ├── api.ts                    # API client
│   └── utils.ts                  # Helper functions
├── backend/                      # NestJS backend
│   ├── src/
│   │   ├── main.ts               # Application entry point
│   │   ├── app.module.ts         # Root module
│   │   ├── config/               # Configuration
│   │   ├── entities/             # TypeORM entities
│   │   └── modules/              # Feature modules
│   │       ├── auth/
│   │       ├── users/
│   │       ├── projects/
│   │       ├── sprints/
│   │       ├── tasks/
│   │       ├── comments/
│   │       ├── documents/
│   │       └── activity/
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env                      # Backend environment variables
│   └── .env.example
├── middleware.ts                 # Next.js middleware
├── docker-compose.yml            # Docker services
├── package.json                  # Frontend dependencies
└── README.md                     # This file
```

## Getting Started

### Prerequisites
- Node.js 18+ and pnpm
- Docker & Docker Compose
- PostgreSQL 15+ (if not using Docker)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd projectflow
```

2. **Setup PostgreSQL with Docker**
```bash
docker-compose up -d
```

3. **Install frontend dependencies**
```bash
pnpm install
```

4. **Setup backend**
```bash
cd backend
pnpm install
```

5. **Configure environment variables**

Backend (`backend/.env`):
```bash
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=projectflow
DB_PASSWORD=projectflow123
DB_DATABASE=projectflow
JWT_SECRET=your-secret-key-change-in-production
```

Frontend (`.env.local`):
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

### Running the Application

1. **Start the backend**
```bash
cd backend
pnpm run dev
```
The backend will be available at `http://localhost:3001`
API documentation: `http://localhost:3001/docs`

2. **Start the frontend** (in another terminal)
```bash
pnpm run dev
```
The frontend will be available at `http://localhost:3000`

3. **Access the application**
- Register a new account or login
- Create your first project
- Add team members and start managing tasks

## API Documentation

The backend provides comprehensive Swagger API documentation available at:
```
http://localhost:3001/docs
```

### Key Endpoints

#### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user

#### Projects
- `GET /api/v1/projects` - List all projects
- `POST /api/v1/projects` - Create new project
- `GET /api/v1/projects/:id` - Get project details
- `PUT /api/v1/projects/:id` - Update project
- `DELETE /api/v1/projects/:id` - Delete project
- `POST /api/v1/projects/:id/members` - Add project member
- `DELETE /api/v1/projects/:id/members/:userId` - Remove member

#### Tasks
- `GET /api/v1/tasks/projects/:projectId` - Get project tasks
- `POST /api/v1/tasks` - Create task
- `PUT /api/v1/tasks/:id` - Update task
- `DELETE /api/v1/tasks/:id` - Delete task

#### Other Modules
- `/api/v1/sprints` - Sprint management
- `/api/v1/comments` - Task comments
- `/api/v1/documents` - Document management
- `/api/v1/activity` - Activity logs
- `/api/v1/users` - User management

## Database Schema

### Core Entities
- **Users**: System users with roles
- **Projects**: Projects with templates (Scrum/Kanban)
- **ProjectMembers**: Project membership with roles
- **Sprints**: Sprint planning for Scrum projects
- **Tasks**: Individual work items
- **Comments**: Task discussions
- **Documents**: File attachments
- **ActivityLogs**: Change tracking

## Authentication & Security

- JWT token-based authentication
- Bcrypt password hashing
- CORS protection
- Role-based access control (Owner, Lead, Member, Viewer)
- Secure session management with HTTP-only cookies

## Development

### Building for Production

Frontend:
```bash
pnpm run build
pnpm run start
```

Backend:
```bash
cd backend
pnpm run build
NODE_ENV=production pnpm run prod
```

### Running Tests

```bash
# Backend tests
cd backend
pnpm run test

# Frontend tests
pnpm run test
```

## Deployment

### Vercel Deployment (Recommended for Frontend)
```bash
# The frontend can be deployed directly to Vercel
# Configure environment variables in Vercel dashboard
vercel deploy
```

### Backend Deployment Options
- **Railway** - npm `npm i -g railway && railway link`
- **Heroku** - `heroku create projectflow-api`
- **AWS EC2/ECS** - Docker-based deployment
- **DigitalOcean** - App Platform or Droplets
- **Self-hosted** - Docker Compose on your server

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues, questions, or suggestions, please open an issue in the repository or contact the development team.

## Roadmap

- [ ] Phase 2: Aura IA Integration
- [ ] Phase 2: Client Portal
- [ ] Phase 2: Advanced Reporting
- [ ] WebSocket Support for Real-time Updates
- [ ] Mobile App (React Native)
- [ ] API Rate Limiting & Throttling
- [ ] Advanced Search & Filtering
- [ ] Custom Workflows
- [ ] Integration with Slack/Teams
- [ ] Time Tracking & Reporting

---

**Built with ❤️ by VAERDIA Team**
