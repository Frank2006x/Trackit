export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Habit from "@/models/habits.model";
import SessionModel from "@/models/session.model";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const token =
    req.cookies.get("authjs.session-token")?.value ||
    req.cookies.get("__Secure-authjs.session-token")?.value;

  const { userId } = await SessionModel.findOne({ sessionToken: token });
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const habit = await Habit.findOne({ _id: id, userId: userId });
  if (!habit) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const today = new Date().toISOString().split("T")[0];
  const last = habit.lastCompleted?.toISOString().split("T")[0];

  if (last === today)
    return NextResponse.json({ message: "Already completed" });

  habit.completions.push(new Date());
  habit.lastCompleted = new Date();

  if (
    last &&
    new Date(today).getTime() - new Date(last).getTime() === 86400000
  ) {
    habit.streak += 1;
  } else {
    habit.streak = 1;
  }

  habit.maxStreak = Math.max(habit.maxStreak, habit.streak);
  await habit.save();

  return NextResponse.json({
    message: "Habit completed",
    streak: habit.streak,
    maxStreak: habit.maxStreak,
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const token =
    req.cookies.get("authjs.session-token")?.value ||
    req.cookies.get("__Secure-authjs.session-token")?.value;

  const { userId } = await SessionModel.findOne({ sessionToken: token });
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const habit = await Habit.findOne({ _id: id, userId: userId });
  if (!habit) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const today = new Date().toISOString().split("T")[0];
  habit.completions = habit.completions.filter(
    (date: Date) => date.toISOString().split("T")[0] !== today
  );
  habit.lastCompleted = undefined;
  habit.streak = Math.max(0, habit.streak - 1);
  await habit.save();

  return NextResponse.json({
    message: "Completion removed",
    streak: habit.streak,
  });
}
