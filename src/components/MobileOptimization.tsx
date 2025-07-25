import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Wifi, Battery, Signal, Menu, X, Zap, Shield } from "lucide-react";

export const MobileOptimization = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [batteryLevel, setBatteryLevel] = useState(80);
  const [networkSpeed, setNetworkSpeed] = useState("4G");

  useEffect(() => {
    const handleOnlineStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  const mobileFeatures = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Lightning Fast",
      description: "Sub-100ms AI responses with edge computing",
      status: "Active"
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Offline Mode",
      description: "Full functionality without internet",
      status: isOnline ? "Online" : "Offline"
    },
    {
      icon: <Battery className="h-5 w-5" />,
      title: "Battery Optimized",
      description: "Smart power management for all-day use",
      status: `${batteryLevel}%`
    },
    {
      icon: <Signal className="h-5 w-5" />,
      title: "Adaptive Quality",
      description: "Auto-adjusts to network conditions",
      status: networkSpeed
    }
  ];

  const quickActions = [
    { label: "Quick Health Check", color: "bg-primary" },
    { label: "Expense Tracker", color: "bg-accent" },
    { label: "AI Chat", color: "bg-warning" },
    { label: "Goals Review", color: "bg-success" }
  ];

  return (
    <section className="py-24 bg-gradient-mobile">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Smartphone className="h-16 w-16 text-accent" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Mobile-First Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Optimized for Gen-Z's mobile lifestyle with native-like performance and intuitive gestures.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Mobile Preview */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Phone Frame */}
              <div className="w-80 h-[640px] bg-gradient-to-b from-foreground/10 to-foreground/5 rounded-[3rem] p-3 shadow-elegant">
                <div className="w-full h-full bg-background rounded-[2.5rem] overflow-hidden relative">
                  {/* Phone Screen */}
                  <div className="absolute inset-0 p-6">
                    {/* Status Bar */}
                    <div className="flex justify-between items-center mb-6 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="text-xs font-mono">9:41</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Signal className="h-4 w-4" />
                        <Wifi className="h-4 w-4" />
                        <Battery className="h-4 w-4" />
                      </div>
                    </div>

                    {/* App Header */}
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                        OptiHealth
                      </h3>
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Menu className="h-5 w-5" />
                          </Button>
                        </SheetTrigger>
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle>Quick Menu</SheetTitle>
                          </SheetHeader>
                          <div className="mt-6 space-y-4">
                            {quickActions.map((action, index) => (
                              <Button
                                key={index}
                                variant="ghost"
                                className="w-full justify-start"
                              >
                                <div className={`w-3 h-3 rounded-full ${action.color} mr-3`}></div>
                                {action.label}
                              </Button>
                            ))}
                          </div>
                        </SheetContent>
                      </Sheet>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <Card className="bg-gradient-card">
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold text-primary">8.2k</div>
                          <div className="text-sm text-muted-foreground">Steps Today</div>
                        </CardContent>
                      </Card>
                      <Card className="bg-gradient-card">
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold text-accent">$1,247</div>
                          <div className="text-sm text-muted-foreground">Saved This Month</div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Feature List */}
                    <div className="space-y-3">
                      {mobileFeatures.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                          <div className="text-accent">{feature.icon}</div>
                          <div className="flex-1">
                            <div className="font-medium text-sm">{feature.title}</div>
                            <div className="text-xs text-muted-foreground">{feature.description}</div>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {feature.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Details */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold mb-6">PWA Excellence</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mobileFeatures.map((feature, index) => (
                  <Card key={index} className="hover:shadow-card transition-all duration-300">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <div className="text-accent">{feature.icon}</div>
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-3">{feature.description}</p>
                      <Badge 
                        variant={feature.status === "Active" || feature.status === "Online" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {feature.status}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="bg-gradient-card p-6 rounded-xl">
              <h4 className="text-xl font-bold mb-4">Performance Metrics</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Load Time</span>
                  <span className="font-mono text-success">&lt; 2s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Bundle Size</span>
                  <span className="font-mono text-success">&lt; 100KB</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Offline Cache</span>
                  <span className="font-mono text-primary">30 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Battery Impact</span>
                  <span className="font-mono text-warning">Minimal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};