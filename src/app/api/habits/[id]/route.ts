import SessionModel from "@/models/session.model";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Habit from "@/models/habits.model";
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { id } = await params;
  const token =
    req.cookies.get("authjs.session-token")?.value ||
    req.cookies.get("__Secure-authjs.session-token")?.value;

  const { userId } = await SessionModel.findOne({ sessionToken: token });
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await Habit.findOneAndDelete({ _id: id, userId: userId });
  return NextResponse.json({ message: "Habit deleted" });
}
