import { useEffect, useState } from 'react';
import { maintenanceUtils } from '@/lib/maintenance';

interface HealthStatus {
  performance: any;
  domComplexity: {
    nodeCount: number;
    isHealthy: boolean;
  };
  eventListeners: {
    count: number;
    isHealthy: boolean;
  };
  timestamp: string;
}

export function HealthMonitor() {
  const [health, setHealth] = useState<HealthStatus | null>(null);

  useEffect(() => {
    // Only run in development mode for debugging
    if (import.meta.env.DEV) {
      const checkHealth = () => {
        const status = maintenanceUtils.getHealthStatus();
        setHealth(status);
        
        // Log performance issues
        if (status.performance?.needsCleanup) {
          console.warn('Performance: High memory usage detected', status.performance);
        }
        if (!status.domComplexity.isHealthy) {
          console.warn('DOM: High node count detected', status.domComplexity);
        }
        if (!status.eventListeners.isHealthy) {
          console.warn('Events: High listener count detected', status.eventListeners);
        }
      };

      checkHealth();
      const interval = setInterval(checkHealth, 30000); // Check every 30 seconds in dev

      return () => clearInterval(interval);
    }
  }, []);

  // Only render in development
  if (import.meta.env.PROD || !health) {
    return null;
  }

  const getHealthColor = (isHealthy: boolean) => 
    isHealthy ? 'text-green-500' : 'text-red-500';

  return (
    <div className="fixed bottom-4 right-4 p-3 bg-card border border-border rounded-lg text-xs z-50 max-w-xs">
      <div className="font-semibold mb-2">App Health (Dev)</div>
      
      {health.performance && (
        <div className="mb-1">
          <span className={getHealthColor(!health.performance.needsCleanup)}>
            Memory: {health.performance.memoryUsage}%
          </span>
          <span className="text-muted-foreground ml-2">
            ({health.performance.usedMemory}MB)
          </span>
        </div>
      )}
      
      <div className="mb-1">
        <span className={getHealthColor(health.domComplexity.isHealthy)}>
          DOM: {health.domComplexity.nodeCount} nodes
        </span>
      </div>
      
      <div className="mb-1">
        <span className={getHealthColor(health.eventListeners.isHealthy)}>
          Events: {health.eventListeners.count} listeners
        </span>
      </div>
      
      <div className="text-muted-foreground text-xs">
        {new Date(health.timestamp).toLocaleTimeString()}
      </div>
    </div>
  );
}