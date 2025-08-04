import React from 'react';
import { cn } from '@/lib/utils';

interface MicroInteractionProps {
  children: React.ReactNode;
  type?: 'hover-lift' | 'hover-glow' | 'click-ripple' | 'magnetic' | 'tilt';
  className?: string;
}

export function MicroInteraction({ 
  children, 
  type = 'hover-lift',
  className 
}: MicroInteractionProps) {
  const interactionClasses = {
    'hover-lift': 'transition-all duration-300 hover:-translate-y-2 hover:shadow-lg will-change-transform',
    'hover-glow': 'transition-all duration-300 hover:shadow-glow hover:scale-105 will-change-transform',
    'click-ripple': 'relative overflow-hidden transition-all duration-200 active:scale-95 will-change-transform',
    'magnetic': 'transition-all duration-300 hover:scale-110 hover:rotate-1 will-change-transform',
    'tilt': 'transition-all duration-300 hover:rotate-2 hover:scale-105 will-change-transform'
  };

  return (
    <div className={cn(interactionClasses[type], className)}>
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