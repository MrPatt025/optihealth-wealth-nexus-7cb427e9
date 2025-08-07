import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Share2, 
  Trophy, 
  Star,
  UserPlus,
  Search,
  Filter,
  Send,
  ThumbsUp,
  MessageSquare,
  Crown,
  Zap,
  Target,
  TrendingUp
} from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { HolographicCard, NeonText } from '@/components/ui/premium-effects';
import { MicroInteraction } from '@/components/ui/micro-interactions';
import { StaggeredFadeIn, AnimatedCounter } from '@/components/ui/enhanced-animations';

interface CommunityPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    level: number;
    badge: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  tags: string[];
  category: 'health' | 'wealth' | 'goals' | 'motivation';
}

interface Leaderboard {
  rank: number;
  user: {
    name: string;
    avatar: string;
    level: number;
  };
  score: number;
  category: string;
  badge: string;
}

const Community = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [newPost, setNewPost] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const communityStats = [
    { label: 'Active Members', value: 12540, icon: Users, color: '#ff006e' },
    { label: 'Posts Today', value: 245, icon: MessageCircle, color: '#8338ec' },
    { label: 'Goals Shared', value: 1890, icon: Target, color: '#3a86ff' },
    { label: 'Success Stories', value: 567, icon: Trophy, color: '#06ffa5' }
  ];

  const communityPosts: CommunityPost[] = [
    {
      id: '1',
      author: {
        name: 'Sarah Johnson',
        avatar: '/api/placeholder/40/40',
        level: 15,
        badge: 'Health Champion'
      },
      content: 'Just completed my 30-day fitness challenge! Lost 8 pounds and gained so much energy. The community support has been incredible! 💪 #HealthJourney #FitnessGoals',
      timestamp: '2 hours ago',
      likes: 124,
      comments: 18,
      tags: ['fitness', 'challenge', 'success'],
      category: 'health'
    },
    {
      id: '2',
      author: {
        name: 'Mike Chen',
        avatar: '/api/placeholder/40/40',
        level: 22,
        badge: 'Investment Pro'
      },
      content: 'Reached my first $10K investment milestone today! Started with just $100/month savings. Consistency is key, everyone! 📈 #WealthBuilding #InvestmentGoals',
      timestamp: '4 hours ago',
      likes: 89,
      comments: 12,
      tags: ['investment', 'milestone', 'savings'],
      category: 'wealth'
    },
    {
      id: '3',
      author: {
        name: 'Emma Williams',
        avatar: '/api/placeholder/40/40',
        level: 8,
        badge: 'Goal Setter'
      },
      content: 'Who else is struggling with maintaining a morning routine? Looking for tips and accountability partners! 🌅 #MorningRoutine #Habits',
      timestamp: '6 hours ago',
      likes: 56,
      comments: 23,
      tags: ['routine', 'habits', 'help'],
      category: 'goals'
    }
  ];

  const leaderboard: Leaderboard[] = [
    {
      rank: 1,
      user: { name: 'Alex Thompson', avatar: '/api/placeholder/40/40', level: 28 },
      score: 2850,
      category: 'Overall',
      badge: 'Legend'
    },
    {
      rank: 2,
      user: { name: 'Jessica Liu', avatar: '/api/placeholder/40/40', level: 25 },
      score: 2640,
      category: 'Health',
      badge: 'Wellness Master'
    },
    {
      rank: 3,
      user: { name: 'David Rodriguez', avatar: '/api/placeholder/40/40', level: 23 },
      score: 2420,
      category: 'Wealth',
      badge: 'Finance Guru'
    },
    {
      rank: 4,
      user: { name: 'Rachel Green', avatar: '/api/placeholder/40/40', level: 21 },
      score: 2180,
      category: 'Goals',
      badge: 'Achievement Hunter'
    },
    {
      rank: 5,
      user: { name: 'Tom Wilson', avatar: '/api/placeholder/40/40', level: 19 },
      score: 1950,
      category: 'Overall',
      badge: 'Rising Star'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'health': return '#ff006e';
      case 'wealth': return '#8338ec';
      case 'goals': return '#3a86ff';
      case 'motivation': return '#06ffa5';
      default: return '#6b7280';
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2: return <Star className="w-5 h-5 text-gray-400" />;
      case 3: return <Star className="w-5 h-5 text-amber-600" />;
      default: return <span className="text-sm font-bold">#{rank}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-10">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="mb-8">
            <StaggeredFadeIn delay={100}>
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-4">
                  <NeonText text="Community Hub" color="#00ff88" />
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Connect, share, and grow together with like-minded individuals on their health and wealth journey
                </p>
              </div>

              {/* Community Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {communityStats.map((stat, index) => (
                  <MicroInteraction key={stat.label} type="hover-lift">
                    <HolographicCard className="p-6 text-center">
                      <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                           style={{ backgroundColor: `${stat.color}20` }}>
                        <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                      </div>
                      <div className="text-2xl font-bold mb-1">
                        <AnimatedCounter from={0} to={stat.value} formatter={(val) => val.toLocaleString()} />
                      </div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </HolographicCard>
                  </MicroInteraction>
                ))}
              </div>
            </StaggeredFadeIn>
          </div>

          {/* Main Content */}
          <StaggeredFadeIn delay={200}>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Feed */}
              <div className="lg:col-span-3">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <TabsList className="grid w-full sm:w-auto grid-cols-4">
                      <TabsTrigger value="feed">Feed</TabsTrigger>
                      <TabsTrigger value="discussions">Discussions</TabsTrigger>
                      <TabsTrigger value="challenges">Challenges</TabsTrigger>
                      <TabsTrigger value="events">Events</TabsTrigger>
                    </TabsList>
                    
                    <div className="flex gap-2 w-full sm:w-auto">
                      <div className="relative flex-1 sm:w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          placeholder="Search community..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <Button variant="outline" size="icon">
                        <Filter className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <TabsContent value="feed" className="space-y-6">
                    {/* Create Post */}
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src="/api/placeholder/40/40" />
                            <AvatarFallback>YU</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-3">
                            <Textarea
                              placeholder="Share your progress, ask questions, or motivate others..."
                              value={newPost}
                              onChange={(e) => setNewPost(e.target.value)}
                              className="min-h-[80px] resize-none"
                            />
                            <div className="flex items-center justify-between">
                              <div className="flex gap-2">
                                <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                                  #health
                                </Badge>
                                <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                                  #wealth
                                </Badge>
                                <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                                  #goals
                                </Badge>
                              </div>
                              <MicroInteraction type="hover-glow">
                                <Button disabled={!newPost.trim()}>
                                  <Send className="w-4 h-4 mr-2" />
                                  Post
                                </Button>
                              </MicroInteraction>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Posts Feed */}
                    <div className="space-y-6">
                      {communityPosts.map((post) => (
                        <MicroInteraction key={post.id} type="hover-lift">
                          <Card>
                            <CardContent className="p-6">
                              {/* Post Header */}
                              <div className="flex items-start gap-3 mb-4">
                                <Avatar className="w-12 h-12">
                                  <AvatarImage src={post.author.avatar} />
                                  <AvatarFallback>
                                    {post.author.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-semibold">{post.author.name}</h3>
                                    <Badge 
                                      variant="secondary" 
                                      className="text-xs"
                                      style={{ backgroundColor: `${getCategoryColor(post.category)}20`, color: getCategoryColor(post.category) }}
                                    >
                                      Level {post.author.level}
                                    </Badge>
                                    <Badge variant="outline" className="text-xs">
                                      {post.author.badge}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground">{post.timestamp}</p>
                                </div>
                              </div>

                              {/* Post Content */}
                              <div className="mb-4">
                                <p className="text-foreground leading-relaxed">{post.content}</p>
                              </div>

                              {/* Post Tags */}
                              <div className="flex flex-wrap gap-2 mb-4">
                                {post.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    #{tag}
                                  </Badge>
                                ))}
                              </div>

                              {/* Post Actions */}
                              <div className="flex items-center justify-between pt-4 border-t border-border">
                                <div className="flex items-center gap-6">
                                  <MicroInteraction type="magnetic">
                                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-red-500">
                                      <Heart className="w-4 h-4 mr-1" />
                                      {post.likes}
                                    </Button>
                                  </MicroInteraction>
                                  
                                  <MicroInteraction type="magnetic">
                                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-500">
                                      <MessageSquare className="w-4 h-4 mr-1" />
                                      {post.comments}
                                    </Button>
                                  </MicroInteraction>
                                  
                                  <MicroInteraction type="magnetic">
                                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-green-500">
                                      <Share2 className="w-4 h-4 mr-1" />
                                      Share
                                    </Button>
                                  </MicroInteraction>
                                </div>
                                
                                <Badge 
                                  variant="outline"
                                  style={{ color: getCategoryColor(post.category) }}
                                >
                                  {post.category}
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                        </MicroInteraction>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="discussions">
                    <Card>
                      <CardContent className="p-8 text-center">
                        <MessageCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-lg font-semibold mb-2">Discussion Forums</h3>
                        <p className="text-muted-foreground mb-4">
                          Join topic-based discussions with the community
                        </p>
                        <Button>Browse Forums</Button>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="challenges">
                    <Card>
                      <CardContent className="p-8 text-center">
                        <Trophy className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-lg font-semibold mb-2">Community Challenges</h3>
                        <p className="text-muted-foreground mb-4">
                          Join challenges and compete with fellow members
                        </p>
                        <Button>View Challenges</Button>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="events">
                    <Card>
                      <CardContent className="p-8 text-center">
                        <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-lg font-semibold mb-2">Community Events</h3>
                        <p className="text-muted-foreground mb-4">
                          Attend virtual meetups and workshops
                        </p>
                        <Button>Upcoming Events</Button>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Leaderboard */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-yellow-500" />
                      Leaderboard
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {leaderboard.map((entry) => (
                      <MicroInteraction key={entry.rank} type="hover-lift">
                        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex items-center justify-center w-8 h-8">
                            {getRankIcon(entry.rank)}
                          </div>
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={entry.user.avatar} />
                            <AvatarFallback>
                              {entry.user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{entry.user.name}</p>
                            <p className="text-xs text-muted-foreground">{entry.badge}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-sm">{entry.score.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">Level {entry.user.level}</p>
                          </div>
                        </div>
                      </MicroInteraction>
                    ))}
                  </CardContent>
                </Card>

                {/* Trending Topics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      Trending Topics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { tag: 'morning-routine', posts: 124 },
                      { tag: 'investment-tips', posts: 89 },
                      { tag: 'fitness-challenge', posts: 67 },
                      { tag: 'mindfulness', posts: 45 },
                      { tag: 'financial-goals', posts: 38 }
                    ].map((topic) => (
                      <MicroInteraction key={topic.tag} type="magnetic">
                        <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50 cursor-pointer transition-colors">
                          <span className="text-sm font-medium">#{topic.tag}</span>
                          <Badge variant="secondary" className="text-xs">
                            {topic.posts}
                          </Badge>
                        </div>
                      </MicroInteraction>
                    ))}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-blue-500" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <MicroInteraction type="hover-glow">
                      <Button variant="outline" className="w-full justify-start">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Find Friends
                      </Button>
                    </MicroInteraction>
                    
                    <MicroInteraction type="hover-glow">
                      <Button variant="outline" className="w-full justify-start">
                        <Trophy className="w-4 h-4 mr-2" />
                        Join Challenge
                      </Button>
                    </MicroInteraction>
                    
                    <MicroInteraction type="hover-glow">
                      <Button variant="outline" className="w-full justify-start">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Start Discussion
                      </Button>
                    </MicroInteraction>
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

export default Community;