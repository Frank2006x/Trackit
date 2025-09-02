import mongoose, { Schema, Document } from "mongoose";

export interface IHabit extends Document {
  userId: string;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  streak: number;
  maxStreak: number;
  lastCompleted?: Date;
  completions: Date[];
  isActive: boolean;
}

const HabitSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    description: { type: String },
    streak: { type: Number, default: 0 },
    maxStreak: { type: Number, default: 0 },
    lastCompleted: { type: Date },
    completions: [{ type: Date }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Habit ||
  mongoose.model<IHabit>("Habit", HabitSchema);
