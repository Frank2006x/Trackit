import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  image: string;
  emailVerified: Date | null;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    emailVerified: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models.User || model<IUser>("User", userSchema);
