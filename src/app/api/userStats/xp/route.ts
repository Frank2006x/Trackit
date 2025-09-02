import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import UserStats from "@/models/userStats.model";
import SessionModel from "@/models/session.model";

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const { xp } = await req.json();
    const token =
      req.cookies.get("authjs.session-token")?.value ||
      req.cookies.get("__Secure-authjs.session-token")?.value;

    const { userId } = await SessionModel.findOne({ sessionToken: token });

    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));

    const stats = await UserStats.findOneAndUpdate(
      { userId: userId },
      {
        $inc: { totalXp: xp },
        $push: { xpHistory: { date: startOfDay, xp: xp } },
      },
      { new: true, upsert: true }
    );

    return NextResponse.json(stats);
  } catch {
    return NextResponse.json({ error: "Failed to update XP" }, { status: 500 });
  }
}
