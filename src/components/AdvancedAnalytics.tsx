import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, TrendingUp, TrendingDown, Target, DollarSign, Heart, Activity, Download, Share2, Filter } from "lucide-react";
import { SplitText } from "@/components/ui/split-text";
import { FadeInText } from "@/components/ui/fade-in-text";
import { Typewriter } from "@/components/ui/typewriter";
import { MagicCard } from "@/components/ui/magic-card";

const healthData = [
  { date: '2024-01', steps: 8200, sleep: 7.2, stress: 3.1, weight: 70 },
  { date: '2024-02', steps: 8650, sleep: 7.5, stress: 2.8, weight: 69.5 },
  { date: '2024-03', steps: 9100, sleep: 7.8, stress: 2.5, weight: 69 },
  { date: '2024-04', steps: 9350, sleep: 8.1, stress: 2.2, weight: 68.5 },
  { date: '2024-05', steps: 9800, sleep: 8.3, stress: 2.0, weight: 68 },
  { date: '2024-06', steps: 10200, sleep: 8.0, stress: 2.3, weight: 67.8 },
];

const financialData = [
  { date: '2024-01', income: 5500, expenses: 4200, savings: 1300, investments: 800 },
  { date: '2024-02', income: 5800, expenses: 4100, savings: 1700, investments: 1200 },
  { date: '2024-03', income: 6000, expenses: 4300, savings: 1700, investments: 1400 },
  { date: '2024-04', income: 6200, expenses: 4500, savings: 1700, investments: 1600 },
  { date: '2024-05', income: 6500, expenses: 4600, savings: 1900, investments: 1800 },
  { date: '2024-06', income: 6800, expenses: 4700, savings: 2100, investments: 2000 },
];

const goalData = [
  { name: 'Health Goals', completed: 85, total: 100 },
  { name: 'Financial Goals', completed: 72, total: 100 },
  { name: 'Personal Goals', completed: 68, total: 100 },
  { name: 'Career Goals', completed: 91, total: 100 },
];

const spendingCategories = [
  { name: 'Housing', value: 1800, color: '#0ea5e9' },
  { name: 'Food', value: 800, color: '#06b6d4' },
  { name: 'Transport', value: 400, color: '#8b5cf6' },
  { name: 'Entertainment', value: 300, color: '#ec4899' },
  { name: 'Shopping', value: 350, color: '#f59e0b' },
  { name: 'Others', value: 250, color: '#10b981' },
];

export const AdvancedAnalytics = () => {
  const [timeRange, setTimeRange] = useState("6m");
  const [selectedMetric, setSelectedMetric] = useState("all");
  const [insights, setInsights] = useState([
    {
      type: "positive",
      title: "Sleep Quality Improved",
      description: "Your average sleep duration increased by 12% this month",
      impact: "+0.8 hours"
    },
    {
      type: "warning", 
      title: "Spending Alert",
      description: "Entertainment expenses exceeded budget by 15%",
      impact: "+$45"
    },
    {
      type: "achievement",
      title: "Fitness Milestone",
      description: "You've achieved your step goal for 28 consecutive days!",
      impact: "🏆 Streak"
    }
  ]);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <FadeInText direction="up" duration={1} className="flex items-center justify-between">
        <div>
          <SplitText
            text="Advanced Analytics"
            className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent block"
            delay={50}
            duration={0.8}
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
          />
          <FadeInText direction="up" delay={1.5} duration={1}>
            <Typewriter
              text="Deep insights into your health and wealth optimization journey"
              className="text-muted-foreground mt-1"
              speed={30}
              delay={2000}
            />
          </FadeInText>
        </div>
        
        <FadeInText direction="left" delay={2.5} duration={1} className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">1 Month</SelectItem>
              <SelectItem value="3m">3 Months</SelectItem>
              <SelectItem value="6m">6 Months</SelectItem>
              <SelectItem value="1y">1 Year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </FadeInText>
      </FadeInText>

      {/* Key Insights */}
      <FadeInText direction="up" delay={3.5} duration={1}>
        <MagicCard className="hover:shadow-glow transition-all duration-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            AI-Powered Insights
          </CardTitle>
          <CardDescription>
            Personalized recommendations based on your data patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {insights.map((insight, index) => (
              <div key={index} className="p-4 rounded-lg border bg-gradient-to-br from-background to-muted/30">
                <div className="flex items-start justify-between mb-2">
                  <Badge variant={
                    insight.type === "positive" ? "default" : 
                    insight.type === "warning" ? "destructive" : "secondary"
                  }>
                    {insight.type}
                  </Badge>
                  <span className="text-sm font-mono text-primary">{insight.impact}</span>
                </div>
                <h4 className="font-medium mb-1">{insight.title}</h4>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </MagicCard>
      </FadeInText>

      {/* Analytics Tabs */}
      <FadeInText direction="up" delay={4} duration={1.5}>
        <Tabs defaultValue="health" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="health">Health Trends</TabsTrigger>
          <TabsTrigger value="wealth">Wealth Analysis</TabsTrigger>
          <TabsTrigger value="goals">Goal Progress</TabsTrigger>
          <TabsTrigger value="patterns">Patterns</TabsTrigger>
        </TabsList>

        <TabsContent value="health" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Steps Trend</CardTitle>
                <CardDescription>Your step count progression over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={healthData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" className="text-muted-foreground" />
                    <YAxis className="text-muted-foreground" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="steps" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sleep Quality</CardTitle>
                <CardDescription>Average sleep hours and quality trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={healthData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" className="text-muted-foreground" />
                    <YAxis className="text-muted-foreground" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="sleep" 
                      stroke="hsl(var(--primary))" 
                      fill="hsl(var(--primary))"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Stress vs Weight Correlation</CardTitle>
              <CardDescription>Understanding the relationship between stress levels and weight changes</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={healthData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" className="text-muted-foreground" />
                  <YAxis yAxisId="left" className="text-muted-foreground" />
                  <YAxis yAxisId="right" orientation="right" className="text-muted-foreground" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="stress" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    name="Stress Level"
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="weight" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    name="Weight (kg)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wealth" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Income vs Expenses</CardTitle>
                <CardDescription>Monthly financial flow analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={financialData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" className="text-muted-foreground" />
                    <YAxis className="text-muted-foreground" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="income" fill="hsl(var(--primary))" name="Income" />
                    <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Spending Categories</CardTitle>
                <CardDescription>Current month expense breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={spendingCategories}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {spendingCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Savings & Investment Growth</CardTitle>
              <CardDescription>Track your wealth accumulation journey</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={financialData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="savings" 
                    stackId="1"
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary))"
                    fillOpacity={0.6}
                    name="Savings"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="investments" 
                    stackId="1"
                    stroke="#10b981" 
                    fill="#10b981"
                    fillOpacity={0.6}
                    name="Investments"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Goal Achievement Overview</CardTitle>
              <CardDescription>Track progress across all your objectives</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={goalData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis type="number" className="text-muted-foreground" />
                  <YAxis dataKey="name" type="category" className="text-muted-foreground" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar dataKey="completed" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Patterns</CardTitle>
                <CardDescription>Identify patterns in your weekly habits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">Monday</div>
                  <div className="text-sm text-muted-foreground">Most Active Day</div>
                  <div className="mt-2 text-xs">
                    <Badge variant="secondary">+23% Steps</Badge>
                    <Badge variant="secondary" className="ml-2">+15% Productivity</Badge>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">Friday</div>
                  <div className="text-sm text-muted-foreground">Highest Spending</div>
                  <div className="mt-2 text-xs">
                    <Badge variant="destructive">+30% Expenses</Badge>
                    <Badge variant="secondary" className="ml-2">Social Activities</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Correlation Matrix</CardTitle>
                <CardDescription>Discover hidden relationships in your data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Sleep ↔ Productivity</span>
                  <Badge variant="default">+0.87</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Exercise ↔ Mood</span>
                  <Badge variant="default">+0.75</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Stress ↔ Spending</span>
                  <Badge variant="destructive">+0.62</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Savings ↔ Happiness</span>
                  <Badge variant="default">+0.58</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      </FadeInText>
    </div>
  );
};