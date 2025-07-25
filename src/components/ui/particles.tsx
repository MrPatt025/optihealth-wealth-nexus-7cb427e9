import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  refresh?: boolean;
}

export function Particles({
  className,
  quantity = 30,
  staticity = 50,
  ease = 50,
  refresh = false,
}: ParticlesProps) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", updateWindowSize);
    updateWindowSize();

    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);

  const particles = useMemo(() => {
    const particleArray = [];
    for (let i = 0; i < quantity; i++) {
      particleArray.push({
        id: i,
        x: Math.random() * (windowSize.width || 1000),
        y: Math.random() * (windowSize.height || 1000),
        translateX: 0,
        translateY: 0,
        size: Math.random() * 2 + 0.1,
        alpha: Math.random() * 0.5 + 0.1,
        targetAlpha: Math.random() * 0.6 + 0.1,
        dx: (Math.random() - 0.5) * 0.2,
        dy: (Math.random() - 0.5) * 0.2,
        magnetism: 0.1 + Math.random() * 4,
      });
    }
    return particleArray;
  }, [quantity, windowSize.width, windowSize.height, refresh]);

  return (
    <div className={cn("fixed inset-0 pointer-events-none", className)}>
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-50"
      >
        {particles.map((particle) => (
          <circle
            key={particle.id}
            cx={particle.x}
            cy={particle.y}
            r={particle.size}
            fill="url(#gradient)"
            opacity={particle.alpha}
            className="animate-pulse"
          />
        ))}
        <defs>
          <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}