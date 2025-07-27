import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, BarChart3, Zap, Target } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface MLInsightsProps {
  settings?: Record<string, any>;
}

const MLInsights: React.FC<MLInsightsProps> = ({ settings = {} }) => {
  const insights = [
    { label: 'Model Accuracy', value: 94.7, unit: '%', icon: Target, color: 'text-blue-600' },
    { label: 'Prediction Confidence', value: 87.3, unit: '%', icon: Brain, color: 'text-purple-600' },
    { label: 'Data Quality Score', value: 92.1, unit: '%', icon: BarChart3, color: 'text-green-600' },
    { label: 'Performance Index', value: 89.5, unit: '%', icon: Zap, color: 'text-orange-600' },
  ];

  const recommendations = [
    'Increase dataset size for better accuracy',
    'Consider feature engineering for outliers',
    'Model performance is optimal for production',
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-600" />
          ML Insights
        </CardTitle>
        <CardDescription>
          Machine learning model performance and recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.map((insight, index) => (
              <div key={index} className="p-3 rounded-lg border bg-card">
                <div className="flex items-center gap-2 mb-2">
                  <insight.icon className={`h-4 w-4 ${insight.color}`} />
                  <span className="font-medium text-sm">{insight.label}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">{insight.value}{insight.unit}</span>
                  </div>
                  <Progress value={insight.value} className="h-2" />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4">
            <h4 className="font-medium mb-2">Recommendations</h4>
            <ul className="space-y-2">
              {recommendations.map((rec, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary">•</span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MLInsights;