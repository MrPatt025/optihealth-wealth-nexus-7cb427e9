import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  Camera, 
  Edit3,
  Trophy,
  Target,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Globe,
  Heart,
  DollarSign,
  Zap,
  Award,
  TrendingUp,
  Activity
} from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { HolographicCard, NeonText } from '@/components/ui/premium-effects';
import { MicroInteraction } from '@/components/ui/micro-interactions';
import { StaggeredFadeIn, AnimatedCounter } from '@/components/ui/enhanced-animations';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  bio: string;
  location: string;
  website: string;
  joinDate: string;
  avatar: string;
  level: number;
  experience: number;
  nextLevelXP: number;
  badges: string[];
  stats: {
    health: {
      score: number;
      streak: number;
      achievements: number;
    };
    wealth: {
      portfolio: number;
      growth: number;
      goals: number;
    };
    social: {
      followers: number;
      following: number;
      posts: number;
    };
  };
  preferences: {
    notifications: {
      email: boolean;
      push: boolean;
      community: boolean;
      achievements: boolean;
    };
    privacy: {
      profilePublic: boolean;
      showStats: boolean;
      showProgress: boolean;
    };
    theme: string;
    language: string;
  };
}

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Passionate about health optimization and building wealth through smart investments. Helping others achieve their goals through community and technology.',
    location: 'San Francisco, CA',
    website: 'https://alexjohnson.com',
    joinDate: 'January 2024',
    avatar: '/api/placeholder/120/120',
    level: 18,
    experience: 2340,
    nextLevelXP: 2500,
    badges: ['Health Champion', 'Investment Pro', 'Goal Master', 'Community Helper'],
    stats: {
      health: {
        score: 85,
        streak: 12,
        achievements: 24
      },
      wealth: {
        portfolio: 125000,
        growth: 8.5,
        goals: 15
      },
      social: {
        followers: 234,
        following: 189,
        posts: 47
      }
    },
    preferences: {
      notifications: {
        email: true,
        push: true,
        community: false,
        achievements: true
      },
      privacy: {
        profilePublic: true,
        showStats: true,
        showProgress: false
      },
      theme: 'dark',
      language: 'en'
    }
  });

  const achievements = [
    { 
      id: '1', 
      title: 'Health Streak Master', 
      description: 'Maintained health score above 80 for 30 days',
      icon: Heart,
      color: '#ff006e',
      earned: true,
      date: '2024-01-15'
    },
    { 
      id: '2', 
      title: 'Investment Milestone', 
      description: 'Reached $100K portfolio value',
      icon: DollarSign,
      color: '#8338ec',
      earned: true,
      date: '2024-01-20'
    },
    { 
      id: '3', 
      title: 'Goal Crusher', 
      description: 'Completed 50 personal goals',
      icon: Target,
      color: '#3a86ff',
      earned: true,
      date: '2024-01-25'
    },
    { 
      id: '4', 
      title: 'Community Star', 
      description: 'Helped 100 community members',
      icon: Award,
      color: '#06ffa5',
      earned: false,
      progress: 67
    }
  ];

  const recentActivity = [
    { 
      action: 'Completed daily health check', 
      timestamp: '2 hours ago', 
      icon: Activity,
      color: '#ff006e'
    },
    { 
      action: 'Updated investment portfolio', 
      timestamp: '5 hours ago', 
      icon: TrendingUp,
      color: '#8338ec'
    },
    { 
      action: 'Achieved weekly step goal', 
      timestamp: '1 day ago', 
      icon: Trophy,
      color: '#3a86ff'
    },
    { 
      action: 'Shared progress with community', 
      timestamp: '2 days ago', 
      icon: Heart,
      color: '#06ffa5'
    }
  ];

  const handleSaveProfile = () => {
    // Save profile logic here
    setIsEditing(false);
  };

  const handlePreferenceChange = (category: string, key: string, value: boolean) => {
    setUserProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [category]: {
          ...prev.preferences[category],
          [key]: value
        }
      }
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-10">
        <div className="container mx-auto px-6">
          {/* Profile Header */}
          <StaggeredFadeIn delay={100}>
            <div className="mb-8">
              <HolographicCard className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Avatar Section */}
                  <div className="relative">
                    <Avatar className="w-32 h-32">
                      <AvatarImage src={userProfile.avatar} />
                      <AvatarFallback className="text-2xl">
                        {userProfile.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <MicroInteraction type="hover-glow">
                      <Button 
                        size="icon" 
                        variant="secondary"
                        className="absolute bottom-0 right-0 rounded-full"
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    </MicroInteraction>
                  </div>

                  {/* Profile Info */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                      <h1 className="text-3xl font-bold">
                        <NeonText text={userProfile.name} color="#00ff88" />
                      </h1>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-lg px-3 py-1">
                          Level {userProfile.level}
                        </Badge>
                        <MicroInteraction type="hover-glow">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setIsEditing(!isEditing)}
                          >
                            <Edit3 className="w-4 h-4 mr-2" />
                            {isEditing ? 'Cancel' : 'Edit'}
                          </Button>
                        </MicroInteraction>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4 max-w-2xl">
                      {userProfile.bio}
                    </p>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-500">
                          <AnimatedCounter from={0} to={userProfile.stats.health.score} />%
                        </div>
                        <div className="text-sm text-muted-foreground">Health Score</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-500">
                          $<AnimatedCounter from={0} to={125} />K
                        </div>
                        <div className="text-sm text-muted-foreground">Portfolio</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-500">
                          <AnimatedCounter from={0} to={userProfile.stats.social.followers} />
                        </div>
                        <div className="text-sm text-muted-foreground">Followers</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-500">
                          <AnimatedCounter from={0} to={userProfile.badges.length} />
                        </div>
                        <div className="text-sm text-muted-foreground">Badges</div>
                      </div>
                    </div>

                    {/* Experience Progress */}
                    <div className="max-w-md mx-auto md:mx-0">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Level {userProfile.level}</span>
                        <span>{userProfile.experience}/{userProfile.nextLevelXP} XP</span>
                      </div>
                      <Progress 
                        value={(userProfile.experience / userProfile.nextLevelXP) * 100} 
                        className="h-3"
                      />
                    </div>
                  </div>
                </div>
              </HolographicCard>
            </div>
          </StaggeredFadeIn>

          {/* Main Content */}
          <StaggeredFadeIn delay={200}>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Profile Content */}
              <div className="lg:col-span-3">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="achievements">Achievements</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>

                  {/* Profile Tab */}
                  <TabsContent value="profile" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <User className="w-5 h-5" />
                          Personal Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {isEditing ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Full Name</Label>
                              <Input id="name" value={userProfile.name} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input id="email" type="email" value={userProfile.email} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone</Label>
                              <Input id="phone" value={userProfile.phone} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="location">Location</Label>
                              <Input id="location" value={userProfile.location} />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                              <Label htmlFor="website">Website</Label>
                              <Input id="website" value={userProfile.website} />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                              <Label htmlFor="bio">Bio</Label>
                              <Textarea id="bio" value={userProfile.bio} rows={3} />
                            </div>
                            <div className="md:col-span-2">
                              <MicroInteraction type="hover-glow">
                                <Button onClick={handleSaveProfile} className="mr-2">
                                  Save Changes
                                </Button>
                              </MicroInteraction>
                              <Button variant="outline" onClick={() => setIsEditing(false)}>
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-muted-foreground" />
                                <div>
                                  <p className="font-medium">{userProfile.email}</p>
                                  <p className="text-sm text-muted-foreground">Email</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-muted-foreground" />
                                <div>
                                  <p className="font-medium">{userProfile.phone}</p>
                                  <p className="text-sm text-muted-foreground">Phone</p>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div className="flex items-center gap-3">
                                <MapPin className="w-5 h-5 text-muted-foreground" />
                                <div>
                                  <p className="font-medium">{userProfile.location}</p>
                                  <p className="text-sm text-muted-foreground">Location</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <Globe className="w-5 h-5 text-muted-foreground" />
                                <div>
                                  <p className="font-medium">{userProfile.website}</p>
                                  <p className="text-sm text-muted-foreground">Website</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Achievements Tab */}
                  <TabsContent value="achievements" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {achievements.map((achievement) => (
                        <MicroInteraction key={achievement.id} type="hover-lift">
                          <Card className={achievement.earned ? 'border-primary/30' : 'border-muted'}>
                            <CardContent className="p-6">
                              <div className="flex items-start gap-4">
                                <div 
                                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                    achievement.earned ? 'bg-primary/20' : 'bg-muted/20'
                                  }`}
                                >
                                  <achievement.icon 
                                    className="w-6 h-6" 
                                    style={{ color: achievement.earned ? achievement.color : '#6b7280' }}
                                  />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-semibold mb-1">{achievement.title}</h3>
                                  <p className="text-sm text-muted-foreground mb-3">
                                    {achievement.description}
                                  </p>
                                  {achievement.earned ? (
                                    <Badge variant="secondary" className="text-xs">
                                      Earned {achievement.date}
                                    </Badge>
                                  ) : (
                                    <div className="space-y-2">
                                      <Progress value={achievement.progress} className="h-2" />
                                      <p className="text-xs text-muted-foreground">
                                        {achievement.progress}% complete
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </MicroInteraction>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Activity Tab */}
                  <TabsContent value="activity" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Activity className="w-5 h-5" />
                          Recent Activity
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {recentActivity.map((activity, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                              <div 
                                className="w-10 h-10 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: `${activity.color}20` }}
                              >
                                <activity.icon className="w-5 h-5" style={{ color: activity.color }} />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium">{activity.action}</p>
                                <p className="text-sm text-muted-foreground">{activity.timestamp}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Settings Tab */}
                  <TabsContent value="settings" className="space-y-6">
                    {/* Notification Settings */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Bell className="w-5 h-5" />
                          Notification Settings
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {Object.entries(userProfile.preferences.notifications).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between">
                            <div>
                              <p className="font-medium capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Receive {key} notifications
                              </p>
                            </div>
                            <Switch 
                              checked={value}
                              onCheckedChange={(checked) => 
                                handlePreferenceChange('notifications', key, checked)
                              }
                            />
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Privacy Settings */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Shield className="w-5 h-5" />
                          Privacy Settings
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {Object.entries(userProfile.preferences.privacy).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between">
                            <div>
                              <p className="font-medium capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Make {key.replace(/([A-Z])/g, ' $1').trim().toLowerCase()} visible
                              </p>
                            </div>
                            <Switch 
                              checked={value}
                              onCheckedChange={(checked) => 
                                handlePreferenceChange('privacy', key, checked)
                              }
                            />
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* User Badges */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-yellow-500" />
                      Badges
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {userProfile.badges.map((badge, index) => (
                        <MicroInteraction key={badge} type="hover-lift">
                          <Badge variant="secondary" className="text-xs">
                            {badge}
                          </Badge>
                        </MicroInteraction>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-blue-500" />
                      Quick Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm">Health Streak</span>
                      <span className="font-bold text-red-500">
                        {userProfile.stats.health.streak} days
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Portfolio Growth</span>
                      <span className="font-bold text-green-500">
                        +{userProfile.stats.wealth.growth}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Community Posts</span>
                      <span className="font-bold text-blue-500">
                        {userProfile.stats.social.posts}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Member Since</span>
                      <span className="font-bold">
                        {userProfile.joinDate}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </StaggeredFadeIn>
        </div>
      </div>
    </div>
  );
};

export default Profile;