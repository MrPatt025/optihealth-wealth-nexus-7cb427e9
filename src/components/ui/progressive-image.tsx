import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ProgressiveImageProps {
  src: string;
  placeholder?: string;
  alt: string;
  className?: string;
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function ProgressiveImage({
  src,
  placeholder,
  alt,
  className,
  blurDataURL,
  onLoad,
  onError,
}: ProgressiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <div ref={imgRef} className={cn("relative overflow-hidden", className)}>
      {/* Placeholder/Blur */}
      {!isLoaded && !hasError && (
        <div 
          className={cn(
            "absolute inset-0 bg-muted loading-shimmer",
            blurDataURL && "bg-center bg-cover"
          )}
          style={blurDataURL ? { 
            backgroundImage: `url(${blurDataURL})`,
            filter: 'blur(20px)',
            transform: 'scale(1.1)'
          } : undefined}
        />
      )}

      {/* Main Image */}
      {isInView && (
        <img
          src={hasError ? placeholder || '/placeholder.svg' : src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-500",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
        />
      )}

      {/* Error State */}
      {hasError && !placeholder && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <span className="text-muted-foreground text-sm">ไม่สามารถโหลดรูปภาพได้</span>
        </div>
      )}
    </div>
  );
}