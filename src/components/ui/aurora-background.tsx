import React from 'react';
import { cn } from '@/lib/utils';

interface AuroraBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  variant?: 'default' | 'health' | 'wealth' | 'purple' | 'blue';
}

/**
 * Aurora Background Component - Inspired by Lightswind's Aurora effects
 * Creates dynamic, animated background gradients that simulate aurora borealis
 */
export function AuroraBackground({ 
  className, 
  children, 
  variant = 'default' 
}: AuroraBackgroundProps) {
  const variants = {
    default: {
      bg: 'bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20',
      aurora1: 'from-purple-400/30 via-pink-400/30 to-red-400/30',
      aurora2: 'from-cyan-400/20 via-blue-400/20 to-purple-400/20',
      aurora3: 'from-green-400/10 via-cyan-400/10 to-blue-400/10',
    },
    health: {
      bg: 'bg-gradient-to-br from-green-900/20 via-emerald-900/20 to-teal-900/20',
      aurora1: 'from-green-400/30 via-emerald-400/30 to-teal-400/30',
      aurora2: 'from-teal-400/20 via-cyan-400/20 to-green-400/20',
      aurora3: 'from-lime-400/10 via-green-400/10 to-emerald-400/10',
    },
    wealth: {
      bg: 'bg-gradient-to-br from-yellow-900/20 via-amber-900/20 to-orange-900/20',
      aurora1: 'from-yellow-400/30 via-amber-400/30 to-orange-400/30',
      aurora2: 'from-amber-400/20 via-yellow-400/20 to-gold-400/20',
      aurora3: 'from-orange-400/10 via-amber-400/10 to-yellow-400/10',
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-900/20 via-violet-900/20 to-indigo-900/20',
      aurora1: 'from-purple-400/30 via-violet-400/30 to-indigo-400/30',
      aurora2: 'from-indigo-400/20 via-purple-400/20 to-violet-400/20',
      aurora3: 'from-violet-400/10 via-purple-400/10 to-indigo-400/10',
    },
    blue: {
      bg: 'bg-gradient-to-br from-blue-900/20 via-indigo-900/20 to-cyan-900/20',
      aurora1: 'from-blue-400/30 via-indigo-400/30 to-cyan-400/30',
      aurora2: 'from-cyan-400/20 via-blue-400/20 to-indigo-400/20',
      aurora3: 'from-indigo-400/10 via-cyan-400/10 to-blue-400/10',
    },
  };

  const currentVariant = variants[variant];

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Base background */}
      <div className={cn('absolute inset-0', currentVariant.bg)} />
      
      {/* Aurora layers */}
      <div 
        className={cn(
          'absolute inset-0 opacity-60',
          'bg-gradient-to-r',
          currentVariant.aurora1,
          'animate-aurora-1'
        )}
        style={{
          background: `linear-gradient(120deg, transparent 0%, var(--aurora-1) 50%, transparent 100%)`,
          animation: 'aurora-drift-1 20s ease-in-out infinite',
        }}
      />
      
      <div 
        className={cn(
          'absolute inset-0 opacity-40',
          'bg-gradient-to-r',
          currentVariant.aurora2,
          'animate-aurora-2'
        )}
        style={{
          background: `linear-gradient(240deg, transparent 0%, var(--aurora-2) 50%, transparent 100%)`,
          animation: 'aurora-drift-2 25s ease-in-out infinite reverse',
        }}
      />
      
      <div 
        className={cn(
          'absolute inset-0 opacity-20',
          'bg-gradient-to-r',
          currentVariant.aurora3,
          'animate-aurora-3'
        )}
        style={{
          background: `linear-gradient(60deg, transparent 0%, var(--aurora-3) 50%, transparent 100%)`,
          animation: 'aurora-drift-3 30s ease-in-out infinite',
        }}
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/10" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

// Custom CSS for aurora animations (to be added to global styles)
export const auroraStyles = `
  @keyframes aurora-drift-1 {
    0%, 100% {
      transform: translateX(-100%) translateY(-50%) rotate(0deg);
      opacity: 0.6;
    }
    25% {
      transform: translateX(-25%) translateY(-25%) rotate(5deg);
      opacity: 0.8;
    }
    50% {
      transform: translateX(25%) translateY(0%) rotate(-3deg);
      opacity: 0.6;
    }
    75% {
      transform: translateX(75%) translateY(-25%) rotate(2deg);
      opacity: 0.7;
    }
  }
  
  @keyframes aurora-drift-2 {
    0%, 100% {
      transform: translateX(100%) translateY(50%) rotate(0deg);
      opacity: 0.4;
    }
    25% {
      transform: translateX(75%) translateY(25%) rotate(-5deg);
      opacity: 0.6;
    }
    50% {
      transform: translateX(25%) translateY(0%) rotate(3deg);
      opacity: 0.4;
    }
    75% {
      transform: translateX(-25%) translateY(25%) rotate(-2deg);
      opacity: 0.5;
    }
  }
  
  @keyframes aurora-drift-3 {
    0%, 100% {
      transform: translateX(-50%) translateY(100%) rotate(0deg);
      opacity: 0.2;
    }
    33% {
      transform: translateX(0%) translateY(50%) rotate(3deg);
      opacity: 0.3;
    }
    66% {
      transform: translateX(50%) translateY(75%) rotate(-2deg);
      opacity: 0.2;
    }
  }
`;