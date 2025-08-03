import { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle, Clock, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Badge } from './badge';

interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'paint') {
          if (entry.name === 'first-contentful-paint') {
            setMetrics(prev => ({ ...prev, fcp: entry.startTime }));
          }
        }
        
        if (entry.entryType === 'largest-contentful-paint') {
          setMetrics(prev => ({ ...prev, lcp: entry.startTime }));
        }
        
        if (entry.entryType === 'first-input') {
          setMetrics(prev => ({ ...prev, fid: (entry as any).processingStart - entry.startTime }));
        }
        
        if (entry.entryType === 'layout-shift') {
          setMetrics(prev => ({ 
            ...prev, 
            cls: (prev.cls || 0) + (entry as any).value 
          }));
        }
      }
    });

    observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift'] });

    // TTFB from Navigation Timing
    const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navEntry) {
      setMetrics(prev => ({ 
        ...prev, 
        ttfb: navEntry.responseStart - navEntry.requestStart 
      }));
    }

    return () => observer.disconnect();
  }, []);

  const getScoreColor = (metric: string, value: number) => {
    const thresholds: Record<string, { good: number; poor: number }> = {
      fcp: { good: 1800, poor: 3000 },
      lcp: { good: 2500, poor: 4000 },
      fid: { good: 100, poor: 300 },
      cls: { good: 0.1, poor: 0.25 },
      ttfb: { good: 600, poor: 1500 },
    };

    const threshold = thresholds[metric];
    if (!threshold) return 'default';

    if (value <= threshold.good) return 'success';
    if (value <= threshold.poor) return 'warning';
    return 'destructive';
  };

  const formatValue = (metric: string, value: number) => {
    if (metric === 'cls') return value.toFixed(3);
    return `${Math.round(value)}ms`;
  };

  if (process.env.NODE_ENV !== 'development' || !isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50"
        title="Show Performance Metrics"
      >
        <Zap className="w-5 h-5" />
      </button>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 shadow-xl z-50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Performance</CardTitle>
        <button
          onClick={() => setIsVisible(false)}
          className="text-muted-foreground hover:text-foreground"
        >
          ×
        </button>
      </CardHeader>
      <CardContent className="space-y-2">
        {Object.entries(metrics).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <span className="text-sm font-medium uppercase">{key}</span>
            <Badge variant={getScoreColor(key, value) as any}>
              {formatValue(key, value)}
            </Badge>
          </div>
        ))}
        
        {Object.keys(metrics).length === 0 && (
          <div className="text-center text-muted-foreground text-sm py-4">
            <Clock className="w-4 h-4 mx-auto mb-2" />
            กำลังวัดประสิทธิภาพ...
          </div>
        )}
      </CardContent>
    </Card>
  );
}