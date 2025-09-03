import SignInButton from "../components/SignInButton";
import Link from "next/link";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
import { Aurora } from "@/components/magicui/aurora";
import {
  TrendingUp,
  BarChart3,
  Clock,
  Target,
  Users,
  Star,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative">
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
        className="z-10"
      />
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <nav className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <TrendingUp size={32} className="text-primary" />
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

          {/* Features Section */}
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
                  <BarChart3 className="w-8 h-8 text-primary" />
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
                  <Clock className="w-8 h-8 text-green-600" />
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
                  <Target className="w-8 h-8 text-purple-600" />
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

            {/* Additional Features */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card p-8 rounded-xl border border-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
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
                    <Star className="w-6 h-6 text-primary" />
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

          {/* CTA Section */}
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
              <TrendingUp size={20} />
            </Link>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-muted/30 py-12 mt-20 border-t border-border">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <TrendingUp size={24} className="text-primary" />
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
