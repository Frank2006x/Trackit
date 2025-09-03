import axios from "axios";
import { create } from "zustand";

export default interface Habit {
  _id: string;
  userId: string;
  title: string;
  description?: string;
  tags: string[];
  lastCompleted?: Date;
  completions: Date[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  // streak and maxStreak removed
}

interface HabitsState {
  habits: Habit[];
  isLoading: boolean;
  error: boolean;
  fetchHabits: () => Promise<void>;
  createHabit: (
    habit: Omit<
      Habit,
      | "_id"
      | "userId"
      | "createdAt"
      | "updatedAt"
      | "streak"
      | "maxStreak"
      | "completions"
      | "lastCompleted"
    >
  ) => Promise<void>;
  deleteHabit: (id: string) => Promise<void>;
  completeHabit: (id: string) => Promise<void>;
  uncompleteHabit: (id: string) => Promise<void>;
}

export const useHabits = create<HabitsState>((set) => ({
  habits: [],
  isLoading: false,
  error: false,

  fetchHabits: async () => {
    set({ isLoading: true, error: false });

    try {
      const response = await axios.get("/api/habits");
      const { habits } = response.data;
      set({ habits, isLoading: false });
    } catch {
      set({
        error: true,
        isLoading: false,
      });
    }
  },

  createHabit: async (habitData) => {
    set({ isLoading: true, error: false });

    try {
      const response = await axios.post("/api/habits", habitData);
      const newHabit = response.data.habit;

      set((state) => ({
        habits: [...state.habits, newHabit],
        isLoading: false,
      }));
    } catch {
      set({
        error: true,
        isLoading: false,
      });
    }
  },
  deleteHabit: async (id: string) => {
    set({ isLoading: true, error: false });

    try {
      await axios.delete(`/api/habits/${id}`);
      axios.post("/api/userStats/xp", { xp: -10 });
      set((state) => ({
        habits: state.habits.filter((habit) => habit._id !== id),
        isLoading: false,
      }));
    } catch {
      set({
        error: true,
        isLoading: false,
      });
    }
  },

  completeHabit: async (id: string) => {
    try {
      const response = await axios.post(`/api/habits/complete/${id}`);
      axios.post("/api/userStats/xp", { xp: 10 });

      set((state) => ({
        habits: state.habits.map((habit) =>
          habit._id === id
            ? {
                ...habit,
                lastCompleted: new Date(),
                completions: [...habit.completions, new Date()],
              }
            : habit
        ),
      }));
    } catch {
      set({ error: true });
    }
  },

  uncompleteHabit: async (id: string) => {
    try {
      const response = await axios.delete(`/api/habits/complete/${id}`);
      axios.post("/api/userStats/xp", { xp: -10 });

      set((state) => {
        const habit = state.habits.find((h) => h._id === id);
        if (!habit) return state;

        const newCompletions = habit.completions.filter(
          (date) => new Date(date).toDateString() !== new Date().toDateString()
        );

        const lastCompleted =
          newCompletions.length > 0
            ? newCompletions[newCompletions.length - 1]
            : undefined;
        return {
          habits: state.habits.map((h) =>
            h._id === id
              ? {
                  ...h,
                  lastCompleted,
                  completions: newCompletions,
                }
              : h
          ),
        };
      });
    } catch {
      set({ error: true });
    }
  },
}));
