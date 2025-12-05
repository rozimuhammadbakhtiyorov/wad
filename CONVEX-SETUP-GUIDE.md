# Convex Integration Guide for WAD

This guide will help you integrate Convex database into the WAD (We Are Developers) application.

## Prerequisites

Before starting, make sure you have:
- Node.js installed (v18 or higher)
- npm or yarn package manager
- A Convex account (sign up at https://convex.dev)

## Step 1: Install Convex

Open your terminal in the `wad` folder and run:

```bash
npm install convex
```

## Step 2: Initialize Convex

Initialize Convex in your project:

```bash
npx convex dev
```

This command will:
1. Prompt you to log in to your Convex account (or create one)
2. Create a new Convex project
3. Generate a `convex` folder in your project
4. Create `.env.local` file with your Convex deployment URL

## Step 3: Database Schema

I've created the schema files for you in the `convex` folder. The schema includes:

### Users Table
- `id`: User ID (auto-generated)
- `email`: User email (unique)
- `password`: Hashed password
- `fullName`: User's full name
- `image`: Profile image URL
- `codingField`: Primary coding field (e.g., Frontend, Backend)
- `experience`: Years of experience
- `linkedin`: LinkedIn profile URL
- `github`: GitHub profile URL
- `technologies`: Array of selected technologies
- `createdAt`: Account creation timestamp

## Step 4: Environment Variables

After running `npx convex dev`, you'll have a `.env.local` file with:

```
CONVEX_DEPLOYMENT=your-deployment-url
```

You'll also need to add:

```
NEXT_PUBLIC_CONVEX_URL=your-deployment-url
```

(Same value as CONVEX_DEPLOYMENT but prefixed with NEXT_PUBLIC_ so Next.js can access it)

## Step 5: Convex Provider Setup

I've created the ConvexProvider wrapper in `app/layout.tsx`. You'll need to wrap your application with it.

## What I Need From You

To complete the Convex integration, please provide:

1. **Your Convex Deployment URL**: After running `npx convex dev`, you'll get a deployment URL. Share this with me.

2. **Authentication Preference**: 
   - Do you want to use Convex built-in authentication?
   - Or implement custom authentication with password hashing?

3. **File Storage**: 
   - For profile images, should we use Convex file storage?
   - Or an external service like Cloudinary/AWS S3?

## Next Steps

Once you provide the above information, I will:
1. Configure the Convex client in your app
2. Create mutation functions for user registration
3. Create query functions for fetching developers
4. Implement authentication logic
5. Connect all forms to the database
6. Add real-time updates for the developers list

## Running the Development Server

After Convex is set up, you'll need to run both servers:

```bash
# Terminal 1 - Next.js dev server
npm run dev

# Terminal 2 - Convex dev server
npx convex dev
```

## Useful Convex Commands

- `npx convex dev` - Start Convex development server
- `npx convex dashboard` - Open Convex dashboard in browser
- `npx convex deploy` - Deploy to production
- `npx convex data` - View/edit data in CLI

## Additional Resources

- [Convex Documentation](https://docs.convex.dev)
- [Convex with Next.js](https://docs.convex.dev/quickstart/nextjs)
- [Convex Authentication](https://docs.convex.dev/auth)
