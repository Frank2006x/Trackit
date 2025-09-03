export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import Habit from "@/models/habits.model";
import SessionModel from "@/models/session.model";
import connectDB from "@/lib/mongoose";
export async function GET(req: NextRequest) {
  await connectDB();
  const token =
    req.cookies.get("authjs.session-token")?.value ||
    req.cookies.get("__Secure-authjs.session-token")?.value;

  const { userId } = await SessionModel.findOne({ sessionToken: token });
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const habits = await Habit.find({ userId });
  return NextResponse.json({ habits: habits }, { status: 200 });
}

export async function POST(req: NextRequest) {
  await connectDB();
  const token =
    req.cookies.get("authjs.session-token")?.value ||
    req.cookies.get("__Secure-authjs.session-token")?.value;
  
  const { userId } = await SessionModel.findOne({ sessionToken: token });
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const habit = await Habit.create({ ...body, userId: userId });
  return NextResponse.json(
    { message: "Habit created", habit },
    { status: 201 }
  );
}
