import { lazy, Suspense, ComponentType } from 'react';
import { LoadingSkeleton } from './loading-skeleton';
import { ErrorBoundary } from './error-boundary';

interface LazyComponentProps {
  loader: () => Promise<{ default: ComponentType<any> }>;
  fallback?: React.ReactNode;
  errorFallback?: ComponentType<{ error?: Error; retry: () => void }>;
  [key: string]: any;
}

export function LazyComponent({
  loader,
  fallback,
  errorFallback,
  ...props
}: LazyComponentProps) {
  const Component = lazy(loader);

  const defaultFallback = fallback || (
    <div className="w-full h-64 flex items-center justify-center">
      <LoadingSkeleton variant="card" />
    </div>
  );

  return (
    <ErrorBoundary fallback={errorFallback}>
      <Suspense fallback={defaultFallback}>
        <Component {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}

// Helper function สำหรับสร้าง lazy component ที่มี preloading
export function createLazyComponent<T = {}>(
  loader: () => Promise<{ default: ComponentType<T> }>,
  preloadDelay = 2000
) {
  const LazyComp = lazy(loader);

  // Preload component หลังจากหน่วงเวลา
  setTimeout(() => {
    loader().catch(() => {
      // Silent fail for preloading
    });
  }, preloadDelay);

  return LazyComp;
}