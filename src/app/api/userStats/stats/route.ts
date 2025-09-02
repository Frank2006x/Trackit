import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import UserStats from "@/models/userStats.model";
import SessionModel from "@/models/session.model";

export async function GET(req: NextRequest) {
  await connectDB();
  const token =
    req.cookies.get("authjs.session-token")?.value ||
    req.cookies.get("__Secure-authjs.session-token")?.value;

  const { userId } = await SessionModel.findOne({ sessionToken: token });
  try {
    const stats = await UserStats.findOne({ userId: userId });
    if (!stats)
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json(stats);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch user stats" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  await connectDB();
  try {
    const body = await req.json();
    const stats = await UserStats.findOneAndUpdate(
      { userId: params.userId },
      body,
      { new: true }
    );
    if (!stats)
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json(stats);
  } catch {
    return NextResponse.json(
      { error: "Failed to update user stats" },
      { status: 500 }
    );
  }
}
