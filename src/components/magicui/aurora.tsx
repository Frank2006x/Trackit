"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface AuroraProps {
  className?: string;
  children?: React.ReactNode;
  colorStops?: string[];
  blend?: number;
  amplitude?: number;
  speed?: number;
}

export const Aurora: React.FC<AuroraProps> = ({
  className,
  children,
  colorStops = ["#3A29FF", "#FF94B4", "#FF3232"],
  blend = 0.5,
  amplitude = 1.0,
  speed = 0.5,
}) => {
  const gradientStyle = {
    background: `linear-gradient(45deg, ${colorStops.join(", ")})`,
    backgroundSize: "400% 400%",
    animation: `aurora ${8 / speed}s ease-in-out infinite alternate`,
    opacity: blend,
    transform: `scale(${amplitude})`,
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="absolute inset-0 animate-aurora" style={gradientStyle} />
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
};
