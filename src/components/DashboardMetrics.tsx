import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Activity, DollarSign, Heart, Target } from "lucide-react";
import { useEffect, useState } from "react";

interface Metric {
  title: string;
  value: string;
  change: number;
  icon: React.ComponentType<{ className?: string }>;
  trend: 'up' | 'down' | 'neutral';
}

export const DashboardMetrics = () => {
  const [metrics, setMetrics] = useState<Metric[]>([
    {
      title: "Health Score",
      value: "87",
      change: 5.2,
      icon: Heart,
      trend: 'up'
    },
    {
      title: "Savings Rate",
      value: "23%",
      change: 2.1,
      icon: DollarSign,
      trend: 'up'
    },
    {
      title: "Activity Level",
      value: "8,342",
      change: -3.8,
      icon: Activity,
      trend: 'down'
    },
    {
      title: "Goal Progress",
      value: "76%",
      change: 12.5,
      icon: Target,
      trend: 'up'
    }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        change: metric.change + (Math.random() - 0.5) * 2,
        value: metric.title === "Activity Level" 
          ? Math.floor(8000 + Math.random() * 2000).toLocaleString()
          : metric.value
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {metric.title}
            </CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <div className="flex items-center gap-2 mt-2">
              {metric.trend === 'up' ? (
                <TrendingUp className="h-3 w-3 text-success" />
              ) : metric.trend === 'down' ? (
                <TrendingDown className="h-3 w-3 text-destructive" />
              ) : null}
              <Badge 
                variant={metric.trend === 'up' ? 'default' : metric.trend === 'down' ? 'destructive' : 'secondary'}
                className="text-xs"
              >
                {metric.change > 0 ? '+' : ''}{metric.change.toFixed(1)}%
              </Badge>
            </div>
          </CardContent>
          <div 
            className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300" 
          />
        </Card>
      ))}
    </div>
  );
};