import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card } from './card';

interface EnhancedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'glow' | 'gradient' | 'neon' | 'holographic';
  animation?: 'none' | 'hover' | 'float' | 'pulse' | 'tilt';
  glowColor?: 'primary' | 'accent' | 'success' | 'warning';
  interactive?: boolean;
}

export function EnhancedCard({
  children,
  className,
  variant = 'default',
  animation = 'hover',
  glowColor = 'primary',
  interactive = true,
  ...props
}: EnhancedCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const variantStyles = {
    default: 'bg-card border-border',
    glass: 'bg-card/40 backdrop-blur-xl border-white/10 shadow-2xl',
    glow: `bg-card border-${glowColor}/20 shadow-[0_0_20px_rgba(var(--${glowColor}),0.15)]`,
    gradient: 'bg-gradient-card border-primary/20 shadow-lg',
    neon: `bg-card/90 border-${glowColor} shadow-[0_0_15px_rgba(var(--${glowColor}),0.5),inset_0_0_15px_rgba(var(--${glowColor}),0.1)]`,
    holographic: 'bg-gradient-mesh border-primary/30 relative overflow-hidden'
  };

  const animationStyles = {
    none: '',
    hover: 'hover:scale-[1.02] hover:shadow-xl transition-all duration-300',
    float: 'animate-float hover:animate-none hover:scale-105 transition-all duration-300',
    pulse: 'animate-pulse-glow hover:animate-none hover:scale-105 transition-all duration-300',
    tilt: 'hover:rotate-1 hover:scale-105 transition-all duration-300'
  };

  const tiltStyle = animation === 'tilt' && isHovered && interactive ? {
    transform: `perspective(1000px) rotateX(${(mousePosition.y - 150) / 20}deg) rotateY(${(mousePosition.x - 150) / 20}deg) translateZ(10px) scale(1.05)`,
  } : {};

  return (
    <Card
      className={cn(
        'relative group',
        variantStyles[variant],
        animation !== 'none' && animationStyles[animation],
        interactive && 'cursor-pointer',
        className
      )}
      style={tiltStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      {...props}
    >
      {/* Holographic effect */}
      {variant === 'holographic' && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary-glow/5 animate-gradient bg-[length:200%_200%]" />
      )}

      {/* Shimmer effect on hover */}
      <div 
        className={cn(
          "absolute inset-0 opacity-0 transition-opacity duration-500",
          "-skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent",
          isHovered && "opacity-100 animate-[shimmer_1.5s_ease-out]"
        )}
      />

      {/* Glow overlay on hover */}
      {(variant === 'glow' || variant === 'neon') && (
        <div 
          className={cn(
            "absolute inset-0 opacity-0 transition-opacity duration-300 rounded-lg",
            `bg-gradient-to-br from-${glowColor}/5 via-transparent to-${glowColor}/5`,
            isHovered && "opacity-100"
          )}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Interactive spotlight effect */}
      {interactive && isHovered && (
        <div 
          className="absolute w-32 h-32 bg-gradient-radial from-white/10 to-transparent rounded-full pointer-events-none transition-opacity duration-300"
          style={{
            left: mousePosition.x - 64,
            top: mousePosition.y - 64,
          }}
        />
      )}
    </Card>
  );
}