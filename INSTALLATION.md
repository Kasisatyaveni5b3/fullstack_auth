# Installation & Running Guide

## Prerequisites
- Node.js 18+ (https://nodejs.org)
- Docker & Docker Compose (https://www.docker.com/products/docker-desktop)
- Git (https://git-scm.com)

## Backend Setup

1. Navigate to the backend directory:
```powershell
cd backend
```

2. Install dependencies:
```powershell
npm install
```

3. Create `.env` file (copy from `.env.example`):
```powershell
Copy-Item .env.example .env
```

4. **Run via Docker Compose (Recommended)**:
   From project root, run:
```powershell
docker-compose up --build
```
   This starts:
   - MySQL on `localhost:3306`
   - Backend on `localhost:4000`

   Or **Run locally** (requires local MySQL):
```powershell
npm run dev
```

## Frontend Setup

1. Navigate to the frontend directory:
```powershell
cd frontend
```

2. Install dependencies:
```powershell
npm install
```

3. Ensure `.env.local` is present with:
```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

4. Start dev server:
```powershell
npm run dev
```

5. Open `http://localhost:3000` in your browser.

## Testing the Authentication Flow

1. **Register**: Go to `http://localhost:3000/register`, create an account.
2. **Login**: Go to `http://localhost:3000/login`, sign in with your credentials.
3. **Profile**: After login, you're redirected to `/profile` where you can view and edit your details.
4. **Logout**: Click the "Logout" button to clear your session.

## Build for Production

**Backend:**
```powershell
cd backend
npm install --production
```

**Frontend:**
```powershell
cd frontend
npm run build
npm run start
```

## Troubleshooting

- **Backend won't start**: Check that MySQL is accessible and environment variables are set correctly in `.env`.
- **Frontend can't reach backend**: Ensure `NEXT_PUBLIC_API_URL` is set correctly in `.env.local` and backend is running.
- **Port already in use**: Change the port in the backend `.env` or use `lsof -i :PORT` (macOS/Linux) / `netstat -ano | findstr :PORT` (Windows) to find and kill processes.
