import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Trophy, 
  Heart, 
  MessageCircle, 
  Share2, 
  Crown,
  Zap,
  Target,
  TrendingUp,
  UserPlus,
  Search,
  Filter,
  Medal,
  Star
} from "lucide-react";
import { AnimatedIcon } from "@/components/ui/animated-icon";
import { EnhancedCard } from "@/components/ui/enhanced-card";
import { IconShowcase } from "@/components/ui/icon-showcase";

interface User {
  id: string;
  name: string;
  avatar: string;
  level: number;
  points: number;
  healthScore: number;
  wealthScore: number;
  achievements: string[];
  following: boolean;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  participants: number;
  endDate: string;
  reward: string;
  progress?: number;
  joined: boolean;
  category: 'health' | 'wealth' | 'both';
}

interface Post {
  id: string;
  user: User;
  content: string;
  timestamp: Date;
  likes: number;
  comments: number;
  achievement?: string;
  liked: boolean;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: '',
    level: 12,
    points: 2847,
    healthScore: 92,
    wealthScore: 78,
    achievements: ['Early Bird', 'Fitness Streak', 'Saver Pro'],
    following: false
  },
  {
    id: '2',
    name: 'Mike Johnson',
    avatar: '',
    level: 8,
    points: 1956,
    healthScore: 85,
    wealthScore: 88,
    achievements: ['Investment Guru', 'Marathon Runner'],
    following: true
  },
  {
    id: '3',
    name: 'Anna Liu',
    avatar: '',
    level: 15,
    points: 3421,
    healthScore: 88,
    wealthScore: 94,
    achievements: ['Wellness Master', 'Budget Boss', 'Goal Crusher'],
    following: false
  }
];

const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: '10,000 Steps Daily',
    description: 'Walk 10,000 steps every day for a week',
    participants: 1247,
    endDate: '2024-07-26',
    reward: '500 points + Fitness Badge',
    progress: 4,
    joined: true,
    category: 'health'
  },
  {
    id: '2',
    title: 'No-Spend Week',
    description: 'Avoid unnecessary purchases for 7 days',
    participants: 892,
    endDate: '2024-07-28',
    reward: '750 points + Saver Badge',
    joined: false,
    category: 'wealth'
  },
  {
    id: '3',
    title: 'Mindful Money & Movement',
    description: 'Meditate 10 mins daily + track all expenses',
    participants: 654,
    endDate: '2024-08-02',
    reward: '1000 points + Mindful Badge',
    joined: false,
    category: 'both'
  }
];

const mockPosts: Post[] = [
  {
    id: '1',
    user: mockUsers[0],
    content: 'Just hit my savings goal for this month! 🎉 The budgeting tips from this community really helped. Who else is crushing their financial goals?',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    likes: 23,
    comments: 8,
    achievement: 'Savings Champion',
    liked: false
  },
  {
    id: '2',
    user: mockUsers[1],
    content: 'Completed my first 5K run today! The training schedule from the fitness challenge kept me motivated. Next goal: 10K! 🏃‍♂️',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    likes: 45,
    comments: 12,
    liked: true
  },
  {
    id: '3',
    user: mockUsers[2],
    content: 'Meal prep Sunday! 🥗 Spent $80 on groceries but saved myself from $200+ in takeout this week. Small habits, big impact!',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    likes: 67,
    comments: 15,
    liked: false
  }
];

export const SocialFeatures = () => {
  const [users, setUsers] = useState(mockUsers);
  const [challenges, setChallenges] = useState(mockChallenges);
  const [posts, setPosts] = useState(mockPosts);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFollow = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, following: !user.following } : user
    ));
  };

  const joinChallenge = (challengeId: string) => {
    setChallenges(prev => prev.map(challenge => 
      challenge.id === challengeId ? { ...challenge, joined: !challenge.joined } : challenge
    ));
  };

  const toggleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const leaderboard = [...users].sort((a, b) => b.points - a.points);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Community
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Connect with like-minded individuals on their health and wealth optimization journey. Share achievements, join challenges, and grow together.
        </p>
      </div>

      <Tabs defaultValue="feed" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="friends">Friends</TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-6">
          {/* Post Creation */}
          <EnhancedCard variant="glass" animation="hover">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                  <AvatarFallback className="bg-gradient-accent text-background">
                    AC
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Input 
                    placeholder="Share your latest achievement or tip..."
                    className="border-0 bg-muted/30 focus-visible:ring-0 focus-visible:bg-muted/50 transition-all duration-300"
                  />
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex gap-2">
                      <IconShowcase 
                        icon={Heart} 
                        title="Health" 
                        variant="badge" 
                        color="success"
                        animated={true}
                      />
                      <IconShowcase 
                        icon={TrendingUp} 
                        title="Wealth" 
                        variant="badge" 
                        color="warning"
                        animated={true}
                      />
                      <IconShowcase 
                        icon={Trophy} 
                        title="Achievement" 
                        variant="badge" 
                        color="accent"
                        animated={true}
                      />
                    </div>
                    <Button size="sm" variant="premium" className="group">
                      <Share2 className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </EnhancedCard>

          {/* Posts Feed */}
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-gradient-primary text-white">
                        {post.user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{post.user.name}</h4>
                        <Badge variant="secondary" className="text-xs">
                          Level {post.user.level}
                        </Badge>
                        {post.achievement && (
                          <Badge variant="default" className="text-xs">
                            <Medal className="h-3 w-3 mr-1" />
                            {post.achievement}
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground ml-auto">
                          {post.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                      
                      <p className="text-sm mb-4">{post.content}</p>
                      
                      <div className="flex items-center gap-4">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => toggleLike(post.id)}
                          className={post.liked ? "text-red-500" : ""}
                        >
                          <Heart className={`h-4 w-4 mr-1 ${post.liked ? 'fill-current' : ''}`} />
                          {post.likes}
                        </Button>
                        
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {post.comments}
                        </Button>
                        
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Top Performers This Month
              </CardTitle>
              <CardDescription>
                Users ranked by total optimization points earned
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboard.map((user, index) => (
                  <div key={user.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        index === 0 ? 'bg-yellow-500 text-white' :
                        index === 1 ? 'bg-gray-400 text-white' :
                        index === 2 ? 'bg-orange-600 text-white' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {index < 3 ? <Crown className="h-4 w-4" /> : index + 1}
                      </div>
                      
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-gradient-primary text-white">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{user.name}</h4>
                        <Badge variant="secondary" className="text-xs">
                          Level {user.level}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          {user.points} pts
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {user.healthScore}
                        </span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {user.wealthScore}
                        </span>
                      </div>
                    </div>
                    
                    <Button 
                      variant={user.following ? "secondary" : "premium"}
                      size="sm"
                      onClick={() => toggleFollow(user.id)}
                    >
                      {user.following ? "Following" : "Follow"}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge) => (
              <Card key={challenge.id} className="relative overflow-hidden hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{challenge.title}</CardTitle>
                    <Badge 
                      variant={challenge.category === 'health' ? 'default' : challenge.category === 'wealth' ? 'secondary' : 'outline'}
                      className="text-xs"
                    >
                      {challenge.category}
                    </Badge>
                  </div>
                  <CardDescription>{challenge.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Participants</span>
                      <span className="font-medium">{challenge.participants.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Ends</span>
                      <span className="font-medium">{new Date(challenge.endDate).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Reward</span>
                      <span className="font-medium text-primary">{challenge.reward}</span>
                    </div>
                  </div>

                  {challenge.joined && challenge.progress !== undefined && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>{challenge.progress}/7 days</span>
                      </div>
                      <Progress value={(challenge.progress / 7) * 100} className="h-2" />
                    </div>
                  )}

                  <Button 
                    className="w-full" 
                    variant={challenge.joined ? "secondary" : "premium"}
                    onClick={() => joinChallenge(challenge.id)}
                  >
                    {challenge.joined ? "Joined" : "Join Challenge"}
                  </Button>
                </CardContent>

                {challenge.joined && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="default" className="text-xs">
                      <Zap className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="friends" className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for friends..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Friend Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Suggested Friends
              </CardTitle>
              <CardDescription>
                Connect with users who have similar goals and interests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {users.filter(user => !user.following).map((user) => (
                  <div key={user.id} className="flex items-center gap-3 p-3 rounded-lg border bg-card">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-gradient-primary text-white">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <h4 className="font-medium">{user.name}</h4>
                      <div className="flex gap-2 mt-1">
                        {user.achievements.slice(0, 2).map((achievement, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {achievement}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      size="sm"
                      variant="premium"
                      onClick={() => toggleFollow(user.id)}
                    >
                      Follow
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Following */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Following ({users.filter(u => u.following).length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {users.filter(user => user.following).map((user) => (
                  <div key={user.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-primary text-white">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <h4 className="font-medium">{user.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Level {user.level} • {user.points} points
                      </p>
                    </div>
                    
                    <Button 
                      variant="secondary"
                      size="sm"
                      onClick={() => toggleFollow(user.id)}
                    >
                      Following
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};