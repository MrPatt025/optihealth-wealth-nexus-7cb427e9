import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Brain, Zap } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import { Particles } from "@/components/ui/particles";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { MagicCard } from "@/components/ui/magic-card";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="OptiHealth-Wealth Nexus Platform" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/90" />
      </div>

      {/* Particles Background */}
      <Particles 
        className="absolute inset-0" 
        quantity={50} 
        staticity={30} 
        ease={50} 
      />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div className="animate-fade-in">
          <div className="mb-8">
            <AnimatedGradientText>
              🚀 Launching the Future of Personal Optimization
            </AnimatedGradientText>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent leading-tight animate-slide-up">
            OptiHealth-Wealth
            <br />
            <span className="text-accent animate-pulse">Nexus</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            The world's first Gen-Z-centric AI platform that seamlessly blends 
            <span className="text-accent font-semibold"> health optimization</span> and 
            <span className="text-primary-glow font-semibold"> financial intelligence</span> 
            with Netflix-style UX and ironclad privacy.
          </p>

          {/* Feature Highlights */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <MagicCard className="p-4 bg-gradient-card/50 backdrop-blur-sm border-primary/20">
              <div className="flex items-center gap-2 text-foreground/90">
                <Brain className="h-5 w-5 text-accent animate-pulse" />
                <span className="font-medium">AI-Powered Insights</span>
              </div>
            </MagicCard>
            <MagicCard className="p-4 bg-gradient-card/50 backdrop-blur-sm border-primary/20">
              <div className="flex items-center gap-2 text-foreground/90">
                <Shield className="h-5 w-5 text-primary-glow animate-pulse" />
                <span className="font-medium">Privacy-First</span>
              </div>
            </MagicCard>
            <MagicCard className="p-4 bg-gradient-card/50 backdrop-blur-sm border-primary/20">
              <div className="flex items-center gap-2 text-foreground/90">
                <Zap className="h-5 w-5 text-warning animate-pulse" />
                <span className="font-medium">Real-Time Optimization</span>
              </div>
            </MagicCard>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="lg" className="group relative overflow-hidden shadow-glow hover:shadow-lg transition-all duration-300">
              <span className="relative z-10 flex items-center">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </Button>
            <Button variant="outline" size="lg" className="group border-primary/50 hover:border-primary transition-all duration-300">
              <span className="flex items-center">
                Watch Demo
                <div className="ml-2 w-2 h-2 bg-primary rounded-full animate-pulse" />
              </span>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 text-center">
            <p className="text-sm text-muted-foreground mb-4">Trusted by forward-thinking individuals</p>
            <div className="flex justify-center items-center gap-8 opacity-60">
              <div className="text-xs font-mono">GDPR Compliant</div>
              <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
              <div className="text-xs font-mono">SOC 2 Type II</div>
              <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
              <div className="text-xs font-mono">Zero-Trust Architecture</div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-glow/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
    </section>
  );
};