# Deployment Guide

This project is a monorepo containing a FastAPI backend and a Next.js frontend.

## 🚀 Backend (Railway)

**Target:** [Railway.app](https://railway.app)

1.  **Create a New Project** on Railway.
2.  **Connect your GitHub repository**.
3.  **Root Directory:** Set this to `backend`.
4.  **Environment Variables:**
    - `DATABASE_URL`: Your Postgres connection string. (Code handles conversion from `postgres://` to `postgresql://`).
    - `JWT_SECRET`: A secure key for auth tokens.
    - `PORT`: Managed by Railway.
5.  **Start Command:** Railway uses the `Procfile`:
    `web: uvicorn app.main:app --host 0.0.0.0 --port $PORT`
6.  **Verify:** Check `https://your-backend.up.railway.app/health`.

## 🌐 Frontend (Vercel)

**Target:** [Vercel.com](https://vercel.com)

1.  **Import Repository**: Select your repo.
2.  **Root Directory**: Set to `frontend`.
3.  **Framework Preset**: Select `Next.js`.
4.  **Environment Variables**:
    - `NEXT_PUBLIC_API_URL`: Use your Railway production URL (e.g., `https://cyber-api.up.railway.app/api`).
5.  **Deploy**: Hit deploy. Redis-base/other services not required for this demo.

---

## 🛠 Features & Fixes applied
- **Health Endpoint**: `GET /health` added for zero-downtime deployment.
- **CORS Handling**: Properly configured for Vercel wildcard domains.
- **Python Runtime**: Locked to `3.11.9`.
- **Database Fallback**: Graceful switch between SQLite (local) and Postgres (prod).
- **Environment Parity**: `.env.example` provided for both stacks.
