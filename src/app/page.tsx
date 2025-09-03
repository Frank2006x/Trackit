"use client";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import SignInButton from "../components/SignInButton";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
import WavesBackground from "@/components/Waves";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TrendingUp } from "lucide-react";

export default function Home() {
  const { data: session, status } = useSession();

  const handleProtectedNavigation = (href: string) => {
    if (status === "authenticated") {
      redirect("/home");
    } else {
      signIn("google", { callbackUrl: href });
    }
  };

  const features = [
    {
      title: "Smart Analytics",
      description:
        "Get insights into your progress with detailed charts and real-time XP tracking.",
    },
    {
      title: "Pomodoro Timer",
      description:
        "Stay focused with built-in Pomodoro timer and earn XP for every session completed.",
    },
    {
      title: "Habit Tracking",
      description:
        "Build lasting habits with our intuitive tracking system and gamified experience.",
    },
    {
      title: "Leaderboard",
      description:
        "Compete with others and see how you rank on the global leaderboard.",
    },
    {
      title: "XP System",
      description:
        "Earn experience points for completing habits and focus sessions.",
    },
  ];

  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "500K+", label: "Habits Tracked" },
    { value: "2M+", label: "Pomodoro Sessions" },
    { value: "98%", label: "Satisfaction Rate" },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 z-10">
        <WavesBackground
          lineColor="hsl(var(--background))"
          backgroundColor="rgba(34, 197, 94, 0.2)"
          waveSpeedX={0.02}
          waveSpeedY={0}
          waveAmpX={40}
          waveAmpY={20}
          friction={0}
          tension={0}
          maxCursorMove={0}
          xGap={12}
          yGap={36}
        />
      </div>

      <div className="relative z-10">
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex ml-3 gap-2 items-center">
              <span className="text-2xl font-bold ">TrackIt</span>
              <TrendingUp size={40} />
            </div>

            <div className="flex items-center gap-4">
              <AnimatedThemeToggler className="p-2 rounded-lg hover:bg-muted transition-colors" />
              <SignInButton />
            </div>
          </div>
        </header>

        <main>
          <section className="container flex flex-col gap-8 py-24 text-center">
            <div>
              <div className="mb-6 inline-flex items-center rounded-full border px-3 py-1 text-sm">
                Now with XP System & Pomodoro Timer
              </div>

              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Track Everything <br className="hidden sm:inline" />
                That Matters
              </h1>

              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-6">
                Stay organized and boost your productivity with our powerful
                tracking solution. Monitor your habits, earn XP, and achieve
                your goals with focus sessions.
              </p>
            </div>

            <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center">
              <button
                onClick={() => handleProtectedNavigation("/home")}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 py-2"
              >
                Get Started Free
              </button>
              <Link
                href="#features"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-11 px-8 py-2"
              >
                Learn More
              </Link>
            </div>
          </section>

          <section className="border-t border-border bg-muted/40 py-12">
            <div className="container">
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
                {stats.map((stat, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="features" className="container py-24">
            <div className="flex flex-col items-center text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Why Choose TrackIt?
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed mt-4">
                Everything you need to build better habits and achieve your
                goals
              </p>
            </div>

            <div className="px-8">
              <Carousel className="w-full max-w-4xl mx-auto">
                <CarouselContent>
                  {features.map((feature, index) => (
                    <CarouselItem
                      key={index}
                      className="md:basis-1/2 lg:basis-1/3"
                    >
                      <div className="p-1">
                        <div className="flex flex-col items-center text-center p-6 h-full border rounded-lg bg-card">
                          <h3 className="text-xl font-semibold mb-2">
                            {feature.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </section>

          <section className="border-t border-border bg-gradient-to-r from-primary/5 to-primary/10 py-24">
            <div className="container flex flex-col items-center text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Transform Your Productivity?
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed mt-4 mb-8">
                Join thousands of users who have already improved their habits
                and achieved their goals with TrackIt.
              </p>
              <button
                onClick={() => handleProtectedNavigation("/home")}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 py-2"
              >
                Start Your Journey
              </button>
            </div>
          </section>
        </main>

        <footer className="border-t border-border bg-muted/30 py-12">
          <div className="container flex flex-col items-center gap-4 text-center">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">TrackIt</span>
            </div>
            <p className="text-muted-foreground">
              Build better habits, one day at a time.
            </p>
            <p className="text-sm text-muted-foreground">
              &copy; 2025 TrackIt. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
