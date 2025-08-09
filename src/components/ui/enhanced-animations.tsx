import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface StaggeredFadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function StaggeredFadeIn({
  children,
  delay = 100,
  duration = 600,
  className,
  direction = 'up'
}: StaggeredFadeInProps) {
  const childArray = React.Children.toArray(children);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(childArray.length).fill(false));
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          childArray.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems(prev => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }, index * delay);
          });
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [childArray, delay]);

  const getTransform = (isVisible: boolean) => {
    if (isVisible) return 'translate(0, 0)';
    
    switch (direction) {
      case 'up': return 'translate(0, 40px)';
      case 'down': return 'translate(0, -40px)';
      case 'left': return 'translate(40px, 0)';
      case 'right': return 'translate(-40px, 0)';
      default: return 'translate(0, 40px)';
    }
  };

  return (
    <div ref={containerRef} className={cn('space-y-4', className)}>
      {childArray.map((child, index) => (
        <div
          key={index}
          className="transition-all ease-out"
          style={{
            opacity: visibleItems[index] ? 1 : 0,
            transform: getTransform(visibleItems[index]),
            transitionDuration: `${duration}ms`,
            transitionDelay: visibleItems[index] ? '0ms' : `${index * delay}ms`
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

interface ParallaxElementProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  offset?: number;
}

export function ParallaxElement({
  children,
  speed = 0.5,
  className,
  offset = 0
}: ParallaxElementProps) {
  const [transform, setTransform] = useState('translateY(0px)');
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const parallaxOffset = (scrolled + offset) * speed;
      
      setTransform(`translateY(${parallaxOffset}px)`);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, offset]);

  return (
    <div
      ref={elementRef}
      className={cn('will-change-transform', className)}
      style={{ transform }}
    >
      {children}
    </div>
  );
}

interface MorphingShapeProps {
  className?: string;
  colors?: string[];
  size?: number;
  speed?: number;
}

export function MorphingShape({
  className,
  colors = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--primary-glow))'],
  size = 200,
  speed = 3000
}: MorphingShapeProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [currentPath, setCurrentPath] = useState(0);

  const paths = [
    "M60,-60C80,-40,100,-20,100,0C100,20,80,40,60,60C40,80,20,100,0,100C-20,100,-40,80,-60,60C-80,40,-100,20,-100,0C-100,-20,-80,-40,-60,-60C-40,-80,-20,-100,0,-100C20,-100,40,-80,60,-60Z",
    "M80,-80C100,-60,120,-30,120,0C120,30,100,60,80,80C60,100,30,120,0,120C-30,120,-60,100,-80,80C-100,60,-120,30,-120,0C-120,-30,-100,-60,-80,-80C-60,-100,-30,-120,0,-120C30,-120,60,-100,80,-80Z",
    "M40,-40C60,-20,80,0,80,20C80,40,60,60,40,80C20,100,0,120,-20,120C-40,120,-60,100,-80,80C-100,60,-120,40,-120,20C-120,0,-100,-20,-80,-40C-60,-60,-40,-80,-20,-80C0,-80,20,-60,40,-40Z"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPath((prev) => (prev + 1) % paths.length);
    }, speed);

    return () => clearInterval(interval);
  }, [speed, paths.length]);

  return (
    <div className={cn('relative', className)}>
      <svg
        ref={svgRef}
        width={size}
        height={size}
        viewBox="-120 -120 240 240"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="morphGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            {colors.map((color, index) => (
              <stop
                key={index}
                offset={`${(index / (colors.length - 1)) * 100}%`}
                stopColor={color}
                stopOpacity={0.8}
              />
            ))}
          </linearGradient>
          <filter id="blur">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
        <path
          d={paths[currentPath]}
          fill="url(#morphGradient)"
          filter="url(#blur)"
          className="transition-all duration-1000 ease-in-out"
        />
      </svg>
    </div>
  );
}

interface FluidTextProps {
  text: string;
  className?: string;
  colors?: string[];
  speed?: number;
}

export function FluidText({
  text,
  className,
  colors = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--primary-glow))'],
  speed = 3000
}: FluidTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const element = textRef.current;
    let colorIndex = 0;

    const changeGradient = () => {
      const currentColor = colors[colorIndex % colors.length];
      const nextColor = colors[(colorIndex + 1) % colors.length];
      
      element.style.background = `linear-gradient(45deg, ${currentColor}, ${nextColor})`;
      element.style.backgroundClip = 'text';
      element.style.webkitBackgroundClip = 'text';
      
      colorIndex++;
    };

    changeGradient();
    const interval = setInterval(changeGradient, speed);

    return () => clearInterval(interval);
  }, [colors, speed]);

  return (
    <span
      ref={textRef}
      className={cn(
        'bg-gradient-to-r bg-clip-text text-transparent transition-all duration-1000',
        className
      )}
    >
      {text}
    </span>
  );
}

interface ScrollProgressProps {
  className?: string;
  color?: string;
  height?: number;
}

export function ScrollProgress({
  className,
  color = 'hsl(var(--primary))',
  height = 4
}: ScrollProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = (window.pageYOffset / totalHeight) * 100;
      setProgress(Math.min(Math.max(scrollProgress, 0), 100));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={cn('fixed top-0 left-0 z-50 transition-all duration-300', className)}
      style={{
        width: `${progress}%`,
        height: `${height}px`,
        backgroundColor: color,
        boxShadow: `0 0 10px ${color}`
      }}
    />
  );
}

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  formatter?: (value: number) => string;
}

export function AnimatedCounter({
  from = 0,
  to,
  duration = 2000,
  formatter = (val) => val.toString()
}: AnimatedCounterProps) {
  const [count, setCount] = useState(from);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const startTime = Date.now();
    const difference = to - from;

    const updateCount = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.round(from + difference * easeOutCubic);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    updateCount();
  }, [from, to, duration]);

  return <span ref={countRef}>{formatter(count)}</span>;
}