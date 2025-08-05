import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Shield } from "lucide-react";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { GlassMorphism, MagneticElement } from "@/components/ui/advanced-effects";
import { ParticleSystem, FluidGradient } from "@/components/ui/advanced-backgrounds";
import { SplitText } from "@/components/ui/split-text";
import { FadeInText } from "@/components/ui/fade-in-text";
import { Typewriter } from "@/components/ui/typewriter";
import { useAdvancedPerformance } from "@/hooks/useAdvancedPerformance";
import heroImage from "@/assets/hero-image.jpg";

export const HeroSection = () => {
  const { optimizeImages } = useAdvancedPerformance();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />
      
      {/* Particle System */}
      <ParticleSystem 
        particleCount={30}
        className="opacity-30"
        color="hsl(var(--primary))"
        interactive={true}
      />
      
      {/* Fluid Gradient Background */}
      <FluidGradient 
        className="opacity-20"
        colors={['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--primary-glow))']}
        speed={0.5}
      />
      
      {/* Animated Background */}
      <AnimatedBackground variant="mesh" className="opacity-50" />
      
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
        {/* Enhanced Content with Glass Morphism */}
        <GlassMorphism 
          intensity="medium" 
          className="max-w-4xl mx-auto text-center space-y-8 p-8 rounded-3xl border border-white/10"
          glow={true}
        >
          <div className="space-y-6">
            <SplitText 
              text="Next-Gen Health & Wealth Intelligence"
              className="text-5xl md:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent leading-tight"
              delay={100}
            />
            
            <FadeInText delay={800}>
              <Typewriter
                text="Transform your life with AI-powered health optimization and intelligent wealth management. Experience the future of personal development."
                className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto leading-relaxed"
                speed={30}
              />
            </FadeInText>
          </div>

          {/* Enhanced Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {[
              { icon: Sparkles, text: "AI Health Coach" },
              { icon: Zap, text: "Smart Analytics" },
              { icon: Shield, text: "Secure Platform" }
            ].map((feature, index) => (
              <MagneticElement key={feature.text}>
                <GlassMorphism 
                  intensity="light"
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm"
                >
                  <feature.icon className="w-4 h-4 text-accent animate-pulse-glow" />
                  <span className="text-sm font-medium text-foreground/80">{feature.text}</span>
                </GlassMorphism>
              </MagneticElement>
            ))}
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <MagneticElement strength={0.2}>
              <Button 
                size="lg" 
                className="group bg-gradient-primary hover:bg-gradient-accent text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg shadow-glow hover:shadow-lg transition-all duration-300 animate-glass-shine gpu-accelerated"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </MagneticElement>
            
            <MagneticElement strength={0.15}>
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-4 rounded-xl font-semibold text-lg border-2 border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
              >
                Watch Demo
              </Button>
            </MagneticElement>
          </div>
        </GlassMorphism>
      </div>
    </section>
  );
};