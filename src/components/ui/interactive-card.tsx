import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card } from './card';

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  glowOnHover?: boolean;
  tiltEffect?: boolean;
  scaleOnHover?: boolean;
}

export function InteractiveCard({
  children,
  className,
  glowOnHover = true,
  tiltEffect = true,
  scaleOnHover = true,
}: InteractiveCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const tiltStyle = tiltEffect && isHovered ? {
    transform: `perspective(1000px) rotateX(${(mousePosition.y - 150) / 20}deg) rotateY(${(mousePosition.x - 150) / 20}deg) translateZ(20px)`,
  } : {};

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-300 cursor-pointer",
        glowOnHover && "hover:shadow-glow",
        scaleOnHover && "hover:scale-[1.02]",
        "group",
        className
      )}
      style={tiltStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Gradient overlay on hover */}
      <div 
        className={cn(
          "absolute inset-0 opacity-0 transition-opacity duration-300",
          "bg-gradient-to-br from-primary/5 via-transparent to-accent/5",
          isHovered && "opacity-100"
        )}
      />
      
      {/* Shimmer effect */}
      <div 
        className={cn(
          "absolute inset-0 opacity-0 transition-opacity duration-500",
          "-skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent",
          "group-hover:opacity-100 group-hover:animate-[shimmer_1.5s_ease-out]"
        )}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </Card>
  );
}