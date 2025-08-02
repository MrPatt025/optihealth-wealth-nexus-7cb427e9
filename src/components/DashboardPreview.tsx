import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Heart, DollarSign, Target, Zap, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";
import { GradientBorder } from "@/components/ui/gradient-border";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { InteractiveCard } from "@/components/ui/interactive-card";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { SplitText } from "@/components/ui/split-text";
import { FadeInText } from "@/components/ui/fade-in-text";
import { Typewriter } from "@/components/ui/typewriter";
import dashboardBg from "@/assets/dashboard-bg.jpg";

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
    <section id="dashboard" className="py-24 bg-gradient-to-b from-secondary/50 to-background relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-5"
        style={{ backgroundImage: `url(${dashboardBg})` }}
      />
      <AnimatedBackground variant="grid" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <FadeInText direction="up" duration={1} className="text-center mb-16">
          <SplitText
            text="Your Unified Command Center"
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent block"
            delay={50}
            duration={0.8}
            from={{ opacity: 0, y: 50 }}
            to={{ opacity: 1, y: 0 }}
          />
          <FadeInText direction="up" delay={1.5} duration={1}>
            <Typewriter
              text="Instagram-style feeds meet TikTok engagement with powerful analytics. See how your health and wealth interconnect in real-time."
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
              speed={30}
              delay={2000}
            />
          </FadeInText>
        </FadeInText>

        <FadeInText direction="up" delay={3} duration={1.2} className="grid lg:grid-cols-3 gap-8">
          {/* Health Dashboard */}
          <MagicCard className="lg:col-span-1 bg-gradient-card/80 backdrop-blur-sm border-primary/20 hover-glow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Heart className="h-5 w-5 text-destructive animate-pulse" />
                Health Optimization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <GradientBorder className="p-0">
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <div className="text-3xl font-bold text-foreground mb-1 animate-glow">78</div>
                  <div className="text-sm text-muted-foreground">Wellness Score</div>
                  <div className="flex items-center justify-center gap-1 text-success text-sm mt-1">
                    <TrendingUp className="h-3 w-3 animate-bounce" />
                    +5% this week ✨
                  </div>
                </div>
              </GradientBorder>

              {healthMetrics.map((metric, index) => (
                <div key={index} className="space-y-2 p-2 rounded-lg hover:bg-secondary/20 transition-all duration-300">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{metric.label}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium text-foreground">{metric.value}%</span>
                      {metric.trend === 'up' ? (
                        <TrendingUp className={`h-3 w-3 ${metric.color} animate-float`} />
                      ) : (
                        <TrendingDown className={`h-3 w-3 ${metric.color} animate-pulse`} />
                      )}
                    </div>
                  </div>
                  <Progress value={metric.value} className="h-2 bg-secondary/30" />
                </div>
              ))}

              <Button variant="accent" className="w-full mt-4 hover:scale-[1.02] transition-transform duration-200">
                <Target className="h-4 w-4 mr-2" />
                Set Health Goals 🎯
              </Button>
            </CardContent>
          </MagicCard>

          {/* Finance Dashboard */}
          <MagicCard className="lg:col-span-1 bg-gradient-card/80 backdrop-blur-sm border-success/20 hover-glow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <DollarSign className="h-5 w-5 text-success animate-pulse" />
                Wealth Growth
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <GradientBorder className="p-0" gradient="linear-gradient(45deg, hsl(var(--success)), hsl(var(--primary)), hsl(var(--accent)))">
                <div className="text-center p-4 bg-success/10 rounded-lg">
                  <div className="text-3xl font-bold text-foreground mb-1 animate-glow">$45.2K</div>
                  <div className="text-sm text-muted-foreground">Total Assets</div>
                  <div className="flex items-center justify-center gap-1 text-success text-sm mt-1">
                    <TrendingUp className="h-3 w-3 animate-bounce" />
                    +18% YTD 📈
                  </div>
                </div>
              </GradientBorder>

              {financeMetrics.map((metric, index) => (
                <MagicCard key={index} className="p-3 bg-gradient-card/50 hover:scale-[1.02] transition-all duration-300">
                  <div className="flex justify-between items-center">
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
                        <ArrowUpRight className="h-3 w-3 text-success animate-float" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 text-destructive animate-pulse" />
                      )}
                    </div>
                  </div>
                </MagicCard>
              ))}

              <Button variant="hero" className="w-full mt-4 hover:scale-[1.02] transition-transform duration-200 group">
                <Zap className="h-4 w-4 mr-2 group-hover:animate-spin" />
                Optimize Portfolio 🚀
              </Button>
            </CardContent>
          </MagicCard>

          {/* AI Insights */}
          <MagicCard className="lg:col-span-1 bg-gradient-card/80 backdrop-blur-sm border-warning/20 hover-glow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Zap className="h-5 w-5 text-warning animate-pulse" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <MagicCard className="p-4 bg-warning/10 border-l-4 border-warning hover:scale-[1.02] transition-all duration-300">
                  <div className="text-sm font-medium text-foreground mb-1">
                    🌙 Optimize Sleep Schedule
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    Based on your stress patterns, shifting bedtime 30min earlier could improve productivity by 15%.
                  </div>
                  <Button variant="outline" size="sm" className="hover:bg-warning/20 transition-all duration-200">Apply</Button>
                </MagicCard>

                <MagicCard className="p-4 bg-success/10 border-l-4 border-success hover:scale-[1.02] transition-all duration-300">
                  <div className="text-sm font-medium text-foreground mb-1">
                    📊 Rebalance Portfolio
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    Market conditions suggest moving 8% from bonds to growth stocks for better returns.
                  </div>
                  <Button variant="outline" size="sm" className="hover:bg-success/20 transition-all duration-200">Review</Button>
                </MagicCard>

                <MagicCard className="p-4 bg-accent/10 border-l-4 border-accent hover:scale-[1.02] transition-all duration-300">
                  <div className="text-sm font-medium text-foreground mb-1">
                    💡 Health Spending Alert
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    You're 23% under budget this month. Consider investing in preventive care.
                  </div>
                  <Button variant="outline" size="sm" className="hover:bg-accent/20 transition-all duration-200">Explore</Button>
                </MagicCard>
              </div>

              <GradientBorder className="p-0 mt-4">
                <div className="pt-4 border-t border-border bg-gradient-card/50 rounded-lg p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground mb-1 animate-glow">94%</div>
                    <div className="text-xs text-muted-foreground">Goal Achievement Rate 🎯</div>
                  </div>
                </div>
              </GradientBorder>
            </CardContent>
          </MagicCard>
        </FadeInText>

        <FadeInText direction="up" delay={4.5} duration={1} className="text-center mt-16">
          <Button variant="hero" size="lg">
            Explore Full Dashboard
          </Button>
        </FadeInText>
      </div>
    </section>
  );
};