import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Users, Activity } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AnalyticsWidgetProps {
  settings?: {
    showMetrics?: boolean;
    refreshInterval?: number;
    theme?: {
      primary?: string;
      secondary?: string;
    };
  };
}

const AnalyticsWidget: React.FC<AnalyticsWidgetProps> = ({ settings = {} }) => {
  const { showMetrics = true, refreshInterval = 30000 } = settings;

  // Mock analytics data
  const metrics = [
    { label: 'Active Users', value: '2,847', change: '+12%', icon: Users, color: 'text-blue-600' },
    { label: 'Health Score', value: '94.2', change: '+3.2%', icon: Activity, color: 'text-green-600' },
    { label: 'Engagement', value: '78%', change: '+5.1%', icon: TrendingUp, color: 'text-purple-600' },
    { label: 'Performance', value: '99.9%', change: '+0.1%', icon: BarChart3, color: 'text-orange-600' },
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      // Simulate data refresh
      console.log('Analytics Widget: Refreshing data...');
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  if (!showMetrics) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <p className="text-muted-foreground">Analytics metrics are disabled</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Analytics Dashboard
        </CardTitle>
        <CardDescription>
          Real-time insights and performance metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className="p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
                <Badge variant="secondary" className="text-xs">
                  {metric.change}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">{metric.value}</p>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-xs text-muted-foreground">
          Auto-refresh every {refreshInterval / 1000}s
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsWidget;