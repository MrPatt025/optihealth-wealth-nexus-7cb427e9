import React, { useEffect } from 'react';

interface SmoothScrollProps {
  children: React.ReactNode;
  behavior?: 'smooth' | 'auto';
  duration?: number;
}

export const SmoothScroll: React.FC<SmoothScrollProps> = ({ 
  children, 
  behavior = 'smooth',
  duration = 1000 
}) => {
  useEffect(() => {
    // Smooth scroll polyfill for better performance
    const smoothScrollTo = (element: Element, to: number, duration: number) => {
      const start = element.scrollTop;
      const change = to - start;
      const startTime = performance.now();

      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeInOutCubic = (t: number) => 
          t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        
        element.scrollTop = start + change * easeInOutCubic(progress);
        
        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    };

    // Override default scroll behavior for anchor links
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href')?.slice(1);
        const targetElement = document.getElementById(targetId || '');
        
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
          smoothScrollTo(document.documentElement, offsetTop, duration);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [duration]);

  return <div className="scroll-smooth">{children}</div>;
};