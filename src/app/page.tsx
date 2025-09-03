import SignInButton from "../components/SignInButton";
import Link from "next/link";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";

const TrendingIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-primary"
  >
    <path
      d="M4 20L12 12L18 18L28 8"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 8H28V16"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AnalyticsIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="4" y="18" width="5" height="10" rx="1" fill="currentColor" />
    <rect x="13" y="12" width="5" height="16" rx="1" fill="currentColor" />
    <rect x="22" y="6" width="5" height="22" rx="1" fill="currentColor" />
  </svg>
);

const TimerIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="18" r="12" stroke="currentColor" strokeWidth="2" />
    <path
      d="M16 10V18L22 22"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M12 6L20 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const TargetIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2" />
    <circle cx="16" cy="16" r="8" stroke="currentColor" strokeWidth="2" />
    <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="2" />
    <circle cx="16" cy="16" r="1" fill="currentColor" />
  </svg>
);

const UsersIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
    <path
      d="M3 21V19C3 16.7909 4.79086 15 7 15H11C13.2091 15 15 16.7909 15 19V21"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle cx="17" cy="7" r="3" stroke="currentColor" strokeWidth="2" />
    <path
      d="M21 21V19C21 17.3431 19.6569 16 18 16H17"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

const StarIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
      fill="currentColor"
    />
  </svg>
);

const ArrowIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 10L16 10M16 10L10 4M16 10L10 16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative">
      <div className="relative z-10">
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <nav className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <TrendingIcon />
                <span className="text-2xl font-bold text-foreground">
                  TrackIt
                </span>
              </div>
              <div className="flex items-center gap-4">
                <AnimatedThemeToggler className="p-2 rounded-lg hover:bg-muted transition-colors" />
                <SignInButton />
              </div>
            </nav>
          </div>
        </header>

        <main className="container mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                Now with XP System & Pomodoro Timer
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Track Everything That Matters
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Stay organized and boost your productivity with our powerful
              tracking solution. Monitor your habits, earn XP, and achieve your
              goals with focus sessions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                href="/home"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg"
              >
                Get Started Free
              </Link>
              <Link
                href="#features"
                className="border border-border hover:bg-muted text-foreground font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>

          <section id="features" className="mt-20">
            <h2 className="text-3xl font-bold text-center text-foreground mb-4">
              Why Choose TrackIt?
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Everything you need to build better habits and achieve your goals
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-20">
              <div className="text-center p-8 bg-card rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <div className="text-primary">
                    <AnalyticsIcon />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Smart Analytics
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Get insights into your progress with detailed charts and
                  real-time XP tracking.
                </p>
              </div>

              <div className="text-center p-8 bg-card rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <div className="text-green-600">
                    <TimerIcon />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Pomodoro Timer
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Stay focused with built-in Pomodoro timer and earn XP for
                  every session completed.
                </p>
              </div>

              <div className="text-center p-8 bg-card rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-purple-500/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <div className="text-purple-600">
                    <TargetIcon />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Habit Tracking
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Build lasting habits with our intuitive tracking system and
                  gamified experience.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card p-8 rounded-xl border border-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <div className="text-primary">
                      <UsersIcon />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Leaderboard
                  </h3>
                </div>
                <p className="text-muted-foreground">
                  Compete with others and see how you rank on the global
                  leaderboard. Motivation through friendly competition.
                </p>
              </div>

              <div className="bg-card p-8 rounded-xl border border-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <div className="text-primary">
                      <StarIcon />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    XP System
                  </h3>
                </div>
                <p className="text-muted-foreground">
                  Earn experience points for completing habits and focus
                  sessions. Track your daily progress and maintain streaks.
                </p>
              </div>
            </div>
          </section>

          <section className="text-center py-20 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl border border-border mt-20">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Transform Your Productivity?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users who have already improved their habits and
              achieved their goals with TrackIt.
            </p>
            <Link
              href="/home"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 px-8 rounded-lg transition-colors shadow-lg"
            >
              Start Your Journey
              <ArrowIcon />
            </Link>
          </section>
        </main>

        <footer className="bg-muted/30 py-12 mt-20 border-t border-border">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <TrendingIcon />
                <span className="text-xl font-bold text-foreground">
                  TrackIt
                </span>
              </div>
              <p className="text-muted-foreground mb-6">
                Build better habits, one day at a time.
              </p>
              <p className="text-sm text-muted-foreground">
                &copy; 2025 TrackIt. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
