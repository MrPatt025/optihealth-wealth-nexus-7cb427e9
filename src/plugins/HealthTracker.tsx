import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Activity, Target, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

interface HealthTrackerProps {
  settings?: {
    trackSteps?: boolean;
    trackHeartRate?: boolean;
    dailyGoals?: {
      steps: number;
      calories: number;
      water: number;
    };
  };
}

const HealthTracker: React.FC<HealthTrackerProps> = ({ settings = {} }) => {
  const { trackSteps = true, trackHeartRate = true, dailyGoals = { steps: 10000, calories: 2000, water: 8 } } = settings;
  
  const [currentData] = useState({
    steps: 7543,
    heartRate: 72,
    calories: 1678,
    water: 6,
    activeMinutes: 45,
  });

  const healthMetrics = [
    {
      label: 'Steps Today',
      value: currentData.steps.toLocaleString(),
      goal: dailyGoals.steps.toLocaleString(),
      progress: (currentData.steps / dailyGoals.steps) * 100,
      icon: Activity,
      color: 'text-blue-600',
      enabled: trackSteps,
    },
    {
      label: 'Heart Rate',
      value: `${currentData.heartRate} bpm`,
      goal: 'Normal',
      progress: 85,
      icon: Heart,
      color: 'text-red-600',
      enabled: trackHeartRate,
    },
    {
      label: 'Calories Burned',
      value: currentData.calories.toLocaleString(),
      goal: dailyGoals.calories.toLocaleString(),
      progress: (currentData.calories / dailyGoals.calories) * 100,
      icon: Target,
      color: 'text-orange-600',
      enabled: true,
    },
    {
      label: 'Water Intake',
      value: `${currentData.water} glasses`,
      goal: `${dailyGoals.water} glasses`,
      progress: (currentData.water / dailyGoals.water) * 100,
      icon: Clock,
      color: 'text-cyan-600',
      enabled: true,
    },
  ];

  const enabledMetrics = healthMetrics.filter(metric => metric.enabled);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-red-600" />
          Health Tracker
        </CardTitle>
        <CardDescription>
          Monitor your daily health and wellness goals
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {enabledMetrics.map((metric, index) => (
            <div key={index} className="p-4 rounded-lg border bg-card">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <metric.icon className={`h-4 w-4 ${metric.color}`} />
                  <span className="font-medium">{metric.label}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Goal: {metric.goal}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{metric.value}</span>
                  <span className="text-sm text-muted-foreground">
                    {Math.round(metric.progress)}%
                  </span>
                </div>
                <Progress value={metric.progress} className="h-2" />
              </div>
            </div>
          ))}
          
          <div className="flex gap-2 mt-4">
            <Button size="sm" variant="outline" className="flex-1">
              Log Activity
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              View History
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthTracker;