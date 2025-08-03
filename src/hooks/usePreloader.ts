import { useState, useEffect, useCallback } from 'react';

interface PreloaderOptions {
  minLoadTime?: number;
  images?: string[];
  fonts?: string[];
}

export function usePreloader({
  minLoadTime = 1000,
  images = [],
  fonts = [],
}: PreloaderOptions = {}) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const preloadImage = useCallback((src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      img.src = src;
    });
  }, []);

  const preloadFont = useCallback((fontFamily: string): Promise<void> => {
    return new Promise((resolve) => {
      if (document.fonts && document.fonts.load) {
        document.fonts.load(`16px ${fontFamily}`).then(() => {
          resolve();
        }).catch(() => {
          // ไม่ reject เพราะ font loading ไม่ควรหยุดการทำงาน
          resolve();
        });
      } else {
        resolve();
      }
    });
  }, []);

  useEffect(() => {
    const startTime = Date.now();
    
    const loadResources = async () => {
      try {
        const totalTasks = images.length + fonts.length;
        let completedTasks = 0;

        const updateProgress = () => {
          completedTasks++;
          setProgress((completedTasks / totalTasks) * 100);
        };

        // Preload images
        const imagePromises = images.map(async (src) => {
          try {
            await preloadImage(src);
            updateProgress();
          } catch (err) {
            console.warn(`Failed to preload image: ${src}`, err);
            updateProgress();
          }
        });

        // Preload fonts
        const fontPromises = fonts.map(async (font) => {
          try {
            await preloadFont(font);
            updateProgress();
          } catch (err) {
            console.warn(`Failed to preload font: ${font}`, err);
            updateProgress();
          }
        });

        await Promise.all([...imagePromises, ...fontPromises]);

        // รอให้ครบเวลาขั้นต่ำ
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadTime - elapsedTime);
        
        if (remainingTime > 0) {
          await new Promise(resolve => setTimeout(resolve, remainingTime));
        }

        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Preload failed');
        setIsLoading(false);
      }
    };

    loadResources();
  }, [images, fonts, minLoadTime, preloadImage, preloadFont]);

  return { isLoading, progress, error };
}