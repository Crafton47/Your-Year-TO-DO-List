# Deployment Guide

## Backend Deployment (Render)

1. Go to https://render.com and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - Name: `year-todo-backend`
   - Environment: `Python 3`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn app:app`
5. Add Environment Variables:
   - `SECRET_KEY`: Generate a random string
   - `FRONTEND_URL`: Your Vercel URL (add after frontend deployment)
   - `PYTHON_VERSION`: `3.11.0`
6. Click "Create Web Service"
7. Copy your backend URL (e.g., https://year-todo-backend.onrender.com)

## Frontend Deployment (Vercel)

### Option 1: Using Vercel CLI
```bash
npm install -g vercel
vercel login
vercel
```

### Option 2: Using Vercel Dashboard
1. Go to https://vercel.com and sign up/login
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - Framework Preset: `Other`
   - Root Directory: `./`
5. Click "Deploy"
6. After deployment, update `vercel.json` with your Render backend URL

## Update Configuration

1. Update `vercel.json`:
   - Replace `https://your-backend-url.onrender.com` with your actual Render URL

2. Update frontend API calls in `static/script.js`:
   - Change API base URL to your Render backend URL

3. Update Render environment variable:
   - Set `FRONTEND_URL` to your Vercel deployment URL

## Important Notes

- Render free tier may spin down after inactivity (cold starts)
- Update CORS settings if you encounter cross-origin issues
- Use PostgreSQL on Render for production (SQLite has limitations)
