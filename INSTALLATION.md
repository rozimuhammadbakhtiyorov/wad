# WAD Installation & Setup Guide

## 🚀 Complete Setup Instructions

### Step 1: Install Dependencies

Open your terminal in the `wad` folder and run:

```bash
npm install
```

This will install:
- ✅ Next.js 16.0.7
- ✅ React 19.2.0
- ✅ Convex 1.16.3
- ✅ TypeScript 5
- ✅ Tailwind CSS 4
- ✅ All other dependencies

### Step 2: Verify Environment Variables

The `.env.local` file has been created with:

```env
CONVEX_DEPLOYMENT=dev:polite-starling-323
NEXT_PUBLIC_CONVEX_URL=https://polite-starling-323.convex.cloud
```

✅ **Your Convex URL is configured!**

### Step 3: Push Convex Schema

After dependencies are installed, push your database schema to Convex:

```bash
npx convex dev
```

This will:
1. Connect to your Convex deployment
2. Push the schema (users table)
3. Generate TypeScript types
4. Start the Convex dev server

**Keep this terminal open** - Convex dev server needs to run alongside your Next.js server.

### Step 4: Start Next.js Development Server

Open a **new terminal** and run:

```bash
npm run dev
```

Your app will be available at: http://localhost:3000

## 🎯 Running the Application

You need **TWO terminals**:

### Terminal 1 - Convex Dev Server
```bash
npx convex dev
```
Keep this running for database sync

### Terminal 2 - Next.js Dev Server
```bash
npm run dev
```
Your web app runs here

## ✅ What's Been Configured

### 1. Package Dependencies
- ✅ Convex added to package.json
- ✅ All dependencies listed

### 2. Environment Variables
- ✅ `.env.local` created with your Convex URL
- ✅ `NEXT_PUBLIC_CONVEX_URL` set for client access
- ✅ `CONVEX_DEPLOYMENT` set for CLI

### 3. Convex Integration
- ✅ `convex.json` - Convex configuration
- ✅ `convex/schema.ts` - Database schema (users table)
- ✅ `convex/users.ts` - Queries and mutations
- ✅ `lib/convex.ts` - Convex client configuration
- ✅ `app/layout.tsx` - ConvexProvider wrapper

### 4. Database Schema
```typescript
users table:
- email (string, indexed)
- password (string)
- fullName (string)
- image (optional string)
- codingField (string)
- experience (string)
- linkedin (string)
- github (string)
- technologies (array of strings)
- createdAt (number)
```

### 5. Available Functions

**Mutations (Write to DB):**
- `registerUser` - Create new user account
- `updateUser` - Update user profile
- `deleteUser` - Delete user account

**Queries (Read from DB):**
- `getUserByEmail` - Find user by email (for login)
- `getUserById` - Get user profile by ID
- `getAllDevelopers` - Get all developers for directory

## 🔧 Troubleshooting

### Error: "Cannot find module 'convex/react'"
**Solution:** Run `npm install` first

### Error: "NEXT_PUBLIC_CONVEX_URL is not defined"
**Solution:** Make sure `.env.local` exists and restart the dev server

### Convex Schema Not Syncing
**Solution:** Make sure `npx convex dev` is running

### Can't Connect to Convex
**Solution:** Check that your URL is correct in `.env.local`

## 📋 Next Steps

Once both servers are running:

1. ✅ Test the landing page at http://localhost:3000
2. ✅ Try registration flow
3. ✅ Data will now save to Convex database
4. ✅ Check Convex dashboard to see your data

## 🌐 Convex Dashboard

View your data at: https://dashboard.convex.dev

Or run:
```bash
npx convex dashboard
```

## 📦 File Structure

```
wad/
├── .env.local                 ✅ Environment variables
├── .gitignore                 ✅ Git ignore (includes .env)
├── convex.json                ✅ Convex config
├── package.json               ✅ Updated with Convex
├── convex/
│   ├── schema.ts             ✅ Database schema
│   ├── users.ts              ✅ Database functions
│   └── tsconfig.json         ✅ Convex TypeScript config
├── lib/
│   └── convex.ts             ✅ Convex client
└── app/
    ├── layout.tsx            ✅ With ConvexProvider
    └── [all your pages]      ✅ Ready to use Convex
```

## 🎉 You're Ready!

Everything is configured. Just run:

```bash
# Install dependencies (if not done)
npm install

# Terminal 1
npx convex dev

# Terminal 2 (new terminal)
npm run dev
```

Your fully functional WAD app with database is ready! 🚀
