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
}));
