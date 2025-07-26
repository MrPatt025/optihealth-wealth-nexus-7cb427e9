import React from 'react';
import { cn } from '@/lib/utils';

interface FloatingElementsProps {
  className?: string;
  count?: number;
}

export function FloatingElements({ className, count = 6 }: FloatingElementsProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "absolute w-2 h-2 bg-primary/20 rounded-full",
            "animate-[float_8s_ease-in-out_infinite]"
          )}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 1.3}s`,
            animationDuration: `${8 + Math.random() * 4}s`,
          }}
        />
      ))}
      
      {/* Larger floating shapes */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={`large-${i}`}
          className={cn(
            "absolute w-8 h-8 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg blur-sm",
            "animate-[float_12s_ease-in-out_infinite]"
          )}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 2}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>
  );
}