import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Shield } from "lucide-react";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { GlassMorphism, MagneticElement } from "@/components/ui/advanced-effects";
import { ParticleSystem, FluidGradient } from "@/components/ui/advanced-backgrounds";
import { SplitText } from "@/components/ui/split-text";
import { FadeInText } from "@/components/ui/fade-in-text";
import { Typewriter } from "@/components/ui/typewriter";
import { MicroInteraction } from "@/components/ui/micro-interactions";
import { HolographicCard, NeonText, QuantumOrb, LiquidButton } from "@/components/ui/premium-effects";
import { StaggeredFadeIn, ScrollProgress } from "@/components/ui/enhanced-animations";
import { useAdvancedPerformance } from "@/hooks/useAdvancedPerformance";
import heroImage from "@/assets/hero-image.jpg";

export const HeroSection = () => {
  const { optimizeImages } = useAdvancedPerformance();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Scroll Progress */}
      <ScrollProgress />
      
      {/* Enhanced Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />
      
      {/* Quantum Orbs */}
      <div className="absolute top-20 left-20">
        <QuantumOrb size={150} colors={['#ff006e', '#8338ec', '#3a86ff']} />
      </div>
      <div className="absolute bottom-20 right-20">
        <QuantumOrb size={100} colors={['#fb8500', '#ffb703', '#8ecae6']} />
      </div>
      
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
                <NeonText 
                  text="Next-Gen Health & Wealth Intelligence"
                  className="text-5xl md:text-7xl font-bold leading-tight"
                  color="#00ff88"
                  glowIntensity={1.2}
                />
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
          </StaggeredFadeIn>
        </HolographicCard>
      </div>
    </section>
  );
};