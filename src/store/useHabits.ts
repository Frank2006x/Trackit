import axios from "axios";
import { create } from "zustand";

export default interface Habit {
  _id: string;
  userId: string;
  title: string;
  description?: string;
  tags: string[];
  streak: number;
  maxStreak: number;
  lastCompleted?: Date;
  completions: Date[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
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
      console.log(id);
      const response = await axios.post(`/api/habits/complete/${id}`);
      const { streak, maxStreak } = response.data;
      axios.post("/api/userStats/xp", { xp: 10 });

      set((state) => ({
        habits: state.habits.map((habit) =>
          habit._id === id
            ? {
                ...habit,
                streak,
                maxStreak,
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
      const { streak } = response.data;

      set((state) => ({
        habits: state.habits.map((habit) =>
          habit._id === id
            ? {
                ...habit,
                streak,
                lastCompleted: undefined,
                completions: habit.completions.filter(
                  (date) =>
                    new Date(date).toDateString() !== new Date().toDateString()
                ),
              }
            : habit
        ),
      }));
    } catch {
      set({ error: true });
    }
  },
}));
