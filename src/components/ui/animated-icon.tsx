import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface AnimatedIconProps {
  icon: LucideIcon;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'bounce' | 'pulse' | 'spin' | 'glow' | 'morph' | 'float';
  color?: 'primary' | 'accent' | 'success' | 'warning' | 'muted';
  gradient?: boolean;
  hover?: boolean;
}

const sizeMap = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-8 w-8'
};

const colorMap = {
  primary: 'text-primary',
  accent: 'text-accent',
  success: 'text-success',
  warning: 'text-warning',
  muted: 'text-muted-foreground'
};

const variantMap = {
  default: '',
  bounce: 'animate-bounce',
  pulse: 'animate-pulse',
  spin: 'animate-spin',
  glow: 'animate-glow',
  morph: 'animate-morph',
  float: 'animate-float'
};

const hoverEffects = {
  default: 'hover:scale-110',
  bounce: 'hover:animate-bounce',
  pulse: 'hover:animate-pulse',
  spin: 'hover:animate-spin',
  glow: 'hover:animate-glow hover:drop-shadow-[0_0_8px_rgba(var(--primary),0.6)]',
  morph: 'hover:animate-morph',
  float: 'hover:animate-float'
};

export function AnimatedIcon({
  icon: Icon,
  className,
  size = 'md',
  variant = 'default',
  color = 'primary',
  gradient = false,
  hover = true,
  ...props
}: AnimatedIconProps) {
  return (
    <div className="relative inline-flex items-center justify-center">
      <Icon
        className={cn(
          sizeMap[size],
          gradient ? 'bg-gradient-primary bg-clip-text text-transparent' : colorMap[color],
          variantMap[variant],
          hover && hoverEffects[variant],
          hover && 'transition-all duration-300 cursor-pointer',
          className
        )}
        {...props}
      />
      
      {/* Glow effect for certain variants */}
      {(variant === 'glow' || gradient) && (
        <div className={cn(
          "absolute inset-0 rounded-full blur-sm opacity-50 -z-10",
          sizeMap[size],
          gradient ? 'bg-gradient-primary' : 'bg-current',
          'animate-pulse'
        )} />
      )}
    </div>
  );
}