import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Heart, DollarSign, Target, Zap, ArrowUpRight, ArrowDownRight } from "lucide-react";

const healthMetrics = [
  { label: "Sleep Quality", value: 85, trend: "up", color: "text-success" },
  { label: "Nutrition Score", value: 72, trend: "up", color: "text-primary-glow" },
  { label: "Stress Level", value: 34, trend: "down", color: "text-warning" },
  { label: "Activity Level", value: 91, trend: "up", color: "text-accent" }
];

const financeMetrics = [
  { label: "Savings Rate", value: "$2,340", change: "+12.5%", trend: "up" },
  { label: "Investment ROI", value: "8.4%", change: "+2.1%", trend: "up" },
  { label: "Health Spending", value: "$480", change: "-15%", trend: "down" },
  { label: "Emergency Fund", value: "$12K", change: "+5%", trend: "up" }
];

export const DashboardPreview = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Your Unified Command Center
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Instagram-style feeds meet TikTok engagement with powerful analytics. 
            See how your health and wealth interconnect in real-time.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Health Dashboard */}
          <Card className="lg:col-span-1 bg-gradient-card border-border/50 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Heart className="h-5 w-5 text-destructive" />
                Health Optimization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <div className="text-3xl font-bold text-foreground mb-1">78</div>
                <div className="text-sm text-muted-foreground">Wellness Score</div>
                <div className="flex items-center justify-center gap-1 text-success text-sm mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +5% this week
                </div>
              </div>

              {healthMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{metric.label}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium text-foreground">{metric.value}%</span>
                      {metric.trend === 'up' ? (
                        <TrendingUp className={`h-3 w-3 ${metric.color}`} />
                      ) : (
                        <TrendingDown className={`h-3 w-3 ${metric.color}`} />
                      )}
                    </div>
                  </div>
                  <Progress value={metric.value} className="h-2" />
                </div>
              ))}

              <Button variant="accent" className="w-full mt-4">
                <Target className="h-4 w-4 mr-2" />
                Set Health Goals
              </Button>
            </CardContent>
          </Card>

          {/* Finance Dashboard */}
          <Card className="lg:col-span-1 bg-gradient-card border-border/50 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <DollarSign className="h-5 w-5 text-success" />
                Wealth Growth
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-success/10 rounded-lg">
                <div className="text-3xl font-bold text-foreground mb-1">$45.2K</div>
                <div className="text-sm text-muted-foreground">Total Assets</div>
                <div className="flex items-center justify-center gap-1 text-success text-sm mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +18% YTD
                </div>
              </div>

              {financeMetrics.map((metric, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-foreground">{metric.label}</div>
                    <div className="text-lg font-bold text-foreground">{metric.value}</div>
                  </div>
                  <div className="flex items-center gap-1 text-right">
                    <span className={`text-sm font-medium ${
                      metric.trend === 'up' ? 'text-success' : 'text-destructive'
                    }`}>
                      {metric.change}
                    </span>
                    {metric.trend === 'up' ? (
                      <ArrowUpRight className="h-3 w-3 text-success" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-destructive" />
                    )}
                  </div>
                </div>
              ))}

              <Button variant="hero" className="w-full mt-4">
                <Zap className="h-4 w-4 mr-2" />
                Optimize Portfolio
              </Button>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card className="lg:col-span-1 bg-gradient-card border-border/50 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Zap className="h-5 w-5 text-warning" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 bg-warning/10 rounded-lg border-l-4 border-warning">
                  <div className="text-sm font-medium text-foreground mb-1">
                    Optimize Sleep Schedule
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    Based on your stress patterns, shifting bedtime 30min earlier could improve productivity by 15%.
                  </div>
                  <Button variant="outline" size="sm">Apply</Button>
                </div>

                <div className="p-4 bg-success/10 rounded-lg border-l-4 border-success">
                  <div className="text-sm font-medium text-foreground mb-1">
                    Rebalance Portfolio
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    Market conditions suggest moving 8% from bonds to growth stocks for better returns.
                  </div>
                  <Button variant="outline" size="sm">Review</Button>
                </div>

                <div className="p-4 bg-accent/10 rounded-lg border-l-4 border-accent">
                  <div className="text-sm font-medium text-foreground mb-1">
                    Health Spending Alert
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    You're 23% under budget this month. Consider investing in preventive care.
                  </div>
                  <Button variant="outline" size="sm">Explore</Button>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground mb-1">94%</div>
                  <div className="text-xs text-muted-foreground">Goal Achievement Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-16">
          <Button variant="hero" size="lg">
            Explore Full Dashboard
          </Button>
        </div>
      </div>
    </section>
  );
};