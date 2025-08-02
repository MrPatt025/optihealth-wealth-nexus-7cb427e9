"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TypewriterProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
  cursorChar?: string;
  onComplete?: () => void;
}

export function Typewriter({
  text,
  className = "",
  speed = 50,
  delay = 0,
  cursor = true,
  cursorChar = "|",
  onComplete,
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(cursor);
  const [isComplete, setIsComplete] = useState(false);
  const indexRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const typeNextChar = () => {
      if (indexRef.current < text.length) {
        setDisplayText(text.slice(0, indexRef.current + 1));
        indexRef.current++;
        timeoutRef.current = setTimeout(typeNextChar, speed);
      } else {
        setIsComplete(true);
        onComplete?.();
        
        // Optional: hide cursor after completion
        if (cursor) {
          setTimeout(() => setShowCursor(false), 1000);
        }
      }
    };

    // Start typing after delay
    timeoutRef.current = setTimeout(typeNextChar, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, speed, delay, cursor, onComplete]);

  // Cursor blinking effect
  useEffect(() => {
    if (!showCursor) return;

    const blinkInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <span className={cn("inline-block", className)}>
      {displayText}
      {cursor && !isComplete && (
        <span
          className={cn(
            "inline-block ml-1 transition-opacity duration-100",
            showCursor ? "opacity-100" : "opacity-0"
          )}
        >
          {cursorChar}
        </span>
      )}
    </span>
  );
}