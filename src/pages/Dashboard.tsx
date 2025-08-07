import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Activity, 
  DollarSign, 
  TrendingUp, 
  Heart, 
  Brain, 
  Target,
  Clock,
  Bell,
  Settings,
  ChevronRight,
  Calendar,
  MapPin,
  Users,
  Award,
  Zap
} from 'lucide-react';
import { HolographicCard, NeonText } from '@/components/ui/premium-effects';
import { MicroInteraction } from '@/components/ui/micro-interactions';
import { StaggeredFadeIn, AnimatedCounter } from '@/components/ui/enhanced-animations';
import { Navigation } from '@/components/Navigation';

interface DashboardStats {
  health: {
    score: number;
    steps: number;
    heartRate: number;
    sleep: number;
  };
  wealth: {
    portfolio: number;
    growth: number;
    savings: number;
    investments: number;
  };
  goals: {
    completed: number;
    total: number;
    streaks: number;
  };
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
  progress: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    health: {
      score: 85,
      steps: 8432,
      heartRate: 72,
      sleep: 7.5
    },
    wealth: {
      portfolio: 125000,
      growth: 8.5,
      savings: 25000,
      investments: 100000
    },
    goals: {
      completed: 12,
      total: 15,
      streaks: 7
    }
  });

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'Health Champion',
      description: 'Maintain 80+ health score for 7 days',
      icon: <Heart className="w-6 h-6" />,
      earned: true,
      progress: 100
    },
    {
      id: '2',
      title: 'Investment Guru',
      description: 'Achieve 10% portfolio growth',
      icon: <TrendingUp className="w-6 h-6" />,
      earned: false,
      progress: 85
    },
    {
      id: '3',
      title: 'Goal Master',
      description: 'Complete 15 goals this month',
      icon: <Target className="w-6 h-6" />,
      earned: false,
      progress: 80
    }
  ]);

  const quickActions = [
    { label: 'Log Workout', icon: Activity, color: '#ff006e' },
    { label: 'Check Investments', icon: DollarSign, color: '#8338ec' },
    { label: 'Set Goal', icon: Target, color: '#3a86ff' },
    { label: 'View Analytics', icon: Brain, color: '#06ffa5' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-10">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="mb-8">
            <StaggeredFadeIn delay={100}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    Welcome back, <NeonText text="Alex" color="#00ff88" />
                  </h1>
                  <p className="text-muted-foreground">
                    Here's your health and wealth overview for today
                  </p>
                </div>
                <MicroInteraction type="hover-glow">
                  <Button variant="outline" size="icon">
                    <Settings className="w-5 h-5" />
                  </Button>
                </MicroInteraction>
              </div>
            </StaggeredFadeIn>
          </div>

          {/* Main Stats Grid */}
          <StaggeredFadeIn delay={150}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Health Score */}
              <MicroInteraction type="tilt">
                <HolographicCard className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Heart className="w-8 h-8 text-red-500" />
                    <Badge variant="secondary">Health</Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold">
                      <AnimatedCounter from={0} to={stats.health.score} />%
                    </p>
                    <p className="text-sm text-muted-foreground">Health Score</p>
                    <Progress value={stats.health.score} className="h-2" />
                  </div>
                </HolographicCard>
              </MicroInteraction>

              {/* Portfolio Value */}
              <MicroInteraction type="tilt">
                <HolographicCard className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <DollarSign className="w-8 h-8 text-green-500" />
                    <Badge variant="secondary">Wealth</Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold">
                      $<AnimatedCounter from={0} to={stats.wealth.portfolio} formatter={(val) => val.toLocaleString()} />
                    </p>
                    <p className="text-sm text-muted-foreground">Portfolio Value</p>
                    <div className="flex items-center text-green-500 text-sm">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +{stats.wealth.growth}% this month
                    </div>
                  </div>
                </HolographicCard>
              </MicroInteraction>

              {/* Goals Progress */}
              <MicroInteraction type="tilt">
                <HolographicCard className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Target className="w-8 h-8 text-blue-500" />
                    <Badge variant="secondary">Goals</Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold">
                      <AnimatedCounter from={0} to={stats.goals.completed} />/{stats.goals.total}
                    </p>
                    <p className="text-sm text-muted-foreground">Goals Completed</p>
                    <Progress value={(stats.goals.completed / stats.goals.total) * 100} className="h-2" />
                  </div>
                </HolographicCard>
              </MicroInteraction>

              {/* Current Streak */}
              <MicroInteraction type="tilt">
                <HolographicCard className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Zap className="w-8 h-8 text-yellow-500" />
                    <Badge variant="secondary">Streak</Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold">
                      <AnimatedCounter from={0} to={stats.goals.streaks} /> days
                    </p>
                    <p className="text-sm text-muted-foreground">Current Streak</p>
                    <div className="text-yellow-500 text-sm">🔥 Keep it up!</div>
                  </div>
                </HolographicCard>
              </MicroInteraction>
            </div>
          </StaggeredFadeIn>

          {/* Main Content Tabs */}
          <StaggeredFadeIn delay={200}>
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="health">Health</TabsTrigger>
                <TabsTrigger value="wealth">Wealth</TabsTrigger>
                <TabsTrigger value="goals">Goals</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Quick Actions */}
                  <div className="lg:col-span-1">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Zap className="w-5 h-5" />
                          Quick Actions
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {quickActions.map((action, index) => (
                          <MicroInteraction key={action.label} type="magnetic">
                            <Button
                              variant="ghost"
                              className="w-full justify-start hover:bg-primary/10"
                            >
                              <action.icon 
                                className="w-4 h-4 mr-3" 
                                style={{ color: action.color }}
                              />
                              {action.label}
                              <ChevronRight className="w-4 h-4 ml-auto" />
                            </Button>
                          </MicroInteraction>
                        ))}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recent Activity */}
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Activity className="w-5 h-5" />
                          Recent Activity
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { 
                              action: 'Completed morning workout', 
                              time: '2 hours ago', 
                              icon: Activity,
                              color: '#ff006e'
                            },
                            { 
                              action: 'Investment portfolio updated', 
                              time: '5 hours ago', 
                              icon: DollarSign,
                              color: '#8338ec'
                            },
                            { 
                              action: 'Health goal achieved', 
                              time: '1 day ago', 
                              icon: Heart,
                              color: '#3a86ff'
                            }
                          ].map((item, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                                <item.icon className="w-5 h-5" style={{ color: item.color }} />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium">{item.action}</p>
                                <p className="text-xs text-muted-foreground">{item.time}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Achievements */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {achievements.map((achievement) => (
                        <MicroInteraction key={achievement.id} type="hover-lift">
                          <div className={`p-4 rounded-lg border transition-all ${
                            achievement.earned 
                              ? 'bg-primary/10 border-primary/30' 
                              : 'bg-muted/20 border-muted'
                          }`}>
                            <div className="flex items-center gap-3 mb-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                achievement.earned ? 'bg-primary text-primary-foreground' : 'bg-muted'
                              }`}>
                                {achievement.icon}
                              </div>
                              <div className="flex-1">
                                <h3 className="font-medium text-sm">{achievement.title}</h3>
                                <p className="text-xs text-muted-foreground">{achievement.description}</p>
                              </div>
                            </div>
                            <Progress value={achievement.progress} className="h-1" />
                            <p className="text-xs text-muted-foreground mt-1">
                              {achievement.progress}% complete
                            </p>
                          </div>
                        </MicroInteraction>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Health Tab */}
              <TabsContent value="health">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Steps</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        <AnimatedCounter from={0} to={stats.health.steps} formatter={(val) => val.toLocaleString()} />
                      </div>
                      <Progress value={84} className="mt-2" />
                      <p className="text-xs text-muted-foreground mt-1">84% of daily goal</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Heart Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        <AnimatedCounter from={0} to={stats.health.heartRate} /> BPM
                      </div>
                      <div className="text-green-500 text-sm mt-1">Normal</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Sleep</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        <AnimatedCounter from={0} to={stats.health.sleep} /> hrs
                      </div>
                      <div className="text-blue-500 text-sm mt-1">Good Quality</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Calories</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        <AnimatedCounter from={0} to={2150} />
                      </div>
                      <Progress value={68} className="mt-2" />
                      <p className="text-xs text-muted-foreground mt-1">68% of daily goal</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Wealth Tab */}
              <TabsContent value="wealth">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Total Portfolio</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-green-500">
                        $<AnimatedCounter from={0} to={stats.wealth.portfolio} formatter={(val) => val.toLocaleString()} />
                      </div>
                      <div className="flex items-center text-green-500 text-sm mt-2">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        +${(stats.wealth.portfolio * stats.wealth.growth / 100).toLocaleString()} this month
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Savings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">
                        $<AnimatedCounter from={0} to={stats.wealth.savings} formatter={(val) => val.toLocaleString()} />
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">Emergency fund</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Investments</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">
                        $<AnimatedCounter from={0} to={stats.wealth.investments} formatter={(val) => val.toLocaleString()} />
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">Active investments</div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Goals Tab */}
              <TabsContent value="goals">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { title: 'Lose 5 kg', progress: 60, category: 'Health', color: '#ff006e' },
                      { title: 'Save $10,000', progress: 75, category: 'Wealth', color: '#8338ec' },
                      { title: 'Run 5K daily', progress: 40, category: 'Fitness', color: '#3a86ff' },
                      { title: 'Read 12 books', progress: 83, category: 'Personal', color: '#06ffa5' },
                      { title: 'Invest $5,000', progress: 50, category: 'Finance', color: '#ffbe0b' },
                      { title: 'Meditate daily', progress: 90, category: 'Wellness', color: '#fb5607' }
                    ].map((goal, index) => (
                      <MicroInteraction key={goal.title} type="hover-lift">
                        <Card>
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-sm">{goal.title}</CardTitle>
                              <Badge variant="secondary" style={{ backgroundColor: `${goal.color}20`, color: goal.color }}>
                                {goal.category}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <Progress value={goal.progress} className="mb-2" />
                            <p className="text-xs text-muted-foreground">{goal.progress}% complete</p>
                          </CardContent>
                        </Card>
                      </MicroInteraction>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </StaggeredFadeIn>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;