"use client";
import { getTopUser } from "@/lib/action";
import Image from "next/image";
import { ArrowBigLeft } from "lucide-react";
import React, { useEffect, useState } from "react";

interface UserInfo {
  name: string;
  image: string;
}

interface LeaderboardUser {
  _id: string;
  userInfo: UserInfo;
  totalXp: number;
}

export default function LeaderBoard() {
  const [userList, setUserList] = useState<LeaderboardUser[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getTopUser();
      console.log("Leader Board data:", res);
      setUserList(res || []);
    };
    fetchData();
  }, []);
  return (
    <div className="p-6 bg-background">
      <div className="flex gap-4 mb-4 flex-col">
        <div onClick={() => window.history.back()}>
          <ArrowBigLeft />
        </div>
        <h1 className="text-2xl font-bold mb-4 text-foreground">Leaderboard</h1>
      </div>
      <div className="space-y-2">
        {userList.map((user, index) => (
          <div
            key={user._id}
            className="flex items-center justify-between p-4 bg-card rounded-lg shadow border border-border"
          >
            <div className="flex items-center gap-3">
              <span className="font-bold text-lg text-foreground">
                #{index + 1}
              </span>
              <Image
                src={user?.userInfo?.image}
                alt={user?.userInfo?.name}
                className="rounded-full"
                width={40}
                height={40}
              />
              <div>
                <h3 className="font-semibold text-foreground">
                  {user?.userInfo?.name}
                </h3>
                <p className="text-muted-foreground">{user?.totalXp} XP</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
