import { useEffect, useCallback } from 'react';

export const usePerformance = () => {
  // Optimize scroll performance
  const optimizeScrolling = useCallback(() => {
    let ticking = false;
    
    const updateScrollPosition = () => {
      ticking = false;
      // Add scroll-based optimizations here
    };
    
    const requestScrollUpdate = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollPosition);
        ticking = true;
      }
    };
    
    return requestScrollUpdate;
  }, []);

  // Lazy load images
  const lazyLoadImages = useCallback(() => {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('blur-sm');
            imageObserver.unobserve(img);
          }
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('img[data-src]').forEach((img) => {
      imageObserver.observe(img);
    });

    return () => imageObserver.disconnect();
  }, []);

  // Optimize animations
  const optimizeAnimations = useCallback(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
      document.documentElement.style.setProperty('--transition-smooth', 'none');
      document.documentElement.style.setProperty('--transition-bounce', 'none');
    }
  }, []);

  useEffect(() => {
    optimizeAnimations();
    const cleanupLazyLoad = lazyLoadImages();
    const optimizedScroll = optimizeScrolling();
    
    window.addEventListener('scroll', optimizedScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', optimizedScroll);
      cleanupLazyLoad();
    };
  }, [optimizeAnimations, lazyLoadImages, optimizeScrolling]);

  return {
    optimizeScrolling,
    lazyLoadImages,
    optimizeAnimations
  };
};