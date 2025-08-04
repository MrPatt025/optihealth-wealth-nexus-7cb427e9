import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  variant?: 'mesh' | 'waves' | 'particles' | 'gradient' | 'default' | 'dots' | 'grid';
}

export function AnimatedBackground({ 
  className, 
  children,
  variant = 'default' 
}: AnimatedBackgroundProps) {
  const patterns = {
    mesh: (
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/30 rounded-full mix-blend-multiply filter blur-xl animate-[float_6s_ease-in-out_infinite]" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-accent/30 rounded-full mix-blend-multiply filter blur-xl animate-[float_8s_ease-in-out_infinite]" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-primary-glow/30 rounded-full mix-blend-multiply filter blur-xl animate-[float_7s_ease-in-out_infinite]" />
      </div>
    ),
    waves: (
      <div className="absolute inset-0">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
              <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.05" />
              <stop offset="100%" stopColor="hsl(var(--primary-glow))" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path
            d="M0,50 Q25,20 50,50 T100,50 L100,100 L0,100 Z"
            fill="url(#wave-gradient)"
            className="animate-[wave_10s_ease-in-out_infinite]"
          />
        </svg>
      </div>
    ),
    particles: (
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full animate-[twinkle_3s_ease-in-out_infinite]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
    ),
    gradient: (
      <div className="absolute inset-0 bg-gradient-hero opacity-20" />
    ),
    default: (
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-glow),0.1),transparent_50%)] animate-pulse" />
      </div>
    ),
    dots: (
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,hsl(var(--primary))_1px,transparent_0)] bg-[size:24px_24px] animate-[float_20s_ease-in-out_infinite]" />
      </div>
    ),
    grid: (
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--border))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border))_1px,transparent_1px)] bg-[size:40px_40px] animate-[shimmer_8s_ease-in-out_infinite]" />
      </div>
    )
  };

  return (
    <div 
      className={cn(
        "relative overflow-hidden",
        className
      )}
    >
      {patterns[variant]}
      {children}
    </div>
  );
}