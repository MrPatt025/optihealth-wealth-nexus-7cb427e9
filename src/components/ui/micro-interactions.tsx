import React, { useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface MicroInteractionProps {
  children: React.ReactNode;
  type?: 'hover-lift' | 'hover-glow' | 'click-ripple' | 'magnetic' | 'tilt' | 'breath' | 'pulse' | 'float';
  className?: string;
  strength?: number;
}

export function MicroInteraction({ 
  children, 
  type = 'hover-lift', 
  className,
  strength = 1 
}: MicroInteractionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!elementRef.current) return;
    
    const rect = elementRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  }, []);

  const getTransform = () => {
    if (!isHovered) return '';
    
    switch (type) {
      case 'magnetic':
        const { x, y } = mousePosition;
        const centerX = elementRef.current?.offsetWidth || 0 / 2;
        const centerY = elementRef.current?.offsetHeight || 0 / 2;
        const deltaX = (x - centerX) * 0.15 * strength;
        const deltaY = (y - centerY) * 0.15 * strength;
        return `translate(${deltaX}px, ${deltaY}px)`;
      
      case 'tilt':
        const tiltX = (mousePosition.y - (elementRef.current?.offsetHeight || 0) / 2) * 0.1 * strength;
        const tiltY = (mousePosition.x - (elementRef.current?.offsetWidth || 0) / 2) * -0.1 * strength;
        return `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      
      default:
        return '';
    }
  };

  const baseClasses = {
    'hover-lift': 'transition-transform duration-300 hover:scale-105 hover:-translate-y-2',
    'hover-glow': 'transition-all duration-300 hover:shadow-glow hover:shadow-primary/20',
    'click-ripple': 'relative overflow-hidden transition-transform active:scale-95',
    'magnetic': 'transition-transform duration-200 ease-out',
    'tilt': 'transition-transform duration-200 ease-out transform-gpu',
    'breath': 'animate-pulse-gentle',
    'pulse': 'animate-pulse-glow',
    'float': 'animate-float'
  };

  return (
    <div
      ref={elementRef}
      className={cn(baseClasses[type], className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        transform: getTransform(),
      }}
    >
      {children}
    </div>
  );
}

export function RippleButton({ 
  children, 
  onClick, 
  className,
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple-effect');

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);

    onClick?.(e);
  };

  return (
    <button
      className={cn(
        'relative overflow-hidden transition-all duration-200 active:scale-95',
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}