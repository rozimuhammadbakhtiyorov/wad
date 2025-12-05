# Vercel Deployment Guide for WAD

## 🚀 How to Deploy Your App to Vercel

Your app uses Convex as a hosted backend, so you don't need to run Convex on your PC in production. Here's the complete deployment process:

## Step 1: Deploy Convex to Production

First, deploy your Convex functions to production:

```bash
npx convex deploy
```

This will:
- Deploy your schema and functions to Convex's cloud
- Give you a production URL (you already have: https://polite-starling-323.convex.cloud)
- Your Convex backend is now live 24/7!

## Step 2: Set Up Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add these variables:

### Required Environment Variables:

| Variable Name | Value |
|--------------|-------|
| `NEXT_PUBLIC_CONVEX_URL` | `https://polite-starling-323.convex.cloud` |
| `CONVEX_DEPLOYMENT` | `prod:polite-starling-323` |

**Important:** 
- `NEXT_PUBLIC_CONVEX_URL` - Used by the client-side Convex React hooks
- `CONVEX_DEPLOYMENT` - Used during the build process to generate types

## Step 3: Push Your Code to Git

If you haven't already:

```bash
git init
git add .
git commit -m "Initial commit - WAD application"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

## Step 4: Deploy to Vercel

### Option A: Via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Vercel will auto-detect Next.js
5. **Important:** Verify the environment variables are set (Step 2)
6. Click **"Deploy"**

### Option B: Via Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

## Step 5: How the Build Works

When Vercel builds your app, it runs:

```bash
npm run build
```

Which now executes:
```bash
npx convex deploy --cmd 'npm run build:next'
```

This:
1. Deploys your Convex functions
2. Generates TypeScript types from your schema
3. Builds your Next.js app with the generated types
4. Everything is ready for production!

## 🎯 Development vs Production

### Local Development (Your PC)
```bash
# Terminal 1 - Convex dev server
npx convex dev

# Terminal 2 - Next.js dev server
npm run dev
```

### Production (Vercel)
- **Convex:** Runs automatically in the cloud (no action needed)
- **Next.js:** Deployed on Vercel's edge network
- Users connect directly to Convex cloud backend
- No servers to manage!

## ✅ After Deployment

Once deployed, your app will:
- ✅ Be live at your Vercel URL (e.g., `wad.vercel.app`)
- ✅ Connect to Convex cloud backend automatically
- ✅ Handle real-time database updates
- ✅ Scale automatically with traffic

## 🔧 Making Updates

When you make changes:

1. **Update code locally:**
   ```bash
   git add .
   git commit -m "Your update message"
   git push
   ```

2. **Vercel automatically:**
   - Detects the push
   - Runs the build
   - Deploys the update
   - Your app is live with changes!

## 🌐 Environment URLs

You'll have different URLs for different stages:

| Stage | Convex URL | Next.js URL |
|-------|-----------|-------------|
| Development | https://polite-starling-323.convex.cloud (dev mode) | http://localhost:3000 |
| Production | https://polite-starling-323.convex.cloud | https://wad.vercel.app (your domain) |

## 📊 Monitoring Your Deployment

### Convex Dashboard
- View your data: https://dashboard.convex.dev
- Monitor function calls
- Check logs and errors
- Manage your deployment

### Vercel Dashboard
- View deployment status
- Check build logs
- Monitor performance
- Set up custom domains

## 🔐 Security Checklist Before Going Live

- [ ] Add password hashing (bcrypt)
- [ ] Implement proper authentication (Convex Auth)
- [ ] Set up CORS if needed
- [ ] Add rate limiting
- [ ] Review environment variables
- [ ] Test all features on production URL
- [ ] Set up monitoring/alerts

## 🆘 Troubleshooting

### Build Fails on Vercel

**Error:** `Can't resolve '@/convex/_generated/api'`

**Solution:** Make sure `CONVEX_DEPLOYMENT` environment variable is set in Vercel.

### Database Not Connecting

**Error:** Users can't register/login

**Solution:** 
1. Check `NEXT_PUBLIC_CONVEX_URL` is set correctly
2. Verify Convex functions are deployed: `npx convex deploy`
3. Check Convex dashboard for errors

### Environment Variables Not Working

**Solution:**
1. Make sure variables start with `NEXT_PUBLIC_` for client-side access
2. Redeploy after adding environment variables
3. Clear Vercel cache: Settings → Redeploy

## 📱 Custom Domain (Optional)

To use your own domain:

1. Go to Vercel project settings
2. Navigate to **Domains**
3. Add your domain
4. Follow DNS configuration instructions
5. Wait for DNS to propagate (usually a few minutes)

## 🎉 You're Done!

Your WAD application is now:
- ✅ Deployed to Vercel
- ✅ Connected to Convex cloud backend
- ✅ Accessible worldwide
- ✅ Automatically scaling
- ✅ No servers to manage!

**Share your app:** `https://your-project.vercel.app`

---

Need help? Check:
- [Vercel Docs](https://vercel.com/docs)
- [Convex Docs](https://docs.convex.dev)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
