import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MagicCard } from '@/components/ui/magic-card';
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text';
import { Particles } from '@/components/ui/particles';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { IconShowcase } from '@/components/ui/icon-showcase';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ThemeSelector } from '@/components/ui/theme-selector';
import { LanguageSelector } from '@/components/ui/language-selector';
import { useTheme } from '@/contexts/ThemeContext';
import { useI18n } from '@/contexts/I18nContext';
import { 
  Palette, 
  Type, 
  Sparkles, 
  Layers, 
  Code2, 
  Zap,
  Heart,
  Star,
  Moon,
  Sun,
  Smartphone,
  Monitor,
  Tablet,
  Cpu,
  Database,
  Shield,
  TrendingUp,
  Brain,
  Target,
  Rocket
} from 'lucide-react';

const DesignSystem = () => {
  const { colorScheme, isDark } = useTheme();
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState('overview');

  const colorTokens = [
    { name: 'Primary', value: 'hsl(var(--primary))', class: 'bg-primary' },
    { name: 'Primary Glow', value: 'hsl(var(--primary-glow))', class: 'bg-primary-glow' },
    { name: 'Secondary', value: 'hsl(var(--secondary))', class: 'bg-secondary' },
    { name: 'Accent', value: 'hsl(var(--accent))', class: 'bg-accent' },
    { name: 'Success', value: 'hsl(var(--success))', class: 'bg-success' },
    { name: 'Warning', value: 'hsl(var(--warning))', class: 'bg-warning' },
    { name: 'Destructive', value: 'hsl(var(--destructive))', class: 'bg-destructive' },
  ];

  const gradients = [
    { name: 'Primary', class: 'bg-gradient-primary' },
    { name: 'Hero', class: 'bg-gradient-hero' },
    { name: 'Card', class: 'bg-gradient-card' },
    { name: 'Accent', class: 'bg-gradient-accent' },
    { name: 'Rainbow', class: 'bg-gradient-rainbow' },
    { name: 'Mesh', class: 'bg-gradient-mesh' },
    { name: 'Glass', class: 'bg-gradient-glass' },
    { name: 'Neon', class: 'bg-gradient-neon' },
  ];

  const animations = [
    { name: 'Fade In', class: 'animate-fade-in' },
    { name: 'Slide Up', class: 'animate-slide-up' },
    { name: 'Gradient', class: 'animate-gradient' },
    { name: 'Shimmer', class: 'animate-shimmer' },
    { name: 'Float', class: 'animate-float' },
    { name: 'Glow', class: 'animate-glow' },
    { name: 'Pulse Glow', class: 'animate-pulse-glow' },
    { name: 'Morph', class: 'animate-morph' },
  ];

  const iconAnimations = [
    { name: 'Bounce', class: 'animate-icon-bounce' },
    { name: 'Wiggle', class: 'animate-icon-wiggle' },
    { name: 'Ping', class: 'animate-icon-ping' },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <AuroraBackground variant="default" className="opacity-30" />
      <Particles className="absolute inset-0" quantity={50} />
      
      {/* Header */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-12">
        <div className="text-center mb-12">
          <AnimatedGradientText className="mb-4">
            🎨 Lightswind + MagicUI Design System
          </AnimatedGradientText>
          
          <h1 className="text-4xl md:text-6xl font-lexend font-black mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Design System Dashboard
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Comprehensive component library fusing Lightswind's design tokens with MagicUI's interactive elements
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <ThemeSelector />
            <LanguageSelector />
            <Badge variant="secondary" className="px-4 py-2">
              Current Scheme: {colorScheme}
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              {isDark ? 'Dark' : 'Light'} Mode
            </Badge>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-12">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="colors" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Colors
            </TabsTrigger>
            <TabsTrigger value="typography" className="flex items-center gap-2">
              <Type className="h-4 w-4" />
              Typography
            </TabsTrigger>
            <TabsTrigger value="components" className="flex items-center gap-2">
              <Layers className="h-4 w-4" />
              Components
            </TabsTrigger>
            <TabsTrigger value="animations" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Animations
            </TabsTrigger>
            <TabsTrigger value="examples" className="flex items-center gap-2">
              <Code2 className="h-4 w-4" />
              Examples
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <BentoGrid className="max-w-6xl mx-auto">
              <BentoGridItem
                className="md:col-span-2 bg-gradient-mesh border-primary/20"
                title="Lightswind Design Philosophy"
                description="Electric Indigo palette with futuristic animations and Aurora effects"
                header={
                  <div className="h-32 bg-gradient-primary rounded-lg mb-4 flex items-center justify-center">
                    <div className="text-white animate-pulse">⚡ Futuristic UI</div>
                  </div>
                }
                icon={<Rocket className="h-6 w-6 text-primary" />}
              />
              
              <BentoGridItem
                className="md:col-span-1 bg-gradient-card border-accent/20"
                title="MagicUI Components"
                description="Production-ready components with micro-interactions"
                header={
                  <div className="h-32 bg-gradient-accent rounded-lg mb-4 flex items-center justify-center">
                    <Star className="h-8 w-8 text-accent animate-spin" />
                  </div>
                }
                icon={<Sparkles className="h-6 w-6 text-accent" />}
              />
              
              <BentoGridItem
                className="md:col-span-3 bg-gradient-glass backdrop-blur-sm border-white/20"
                title="Fusion Architecture"
                description="Seamless integration of both design systems with OptiHealth-Wealth domain expertise"
                header={
                  <div className="h-32 bg-gradient-mesh rounded-lg mb-4 flex items-center justify-center space-x-4">
                    <Brain className="h-8 w-8 text-primary animate-pulse" />
                    <Heart className="h-8 w-8 text-success animate-bounce" />
                    <TrendingUp className="h-8 w-8 text-warning animate-float" />
                  </div>
                }
                icon={<Target className="h-6 w-6 text-primary-glow" />}
              />
            </BentoGrid>
          </TabsContent>

          {/* Colors Tab */}
          <TabsContent value="colors" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Color Tokens */}
              <MagicCard className="p-6">
                <h3 className="text-2xl font-lexend font-semibold mb-6">Color Tokens</h3>
                <div className="grid grid-cols-2 gap-4">
                  {colorTokens.map((color) => (
                    <div key={color.name} className="space-y-2">
                      <div className={`w-full h-16 rounded-lg ${color.class} shadow-glow`} />
                      <div>
                        <p className="font-medium">{color.name}</p>
                        <p className="text-sm text-muted-foreground font-mono">{color.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </MagicCard>

              {/* Gradients */}
              <MagicCard className="p-6">
                <h3 className="text-2xl font-lexend font-semibold mb-6">Gradient System</h3>
                <div className="grid grid-cols-2 gap-4">
                  {gradients.map((gradient) => (
                    <div key={gradient.name} className="space-y-2">
                      <div className={`w-full h-16 rounded-lg ${gradient.class} shadow-card`} />
                      <p className="font-medium text-center">{gradient.name}</p>
                    </div>
                  ))}
                </div>
              </MagicCard>
            </div>
          </TabsContent>

          {/* Typography Tab */}
          <TabsContent value="typography" className="space-y-8">
            <MagicCard className="p-8">
              <h3 className="text-2xl font-lexend font-semibold mb-8">Typography Scale</h3>
              <div className="space-y-6">
                <div className="text-6xl font-lexend font-black bg-gradient-primary bg-clip-text text-transparent">
                  Display Large
                </div>
                <div className="text-4xl font-lexend font-bold text-foreground">
                  Heading 1
                </div>
                <div className="text-3xl font-lexend font-semibold text-foreground">
                  Heading 2
                </div>
                <div className="text-2xl font-lexend font-medium text-foreground">
                  Heading 3
                </div>
                <div className="text-xl font-inter text-foreground">
                  Body Large - Inter Font
                </div>
                <div className="text-base font-inter text-muted-foreground">
                  Body Regular - Perfect for content
                </div>
                <div className="text-sm font-mono text-muted-foreground">
                  Code/Mono - JetBrains Mono
                </div>
              </div>
            </MagicCard>
          </TabsContent>

          {/* Components Tab */}
          <TabsContent value="components" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Buttons */}
              <MagicCard className="p-6">
                <h4 className="font-lexend font-semibold mb-4">Buttons</h4>
                <div className="space-y-3">
                  <Button variant="default" className="w-full">Primary</Button>
                  <Button variant="secondary" className="w-full">Secondary</Button>
                  <Button variant="outline" className="w-full">Outline</Button>
                  <Button variant="ghost" className="w-full">Ghost</Button>
                </div>
              </MagicCard>

              {/* Icons */}
              <MagicCard className="p-6">
                <h4 className="font-lexend font-semibold mb-4">Icon Showcase</h4>
                <div className="grid grid-cols-4 gap-4">
                  <IconShowcase icon={Brain} title="AI Brain" color="primary" />
                  <IconShowcase icon={Heart} title="Health" color="success" />
                  <IconShowcase icon={Shield} title="Security" color="warning" />
                  <IconShowcase icon={Zap} title="Speed" color="accent" />
                  <IconShowcase icon={Database} title="Data" color="primary" />
                  <IconShowcase icon={Cpu} title="CPU" color="muted" />
                  <IconShowcase icon={Monitor} title="Monitor" color="muted" />
                  <IconShowcase icon={Smartphone} title="Mobile" color="warning" />
                </div>
              </MagicCard>

              {/* Theme Controls */}
              <MagicCard className="p-6">
                <h4 className="font-lexend font-semibold mb-4">Theme Controls</h4>
                <div className="space-y-4">
                  <ThemeSelector />
                  <LanguageSelector />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Dark Mode</span>
                    {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  </div>
                </div>
              </MagicCard>
            </div>
          </TabsContent>

          {/* Animations Tab */}
          <TabsContent value="animations" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Standard Animations */}
              <MagicCard className="p-6">
                <h4 className="font-lexend font-semibold mb-6">Standard Animations</h4>
                <div className="grid grid-cols-2 gap-4">
                  {animations.map((anim) => (
                    <div key={anim.name} className="text-center">
                      <div className={`w-16 h-16 bg-gradient-primary rounded-lg mx-auto mb-2 ${anim.class}`} />
                      <p className="text-sm font-medium">{anim.name}</p>
                    </div>
                  ))}
                </div>
              </MagicCard>

              {/* Icon Animations */}
              <MagicCard className="p-6">
                <h4 className="font-lexend font-semibold mb-6">Icon Animations</h4>
                <div className="grid grid-cols-3 gap-6">
                  {iconAnimations.map((anim) => (
                    <div key={anim.name} className="text-center">
                      <div className="relative mb-4">
                        <Sparkles className={`h-8 w-8 text-primary mx-auto ${anim.class}`} />
                      </div>
                      <p className="text-sm font-medium">{anim.name}</p>
                    </div>
                  ))}
                </div>
              </MagicCard>
            </div>
          </TabsContent>

          {/* Examples Tab */}
          <TabsContent value="examples" className="space-y-8">
            <div className="space-y-6">
              {/* Magic Card Examples */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MagicCard className="p-6 bg-gradient-card/50 backdrop-blur-sm">
                  <div className="text-center">
                    <Brain className="h-8 w-8 text-primary mx-auto mb-4 animate-pulse" />
                    <h4 className="font-lexend font-semibold mb-2">AI Health</h4>
                    <p className="text-sm text-muted-foreground">Intelligent health optimization</p>
                  </div>
                </MagicCard>

                <MagicCard className="p-6 bg-gradient-mesh/30 backdrop-blur-sm">
                  <div className="text-center">
                    <TrendingUp className="h-8 w-8 text-success mx-auto mb-4 animate-bounce" />
                    <h4 className="font-lexend font-semibold mb-2">Wealth Growth</h4>
                    <p className="text-sm text-muted-foreground">Financial intelligence platform</p>
                  </div>
                </MagicCard>

                <MagicCard className="p-6 bg-gradient-glass backdrop-blur-sm">
                  <div className="text-center">
                    <Shield className="h-8 w-8 text-warning mx-auto mb-4 animate-glow" />
                    <h4 className="font-lexend font-semibold mb-2">Privacy First</h4>
                    <p className="text-sm text-muted-foreground">Zero-trust architecture</p>
                  </div>
                </MagicCard>
              </div>

              {/* Interactive Elements */}
              <MagicCard className="p-8">
                <h4 className="font-lexend font-semibold mb-6 text-center">Interactive Elements Demo</h4>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button className="hover-glow animate-pulse-glow">
                    Glow Button
                  </Button>
                  <Button variant="outline" className="group">
                    <span className="group-hover:animate-wiggle">Hover Me</span>
                  </Button>
                  <div className="p-4 bg-gradient-neon rounded-lg animate-morph">
                    <span className="text-white font-semibold">Morphing Shape</span>
                  </div>
                </div>
              </MagicCard>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DesignSystem;