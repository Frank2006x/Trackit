import mongoose, { Schema, Document } from "mongoose";

export interface IUserStats extends Document {
  userId: string;
  onlineDays: Date[];
  activeDays: number;
  totalXp: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserStatsSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    onlineDays: [{ type: Date, required: true }],
    activeDays: { type: Number, required: true, default: 0 },
    totalXp: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.UserStats ||
  mongoose.model<IUserStats>("UserStats", UserStatsSchema);
