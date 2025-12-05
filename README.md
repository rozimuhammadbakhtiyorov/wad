# WAD - We Are Developers

A developer networking platform that helps developers connect with each other and build teams.

## 🚀 Features

- **Beautiful Landing Page**: Eye-catching introduction with network visualization
- **Multi-Step Registration**: 
  - Step 1: Basic info (profile image, name, coding field, experience, social links, credentials)
  - Step 2: Technology stack selection with 100+ technologies across multiple categories
- **Developer Directory**: Browse all registered developers with search and filter functionality
- **User Profiles**: View developer profiles with their tech stack, experience, and social links
- **Authentication**: Complete login/logout functionality
- **Responsive Design**: Mobile-first design that works on all devices

## 📋 Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Hooks** - State management

### Backend (Ready for Integration)
- **Convex** - Real-time database (setup ready, see CONVEX-SETUP-GUIDE.md)

## 🏗️ Project Structure

```
wad/
├── app/
│   ├── page.tsx              # Landing page
│   ├── register/
│   │   ├── page.tsx          # Registration Step 1
│   │   └── step-2/
│   │       └── page.tsx      # Registration Step 2 (Technologies)
│   ├── login/
│   │   └── page.tsx          # Login page
│   ├── developers/
│   │   └── page.tsx          # Developer directory
│   ├── profile/
│   │   └── page.tsx          # User profile page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── convex/
│   ├── schema.ts             # Database schema
│   ├── users.ts              # User queries and mutations
│   └── tsconfig.json         # Convex TypeScript config
├── lib/
│   └── convex.ts             # Convex client config
└── CONVEX-SETUP-GUIDE.md     # Step-by-step Convex integration guide
```

## 🎨 Pages Overview

### 1. Landing Page (`/`)
- WAD branding and tagline
- Network visualization
- Call-to-action buttons
- Links to login/register

### 2. Registration - Step 1 (`/register`)
- Profile image upload with preview
- Full name input
- Coding field (Frontend, Backend, etc.)
- Years of experience
- LinkedIn profile URL
- GitHub profile URL
- Email and password
- Progress indicator (3 steps)

### 3. Registration - Step 2 (`/register/step-2`)
- Technology selection across categories:
  - Web Development (25+ technologies)
  - Mobile Development (8+ technologies)
  - DevOps (16+ technologies)
  - Data Science (15+ technologies)
  - Cybersecurity (10+ technologies)
- Search functionality
- Custom technology addition
- Collapsible categories
- Selected count badges

### 4. Developers Directory (`/developers`)
- List of all developers
- Search by name, skill, or technology
- Filter by role (iOS Developer, Backend Engineer, etc.)
- Click to view profiles
- Navigation to settings

### 5. Profile Page (`/profile`)
- Profile image display
- Name and role
- Social links (LinkedIn, GitHub)
- Experience and email
- Technology stack display
- Log out button
- Delete account button

### 6. Login Page (`/login`)
- Email and password inputs
- Password visibility toggle
- Link to registration

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project:**
   ```bash
   cd d:\UNICORNS\wad
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Database Integration

The app is ready for Convex database integration. Follow these steps:

1. **Read the setup guide:**
   See `CONVEX-SETUP-GUIDE.md` for detailed instructions

2. **Install Convex:**
   ```bash
   npm install convex
   ```

3. **Initialize Convex:**
   ```bash
   npx convex dev
   ```

4. **What you need to provide:**
   - Convex deployment URL (generated after running `npx convex dev`)
   - Authentication preference (built-in vs custom)
   - File storage preference (Convex storage vs external)

## 🔐 Authentication

Currently using localStorage for demo purposes. After Convex integration:
- Secure password hashing
- Session management
- Protected routes
- Real-time data sync

## 🎯 Available Technologies

The platform includes 100+ technologies across:
- **Web Development**: React, Vue.js, Angular, Next.js, Node.js, Django, Spring Boot, etc.
- **Mobile**: Swift, Kotlin, Flutter, React Native, etc.
- **DevOps**: Docker, Kubernetes, AWS, Azure, Jenkins, etc.
- **Data Science**: Python, TensorFlow, PyTorch, Pandas, etc.
- **Cybersecurity**: Kali Linux, Wireshark, Metasploit, etc.

## 🎨 Design Features

- Dark theme with navy background (#1a202c)
- Blue accent color (#3B82F6)
- Smooth transitions and hover effects
- Mobile-responsive layout
- Custom SVG icons
- Progress indicators
- Interactive checkboxes
- Search and filter UI
- Tag-based technology display

## 📝 Next Steps

Once you provide the Convex configuration:
1. ✅ All forms will connect to the database
2. ✅ Real user authentication will be implemented
3. ✅ Developer directory will show real data
4. ✅ Profiles will be editable
5. ✅ Real-time updates for new developers

## 🤝 Contributing

To extend the app:
1. Add new pages in `app/` directory
2. Create new Convex functions in `convex/` directory
3. Update schema in `convex/schema.ts`
4. Add new components as needed

## 📄 License

This project is part of the UNICORNS workspace.

## 🆘 Support

For Convex integration help, see:
- `CONVEX-SETUP-GUIDE.md` in this directory
- [Convex Documentation](https://docs.convex.dev)
- [Next.js Documentation](https://nextjs.org/docs)
