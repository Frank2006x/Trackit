"use client";

import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import { TrendingUp } from "lucide-react";
import Calendar04 from "@/components/calendar-04";
import { useHabits } from "@/store/useHabits";

export default function PrivatePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const habits = useHabits((state) => state.habits);
  const isLoading = useHabits((state) => state.isLoading);
  const error = useHabits((state) => state.error);
  const fetchHabits = useHabits((state) => state.fetchHabits);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) router.push("/");
    else fetchHabits();
    console.log(habits);
  }, [session, status, fetchHabits, router]);

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return null;

  return (
    <div>
      <nav className="bg-background shadow-sm border-b border-border px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-foreground">TrackIt</h1>
            <TrendingUp size={40} />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-foreground">
              {session.user?.name}
            </span>
            <div className="rounded-full overflow-hidden">
              <Image
                src={session.user?.image || "/default-avatar.png"}
                width={40}
                height={40}
                alt="User profile"
              />
            </div>
            <AnimatedThemeToggler />
          </div>
        </div>
      </nav>

      <div className="p-8">
        <div className="flex gap-8">
          <div className="flex-1 w-[70%]">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">
                  Habits & Progress
                </h2>
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                  Add Task
                </button>
              </div>

              {isLoading ? (
                <div>Loading habits...</div>
              ) : error ? (
                <div className="text-red-500">Error: {error}</div>
              ) : (
                <div className="space-y-3">
                  {habits.map((habit) => (
                    <div
                      key={habit._id}
                      className="flex items-center gap-3 p-3 border border-border rounded-lg bg-card"
                    >
                      <input
                        type="checkbox"
                        className="w-5 h-5 rounded border-border"
                        defaultChecked={habit.streak > 0}
                      />
                      <span className="flex-1 text-foreground">
                        {habit.title}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Streak: {habit.streak}
                      </span>
                    </div>
                  ))}
                  {habits.length === 0 && (
                    <div className="text-muted-foreground text-center py-8">
                      No habits found. Click Add Task to create your first
                      habit.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="w-[30%] flex justify-end">
            <Calendar04 />
          </div>
        </div>
      </div>
    </div>
  );
}
