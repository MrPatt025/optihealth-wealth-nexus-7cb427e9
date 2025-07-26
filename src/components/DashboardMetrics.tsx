import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Activity, DollarSign, Heart, Target } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatedIcon } from "@/components/ui/animated-icon";
import { EnhancedCard } from "@/components/ui/enhanced-card";

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
        <EnhancedCard 
          key={index} 
          variant="glow" 
          animation="tilt"
          glowColor={metric.trend === 'up' ? 'success' : metric.trend === 'down' ? 'warning' : 'primary'}
          className="relative overflow-hidden group"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {metric.title}
            </CardTitle>
            <AnimatedIcon
              icon={metric.icon as any}
              size="md"
              variant="pulse"
              color={metric.trend === 'up' ? 'success' : metric.trend === 'down' ? 'warning' : 'primary'}
              hover={true}
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">
              {metric.value}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <AnimatedIcon
                icon={metric.trend === 'up' ? TrendingUp : TrendingDown}
                size="sm"
                variant="bounce"
                color={metric.trend === 'up' ? 'success' : 'warning'}
                hover={true}
              />
              <Badge 
                variant={metric.trend === 'up' ? 'default' : metric.trend === 'down' ? 'destructive' : 'secondary'}
                className="text-xs animate-fade-in group-hover:shadow-md transition-all duration-300"
              >
                {metric.change > 0 ? '+' : ''}{metric.change.toFixed(1)}%
              </Badge>
            </div>
          </CardContent>
          
          {/* Enhanced visual effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute -inset-1 bg-gradient-primary opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 -z-10" />
        </EnhancedCard>
      ))}
    </div>
  );
};