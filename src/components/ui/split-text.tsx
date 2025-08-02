"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: "chars" | "words" | "lines";
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: "left" | "center" | "right";
  onAnimationComplete?: () => void;
}

export function SplitText({
  text,
  className = "",
  delay = 100,
  duration = 0.6,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  onAnimationComplete,
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Split text into chars/words
    const splitChars = splitType === "chars" 
      ? text.split("").map((char, index) => (
          char === " " ? "&nbsp;" : char
        ))
      : text.split(" ");

    // Create spans for each character/word
    container.innerHTML = splitChars
      .map((item, index) => 
        `<span style="display: inline-block; opacity: 0;" data-index="${index}">${item}</span>`
      )
      .join(splitType === "chars" ? "" : " ");

    const elements = container.querySelectorAll("span");

    // Set initial state
    gsap.set(elements, from);

    // Create scroll-triggered animation
    const timeline = gsap.timeline({
      onComplete: onAnimationComplete,
    });

    ScrollTrigger.create({
      trigger: container,
      start: "top 80%",
      end: "bottom 20%",
      animation: timeline,
    });

    timeline.to(elements, {
      ...to,
      duration,
      ease,
      stagger: delay / 1000,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [text, delay, duration, ease, splitType, from, to, threshold, rootMargin, onAnimationComplete]);

  return (
    <div
      ref={containerRef}
      className={cn("will-change-transform", `text-${textAlign}`, className)}
      style={{ textAlign }}
      aria-label={text}
    />
  );
}