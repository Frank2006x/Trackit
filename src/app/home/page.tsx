"use client";

import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Info, TrendingUp, X } from "lucide-react";
import Calendar04 from "@/components/calendar-04";
import { useHabits } from "@/store/useHabits";

import Habit from "@/store/useHabits";
import PomodoroTimer from "@/components/PomodoroTimer";
import { initUserStats } from "@/lib/action";

export default function PrivatePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [newHabit, setNewHabit] = useState({
    title: "",
    description: "",
    tags: [] as string[],
    isActive: true,
  });

  const {
    habits,
    isLoading,
    error,
    fetchHabits,
    createHabit,
    deleteHabit,
    completeHabit,
    uncompleteHabit,
  } = useHabits();

  useEffect(() => {
    initUserStats();
  }, []);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) router.push("/");
    if (habits.length === 0) {
      (async () => {
        await fetchHabits();
      })();
    }
  }, [session, status, habits.length, fetchHabits, router, selectedHabit]);

  const isCompletedToday = (habit: Habit) => {
    if (!habit.lastCompleted) return false;
    const today = new Date().toDateString();
    const lastCompleted = new Date(habit.lastCompleted).toDateString();
    return today === lastCompleted;
  };

  const handleCheckboxChange = async (habit: Habit, isChecked: boolean) => {
    if (isChecked) {
      await completeHabit(habit._id);
    } else {
      await uncompleteHabit(habit._id);
    }
  };

  const handleSubmitHabit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createHabit(newHabit);
    setNewHabit({
      title: "",
      description: "",
      tags: [],
      isActive: true,
    });
    setTagInput("");
    setShowAddForm(false);
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTagInput(value);
    const tagsArray = value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);
    setNewHabit({ ...newHabit, tags: tagsArray });
  };

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return null;

  return (
    <>
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full mx-4 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-foreground">
                Add New Habit
              </h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-muted-foreground hover:text-foreground transition-colors text-xl"
              >
                <X />
              </button>
            </div>

            <form onSubmit={handleSubmitHabit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={newHabit.title}
                  onChange={(e) =>
                    setNewHabit({ ...newHabit, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., Morning Exercise"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Description
                </label>
                <textarea
                  value={newHabit.description}
                  onChange={(e) =>
                    setNewHabit({ ...newHabit, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., 30 minutes of cardio workout"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={tagInput}
                  onChange={handleTagsChange}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., fitness, health, morning"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={newHabit.isActive}
                  onChange={(e) =>
                    setNewHabit({ ...newHabit, isActive: e.target.checked })
                  }
                  className="w-4 h-4 rounded border-border"
                />
                <label htmlFor="isActive" className="text-sm text-foreground">
                  Active habit
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-4 py-2 border border-border rounded-md text-foreground hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  Add Habit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedHabit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full mx-4 shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {selectedHabit?.title}
                </h2>
                {selectedHabit?.description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedHabit.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => setSelectedHabit(null)}
                className="text-muted-foreground hover:text-foreground transition-colors text-xl"
              >
                <X />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Current Streak:
                </span>
                <span className="text-sm font-medium">
                  {selectedHabit?.streak}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Max Streak:
                </span>
                <span className="text-sm font-medium">
                  {selectedHabit?.maxStreak}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Total Completions:
                </span>
                <span className="text-sm font-medium">
                  {selectedHabit?.completions.length}
                </span>
              </div>

              {selectedHabit?.lastCompleted && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Last Completed:
                  </span>
                  <span className="text-sm font-medium">
                    {new Date(selectedHabit.lastCompleted).toLocaleDateString()}
                  </span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Status:</span>
                <span
                  className={`text-sm font-medium ${
                    selectedHabit?.isActive ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {selectedHabit?.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Created:</span>
                <span className="text-sm font-medium">
                  {selectedHabit?.createdAt &&
                    new Date(selectedHabit.createdAt).toLocaleDateString()}
                </span>
              </div>

              {selectedHabit?.tags && selectedHabit.tags.length > 0 && (
                <div>
                  <span className="text-sm text-muted-foreground block mb-1">
                    Tags:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {selectedHabit.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-border">
              <button
                onClick={async () => {
                  if (
                    selectedHabit?._id &&
                    window.confirm(
                      "Are you sure you want to delete this habit?"
                    )
                  ) {
                    await deleteHabit(selectedHabit._id);
                    setSelectedHabit(null);
                  }
                }}
                className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Delete Habit
              </button>
            </div>
          </div>
        </div>
      )}
      <div>
        <nav className="bg-background shadow-sm border-b border-border px-8 py-4">
          <div className="flex justify-between items-center">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => redirect("/")}
            >
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
                <div className="flex items-center">
                  <h2 className="text-2xl font-bold text-foreground mr-30">
                    Habits & Progress
                  </h2>
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Add Task
                  </button>
                </div>

                {isLoading ? (
                  <div className="space-y-3">
                    {[...Array(4)].map((_, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 border border-border rounded-lg bg-card animate-pulse"
                      >
                        <div className="w-5 h-10 bg-muted rounded"></div>
                        <div className="flex-1 h-4 bg-muted rounded"></div>
                        <div className="w-16 h-4 bg-muted rounded"></div>
                      </div>
                    ))}
                  </div>
                ) : error ? (
                  <div className="text-red-500">Error: {error}</div>
                ) : (
                  <div className="space-y-3 overflow-y-auto h-[74vh] w-[30vw] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-green-400 dark:[&::-webkit-scrollbar-thumb]:bg-green-500 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-green-500 dark:hover:[&::-webkit-scrollbar-thumb]:bg-green-600">
                    {habits.map((habit) => (
                      <div
                        key={habit._id}
                        className=" border border-border rounded-lg bg-card p-3"
                      >
                        <div className="flex items-center gap-3 p-3">
                          <input
                            type="checkbox"
                            className="w-5 h-5 rounded border-border"
                            checked={isCompletedToday(habit)}
                            onChange={(e) =>
                              handleCheckboxChange(habit, e.target.checked)
                            }
                          />
                          <span
                            className={`flex-1 text-foreground ${
                              isCompletedToday(habit)
                                ? "line-through opacity-60"
                                : ""
                            }`}
                          >
                            {habit.title}
                          </span>

                          <span className="text-sm text-muted-foreground">
                            Streak: {habit.streak}
                          </span>
                          <button
                            className="text-muted-foreground hover:text-foreground transition-colors p-1"
                            onClick={() => setSelectedHabit(habit)}
                          >
                            <Info />
                          </button>
                        </div>
                        <div>
                          {habit.tags && habit.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {habit.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="bg-green-100 dark:bg-green-900 dark:text-white text-xs px-2 py-1 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
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
            <PomodoroTimer />
            <div className="w-[25%] flex justify-end">
              <Calendar04 />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
