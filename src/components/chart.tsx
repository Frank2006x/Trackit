"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface userXpData {
  date: string;
  xp: number;
}

export const description = "An interactive bar chart";

const chartConfig = {
  xp: {
    label: "XP",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ChartBarInteractive({
  userXpData,
}: {
  userXpData: userXpData[];
}) {
  console.log(userXpData);
  const total = React.useMemo(
    () => userXpData.reduce((acc, curr) => acc + curr.xp, 0),
    [userXpData]
  );

  return (
    <Card className="py-0">
      <CardHeader className="flex flex-col items-stretch border-b !p-0">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3">
          <CardTitle>XP Progress Chart</CardTitle>
          <CardDescription>Showing your XP progress over time</CardDescription>
        </div>
        <div className="flex border-t px-6 py-4">
          <div className="flex flex-1 flex-col justify-center gap-1">
            <span className="text-muted-foreground text-xs">Total XP</span>
            <span className="text-lg leading-none font-bold sm:text-3xl">
              {total.toLocaleString()}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={userXpData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey="xp" fill="#22c55e" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
