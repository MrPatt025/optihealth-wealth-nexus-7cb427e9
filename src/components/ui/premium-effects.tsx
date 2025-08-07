import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface HolographicCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export function HolographicCard({
  children,
  className,
  intensity = 1
}: HolographicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        'relative overflow-hidden rounded-xl border border-white/10 bg-black/20 backdrop-blur-xl transition-all duration-300',
        'before:absolute before:inset-0 before:bg-gradient-conic before:from-purple-500 before:via-blue-500 before:to-pink-500 before:opacity-0 before:transition-opacity before:duration-300',
        'hover:before:opacity-20',
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered 
          ? `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.1) 0%, transparent 50%)`
          : undefined
      }}
    >
      {/* Holographic shine effect */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
        style={{
          background: `conic-gradient(from ${mousePosition.x * 3.6}deg, #ff6b9d, #c471ed, #12c2e9, #64b3f4, #ff6b9d)`,
          mixBlendMode: 'overlay'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 p-6">
        {children}
      </div>
      
      {/* Border gradient */}
      <div className="absolute inset-0 rounded-xl border border-transparent bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 opacity-0 transition-opacity duration-300 hover:opacity-100" />
    </div>
  );
}

interface NeonTextProps {
  text: string;
  className?: string;
  color?: string;
  glowIntensity?: number;
}

export function NeonText({
  text,
  className,
  color = '#00ff88',
  glowIntensity = 1
}: NeonTextProps) {
  return (
    <span
      className={cn('relative font-bold', className)}
      style={{
        color: color,
        textShadow: `
          0 0 5px ${color}${Math.round(glowIntensity * 255).toString(16).padStart(2, '0')},
          0 0 10px ${color}${Math.round(glowIntensity * 200).toString(16).padStart(2, '0')},
          0 0 15px ${color}${Math.round(glowIntensity * 150).toString(16).padStart(2, '0')},
          0 0 20px ${color}${Math.round(glowIntensity * 100).toString(16).padStart(2, '0')}
        `
      }}
    >
      {text}
    </span>
  );
}

interface CyberGridProps {
  className?: string;
  spacing?: number;
  color?: string;
  opacity?: number;
}

export function CyberGrid({
  className,
  spacing = 50,
  color = '#00ff88',
  opacity = 0.3
}: CyberGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      drawGrid();
    };

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = color;
      ctx.globalAlpha = opacity;
      ctx.lineWidth = 1;

      // Draw vertical lines
      for (let x = 0; x <= canvas.width; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw horizontal lines
      for (let y = 0; y <= canvas.height; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => window.removeEventListener('resize', resizeCanvas);
  }, [spacing, color, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className={cn('absolute inset-0 pointer-events-none', className)}
      style={{ width: '100%', height: '100%' }}
    />
  );
}

interface QuantumOrbProps {
  className?: string;
  size?: number;
  colors?: string[];
  speed?: number;
}

export function QuantumOrb({
  className,
  size = 100,
  colors = ['#ff006e', '#8338ec', '#3a86ff'],
  speed = 2000
}: QuantumOrbProps) {
  const orbRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, speed / 360);

    return () => clearInterval(interval);
  }, [speed]);

  return (
    <div
      ref={orbRef}
      className={cn('relative', className)}
      style={{ width: size, height: size }}
    >
      {colors.map((color, index) => (
        <div
          key={index}
          className="absolute inset-0 rounded-full animate-pulse"
          style={{
            background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
            transform: `rotate(${rotation + (index * 120)}deg) scale(${1 + Math.sin((rotation + index * 120) * Math.PI / 180) * 0.2})`,
            filter: 'blur(1px)'
          }}
        />
      ))}
      
      {/* Core orb */}
      <div
        className="absolute inset-2 rounded-full"
        style={{
          background: `conic-gradient(from ${rotation}deg, ${colors.join(', ')})`,
          filter: 'blur(2px)'
        }}
      />
      
      {/* Inner glow */}
      <div
        className="absolute inset-4 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)',
          animation: 'pulse 2s ease-in-out infinite'
        }}
      />
    </div>
  );
}

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  liquid?: boolean;
}

export function LiquidButton({
  children,
  className,
  variant = 'primary',
  size = 'md',
  liquid = true,
  ...props
}: LiquidButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const variantClasses = {
    primary: 'bg-gradient-to-r from-purple-600 to-blue-600 text-white',
    secondary: 'bg-gradient-to-r from-gray-600 to-gray-800 text-white',
    accent: 'bg-gradient-to-r from-pink-600 to-orange-600 text-white'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (liquid && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const newRipple = { id: Date.now(), x, y };
      setRipples(prev => [...prev, newRipple]);
      
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 1000);
    }
    
    props.onClick?.(e);
  };

  return (
    <button
      ref={buttonRef}
      className={cn(
        'relative overflow-hidden rounded-full font-semibold transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/20',
        variantClasses[variant],
        sizeClasses[size],
        liquid && 'hover:shadow-2xl hover:shadow-current/25',
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {/* Liquid ripple effects */}
      {liquid && ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute inset-0 rounded-full bg-white/30 animate-ping"
          style={{
            left: ripple.x - 50,
            top: ripple.y - 50,
            width: 100,
            height: 100,
            transform: 'scale(0)',
            animation: 'liquid-ripple 1s ease-out forwards'
          }}
        />
      ))}
      
      {/* Button content */}
      <span className="relative z-10">{children}</span>
      
      {/* Liquid shine effect */}
      {liquid && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-1000" />
      )}
    </button>
  );
}