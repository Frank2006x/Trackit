import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import UserStats from "@/models/userStats.model";
import SessionModel from "@/models/session.model";

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const token =
      req.cookies.get("authjs.session-token")?.value ||
      req.cookies.get("__Secure-authjs.session-token")?.value;

    const { userId } = await SessionModel.findOne({ sessionToken: token });

    let stats = await UserStats.findOne({ userId: userId });

    if (!stats) {
      stats = new UserStats({
        userId: userId,
        onlineDays: [startOfDay],
        activeDays: 1,
      });
    } else {
      const already = stats.onlineDays.some(
        (d: string | number | Date) => new Date(d).toDateString() === startOfDay.toDateString()
      );
      if (!already) {
        stats.onlineDays.push(startOfDay);
        stats.activeDays += 1;
      }
    }

    await stats.save();
    return NextResponse.json(stats);
  } catch {
    return NextResponse.json(
      { error: "Failed to add online day" },
      { status: 500 }
    );
  }
}
