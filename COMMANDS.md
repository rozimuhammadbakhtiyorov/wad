# WAD - Quick Commands Reference

## 🚀 First Time Setup

```bash
# 1. Install all dependencies
npm install

# 2. Start Convex dev server (Terminal 1)
npx convex dev

# 3. Start Next.js dev server (Terminal 2 - new terminal)
npm run dev
```

## 🔄 Daily Development

```bash
# Terminal 1 - Convex
npx convex dev

# Terminal 2 - Next.js
npm run dev
```

## 📊 Convex Commands

```bash
# Open Convex dashboard in browser
npx convex dashboard

# View data in terminal
npx convex data

# Deploy to production
npx convex deploy

# Reset development deployment (careful!)
npx convex dev --clear

# View logs
npx convex logs
```

## 🏗️ Build Commands

```bash
# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint
```

## 🧹 Cleanup Commands

```bash
# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Next.js cache
rm -rf .next
npm run dev
```

## 🔍 Useful Checks

```bash
# Check Convex connection
npx convex dev --once

# View environment variables
cat .env.local
```

## 📱 Access Points

- **App:** http://localhost:3000
- **Convex Dashboard:** https://dashboard.convex.dev
- **Your Deployment:** https://polite-starling-323.convex.cloud

## ⚡ Pro Tips

1. Always run `npx convex dev` first before `npm run dev`
2. Keep both terminals open while developing
3. Changes to `convex/schema.ts` auto-sync with `npx convex dev`
4. Restart Next.js dev server if environment variables change
5. Check Convex dashboard to see your data in real-time

## 🆘 Quick Fixes

**App won't start?**
```bash
npm install
npx convex dev
# New terminal:
npm run dev
```

**Database not updating?**
```bash
# Make sure Convex dev is running
npx convex dev
```

**TypeScript errors?**
```bash
# Regenerate Convex types
npx convex dev --once
```

**Environment issues?**
```bash
# Verify .env.local exists and restart:
cat .env.local
# Kill dev server (Ctrl+C) and restart
npm run dev
```
