import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Shield, Play, Award, TrendingUp, Users } from "lucide-react";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { GlassMorphism, MagneticElement } from "@/components/ui/advanced-effects";
import { ParticleSystem, FluidGradient } from "@/components/ui/advanced-backgrounds";
import { SplitText } from "@/components/ui/split-text";
import { FadeInText } from "@/components/ui/fade-in-text";
import { Typewriter } from "@/components/ui/typewriter";
import { MicroInteraction } from "@/components/ui/micro-interactions";
import { HolographicCard, NeonText, QuantumOrb, LiquidButton } from "@/components/ui/premium-effects";
import { StaggeredFadeIn, ScrollProgress, FluidText, ParallaxElement } from "@/components/ui/enhanced-animations";
import { useAdvancedPerformance } from "@/hooks/useAdvancedPerformance";
import ThreeScene from "@/components/ui/three-scene";
import { ThreeCard, ThreeText } from "@/components/ui/three-card";
import ThreeBackground from "@/components/ui/three-background";
import heroImage from "@/assets/hero-image.jpg";

export const HeroSection = () => {
  const { optimizeImages } = useAdvancedPerformance();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Scroll Progress */}
      <ScrollProgress />
      
      {/* 3D Background Layer */}
      <ThreeBackground className="opacity-40" />
      
      {/* Enhanced Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/80 to-background/70" />
      
      {/* Quantum Orbs */}
      <ParallaxElement speed={0.3} className="absolute top-20 left-20">
        <QuantumOrb size={150} colors={['#ff006e', '#8338ec', '#3a86ff']} />
      </ParallaxElement>
      <ParallaxElement speed={-0.2} className="absolute bottom-20 right-20">
        <QuantumOrb size={100} colors={['#fb8500', '#ffb703', '#8ecae6']} />
      </ParallaxElement>
      
      {/* Particle System */}
      <ParticleSystem 
        particleCount={50}
        className="opacity-40"
        color="#60a5fa"
        interactive={true}
        size={3}
      />
      
      {/* Fluid Gradient Background */}
      <FluidGradient 
        className="opacity-30"
        colors={['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981']}
        speed={0.8}
      />
      
      {/* Animated Background */}
      <AnimatedBackground variant="mesh" className="opacity-30" />
      
      {/* Hero Image with Glass Effect */}
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-20">
        <img 
          src={heroImage} 
          alt="OptiHealth Wealth Hero" 
          className="w-full h-full object-cover gpu-accelerated"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-background/50 to-background" />
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-6 z-10 relative">
        {/* Enhanced Content with Holographic Card */}
        <HolographicCard 
          className="max-w-5xl mx-auto text-center space-y-10 p-12 backdrop-blur-2xl"
          intensity={0.8}
        >
          <StaggeredFadeIn delay={150} direction="up">
            <div className="space-y-8">
              <MicroInteraction type="float">
                <div className="space-y-4">
                  <ThreeText 
                    text="Next-Gen"
                    className="mb-2"
                    size={1.5}
                    color="#00ff88"
                    height="80px"
                  />
                  <FluidText 
                    text="Health & Wealth Intelligence"
                    colors={['hsl(var(--primary))', 'hsl(var(--primary-glow))', 'hsl(var(--accent))']}
                    className="text-4xl md:text-6xl font-bold leading-tight"
                  />
                </div>
              </MicroInteraction>
              
              <MicroInteraction type="breath">
                <Typewriter
                  text="Transform your life with AI-powered health optimization and intelligent wealth management. Experience the future of personal development."
                  className="text-xl md:text-2xl text-foreground/90 max-w-3xl mx-auto leading-relaxed"
                  speed={25}
                />
              </MicroInteraction>
            </div>

            {/* Enhanced Feature Pills */}
            <div className="flex flex-wrap justify-center gap-6 mt-12">
              {[
                { icon: Sparkles, text: "AI Health Coach", color: "#ff006e" },
                { icon: Zap, text: "Smart Analytics", color: "#8338ec" },
                { icon: Shield, text: "Secure Platform", color: "#3a86ff" }
              ].map((feature, index) => (
                <MicroInteraction key={feature.text} type="magnetic" strength={0.5}>
                  <HolographicCard className="flex items-center gap-3 px-6 py-3 backdrop-blur-xl border border-white/20">
                    <feature.icon 
                      className="w-5 h-5 animate-pulse-glow" 
                      style={{ color: feature.color }}
                    />
                    <NeonText 
                      text={feature.text}
                      className="text-sm font-semibold"
                      color={feature.color}
                      glowIntensity={0.8}
                    />
                  </HolographicCard>
                </MicroInteraction>
              ))}
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center pt-12">
              <MicroInteraction type="tilt" strength={0.8}>
                <LiquidButton 
                  variant="primary"
                  size="lg"
                  className="group px-10 py-4 text-lg font-bold shadow-2xl"
                  liquid={true}
                >
                  <span className="flex items-center gap-3">
                    Start Your Journey
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-all duration-300" />
                  </span>
                </LiquidButton>
              </MicroInteraction>
              
              <MicroInteraction type="hover-glow">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="px-10 py-4 rounded-2xl font-bold text-lg border-2 border-primary/30 bg-background/20 hover:bg-primary/10 backdrop-blur-xl transition-all duration-500 hover:border-primary/60 hover:shadow-glow"
                >
                  Watch Demo
                </Button>
              </MicroInteraction>
            </div>
            
            {/* 3D Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <StaggeredFadeIn delay={200}>
                <ThreeCard className="h-48" color="#ff006e" intensity={0.8}>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-white">Health Tracking</h3>
                    <p className="text-gray-200 text-sm">AI-powered wellness monitoring</p>
                  </div>
                </ThreeCard>

                <ThreeCard className="h-48" color="#00ff88" intensity={0.8}>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-white">Wealth Management</h3>
                    <p className="text-gray-200 text-sm">Intelligent financial strategies</p>
                  </div>
                </ThreeCard>

                <ThreeCard className="h-48" color="#8338ec" intensity={0.8}>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-white">Community</h3>
                    <p className="text-gray-200 text-sm">Connect with like-minded people</p>
                  </div>
                </ThreeCard>
              </StaggeredFadeIn>
            </div>
          </StaggeredFadeIn>
        </HolographicCard>
        
        {/* 3D Interactive Scene Section */}
        <div className="relative z-10 mt-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <NeonText text="Experience the Future" color="#00ff88" />
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Immerse yourself in our cutting-edge 3D interface
              </p>
            </div>
            
            <div className="relative h-96 rounded-2xl overflow-hidden border border-white/10">
              <ThreeScene height="400px" className="rounded-2xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};