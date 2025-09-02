import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import UserStats from "@/models/userStats.model";
import SessionModel from "@/models/session.model";

export async function POST(req: NextRequest) {
  console.log("Received POST request to create user stats");
  await connectDB();
  try {
    const token =
      req.cookies.get("authjs.session-token")?.value ||
      req.cookies.get("__Secure-authjs.session-token")?.value;

    const { userId } = await SessionModel.findOne({ sessionToken: token });

    const existing = await UserStats.findOne({ userId });
    if (existing) {
      return NextResponse.json(
        { message: "User stats already exist" },
        { status: 400 }
      );
    }

    const stats = new UserStats({ userId });
    await stats.save();

    return NextResponse.json(stats, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create user stats" },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectDB();
  try {
    const stats = await UserStats.find();
    return NextResponse.json(stats);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
