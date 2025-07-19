import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Bell, 
  BellRing, 
  Check, 
  X, 
  Heart, 
  DollarSign, 
  Target, 
  TrendingUp,
  AlertCircle,
  Info,
  CheckCircle,
  Settings
} from "lucide-react";

interface Notification {
  id: string;
  type: 'health' | 'wealth' | 'goal' | 'system' | 'achievement';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionRequired?: boolean;
  data?: any;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'health',
    priority: 'high',
    title: 'Hydration Alert',
    message: 'You\'ve only had 2 glasses of water today. Remember to stay hydrated!',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: false,
    actionRequired: true
  },
  {
    id: '2',
    type: 'wealth',
    priority: 'medium',
    title: 'Budget Update',
    message: 'You\'ve used 75% of your entertainment budget this month.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: false
  },
  {
    id: '3',
    type: 'achievement',
    priority: 'low',
    title: 'Streak Achievement!',
    message: 'Congratulations! You\'ve maintained your exercise routine for 7 days straight.',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    read: true
  },
  {
    id: '4',
    type: 'goal',
    priority: 'medium',
    title: 'Goal Deadline Approaching',
    message: 'Your savings goal deadline is in 5 days. You\'re 85% there!',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    read: false,
    actionRequired: true
  },
  {
    id: '5',
    type: 'system',
    priority: 'low',
    title: 'Weekly Report Ready',
    message: 'Your weekly health & wealth report is now available for review.',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    read: true
  }
];

export const NotificationSystem = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [settings, setSettings] = useState({
    health: true,
    wealth: true,
    goals: true,
    achievements: true,
    system: false,
    realTime: true,
    sound: true,
    desktop: true
  });
  const { toast } = useToast();

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'health': return Heart;
      case 'wealth': return DollarSign;
      case 'goal': return Target;
      case 'achievement': return CheckCircle;
      case 'system': return Info;
      default: return Bell;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleAction = (notification: Notification) => {
    switch (notification.type) {
      case 'health':
        toast({
          title: "Hydration Reminder Set",
          description: "We'll remind you to drink water every hour.",
        });
        break;
      case 'goal':
        toast({
          title: "Goal Progress Updated",
          description: "You can do it! Keep pushing towards your savings goal.",
        });
        break;
      default:
        toast({
          title: "Action Completed",
          description: "The notification action has been processed.",
        });
    }
    markAsRead(notification.id);
  };

  // Simulate real-time notifications
  useEffect(() => {
    if (!settings.realTime) return;

    const interval = setInterval(() => {
      const notifications = [
        'Time for a walking break! You\'ve been sitting for 2 hours.',
        'Investment opportunity: Your favorite stock is down 5% today.',
        'Meditation reminder: 5 minutes can improve your focus.',
        'Budget alert: You\'re approaching your dining out limit.',
        'Achievement unlocked: 10,000 steps reached!'
      ];

      const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
      
      if (Math.random() > 0.7) { // 30% chance every 30 seconds
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: ['health', 'wealth', 'goal'][Math.floor(Math.random() * 3)] as any,
          priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as any,
          title: 'Real-time Update',
          message: randomNotification,
          timestamp: new Date(),
          read: false
        };

        setNotifications(prev => [newNotification, ...prev.slice(0, 19)]); // Keep only 20 notifications

        if (settings.desktop) {
          toast({
            title: newNotification.title,
            description: newNotification.message,
          });
        }
      }
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [settings.realTime, settings.desktop, toast]);

  const filteredNotifications = notifications.filter(n => {
    switch (n.type) {
      case 'health': return settings.health;
      case 'wealth': return settings.wealth;
      case 'goal': return settings.goals;
      case 'achievement': return settings.achievements;
      case 'system': return settings.system;
      default: return true;
    }
  });

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <BellRing className="h-8 w-8 text-primary" />
            {unreadCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 text-xs p-0 flex items-center justify-center"
              >
                {unreadCount}
              </Badge>
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Notifications
            </h1>
            <p className="text-muted-foreground">
              {unreadCount} unread messages
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <Check className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
        </div>
      </div>

      <Tabs defaultValue="notifications" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-4">
          <ScrollArea className="h-[600px] pr-4">
            {filteredNotifications.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">No notifications</p>
                  <p className="text-muted-foreground">You're all caught up!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {filteredNotifications.map((notification) => {
                  const Icon = getIcon(notification.type);
                  return (
                    <Card 
                      key={notification.id}
                      className={`relative transition-all duration-200 hover:shadow-md ${
                        !notification.read ? 'border-primary/50 bg-primary/5' : 'opacity-75'
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <Icon className="h-5 w-5 text-primary" />
                            </div>
                            <div 
                              className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${getPriorityColor(notification.priority)}`}
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-medium">{notification.title}</h4>
                              <span className="text-xs text-muted-foreground">
                                {notification.timestamp.toLocaleTimeString([], { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </span>
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-3">
                              {notification.message}
                            </p>

                            <div className="flex items-center justify-between">
                              <div className="flex gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {notification.type}
                                </Badge>
                                <Badge 
                                  variant={notification.priority === 'high' || notification.priority === 'urgent' ? 'destructive' : 'secondary'}
                                  className="text-xs"
                                >
                                  {notification.priority}
                                </Badge>
                              </div>

                              <div className="flex gap-2">
                                {notification.actionRequired && (
                                  <Button 
                                    size="sm" 
                                    variant="premium"
                                    onClick={() => handleAction(notification)}
                                  >
                                    Take Action
                                  </Button>
                                )}
                                
                                {!notification.read && (
                                  <Button 
                                    size="sm" 
                                    variant="ghost"
                                    onClick={() => markAsRead(notification.id)}
                                  >
                                    <Check className="h-4 w-4" />
                                  </Button>
                                )}
                                
                                <Button 
                                  size="sm" 
                                  variant="ghost"
                                  onClick={() => deleteNotification(notification.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Customize which notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Categories</h4>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-medium">Health Notifications</label>
                      <p className="text-sm text-muted-foreground">Exercise reminders, health tips, wellness alerts</p>
                    </div>
                    <Switch 
                      checked={settings.health}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, health: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-medium">Wealth Notifications</label>
                      <p className="text-sm text-muted-foreground">Budget alerts, investment opportunities, financial tips</p>
                    </div>
                    <Switch 
                      checked={settings.wealth}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, wealth: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-medium">Goal Updates</label>
                      <p className="text-sm text-muted-foreground">Progress updates, deadline reminders, achievements</p>
                    </div>
                    <Switch 
                      checked={settings.goals}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, goals: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-medium">Achievements</label>
                      <p className="text-sm text-muted-foreground">Milestone celebrations, streak rewards, badges</p>
                    </div>
                    <Switch 
                      checked={settings.achievements}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, achievements: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-medium">System Updates</label>
                      <p className="text-sm text-muted-foreground">App updates, maintenance, feature announcements</p>
                    </div>
                    <Switch 
                      checked={settings.system}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, system: checked }))
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 border-t pt-4">
                <h4 className="font-medium">Delivery Preferences</h4>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-medium">Real-time Notifications</label>
                      <p className="text-sm text-muted-foreground">Receive notifications as they happen</p>
                    </div>
                    <Switch 
                      checked={settings.realTime}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, realTime: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-medium">Sound Alerts</label>
                      <p className="text-sm text-muted-foreground">Play sound for important notifications</p>
                    </div>
                    <Switch 
                      checked={settings.sound}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, sound: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-medium">Desktop Notifications</label>
                      <p className="text-sm text-muted-foreground">Show toast notifications in the app</p>
                    </div>
                    <Switch 
                      checked={settings.desktop}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, desktop: checked }))
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};