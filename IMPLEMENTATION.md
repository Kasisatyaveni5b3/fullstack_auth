# Implementing the Authentication System

This guide explains how all the pieces work together.

## Architecture Overview

### Backend (Express + Sequelize)

**Flow:**
1. User registers → POST `/api/auth/register` → password hashed with bcrypt → user stored in MySQL
2. User logs in → POST `/api/auth/login` → password verified → JWT token returned
3. User makes requests → `Authorization: Bearer <token>` header → middleware verifies JWT → returns user data

**Key Files:**
- `backend/src/routes/auth.js` — handles `/api/auth/*` routes
- `backend/src/models/user.js` — defines User table schema
- `backend/src/middleware/auth.js` — JWT verification logic
- `backend/src/index.js` — app setup & server initialization

### Frontend (Next.js + TypeScript)

**Flow:**
1. User accesses `/login` → redirects to `/profile` if token exists (already logged in)
2. User enters credentials → calls backend `/api/auth/login`
3. Backend returns JWT token → stored in `localStorage`
4. Redirects to `/profile` → fetches user details via GET `/api/auth/me`
5. On logout → token cleared → redirects to `/login`

**Key Files:**
- `frontend/pages/login.tsx` — login form with redirect protection
- `frontend/pages/register.tsx` — registration form
- `frontend/pages/profile.tsx` — protected profile page with edit capability
- `frontend/pages/_app.tsx` — global App setup with Ant Design

### Database (MySQL)

**Tables:**
- `Users` — id, name, email (unique), password (hashed), createdAt, updatedAt

## Security Notes

- Passwords are hashed using bcrypt (cost factor: 10)
- JWT tokens expire in 7 days (configurable via `JWT_EXPIRES_IN`)
- Route protection on frontend (localStorage-based)
- Backend validates JWT on every protected request
- CORS enabled to allow frontend requests

## What's Used From Requirements

✅ Ant Design (Antd) — Form, Input, Button, Card, Typography components  
✅ Tailwind CSS — responsive layout, bg-gray-50, flexbox utilities  
✅ Lodash — (optional) available in dependencies for utility functions  
✅ MySQL Database — Sequelize ORM + mysql2 driver  
✅ JWT Authentication — jsonwebtoken for token generation/verification  
✅ Express.js Backend — serves API endpoints  
✅ Next.js + TypeScript Frontend — with full type support  
✅ Docker — Dockerfile + docker-compose for containerization  

## Next Steps After Push

1. **Customize styling** — modify Tailwind classes in page components
2. **Add input validation** — use Ant Form rules more extensively
3. **Improve error handling** — add more granular error messages
4. **Deploy** — use Vercel (frontend) + Heroku/Railway (backend)
