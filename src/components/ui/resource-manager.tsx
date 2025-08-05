import { useEffect } from 'react';

export function ResourceManager() {
  useEffect(() => {
    // Skip resource management in development to prevent file watcher issues
    if (import.meta.env.DEV) {
      return;
    }

    // Optimized cleanup - target specific cleanup tasks
    const cleanup = () => {
      try {
        // Clean up marked elements
        const removedElements = document.querySelectorAll('[data-removed]');
        removedElements.forEach(el => el.remove());
      } catch (e) {
        // Silent fail to prevent crashes
      }
    };

    const interval = setInterval(cleanup, 60000); // Every minute instead of 30 seconds

    return () => clearInterval(interval);
  }, []);

  return null;
}