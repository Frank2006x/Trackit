import axios from "axios";
import { create } from "zustand";

interface Habit {
  _id: string;
  userId: string;
  title: string;
  description?: string;
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
}));
