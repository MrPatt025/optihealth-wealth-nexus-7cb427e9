import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedBackgroundProps {
  className?: string;
  variant?: 'default' | 'dots' | 'grid' | 'waves';
}

export function AnimatedBackground({ 
  className, 
  variant = 'default' 
}: AnimatedBackgroundProps) {
  const patterns = {
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
    ),
    waves: (
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-[float_15s_ease-in-out_infinite]" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-[float_20s_ease-in-out_infinite_reverse]" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-glow/5 rounded-full blur-3xl animate-[glow_10s_ease-in-out_infinite]" />
      </div>
    )
  };

  return (
    <div className={cn("absolute inset-0 -z-10", className)}>
      {patterns[variant]}
    </div>
  );
}