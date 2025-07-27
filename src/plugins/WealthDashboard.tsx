import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, PieChart, CreditCard } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface WealthDashboardProps {
  settings?: Record<string, any>;
}

const WealthDashboard: React.FC<WealthDashboardProps> = ({ settings = {} }) => {
  const wealthData = [
    { label: 'Total Portfolio', value: '$125,847', change: '+8.2%', trend: 'up', icon: DollarSign },
    { label: 'Monthly Income', value: '$8,500', change: '+2.1%', trend: 'up', icon: TrendingUp },
    { label: 'Expenses', value: '$3,200', change: '-5.3%', trend: 'down', icon: CreditCard },
    { label: 'Savings Rate', value: '62%', change: '+3.1%', trend: 'up', icon: PieChart },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-green-600" />
          Wealth Dashboard
        </CardTitle>
        <CardDescription>
          Track your financial health and investment performance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {wealthData.map((item, index) => (
            <div key={index} className="p-4 rounded-lg border bg-card">
              <div className="flex items-center justify-between mb-2">
                <item.icon className="h-4 w-4 text-green-600" />
                <Badge variant={item.trend === 'up' ? 'default' : 'secondary'}>
                  {item.change}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">{item.value}</p>
                <p className="text-sm text-muted-foreground">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WealthDashboard;