import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { AnimatedIcon } from './animated-icon';

interface IconShowcaseProps {
  icon: LucideIcon | string;
  title: string;
  description?: string;
  className?: string;
  variant?: 'card' | 'floating' | 'badge' | 'feature' | 'hero';
  color?: 'primary' | 'accent' | 'success' | 'warning' | 'muted';
  animated?: boolean;
  gradient?: boolean;
}

export function IconShowcase({
  icon,
  title,
  description,
  className,
  variant = 'card',
  color = 'primary',
  animated = true,
  gradient = false,
  ...props
}: IconShowcaseProps) {
  const variants = {
    card: {
      container: 'flex items-center gap-3 p-4 rounded-lg bg-card border border-border hover:shadow-md transition-all duration-300',
      iconWrapper: 'w-12 h-12 rounded-lg bg-gradient-primary/10 flex items-center justify-center',
      iconSize: 'lg' as const,
      titleClass: 'font-semibold text-foreground',
      descClass: 'text-sm text-muted-foreground'
    },
    floating: {
      container: 'relative group',
      iconWrapper: 'w-16 h-16 rounded-full bg-gradient-primary shadow-lg flex items-center justify-center mx-auto mb-4 group-hover:shadow-xl group-hover:scale-110 transition-all duration-300',
      iconSize: 'xl' as const,
      titleClass: 'text-center font-bold text-lg mb-2',
      descClass: 'text-center text-sm text-muted-foreground'
    },
    badge: {
      container: 'inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-primary/10 border border-primary/20',
      iconWrapper: 'w-6 h-6 flex items-center justify-center',
      iconSize: 'sm' as const,
      titleClass: 'text-sm font-medium',
      descClass: 'hidden'
    },
    feature: {
      container: 'text-center group hover:scale-105 transition-all duration-500',
      iconWrapper: 'w-20 h-20 rounded-2xl bg-gradient-primary shadow-lg flex items-center justify-center mx-auto mb-6 group-hover:shadow-2xl group-hover:rotate-6 transition-all duration-500',
      iconSize: 'xl' as const,
      titleClass: 'text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300',
      descClass: 'text-muted-foreground leading-relaxed'
    },
    hero: {
      container: 'text-center group',
      iconWrapper: 'w-24 h-24 rounded-3xl bg-gradient-primary shadow-2xl flex items-center justify-center mx-auto mb-8 group-hover:shadow-glow group-hover:scale-110 transition-all duration-700',
      iconSize: 'xl' as const,
      titleClass: 'text-2xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent',
      descClass: 'text-lg text-muted-foreground leading-relaxed max-w-md mx-auto'
    }
  };

  const config = variants[variant];

  return (
    <div className={cn(config.container, className)} {...props}>
      <div className={config.iconWrapper}>
        {typeof icon === 'string' ? (
          <span className="text-2xl">{icon}</span>
        ) : (
          <AnimatedIcon
            icon={icon}
            size={config.iconSize}
            variant={animated ? 'glow' : 'default'}
            color={color}
            gradient={gradient}
            className="text-white"
          />
        )}
      </div>
      
      {variant === 'badge' ? (
        <span className={config.titleClass}>{title}</span>
      ) : (
        <div className={variant === 'card' ? '' : ''}>
          <h3 className={config.titleClass}>{title}</h3>
          {description && (
            <p className={config.descClass}>{description}</p>
          )}
        </div>
      )}
    </div>
  );
}