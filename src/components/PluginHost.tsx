import React, { Suspense, lazy, useMemo } from 'react';
import { usePlugins } from '@/contexts/PluginContext';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

// Plugin registry for dynamic imports
const pluginRegistry = {
  'analytics-widget': () => import('@/plugins/AnalyticsWidget'),
  'health-tracker': () => import('@/plugins/HealthTracker'),
  'wealth-dashboard': () => import('@/plugins/WealthDashboard'),
  'security-monitor': () => import('@/plugins/SecurityMonitor'),
  'ml-insights': () => import('@/plugins/MLInsights'),
};

interface PluginHostProps {
  slot: string;
  className?: string;
  fallback?: React.ReactNode;
}

export function PluginHost({ slot, className = '', fallback }: PluginHostProps) {
  const { enabledPlugins } = usePlugins();

  // Filter plugins for this slot
  const slotPlugins = useMemo(() => 
    enabledPlugins.filter(plugin => 
      plugin.settings?.slots?.includes(slot) || slot === 'default'
    ), [enabledPlugins, slot]
  );

  if (slotPlugins.length === 0) {
    return fallback ? <>{fallback}</> : null;
  }

  return (
    <div className={`plugin-host plugin-slot-${slot} ${className}`}>
      {slotPlugins.map(plugin => (
        <PluginRenderer key={plugin.id} plugin={plugin} />
      ))}
    </div>
  );
}

interface PluginRendererProps {
  plugin: any;
}

function PluginRenderer({ plugin }: PluginRendererProps) {
  const PluginComponent = useMemo(() => {
    const importFn = pluginRegistry[plugin.id as keyof typeof pluginRegistry];
    if (!importFn) {
      console.warn(`Plugin ${plugin.id} not found in registry`);
      return null;
    }
    return lazy(importFn);
  }, [plugin.id]);

  if (!PluginComponent) {
    return (
      <Alert variant="destructive" className="m-2">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Plugin "{plugin.name}" failed to load
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div 
      className={`plugin-container plugin-${plugin.id}`}
      style={{
        '--plugin-primary': plugin.settings?.theme?.primary || 'var(--primary)',
        '--plugin-secondary': plugin.settings?.theme?.secondary || 'var(--secondary)',
      } as React.CSSProperties}
    >
      <Suspense 
        fallback={
          <div className="p-4">
            <Skeleton className="h-8 w-full mb-2" />
            <Skeleton className="h-32 w-full" />
          </div>
        }
      >
        <PluginComponent settings={plugin.settings} />
      </Suspense>
    </div>
  );
}