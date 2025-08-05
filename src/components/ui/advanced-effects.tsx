import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface GlassMorphismProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'light' | 'medium' | 'heavy';
  blur?: number;
  opacity?: number;
  border?: boolean;
  glow?: boolean;
}

export function GlassMorphism({ 
  children, 
  className, 
  intensity = 'medium',
  blur = 16,
  opacity = 0.1,
  border = true,
  glow = false 
}: GlassMorphismProps) {
  const intensityMap = {
    light: 'backdrop-blur-sm bg-white/5',
    medium: 'backdrop-blur-md bg-white/10',
    heavy: 'backdrop-blur-xl bg-white/15'
  };

  return (
    <div 
      className={cn(
        'relative overflow-hidden',
        intensityMap[intensity],
        border && 'border border-white/20',
        glow && 'shadow-glow',
        className
      )}
      style={{
        backdropFilter: `blur(${blur}px)`,
        backgroundColor: `rgba(255, 255, 255, ${opacity})`
      }}
    >
      {children}
      
      {/* Glass reflection effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50 pointer-events-none" />
      
      {/* Inner glow */}
      {glow && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent rounded-inherit pointer-events-none" />
      )}
    </div>
  );
}

interface NeuomorphismProps {
  children: React.ReactNode;
  className?: string;
  pressed?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Neuomorphism({ 
  children, 
  className, 
  pressed = false,
  size = 'md' 
}: NeuomorphismProps) {
  const sizeMap = {
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <div 
      className={cn(
        'relative bg-background rounded-2xl transition-all duration-300',
        pressed 
          ? 'shadow-[inset_8px_8px_16px_rgba(0,0,0,0.2),inset_-8px_-8px_16px_rgba(255,255,255,0.1)]'
          : 'shadow-[8px_8px_16px_rgba(0,0,0,0.2),-8px_-8px_16px_rgba(255,255,255,0.05)]',
        sizeMap[size],
        className
      )}
    >
      {children}
    </div>
  );
}

interface MagneticElementProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticElement({ 
  children, 
  className, 
  strength = 0.3 
}: MagneticElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      
      setPosition({ x: deltaX, y: deltaY });
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return (
    <div
      ref={ref}
      className={cn('transition-transform duration-200 ease-out', className)}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
    >
      {children}
    </div>
  );
}