import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Brain, Zap } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

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

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent leading-tight">
            OptiHealth-Wealth
            <br />
            <span className="text-accent">Nexus</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            The world's first Gen-Z-centric AI platform that seamlessly blends 
            <span className="text-accent font-semibold"> health optimization</span> and 
            <span className="text-primary-glow font-semibold"> financial intelligence</span> 
            with Netflix-style UX and ironclad privacy.
          </p>

          {/* Feature Highlights */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center gap-2 text-foreground/80">
              <Brain className="h-5 w-5 text-accent" />
              <span>AI-Powered Insights</span>
            </div>
            <div className="flex items-center gap-2 text-foreground/80">
              <Shield className="h-5 w-5 text-primary-glow" />
              <span>Privacy-First</span>
            </div>
            <div className="flex items-center gap-2 text-foreground/80">
              <Zap className="h-5 w-5 text-warning" />
              <span>Real-Time Optimization</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="lg" className="group">
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg">
              Watch Demo
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