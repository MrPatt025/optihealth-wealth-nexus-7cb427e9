import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Trophy, 
  Target, 
  Flame, 
  Star, 
  Medal, 
  Crown, 
  Zap, 
  Heart,
  DollarSign,
  TrendingUp,
  Users,
  Gift
} from "lucide-react";

export const GamificationHub = () => {
  const [currentStreak, setCurrentStreak] = useState(15);
  const [totalPoints, setTotalPoints] = useState(2847);
  const [level, setLevel] = useState(12);

  const achievements = [
    {
      id: 1,
      icon: <Heart className="h-6 w-6" />,
      title: "Health Warrior",
      description: "Complete 30 days of health tracking",
      progress: 23,
      total: 30,
      reward: 500,
      category: "health",
      unlocked: false
    },
    {
      id: 2,
      icon: <DollarSign className="h-6 w-6" />,
      title: "Savings Master",
      description: "Save $1000 in a single month",
      progress: 750,
      total: 1000,
      reward: 300,
      category: "wealth",
      unlocked: false
    },
    {
      id: 3,
      icon: <Flame className="h-6 w-6" />,
      title: "Streak Legend",
      description: "Maintain a 30-day activity streak",
      progress: 30,
      total: 30,
      reward: 1000,
      category: "streak",
      unlocked: true
    },
    {
      id: 4,
      icon: <Users className="h-6 w-6" />,
      title: "Community Leader",
      description: "Help 10 community members",
      progress: 7,
      total: 10,
      reward: 750,
      category: "social",
      unlocked: false
    }
  ];

  const leaderboard = [
    { rank: 1, name: "Alex Chen", points: 5240, avatar: "/api/placeholder/32/32", badge: "👑" },
    { rank: 2, name: "Sarah Kim", points: 4890, avatar: "/api/placeholder/32/32", badge: "🥈" },
    { rank: 3, name: "You", points: 2847, avatar: "/api/placeholder/32/32", badge: "🥉" },
    { rank: 4, name: "Mike Johnson", points: 2651, avatar: "/api/placeholder/32/32", badge: "" },
    { rank: 5, name: "Emma Davis", points: 2340, avatar: "/api/placeholder/32/32", badge: "" }
  ];

  const dailyChallenges = [
    {
      id: 1,
      title: "Morning Meditation",
      description: "Complete 10 minutes of mindfulness",
      points: 50,
      icon: <Star className="h-5 w-5" />,
      completed: true
    },
    {
      id: 2,
      title: "Expense Tracking",
      description: "Log all expenses for the day",
      points: 30,
      icon: <Target className="h-5 w-5" />,
      completed: false
    },
    {
      id: 3,
      title: "Step Goal",
      description: "Walk 8,000 steps today",
      points: 40,
      icon: <TrendingUp className="h-5 w-5" />,
      completed: false
    }
  ];

  const rewards = [
    {
      id: 1,
      title: "Premium Theme",
      description: "Unlock exclusive dark mode theme",
      cost: 1000,
      icon: <Crown className="h-5 w-5" />,
      available: true
    },
    {
      id: 2,
      title: "AI Consultation",
      description: "30-minute personal AI advisor session",
      cost: 2500,
      icon: <Zap className="h-5 w-5" />,
      available: true
    },
    {
      id: 3,
      title: "Beta Features",
      description: "Early access to experimental features",
      cost: 5000,
      icon: <Gift className="h-5 w-5" />,
      available: false
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Trophy className="h-16 w-16 text-warning animate-pulse" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                <Flame className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Gamification Hub
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Turn your health and wealth journey into an engaging game with achievements, streaks, and rewards.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-warning mb-2">{totalPoints.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Points</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-accent mb-2">{level}</div>
              <div className="text-sm text-muted-foreground">Current Level</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Flame className="h-6 w-6 text-primary" />
                <div className="text-3xl font-bold text-primary">{currentStreak}</div>
              </div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-success mb-2">3rd</div>
              <div className="text-sm text-muted-foreground">Global Rank</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="achievements" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="challenges">Daily Challenges</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
          </TabsList>

          <TabsContent value="achievements" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className={`transition-all duration-300 ${achievement.unlocked ? 'bg-gradient-card border-accent/50' : 'bg-muted/20'}`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${achievement.unlocked ? 'bg-accent text-white' : 'bg-muted text-muted-foreground'}`}>
                        {achievement.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          {achievement.title}
                          {achievement.unlocked && <Medal className="h-4 w-4 text-warning" />}
                        </div>
                        <div className="text-sm text-muted-foreground font-normal">
                          {achievement.description}
                        </div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{achievement.progress}/{achievement.total}</span>
                      </div>
                      <Progress 
                        value={(achievement.progress / achievement.total) * 100} 
                        className="h-2"
                      />
                      <div className="flex justify-between items-center">
                        <Badge variant="secondary" className="text-xs">
                          +{achievement.reward} points
                        </Badge>
                        {achievement.unlocked && (
                          <Badge className="text-xs bg-success">
                            Unlocked!
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="challenges" className="mt-8">
            <div className="space-y-4">
              {dailyChallenges.map((challenge) => (
                <Card key={challenge.id} className={`transition-all duration-300 ${challenge.completed ? 'bg-gradient-card border-success/50' : 'hover:shadow-card'}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${challenge.completed ? 'bg-success text-white' : 'bg-secondary'}`}>
                          {challenge.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold">{challenge.title}</h4>
                          <p className="text-muted-foreground text-sm">{challenge.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="text-xs">
                          +{challenge.points} points
                        </Badge>
                        <Button 
                          variant={challenge.completed ? "outline" : "default"}
                          size="sm"
                          disabled={challenge.completed}
                        >
                          {challenge.completed ? "Completed" : "Start"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-warning" />
                  Weekly Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboard.map((user) => (
                    <div key={user.rank} className={`flex items-center justify-between p-4 rounded-lg ${user.name === 'You' ? 'bg-gradient-card border border-accent/30' : 'bg-secondary/30'}`}>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{user.badge}</span>
                          <span className="font-bold text-lg">#{user.rank}</span>
                        </div>
                        <Avatar>
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.points.toLocaleString()} points</div>
                        </div>
                      </div>
                      {user.name === 'You' && (
                        <Badge className="bg-accent">You</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rewards" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {rewards.map((reward) => (
                <Card key={reward.id} className={`transition-all duration-300 ${reward.available ? 'hover:shadow-card' : 'opacity-50'}`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${reward.available ? 'bg-accent text-white' : 'bg-muted text-muted-foreground'}`}>
                        {reward.icon}
                      </div>
                      {reward.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{reward.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {reward.cost.toLocaleString()} points
                      </Badge>
                      <Button 
                        variant={reward.available ? "default" : "outline"}
                        size="sm"
                        disabled={!reward.available || totalPoints < reward.cost}
                      >
                        {totalPoints >= reward.cost ? "Redeem" : "Need More Points"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};