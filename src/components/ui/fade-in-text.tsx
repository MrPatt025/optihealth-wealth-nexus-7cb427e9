"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FadeInTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  threshold?: number;
  once?: boolean;
  onAnimationComplete?: () => void;
}

export function FadeInText({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  direction = "up",
  distance = 30,
  threshold = 0.1,
  once = true,
  onAnimationComplete,
}: FadeInTextProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;

    // Set initial position based on direction
    const getInitialTransform = () => {
      switch (direction) {
        case "up":
          return { y: distance, opacity: 0 };
        case "down":
          return { y: -distance, opacity: 0 };
        case "left":
          return { x: distance, opacity: 0 };
        case "right":
          return { x: -distance, opacity: 0 };
        case "none":
        default:
          return { opacity: 0 };
      }
    };

    const getFinalTransform = () => {
      switch (direction) {
        case "up":
        case "down":
          return { y: 0, opacity: 1 };
        case "left":
        case "right":
          return { x: 0, opacity: 1 };
        case "none":
        default:
          return { opacity: 1 };
      }
    };

    // Set initial state
    gsap.set(element, getInitialTransform());

    // Create animation timeline
    const tl = gsap.timeline({
      onComplete: onAnimationComplete,
    });

    tl.to(element, {
      ...getFinalTransform(),
      duration,
      delay,
      ease: "power2.out",
    });

    // Create scroll trigger
    ScrollTrigger.create({
      trigger: element,
      start: "top 90%",
      end: "bottom 10%",
      animation: tl,
      once,
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [delay, duration, direction, distance, threshold, once, onAnimationComplete]);

  return (
    <div ref={elementRef} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}