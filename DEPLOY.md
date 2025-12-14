# Deployment Guide - Render (Backend) + Vercel (Frontend)

## 🚀 Step-by-Step Deployment

---

## 📦 Part 1: Deploy Backend to Render

### Step 1: Create Render Account
1. Go to [https://render.com](https://render.com)
2. Sign up/Login with your GitHub account

### Step 2: Create New Web Service
1. Click **"New +"** button (top right)
2. Select **"Web Service"**
3. Connect your GitHub repository: `theaaryaas/-VectorShift`
4. Click **"Connect"**

### Step 3: Configure Backend Service
Fill in the following settings:

- **Name**: `vectorshift-backend` (or any name you prefer)
- **Environment**: `Python 3`
- **Region**: Choose closest to you
- **Branch**: `main`
- **Root Directory**: `backend`
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Step 4: Deploy
1. Scroll down and click **"Create Web Service"**
2. Render will automatically:
   - Install dependencies
   - Build your service
   - Deploy it

### Step 5: Get Your Backend URL
1. Wait for deployment to complete (2-3 minutes)
2. Once deployed, you'll see a URL like: `https://vectorshift-backend.onrender.com`
3. **Copy this URL** - you'll need it for the frontend!

### Step 6: Test Backend
1. Visit your backend URL: `https://your-backend-url.onrender.com`
2. You should see: `{"Ping": "Pong"}`
3. ✅ Backend is working!

---

## 🎨 Part 2: Deploy Frontend to Vercel

### Step 1: Create Vercel Account
1. Go to [https://vercel.com](https://vercel.com)
2. Sign up/Login with your GitHub account

### Step 2: Import Project
1. Click **"Add New Project"**
2. Find your repository: `theaaryaas/-VectorShift`
3. Click **"Import"**

### Step 3: Configure Frontend
In the project settings:

- **Framework Preset**: `Create React App` (auto-detected)
- **Root Directory**: Click "Edit" and set to `frontend`
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `build` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

### Step 4: Add Environment Variable
**IMPORTANT**: Add this before deploying!

1. Scroll down to **"Environment Variables"**
2. Click **"Add"**
3. Add:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: `https://your-backend-url.onrender.com` (use your Render URL from Step 5 above)
4. Click **"Save"**

### Step 5: Deploy
1. Click **"Deploy"** button
2. Wait for deployment (1-2 minutes)
3. Vercel will give you a URL like: `https://vectorshift.vercel.app`

### Step 6: Test Frontend
1. Visit your Vercel URL
2. Try creating a pipeline and clicking "Submit to Backend"
3. ✅ Everything should work!

---

## 🔄 Updating Deployments

### After Code Changes:
- **Render**: Automatically redeploys on git push to `main`
- **Vercel**: Automatically redeploys on git push to `main`

### To Update Environment Variables:
- **Render**: Settings → Environment → Add/Edit variables
- **Vercel**: Project Settings → Environment Variables → Edit

---

## ⚠️ Important Notes

1. **Free Tier Limitations**:
   - **Render**: Services spin down after 15 minutes of inactivity (first request will be slow)
   - **Vercel**: Generous free tier, no spin-down

2. **Backend URL**: Make sure to update `REACT_APP_API_URL` in Vercel with your Render backend URL

3. **CORS**: Backend already configured to allow all origins

4. **First Deploy**: Render free tier takes 2-3 minutes for first deployment

---

## 🆘 Troubleshooting

### Backend not responding?
- Check Render logs: Service → Logs
- Verify start command is correct
- Make sure `--host 0.0.0.0` is in start command

### Frontend can't connect to backend?
- Verify `REACT_APP_API_URL` is set correctly in Vercel
- Check backend URL is accessible (visit it in browser)
- Check browser console for CORS errors

### Build fails?
- Check build logs in Render/Vercel dashboard
- Verify all dependencies are in `package.json` and `requirements.txt`

---

## ✅ Quick Checklist

- [ ] Backend deployed on Render
- [ ] Backend URL copied
- [ ] Backend tested (shows `{"Ping": "Pong"}`)
- [ ] Frontend deployed on Vercel
- [ ] `REACT_APP_API_URL` set in Vercel
- [ ] Frontend tested (can submit to backend)

---

**Need help?** Check the logs in Render/Vercel dashboards for detailed error messages.

