import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Palette, 
  Settings, 
  Zap, 
  Target,
  Clock,
  Heart,
  DollarSign,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Smartphone,
  Monitor
} from "lucide-react";

export const PersonalizationEngine = () => {
  const [preferences, setPreferences] = useState({
    aiPersonality: "friendly",
    notificationLevel: [70],
    autoTracking: true,
    darkMode: false,
    soundEnabled: true,
    preferredDevice: "mobile",
    healthFocus: [60],
    wealthFocus: [40],
    updateFrequency: "realtime"
  });

  const [learningProgress, setLearningProgress] = useState(78);

  const aiPersonalities = [
    {
      id: "friendly",
      name: "Friendly Coach",
      description: "Supportive and encouraging, perfect for beginners",
      icon: "😊",
      traits: ["Encouraging", "Patient", "Gentle reminders"]
    },
    {
      id: "professional",
      name: "Professional Advisor",
      description: "Direct and data-driven, ideal for goal-oriented users",
      icon: "👔",
      traits: ["Analytical", "Efficient", "Results-focused"]
    },
    {
      id: "casual",
      name: "Casual Buddy",
      description: "Relaxed and conversational, like talking to a friend",
      icon: "🤙",
      traits: ["Laid-back", "Humorous", "Relatable"]
    },
    {
      id: "expert",
      name: "Expert Mentor",
      description: "Advanced insights for experienced users",
      icon: "🎓",
      traits: ["Deep analysis", "Advanced strategies", "Technical depth"]
    }
  ];

  const adaptiveBehaviors = [
    {
      category: "Learning Patterns",
      behaviors: [
        { name: "Morning person detected", confidence: 92, action: "Shifted notifications to 6-8 AM" },
        { name: "Prefers visual data", confidence: 87, action: "Increased chart frequency" },
        { name: "Weekend spender", confidence: 76, action: "Added weekend budget alerts" }
      ]
    },
    {
      category: "Usage Habits",
      behaviors: [
        { name: "Mobile-first user", confidence: 95, action: "Optimized mobile interface" },
        { name: "Quick session preference", confidence: 82, action: "Condensed information density" },
        { name: "Evening reviewer", confidence: 69, action: "Scheduled daily summaries at 8 PM" }
      ]
    }
  ];

  const personalizedInsights = [
    {
      title: "Your Health Peak Hours",
      insight: "You're most active between 7-9 AM and 6-8 PM",
      recommendation: "Schedule workouts during these energy peaks",
      confidence: 94,
      category: "health"
    },
    {
      title: "Spending Trigger",
      insight: "You tend to overspend on Fridays and weekends",
      recommendation: "Set automatic weekend budget alerts",
      confidence: 89,
      category: "wealth"
    },
    {
      title: "Motivation Pattern",
      insight: "Visual progress tracking increases your engagement by 40%",
      recommendation: "Enable enhanced visual dashboards",
      confidence: 91,
      category: "behavior"
    }
  ];

  const updatePreference = (key: string, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  return (
    <section className="py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Brain className="h-16 w-16 text-primary animate-pulse" />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                <Zap className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            AI Personalization Engine
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Advanced machine learning that adapts to your unique patterns, preferences, and goals.
          </p>
        </div>

        {/* Learning Progress */}
        <Card className="mb-12 bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-accent" />
              AI Learning Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Understanding your preferences</span>
                <span>{learningProgress}% complete</span>
              </div>
              <Progress value={learningProgress} className="h-3" />
              <p className="text-muted-foreground text-sm">
                The AI has analyzed {Math.floor(learningProgress * 1.5)} interactions to personalize your experience.
              </p>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="personality" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personality">AI Personality</TabsTrigger>
            <TabsTrigger value="behavior">Adaptive Behavior</TabsTrigger>
            <TabsTrigger value="insights">Personal Insights</TabsTrigger>
            <TabsTrigger value="settings">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="personality" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {aiPersonalities.map((personality) => (
                <Card 
                  key={personality.id} 
                  className={`cursor-pointer transition-all duration-300 ${
                    preferences.aiPersonality === personality.id 
                      ? 'bg-gradient-card border-accent/50 shadow-card' 
                      : 'hover:shadow-card'
                  }`}
                  onClick={() => updatePreference('aiPersonality', personality.id)}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <span className="text-3xl">{personality.icon}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          {personality.name}
                          {preferences.aiPersonality === personality.id && (
                            <Badge className="bg-accent">Active</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground font-normal">
                          {personality.description}
                        </p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {personality.traits.map((trait, index) => (
                        <Badge key={index} variant="outline" className="mr-2">
                          {trait}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="behavior" className="mt-8">
            <div className="space-y-8">
              {adaptiveBehaviors.map((category, categoryIndex) => (
                <Card key={categoryIndex}>
                  <CardHeader>
                    <CardTitle>{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {category.behaviors.map((behavior, index) => (
                        <div key={index} className="p-4 bg-secondary/30 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold">{behavior.name}</h4>
                            <Badge variant="outline" className="text-xs">
                              {behavior.confidence}% confidence
                            </Badge>
                          </div>
                          <p className="text-muted-foreground text-sm">{behavior.action}</p>
                          <Progress value={behavior.confidence} className="h-2 mt-3" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="insights" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {personalizedInsights.map((insight, index) => (
                <Card key={index} className="hover:shadow-card transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      {insight.category === 'health' && <Heart className="h-5 w-5 text-primary" />}
                      {insight.category === 'wealth' && <DollarSign className="h-5 w-5 text-accent" />}
                      {insight.category === 'behavior' && <Brain className="h-5 w-5 text-warning" />}
                      {insight.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">{insight.insight}</p>
                      <div className="p-3 bg-gradient-card rounded-lg">
                        <p className="text-sm font-medium">{insight.recommendation}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline" className="text-xs">
                          {insight.confidence}% accuracy
                        </Badge>
                        <Button size="sm" variant="ghost">
                          Apply
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    General Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {preferences.darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                      <Label>Dark Mode</Label>
                    </div>
                    <Switch 
                      checked={preferences.darkMode}
                      onCheckedChange={(checked) => updatePreference('darkMode', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {preferences.soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                      <Label>Sound Notifications</Label>
                    </div>
                    <Switch 
                      checked={preferences.soundEnabled}
                      onCheckedChange={(checked) => updatePreference('soundEnabled', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Zap className="h-5 w-5" />
                      <Label>Auto Tracking</Label>
                    </div>
                    <Switch 
                      checked={preferences.autoTracking}
                      onCheckedChange={(checked) => updatePreference('autoTracking', checked)}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Notification Level: {preferences.notificationLevel[0]}%
                    </Label>
                    <Slider
                      value={preferences.notificationLevel}
                      onValueChange={(value) => updatePreference('notificationLevel', value)}
                      max={100}
                      step={10}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Focus Areas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-primary" />
                      Health Focus: {preferences.healthFocus[0]}%
                    </Label>
                    <Slider
                      value={preferences.healthFocus}
                      onValueChange={(value) => updatePreference('healthFocus', value)}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-accent" />
                      Wealth Focus: {preferences.wealthFocus[0]}%
                    </Label>
                    <Slider
                      value={preferences.wealthFocus}
                      onValueChange={(value) => updatePreference('wealthFocus', value)}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Preferred Device</Label>
                    <div className="flex gap-2">
                      <Button
                        variant={preferences.preferredDevice === 'mobile' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => updatePreference('preferredDevice', 'mobile')}
                        className="flex items-center gap-2"
                      >
                        <Smartphone className="h-4 w-4" />
                        Mobile
                      </Button>
                      <Button
                        variant={preferences.preferredDevice === 'desktop' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => updatePreference('preferredDevice', 'desktop')}
                        className="flex items-center gap-2"
                      >
                        <Monitor className="h-4 w-4" />
                        Desktop
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};