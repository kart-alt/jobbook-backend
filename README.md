# Job Interview Tracker Backend

Express.js backend for the Job Interview Tracker application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with:
```
PORT=5000
JWT_SECRET=your_secret_key
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
```

3. Start the server:
```bash
npm start
```

Server runs on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user

### Jobs
- `GET /api/jobs` - Get all jobs (requires auth)
- `POST /api/jobs` - Create job (requires auth)
- `PUT /api/jobs/:id` - Update job (requires auth)
- `DELETE /api/jobs/:id` - Delete job (requires auth)

### Interviews
- `GET /api/interviews` - Get all interviews (requires auth)
- `POST /api/interviews` - Create interview (requires auth)
- `PUT /api/interviews/:id` - Update interview (requires auth)
- `DELETE /api/interviews/:id` - Delete interview (requires auth)

### User Profile
- `GET /api/users/profile` - Get user profile (requires auth)
- `PUT /api/users/profile` - Update user profile (requires auth)

## Features

- JWT authentication
- User isolation (each user sees only their data)
- In-memory storage (data persists during session)
- CORS enabled for frontend communication
