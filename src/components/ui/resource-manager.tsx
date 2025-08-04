import { useEffect } from 'react';

export function ResourceManager() {
  useEffect(() => {
    // Cleanup unused resources periodically
    const cleanup = () => {
      // Clean up unused images
      const images = document.querySelectorAll('img[data-cleanup]');
      images.forEach(img => {
        const rect = img.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight + 1000 && rect.bottom > -1000;
        if (!isVisible) {
          img.removeAttribute('src');
          img.setAttribute('data-cleanup', 'true');
        }
      });

      // Clean up event listeners on removed elements
      const removedElements = document.querySelectorAll('[data-removed]');
      removedElements.forEach(el => el.remove());
    };

    const interval = setInterval(cleanup, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return null;
}