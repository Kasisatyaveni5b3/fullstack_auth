# fullstack_auth

This repository contains a minimal full-stack authentication example:

- Backend: Express.js + Sequelize (MySQL) — JWT auth
- Frontend: Next.js + TypeScript + Ant Design + Tailwind CSS
- Docker Compose to run MySQL and Backend

Features:
- Register, Login, Get/Edit profile
- Route protection on the frontend (redirects)
- JWT-based auth

Quickstart (Windows, PowerShell):

1. Start MySQL and backend via Docker Compose:

```powershell
docker-compose up --build
```

This will expose the backend on `http://localhost:4000` and MySQL on `3306`.

2. Install frontend dependencies and run Next.js:

```powershell
cd frontend
npm install
# Set NEXT_PUBLIC_API_URL if backend is on another host, otherwise default is http://localhost:4000
setx NEXT_PUBLIC_API_URL "http://localhost:4000"
npm run dev
```

3. Open `http://localhost:3000/login` to interact.

Notes:
- The backend uses a simple JWT secret configured via environment variable `JWT_SECRET`.
- For production, secure secrets, enable TLS, and use proper DB credentials.
