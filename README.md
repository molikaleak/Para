# Para | Warehouse Inventory Terminal

A premium, modern warehouse inventory management PWA built with React, TypeScript, and Vite.

## 🚀 Quick Start

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the mock API server:**
   ```bash
   npm run mock
   ```
   (Runs on http://localhost:3001)

3. **Start the Vite dev server:**
   ```bash
   npm run dev
   ```
   (Runs on http://localhost:5173)

## ☁️ Deployment (Railway + GitHub Actions)

This project is pre-configured for automated deployment to **Railway**.

### 1. Setup Railway
- Push your code to a GitHub repository.
- Connect your GitHub repo to a new [Railway](https://railway.app/) project.
- Ensure the service name in Railway matches `para` (or update `.github/workflows/deploy.yml`).

### 2. Configure GitHub Secrets
Go to your GitHub Repo **Settings > Secrets and variables > Actions** and add:
- `RAILWAY_TOKEN`: Your Railway API token (get it from Account Settings).
- `VITE_API_URL`: (Optional) The URL of your deployed mock/real API.

### 3. Environment Variables
In the **Railway Dashboard**, add the following variable to your service:
- `VITE_API_URL`: Your backend URL (e.g., `https://your-api.up.railway.app`).

## 🛠 Tech Stack
- **Frontend**: React 19, Vite, Tailwind CSS, Lucide React
- **State Management**: Zustand (with Persistence)
- **Data Fetching**: SWR
- **Backend (Mock)**: JSON Server
- **PWA**: Vite PWA Plugin

## 📦 Features
- **Smart Asset Search**: Real-time filtering by category and location.
- **Visual Terminal**: High-fidelity dark mode designed for industrial tablets.
- **Daily Insights**: System-generated operational logs (stored transiently for today).
- **Persistent Auth**: Local session management for fast terminal access.
