import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Star, Download, TrendingUp, Heart, Shield, Zap, Users, Settings, Trash2, Check } from "lucide-react";
import { usePlugins, PluginMetadata } from "@/contexts/PluginContext";
import { PluginSettings } from "@/components/PluginSettings";
import { useToast } from "@/hooks/use-toast";
import { AnimatedIcon } from "@/components/ui/animated-icon";
import { EnhancedCard } from "@/components/ui/enhanced-card";
import { IconShowcase } from "@/components/ui/icon-showcase";

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

// Convert mock plugins to PluginMetadata format
const marketplacePlugins: PluginMetadata[] = [
  {
    id: "analytics-widget",
    name: "Analytics Widget",
    version: "1.2.0",
    author: "OptiHealth Team",
    description: "Real-time analytics dashboard with performance metrics and user insights.",
    icon: "📊",
    category: "Analytics",
    permissions: ["dashboard", "analytics"],
    enabled: false,
    installed: false,
    featured: true,
    settingsSchema: {
      type: "object",
      properties: {
        showMetrics: { type: "boolean", title: "Show Metrics", default: true },
        refreshInterval: { type: "number", title: "Refresh Interval (ms)", default: 30000, minimum: 5000, maximum: 300000 },
        theme: {
          type: "object",
          title: "Theme Settings",
          properties: {
            primary: { type: "string", title: "Primary Color", default: "#3b82f6" },
            secondary: { type: "string", title: "Secondary Color", default: "#64748b" }
          }
        }
      }
    }
  },
  {
    id: "health-tracker",
    name: "Health Tracker",
    version: "2.1.0", 
    author: "WellnessTech",
    description: "Comprehensive health monitoring with daily goals and progress tracking.",
    icon: "❤️",
    category: "Health",
    permissions: ["health-data", "notifications"],
    enabled: false,
    installed: false,
    featured: true,
    settingsSchema: {
      type: "object",
      properties: {
        trackSteps: { type: "boolean", title: "Track Steps", default: true },
        trackHeartRate: { type: "boolean", title: "Track Heart Rate", default: true },
        dailyGoals: {
          type: "object",
          title: "Daily Goals",
          properties: {
            steps: { type: "number", title: "Steps Goal", default: 10000 },
            calories: { type: "number", title: "Calories Goal", default: 2000 },
            water: { type: "number", title: "Water Glasses Goal", default: 8 }
          }
        }
      }
    }
  },
  {
    id: "wealth-dashboard",
    name: "Wealth Dashboard",
    version: "1.8.2",
    author: "FinTech Solutions",
    description: "Portfolio tracking and financial insights with real-time market data.",
    icon: "💰",
    category: "Finance",
    permissions: ["financial-data", "external-apis"],
    enabled: false,
    installed: false,
    featured: false
  },
  {
    id: "security-monitor",
    name: "Security Monitor",
    version: "3.0.1",
    author: "CyberSafe Labs",
    description: "Advanced security monitoring with threat detection and compliance tracking.",
    icon: "🛡️",
    category: "Security",
    permissions: ["security-logs", "system-monitoring"],
    enabled: false,
    installed: false,
    featured: true
  },
  {
    id: "ml-insights",
    name: "ML Insights",
    version: "1.5.0",
    author: "AI Dynamics",
    description: "Machine learning insights with model performance tracking and predictions.",
    icon: "🧠",
    category: "AI/ML",
    permissions: ["ml-models", "data-analysis"],
    enabled: false,
    installed: false,
    featured: false
  }
];

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
  const { installPlugin, uninstallPlugin, enablePlugin, disablePlugin, installedPlugins } = usePlugins();
  const { toast } = useToast();

  const categories = ["all", "Finance", "Health", "Security"];
  
  const filteredPlugins = marketplacePlugins.filter(plugin => {
    const matchesSearch = plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plugin.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || plugin.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPlugins = filteredPlugins.filter(p => p.featured);
  const allPlugins = filteredPlugins;

  const PluginCard = ({ plugin }: { plugin: PluginMetadata }) => (
    <EnhancedCard 
      variant={plugin.featured ? "neon" : "glass"} 
      animation="tilt"
      glowColor={plugin.category === 'Health' ? 'success' : plugin.category === 'Finance' ? 'warning' : 'primary'}
      className="relative overflow-hidden group"
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <IconShowcase
            icon={plugin.icon as any}
            title={plugin.name}
            description={plugin.developer}
            variant="card"
            color={plugin.category === 'Health' ? 'success' : plugin.category === 'Finance' ? 'warning' : 'primary'}
            animated={true}
            gradient={plugin.featured}
            className="flex-1"
          />
          <Badge 
            variant={plugin.price === "Free" ? "secondary" : "outline"}
            className="animate-fade-in group-hover:scale-110 transition-transform duration-300"
          >
            {plugin.price}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2 group-hover:text-muted-foreground/80 transition-colors duration-300">
          {plugin.description}
        </p>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1 group-hover:text-warning transition-colors duration-300">
            <AnimatedIcon icon={Star} size="sm" variant="pulse" color="warning" />
            {plugin.rating}
          </div>
          <div className="flex items-center gap-1 group-hover:text-primary transition-colors duration-300">
            <AnimatedIcon icon={Download} size="sm" variant="bounce" color="primary" />
            {plugin.downloads}
          </div>
          <Badge 
            variant="outline" 
            className="text-xs group-hover:border-primary/50 transition-colors duration-300"
          >
            {plugin.category}
          </Badge>
        </div>

        <div className="flex gap-2">
          <Button 
            className="flex-1 group/button relative overflow-hidden" 
            variant={plugin.installed ? "secondary" : "premium"}
            onClick={() => {
              if (!plugin.installed) {
                installPlugin(plugin);
                toast({
                  title: "Plugin Installed",
                  description: `${plugin.name} has been installed successfully.`,
                });
              }
            }}
            disabled={plugin.installed}
          >
            <span className="relative z-10 flex items-center">
              {plugin.installed ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Installed
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Install
                </>
              )}
            </span>
          </Button>
          
          {plugin.installed && (
            <PluginSettings 
              plugin={plugin}
              trigger={
                <Button variant="outline" size="default">
                  <Settings className="h-4 w-4" />
                </Button>
              }
            />
          )}
        </div>
      </CardContent>
      
      {plugin.featured && (
        <div className="absolute top-2 right-2">
          <Badge variant="default" className="text-xs animate-pulse-glow">
            <AnimatedIcon icon={Star} size="sm" variant="glow" className="mr-1" />
            Featured
          </Badge>
        </div>
      )}
    </EnhancedCard>
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