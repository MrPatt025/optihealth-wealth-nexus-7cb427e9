import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Star, Download, TrendingUp, Heart, Shield, Zap, Users } from "lucide-react";

interface Plugin {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  downloads: string;
  price: string;
  developer: string;
  icon: React.ComponentType<{ className?: string }>;
  installed: boolean;
  featured: boolean;
}

const plugins: Plugin[] = [
  {
    id: "1",
    name: "Crypto Portfolio Tracker",
    description: "Real-time cryptocurrency portfolio tracking with advanced analytics and DeFi integration.",
    category: "Finance",
    rating: 4.8,
    downloads: "12.5K",
    price: "Free",
    developer: "CryptoTools Inc",
    icon: TrendingUp,
    installed: false,
    featured: true
  },
  {
    id: "2", 
    name: "Meditation Mindfulness",
    description: "Guided meditation sessions with biometric feedback and personalized wellness recommendations.",
    category: "Health",
    rating: 4.9,
    downloads: "8.2K",
    price: "$2.99/mo",
    developer: "Zen Studios",
    icon: Heart,
    installed: true,
    featured: true
  },
  {
    id: "3",
    name: "Privacy Guardian",
    description: "Advanced privacy protection with blockchain-based data sovereignty and ZK-proof verification.",
    category: "Security",
    rating: 4.7,
    downloads: "15.8K",
    price: "Free",
    developer: "SecureNet Labs",
    icon: Shield,
    installed: false,
    featured: false
  },
  {
    id: "4",
    name: "AI Workout Planner",
    description: "Personalized workout routines powered by machine learning and real-time form analysis.",
    category: "Health",
    rating: 4.6,
    downloads: "9.7K", 
    price: "$4.99/mo",
    developer: "FitTech Solutions",
    icon: Zap,
    installed: false,
    featured: true
  },
  {
    id: "5",
    name: "Social Finance",
    description: "Connect with friends to share financial goals, compete on savings challenges, and build wealth together.",
    category: "Finance",
    rating: 4.5,
    downloads: "6.3K",
    price: "Free",
    developer: "Community Finance",
    icon: Users,
    installed: false,
    featured: false
  }
];

export const PluginMarketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "Finance", "Health", "Security"];
  
  const filteredPlugins = plugins.filter(plugin => {
    const matchesSearch = plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plugin.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || plugin.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPlugins = filteredPlugins.filter(p => p.featured);
  const allPlugins = filteredPlugins;

  const PluginCard = ({ plugin }: { plugin: Plugin }) => (
    <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-primary/10 flex items-center justify-center">
              <plugin.icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{plugin.name}</CardTitle>
              <CardDescription className="text-sm">{plugin.developer}</CardDescription>
            </div>
          </div>
          <Badge variant={plugin.price === "Free" ? "secondary" : "outline"}>
            {plugin.price}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {plugin.description}
        </p>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-current text-yellow-500" />
            {plugin.rating}
          </div>
          <div className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            {plugin.downloads}
          </div>
          <Badge variant="outline" className="text-xs">
            {plugin.category}
          </Badge>
        </div>

        <Button 
          className="w-full" 
          variant={plugin.installed ? "secondary" : "premium"}
          disabled={plugin.installed}
        >
          {plugin.installed ? "Installed" : "Install Plugin"}
        </Button>
      </CardContent>
      
      {plugin.featured && (
        <div className="absolute top-2 right-2">
          <Badge variant="default" className="text-xs">Featured</Badge>
        </div>
      )}
    </Card>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Plugin Marketplace
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Extend your OptiHealth-Wealth experience with powerful plugins. From advanced analytics to wellness tools.
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search plugins..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Category Filter */}
      <div className="flex justify-center">
        <div className="flex gap-2 p-1 bg-muted rounded-lg">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Plugin Tabs */}
      <Tabs defaultValue="featured" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="all">All Plugins</TabsTrigger>
        </TabsList>

        <TabsContent value="featured" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPlugins.map((plugin) => (
              <PluginCard key={plugin.id} plugin={plugin} />
            ))}
          </div>
          {featuredPlugins.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No featured plugins found matching your criteria.
            </div>
          )}
        </TabsContent>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allPlugins.map((plugin) => (
              <PluginCard key={plugin.id} plugin={plugin} />
            ))}
          </div>
          {allPlugins.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No plugins found matching your criteria.
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Developer Info */}
      <Card className="bg-gradient-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-center">Build Your Own Plugin</CardTitle>
          <CardDescription className="text-center">
            Join our developer ecosystem and create the next generation of health-wealth optimization tools.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4 text-sm">
            <Badge variant="secondary">React SDK</Badge>
            <Badge variant="secondary">WebAssembly</Badge>
            <Badge variant="secondary">Blockchain APIs</Badge>
          </div>
          <Button variant="premium">View Developer Docs</Button>
        </CardContent>
      </Card>
    </div>
  );
};