import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  DollarSign,
  Target,
  Calendar as CalendarIcon,
  Download,
  Filter,
  Zap,
  Heart,
  Brain,
  Eye,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Navigation } from '@/components/Navigation';
import { HolographicCard, NeonText } from '@/components/ui/premium-effects';
import { MicroInteraction } from '@/components/ui/micro-interactions';
import { StaggeredFadeIn, AnimatedCounter } from '@/components/ui/enhanced-animations';

interface AnalyticsData {
  healthTrends: {
    date: string;
    score: number;
    steps: number;
    sleep: number;
    heartRate: number;
  }[];
  wealthTrends: {
    date: string;
    portfolio: number;
    savings: number;
    expenses: number;
    income: number;
  }[];
  goals: {
    completed: number;
    pending: number;
    overdue: number;
  };
  insights: {
    type: 'success' | 'warning' | 'info';
    title: string;
    description: string;
    icon: React.ReactNode;
  }[];
}

const Analytics = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [timeRange, setTimeRange] = useState('7d');
  const [activeTab, setActiveTab] = useState('overview');
  
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    healthTrends: [
      { date: '2024-01-01', score: 82, steps: 8200, sleep: 7.2, heartRate: 72 },
      { date: '2024-01-02', score: 85, steps: 9100, sleep: 7.8, heartRate: 70 },
      { date: '2024-01-03', score: 78, steps: 7800, sleep: 6.9, heartRate: 75 },
      { date: '2024-01-04', score: 88, steps: 10200, sleep: 8.1, heartRate: 68 },
      { date: '2024-01-05', score: 83, steps: 8900, sleep: 7.5, heartRate: 71 },
      { date: '2024-01-06', score: 91, steps: 11000, sleep: 8.3, heartRate: 67 },
      { date: '2024-01-07', score: 86, steps: 9500, sleep: 7.7, heartRate: 69 }
    ],
    wealthTrends: [
      { date: '2024-01-01', portfolio: 120000, savings: 24000, expenses: 3200, income: 8500 },
      { date: '2024-01-02', portfolio: 121500, savings: 24200, expenses: 180, income: 0 },
      { date: '2024-01-03', portfolio: 119800, savings: 24200, expenses: 450, income: 0 },
      { date: '2024-01-04', portfolio: 123200, savings: 24200, expenses: 890, income: 0 },
      { date: '2024-01-05', portfolio: 124100, savings: 24400, expenses: 320, income: 1200 },
      { date: '2024-01-06', portfolio: 125600, savings: 24600, expenses: 560, income: 0 },
      { date: '2024-01-07', portfolio: 126300, savings: 24800, expenses: 420, income: 0 }
    ],
    goals: {
      completed: 12,
      pending: 5,
      overdue: 2
    },
    insights: [
      {
        type: 'success',
        title: 'Health Score Improvement',
        description: 'Your average health score increased by 8% this week',
        icon: <TrendingUp className="w-5 h-5" />
      },
      {
        type: 'warning',
        title: 'Sleep Pattern Alert',
        description: 'Consider maintaining consistent sleep schedule',
        icon: <AlertCircle className="w-5 h-5" />
      },
      {
        type: 'info',
        title: 'Investment Opportunity',
        description: 'Portfolio performance suggests diversification potential',
        icon: <DollarSign className="w-5 h-5" />
      }
    ]
  });

  const healthMetrics = [
    { label: 'Avg Health Score', value: 85, change: 8, icon: Heart, color: '#ff006e' },
    { label: 'Daily Steps', value: 9257, change: 12, icon: Activity, color: '#8338ec' },
    { label: 'Sleep Quality', value: 7.6, change: 5, icon: Brain, color: '#3a86ff' },
    { label: 'Heart Rate', value: 70, change: -3, icon: Zap, color: '#06ffa5' }
  ];

  const wealthMetrics = [
    { label: 'Portfolio Value', value: 125000, change: 5.2, icon: TrendingUp, color: '#06ffa5' },
    { label: 'Monthly Savings', value: 2400, change: 15, icon: DollarSign, color: '#8338ec' },
    { label: 'Avg Expenses', value: 520, change: -8, icon: TrendingDown, color: '#ff006e' },
    { label: 'ROI', value: 8.5, change: 2.1, icon: BarChart3, color: '#3a86ff' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-10">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="mb-8">
            <StaggeredFadeIn delay={100}>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">
                    <NeonText text="Analytics Dashboard" color="#00ff88" />
                  </h1>
                  <p className="text-muted-foreground">
                    Deep insights into your health and wealth patterns
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7d">7 Days</SelectItem>
                      <SelectItem value="30d">30 Days</SelectItem>
                      <SelectItem value="90d">90 Days</SelectItem>
                      <SelectItem value="1y">1 Year</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-40 justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  
                  <MicroInteraction type="hover-glow">
                    <Button variant="outline" size="icon">
                      <Download className="w-4 h-4" />
                    </Button>
                  </MicroInteraction>
                </div>
              </div>
            </StaggeredFadeIn>
          </div>

          {/* Key Insights */}
          <StaggeredFadeIn delay={150}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {analyticsData.insights.map((insight, index) => (
                <MicroInteraction key={index} type="hover-lift">
                  <HolographicCard className="p-6">
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        insight.type === 'success' && "bg-green-500/20 text-green-500",
                        insight.type === 'warning' && "bg-yellow-500/20 text-yellow-500",
                        insight.type === 'info' && "bg-blue-500/20 text-blue-500"
                      )}>
                        {insight.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{insight.title}</h3>
                        <p className="text-sm text-muted-foreground">{insight.description}</p>
                      </div>
                    </div>
                  </HolographicCard>
                </MicroInteraction>
              ))}
            </div>
          </StaggeredFadeIn>

          {/* Main Analytics Tabs */}
          <StaggeredFadeIn delay={200}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="health">Health Analytics</TabsTrigger>
                <TabsTrigger value="wealth">Wealth Analytics</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                {/* Health Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-red-500" />
                      Health Metrics Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {healthMetrics.map((metric, index) => (
                        <MicroInteraction key={metric.label} type="tilt">
                          <div className="text-center space-y-3">
                            <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center" 
                                 style={{ backgroundColor: `${metric.color}20` }}>
                              <metric.icon className="w-8 h-8" style={{ color: metric.color }} />
                            </div>
                            <div>
                              <div className="text-2xl font-bold">
                                <AnimatedCounter 
                                  from={0} 
                                  to={metric.value} 
                                  formatter={(val) => 
                                    metric.label.includes('Steps') ? val.toLocaleString() :
                                    metric.label.includes('Sleep') ? `${val.toFixed(1)}h` :
                                    val.toString()
                                  }
                                />
                              </div>
                              <div className="text-sm text-muted-foreground">{metric.label}</div>
                              <div className={cn(
                                "text-xs flex items-center justify-center gap-1",
                                metric.change > 0 ? "text-green-500" : "text-red-500"
                              )}>
                                {metric.change > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                {Math.abs(metric.change)}%
                              </div>
                            </div>
                          </div>
                        </MicroInteraction>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Wealth Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-green-500" />
                      Wealth Metrics Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {wealthMetrics.map((metric, index) => (
                        <MicroInteraction key={metric.label} type="tilt">
                          <div className="text-center space-y-3">
                            <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center" 
                                 style={{ backgroundColor: `${metric.color}20` }}>
                              <metric.icon className="w-8 h-8" style={{ color: metric.color }} />
                            </div>
                            <div>
                              <div className="text-2xl font-bold">
                                <AnimatedCounter 
                                  from={0} 
                                  to={metric.value} 
                                  formatter={(val) => 
                                    metric.label.includes('Portfolio') || metric.label.includes('Savings') || metric.label.includes('Expenses') 
                                      ? `$${val.toLocaleString()}` :
                                    metric.label.includes('ROI') ? `${val.toFixed(1)}%` :
                                    val.toString()
                                  }
                                />
                              </div>
                              <div className="text-sm text-muted-foreground">{metric.label}</div>
                              <div className={cn(
                                "text-xs flex items-center justify-center gap-1",
                                metric.change > 0 ? "text-green-500" : "text-red-500"
                              )}>
                                {metric.change > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                {Math.abs(metric.change)}%
                              </div>
                            </div>
                          </div>
                        </MicroInteraction>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Goals Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-blue-500" />
                      Goals Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <MicroInteraction type="hover-lift">
                        <div className="text-center p-6 rounded-lg bg-green-500/10 border border-green-500/20">
                          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                          <div className="text-3xl font-bold text-green-500 mb-1">
                            <AnimatedCounter from={0} to={analyticsData.goals.completed} />
                          </div>
                          <div className="text-sm text-muted-foreground">Completed Goals</div>
                        </div>
                      </MicroInteraction>

                      <MicroInteraction type="hover-lift">
                        <div className="text-center p-6 rounded-lg bg-blue-500/10 border border-blue-500/20">
                          <Eye className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                          <div className="text-3xl font-bold text-blue-500 mb-1">
                            <AnimatedCounter from={0} to={analyticsData.goals.pending} />
                          </div>
                          <div className="text-sm text-muted-foreground">Pending Goals</div>
                        </div>
                      </MicroInteraction>

                      <MicroInteraction type="hover-lift">
                        <div className="text-center p-6 rounded-lg bg-red-500/10 border border-red-500/20">
                          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
                          <div className="text-3xl font-bold text-red-500 mb-1">
                            <AnimatedCounter from={0} to={analyticsData.goals.overdue} />
                          </div>
                          <div className="text-sm text-muted-foreground">Overdue Goals</div>
                        </div>
                      </MicroInteraction>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Health Analytics Tab */}
              <TabsContent value="health" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Health Score Trend */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Health Score Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center text-muted-foreground">
                        <div className="text-center">
                          <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                          <p>Health score chart visualization</p>
                          <p className="text-sm">Would integrate with chart library</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Activity Breakdown */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Activity Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { activity: 'Walking', percentage: 45, color: '#ff006e' },
                          { activity: 'Exercise', percentage: 25, color: '#8338ec' },
                          { activity: 'Rest', percentage: 20, color: '#3a86ff' },
                          { activity: 'Other', percentage: 10, color: '#06ffa5' }
                        ].map((item) => (
                          <div key={item.activity} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>{item.activity}</span>
                              <span>{item.percentage}%</span>
                            </div>
                            <Progress value={item.percentage} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Wealth Analytics Tab */}
              <TabsContent value="wealth" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Portfolio Performance */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Portfolio Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center text-muted-foreground">
                        <div className="text-center">
                          <TrendingUp className="w-12 h-12 mx-auto mb-2" />
                          <p>Portfolio performance chart</p>
                          <p className="text-sm">Would integrate with chart library</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Expense Categories */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Expense Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { category: 'Food & Dining', amount: 450, percentage: 35, color: '#ff006e' },
                          { category: 'Transportation', amount: 200, percentage: 25, color: '#8338ec' },
                          { category: 'Entertainment', amount: 150, percentage: 20, color: '#3a86ff' },
                          { category: 'Shopping', amount: 100, percentage: 15, color: '#06ffa5' },
                          { category: 'Other', amount: 50, percentage: 5, color: '#ffbe0b' }
                        ].map((item) => (
                          <div key={item.category} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>{item.category}</span>
                              <span>${item.amount}</span>
                            </div>
                            <Progress value={item.percentage} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </StaggeredFadeIn>
        </div>
      </div>
    </div>
  );
};

export default Analytics;