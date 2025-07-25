import React from "react";
import { cn } from "@/lib/utils";

interface GradientBorderProps {
  children: React.ReactNode;
  className?: string;
  borderWidth?: number;
  borderRadius?: string;
  gradient?: string;
}

export function GradientBorder({
  children,
  className,
  borderWidth = 1,
  borderRadius = "0.75rem",
  gradient = "linear-gradient(45deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary-glow)))",
}: GradientBorderProps) {
  return (
    <div
      className={cn("relative", className)}
      style={{
        background: gradient,
        borderRadius,
        padding: `${borderWidth}px`,
      }}
    >
      <div
        className="h-full w-full bg-background"
        style={{
          borderRadius: `calc(${borderRadius} - ${borderWidth}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}