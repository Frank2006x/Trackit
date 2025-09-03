"use client";
import { ChartBarInteractive } from "@/components/chart";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
import { getUserStats } from "@/lib/action";
import { AlignEndHorizontal } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface userStats {
  activeDays: number;
  totalXp: number;
  onlineDays: number[];
}
interface userXpData {
  date: string;
  xp: number;
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [userStats, setUserStats] = useState<userStats | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [dataXp, setDataXp] = useState<userXpData[]>([]);
  const router = useRouter();
  useEffect(() => {
    console.log("Session data:", session);
    const fetchUserStats = async () => {
      if (session?.user) {
        try {
          const response = await getUserStats();
          setUserStats(response);

          if (response.xpHistory) {
            const dailyXpMap = new Map<string, number>();

            response.xpHistory.forEach((entry: any) => {
              const date = new Date(entry.date).toISOString().split("T")[0];
              const currentXp = dailyXpMap.get(date) || 0;
              dailyXpMap.set(date, currentXp + entry.xp);
            });

            const processedXpData = Array.from(dailyXpMap.entries()).map(
              ([date, xp]) => ({
                date,
                xp,
              })
            );

            setDataXp(processedXpData);
            console.log("Processed XP Data:", processedXpData);
          }
          console.log("User Stats:", response);
        } catch (error) {
          console.error("Failed to fetch user stats:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    if (status === "authenticated") {
      fetchUserStats();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [session, status]);

  if (status === "loading" || loading) {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>Please sign in to view your profile.</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6 ">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.push("/home")}
            className="mr-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            ← Back to Home
          </button>
          <h1 className="text-3xl font-bold text-foreground ">Profile</h1>
          <div className="flex items-center gap-4">
            <div
              className="flex gap-2 bg-card p-2 rounded-xl border-2 cursor-pointer"
              onClick={() => router.push("/home/leaderboard")}
            >
              <AlignEndHorizontal />
              <p>Leader Board</p>
            </div>
            <AnimatedThemeToggler />
          </div>
        </div>

        <div className="bg-card text-card-foreground rounded-lg shadow-md p-6 mb-6 border border-border">
          <h2 className="text-xl font-semibold mb-4 text-foreground">
            User Information
          </h2>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {session?.user?.image && (
              <div className="flex-shrink-0">
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User avatar"}
                  className="w-24 h-24 rounded-full object-cover border-4 border-border"
                  width={96}
                  height={96}
                />
              </div>
            )}

            <div className="text-center md:text-left">
              <p className="mb-2">
                <strong className="text-muted-foreground">Name:</strong>
                <span className="ml-2 text-foreground">
                  {session?.user?.name}
                </span>
              </p>
              <p>
                <strong className="text-muted-foreground">Email:</strong>
                <span className="ml-2 text-foreground">
                  {session?.user?.email}
                </span>
              </p>
            </div>
          </div>
        </div>

        {userStats && (
          <div className="bg-card rounded-lg shadow-md p-6 mb-6 border border-border">
            <h2 className="text-xl font-semibold mb-6 text-foreground">
              User Statistics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                  {userStats.activeDays}
                </p>
                <p className="text-muted-foreground font-medium">Active Days</p>
              </div>
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {userStats.totalXp}
                </p>
                <p className="text-muted-foreground font-medium">Total XP</p>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  {userStats.onlineDays?.length || 0}
                </p>
                <p className="text-muted-foreground font-medium">Online Days</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-card rounded-lg shadow-md p-6 border border-border">
          <h2 className="text-xl font-semibold mb-4 text-foreground">
            XP Progress
          </h2>
          <ChartBarInteractive userXpData={dataXp} />
        </div>
      </div>
    </div>
  );
}
