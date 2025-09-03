# Trackit - Productivity & Habit Tracker

**GDC Interview Assignment - Full Stack Web Application**

A modern, feature-rich productivity and habit tracking application built with Next.js 15, showcasing advanced full-stack development skills including authentication, real-time data management, and responsive design.

## 🎯 Project Overview

Trackit is a comprehensive productivity platform that combines habit tracking, Pomodoro timer functionality, and user progress analytics. The application demonstrates proficiency in modern web development technologies and best practices.

### 🌟 Key Features

- **🔐 Authentication System**: Google OAuth integration with NextAuth.js
- **📅 Habit Tracking**: Create, manage, and track daily habits with XP rewards
- **⏱️ Pomodoro Timer**: Focus sessions with customizable timer and break intervals
- **📊 Analytics Dashboard**: Visual progress tracking with charts and statistics
- **🎨 Modern UI/UX**: Responsive design with dark/light theme support


## 🛠️ Technology Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **Shadcn/ui** - Modern component library
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons
- **Recharts** - Data visualization

### Backend & Database

- **Next.js API Routes** - Serverless backend
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **NextAuth.js 5** - Authentication solution

### Development Tools

- **ESLint** - Code linting
- **Zustand** - State management

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database (local or cloud)
- Google OAuth credentials

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Frank2006x/Trackit.git
   cd Trackit
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:

   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string

   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret

   # Google OAuth
   AUTH_GOOGLE_ID=your_google_client_id
   AUTH_GOOGLE_SECRET=your_google_client_secret
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   └── habits/        # Habit management APIs
│   ├── home/              # Dashboard page
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # Shadcn UI components
│   └── magicui/          # Custom animated components
├── lib/                  # Utility libraries
├── models/               # Database schemas
└── store/                # Zustand state management
```

## 🎮 Core Functionality

### Habit Management

- Create custom habits with categories
- Mark habits as complete/incomplete
- Earn XP points for consistency
- Track streaks and completion rates

### Pomodoro Timer

- 25-minute focus sessions
- 5-minute break intervals
- XP rewards for completed sessions
- Integration with habit tracking

### User Dashboard

- Personal statistics and progress
- Visual charts and analytics
- Profile management
- Theme customization

## 🔧 API Endpoints

| Method   | Endpoint                    | Description             |
| -------- | --------------------------- | ----------------------- |
| `GET`    | `/api/habits`               | Fetch user habits       |
| `POST`   | `/api/habits`               | Create new habit        |
| `PUT`    | `/api/habits/[id]`          | Update habit            |
| `DELETE` | `/api/habits/[id]`          | Delete habit            |
| `POST`   | `/api/habits/complete/[id]` | Mark habit as complete  |
| `POST`   | `/api/auth/[...nextauth]`   | Authentication handlers |

## 🎨 Design Features

- **Aurora Background**: Animated gradient backgrounds
- **Responsive Design**: Mobile-first approach
- **Dark/Light Mode**: System preference detection
- **Micro-interactions**: Smooth hover and click animations
- **Loading States**: Skeleton loaders and spinners

## 📈 Performance Optimizations

- **Turbopack**: Next.js 15 bundler for faster builds
- **Server Components**: Optimized rendering strategy
- **Image Optimization**: Next.js built-in optimization
- **Code Splitting**: Automatic route-based splitting
- **Database Indexing**: Optimized MongoDB queries


## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy with automatic builds

### Manual Deployment

```bash
npm run build
npm start
```


## 👨‍💻 Developer Information

**Created by**: Frank2006x  
**Purpose**: GDC Interview Technical Assignment  
**Timeline**: Developed as a showcase of full-stack development capabilities  
**Focus Areas**: Modern React patterns, database design, authentication, and user experience

## 📄 License

This project is created for interview purposes and educational use.

---

**Note**: This application demonstrates proficiency in modern web development technologies and is designed to showcase full-stack development capabilities including authentication, database management, API design, and modern frontend practices.
