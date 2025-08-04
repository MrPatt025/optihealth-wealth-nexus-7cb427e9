import { useEffect, useCallback, useRef } from 'react';

export const useAdvancedPerformance = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const mutationObserverRef = useRef<MutationObserver | null>(null);

  // Resource preloading
  const preloadResources = useCallback((urls: string[]) => {
    urls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      document.head.appendChild(link);
    });
  }, []);

  // Optimize DOM mutations
  const optimizeDOMUpdates = useCallback(() => {
    let pendingUpdates: (() => void)[] = [];
    let rafId: number | null = null;

    const flushUpdates = () => {
      pendingUpdates.forEach(update => update());
      pendingUpdates = [];
      rafId = null;
    };

    return (update: () => void) => {
      pendingUpdates.push(update);
      if (!rafId) {
        rafId = requestAnimationFrame(flushUpdates);
      }
    };
  }, []);

  // Memory cleanup
  const cleanupMemory = useCallback(() => {
    // Clean up event listeners
    const events = ['scroll', 'resize', 'mousemove'];
    events.forEach(event => {
      const listeners = document.querySelectorAll(`[data-${event}-listener]`);
      listeners.forEach(el => {
        const listener = (el as any)[`_${event}Listener`];
        if (listener) {
          el.removeEventListener(event, listener);
          delete (el as any)[`_${event}Listener`];
          el.removeAttribute(`data-${event}-listener`);
        }
      });
    });

    // Clean up unused DOM nodes
    const unusedNodes = document.querySelectorAll('[data-cleanup]');
    unusedNodes.forEach(node => node.remove());
  }, []);

  // Virtual scrolling for large lists
  const createVirtualScroller = useCallback((
    container: HTMLElement,
    items: any[],
    itemHeight: number,
    renderItem: (item: any, index: number) => HTMLElement
  ) => {
    const visibleCount = Math.ceil(container.offsetHeight / itemHeight) + 2;
    let startIndex = 0;

    const updateVisibleItems = () => {
      const scrollTop = container.scrollTop;
      startIndex = Math.floor(scrollTop / itemHeight);
      
      const endIndex = Math.min(startIndex + visibleCount, items.length);
      
      container.innerHTML = '';
      
      // Add spacer for items before visible range
      if (startIndex > 0) {
        const spacer = document.createElement('div');
        spacer.style.height = `${startIndex * itemHeight}px`;
        container.appendChild(spacer);
      }
      
      // Render visible items
      for (let i = startIndex; i < endIndex; i++) {
        const item = renderItem(items[i], i);
        container.appendChild(item);
      }
      
      // Add spacer for items after visible range
      if (endIndex < items.length) {
        const spacer = document.createElement('div');
        spacer.style.height = `${(items.length - endIndex) * itemHeight}px`;
        container.appendChild(spacer);
      }
    };

    container.addEventListener('scroll', updateVisibleItems, { passive: true });
    updateVisibleItems();

    return () => {
      container.removeEventListener('scroll', updateVisibleItems);
    };
  }, []);

  // Image optimization
  const optimizeImages = useCallback(() => {
    const images = document.querySelectorAll('img[data-optimize]');
    
    images.forEach((img: Element) => {
      const imgElement = img as HTMLImageElement;
      
      // Add loading="lazy" if not present
      if (!imgElement.loading) {
        imgElement.loading = 'lazy';
      }
      
      // Convert to WebP if supported
      if ('WebP' in window && (imgElement.src.includes('.jpg') || imgElement.src.includes('.png'))) {
        const webpSrc = imgElement.src.replace(/\.(jpg|png)$/, '.webp');
        imgElement.src = webpSrc;
      }
      
      // Add intersection observer for fade-in effect
      if (!observerRef.current) {
        observerRef.current = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-fade-in');
              observerRef.current?.unobserve(entry.target);
            }
          });
        });
      }
      
      observerRef.current.observe(imgElement);
    });
  }, []);

  // Performance monitoring with throttling
  const monitorPerformance = useCallback(() => {
    let longTaskCount = 0;
    let memoryCheckInterval: number | null = null;
    
    // Monitor long tasks with throttling
    if ('PerformanceObserver' in window) {
      const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 100) { // Increased threshold to reduce noise
            longTaskCount++;
            if (longTaskCount <= 3) { // Limit logging to prevent spam
              console.warn('Performance: Long task detected', { 
                duration: Math.round(entry.duration), 
                name: entry.name 
              });
            }
          }
        }
      });
      
      try {
        longTaskObserver.observe({ entryTypes: ['longtask'] });
      } catch (e) {
        console.debug('Long task monitoring not supported');
      }
    }

    // Optimized memory monitoring
    if ('memory' in performance) {
      const checkMemory = () => {
        try {
          const memory = (performance as any).memory;
          const usage = memory.usedJSHeapSize / memory.totalJSHeapSize;
          
          if (usage > 0.85) { // Lower threshold for earlier cleanup
            console.debug('Memory usage high:', Math.round(usage * 100) + '%');
            cleanupMemory();
            
            // Force garbage collection if available
            if ('gc' in window && typeof (window as any).gc === 'function') {
              (window as any).gc();
            }
          }
        } catch (e) {
          console.debug('Memory monitoring failed');
        }
      };
      
      memoryCheckInterval = window.setInterval(checkMemory, 60000); // Check every minute
    }

    return () => {
      if (memoryCheckInterval) {
        clearInterval(memoryCheckInterval);
      }
    };
  }, [cleanupMemory]);

  useEffect(() => {
    optimizeImages();
    const cleanupMonitoring = monitorPerformance();
    
    return () => {
      observerRef.current?.disconnect();
      mutationObserverRef.current?.disconnect();
      cleanupMemory();
      cleanupMonitoring?.();
    };
  }, [optimizeImages, monitorPerformance, cleanupMemory]);

  return {
    preloadResources,
    optimizeDOMUpdates,
    cleanupMemory,
    createVirtualScroller,
    optimizeImages,
    monitorPerformance
  };
};