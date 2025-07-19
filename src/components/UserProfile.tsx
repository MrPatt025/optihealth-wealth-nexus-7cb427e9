import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { User, Heart, DollarSign, Target, Shield, Bell, Eye } from "lucide-react";

export const UserProfile = () => {
  const [user] = useState({
    name: "Alex Chen",
    email: "alex.chen@example.com",
    avatar: "",
    healthScore: 87,
    wealthScore: 72,
    goalProgress: 68,
    memberSince: "March 2024"
  });

  const [preferences, setPreferences] = useState({
    notifications: true,
    publicProfile: false,
    dataSharing: true,
    autoInvest: false
  });

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-5" />
        <CardHeader className="relative">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-xl bg-gradient-accent text-background">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Premium Member</Badge>
                <Badge variant="outline">Since {user.memberSince}</Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-background/50">
              <Heart className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{user.healthScore}</div>
              <div className="text-sm text-muted-foreground">Health Score</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-background/50">
              <DollarSign className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{user.wealthScore}</div>
              <div className="text-sm text-muted-foreground">Wealth Score</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-background/50">
              <Target className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{user.goalProgress}%</div>
              <div className="text-sm text-muted-foreground">Goal Progress</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Tabs */}
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Update your personal details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="Alex" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Chen" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user.email} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" type="number" defaultValue="28" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input id="timezone" defaultValue="Asia/Bangkok" />
                </div>
              </div>
              <Button variant="premium">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Your Goals
              </CardTitle>
              <CardDescription>
                Set and track your health and wealth objectives
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Daily Steps</h4>
                    <p className="text-sm text-muted-foreground">Target: 10,000 steps</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">8,342</div>
                    <Progress value={83} className="w-24" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Monthly Savings</h4>
                    <p className="text-sm text-muted-foreground">Target: $2,000</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">$1,460</div>
                    <Progress value={73} className="w-24" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Sleep Quality</h4>
                    <p className="text-sm text-muted-foreground">Target: 8 hours</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">7.2h</div>
                    <Progress value={90} className="w-24" />
                  </div>
                </div>
              </div>
              <Button variant="outline">Edit Goals</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacy & Security
              </CardTitle>
              <CardDescription>
                Manage your data privacy and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Public Profile</h4>
                    <p className="text-sm text-muted-foreground">Allow others to see your profile</p>
                  </div>
                  <Switch 
                    checked={preferences.publicProfile}
                    onCheckedChange={(checked) => 
                      setPreferences(prev => ({ ...prev, publicProfile: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Data Sharing</h4>
                    <p className="text-sm text-muted-foreground">Share anonymized data for research</p>
                  </div>
                  <Switch 
                    checked={preferences.dataSharing}
                    onCheckedChange={(checked) => 
                      setPreferences(prev => ({ ...prev, dataSharing: checked }))
                    }
                  />
                </div>
              </div>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Eye className="h-4 w-4 mr-2" />
                  View Data Usage
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Download My Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications & Preferences
              </CardTitle>
              <CardDescription>
                Customize your experience and notification settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Push Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive health and wealth tips</p>
                  </div>
                  <Switch 
                    checked={preferences.notifications}
                    onCheckedChange={(checked) => 
                      setPreferences(prev => ({ ...prev, notifications: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Auto-Invest</h4>
                    <p className="text-sm text-muted-foreground">Automatically invest spare change</p>
                  </div>
                  <Switch 
                    checked={preferences.autoInvest}
                    onCheckedChange={(checked) => 
                      setPreferences(prev => ({ ...prev, autoInvest: checked }))
                    }
                  />
                </div>
              </div>
              <Button variant="premium">Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};