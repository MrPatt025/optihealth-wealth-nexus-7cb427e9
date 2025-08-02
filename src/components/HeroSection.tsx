import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Brain, Zap, Play } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import heroTech from "@/assets/hero-tech.jpg";
import { Particles } from "@/components/ui/particles";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { MagicCard } from "@/components/ui/magic-card";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { FloatingElements } from "@/components/ui/floating-elements";
import { SplitText } from "@/components/ui/split-text";
import { Typewriter } from "@/components/ui/typewriter";
import { FadeInText } from "@/components/ui/fade-in-text";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced background layers with MagicUI + Lightswind fusion */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
        style={{ backgroundImage: `url(${heroTech})` }}
      />
      <AnimatedBackground variant="waves" />
      <Particles className="absolute inset-0" quantity={120} />
      <FloatingElements className="absolute inset-0" count={16} />
      
      {/* Aurora background effect */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/75 to-background/90" />
      
      {/* Enhanced animated grid with MagicUI shimmer */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--primary-glow),0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--primary-glow),0.15)_1px,transparent_1px)] bg-[size:60px_60px] animate-[shimmer_25s_linear_infinite] opacity-25" />
      
      {/* Additional aurora glow layers */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-glow/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-success/15 rounded-full blur-3xl animate-float" />
      
      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div className="animate-fade-in">
          <div className="mb-8">
            <AnimatedGradientText className="mb-4 animate-[glow_3s_ease-in-out_infinite]">
              🚀 Next-Gen AI Platform
            </AnimatedGradientText>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-lexend font-black mb-8 tracking-tighter leading-[0.9]">
            <SplitText
              text="Your AI"
              className="bg-gradient-primary bg-clip-text text-transparent block"
              delay={50}
              duration={0.8}
              ease="elastic.out(1, 0.3)"
              from={{ opacity: 0, y: 100, rotateX: -90 }}
              to={{ opacity: 1, y: 0, rotateX: 0 }}
            />
            <br />
            <FadeInText
              direction="up"
              delay={1.2}
              duration={1}
              className="text-foreground relative font-lexend inline-block"
            >
              <Typewriter
                text="Companion"
                speed={80}
                delay={2000}
                className="relative"
              />
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 blur-xl animate-[glow_4s_ease-in-out_infinite] -z-10" />
            </FadeInText>
          </h1>
          
          <FadeInText
            direction="up"
            delay={3.5}
            duration={1.2}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed font-inter font-light tracking-wide"
          >
            <SplitText
              text="The world's first Gen-Z-centric AI platform that seamlessly blends"
              splitType="words"
              delay={30}
              duration={0.6}
              from={{ opacity: 0, y: 20 }}
              to={{ opacity: 1, y: 0 }}
            />
            <span className="text-accent font-semibold font-lexend"> health optimization</span> and
            <span className="text-primary-glow font-semibold"> financial intelligence</span> 
            with Netflix-style UX and ironclad privacy.
          </FadeInText>

          {/* Enhanced Feature Highlights with MagicCard */}
          <FadeInText
            direction="up"
            delay={5}
            duration={0.8}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            <MagicCard 
              className="p-6 bg-gradient-glass backdrop-blur-md border-primary/30 hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:shadow-glow"
              gradientColor="rgba(var(--primary-glow), 0.15)"
            >
              <div className="flex items-center gap-3 text-foreground">
                <Brain className="h-6 w-6 text-accent animate-pulse" />
                <span className="font-semibold font-lexend">AI-Powered Insights</span>
              </div>
            </MagicCard>
            
            <MagicCard 
              className="p-6 bg-gradient-glass backdrop-blur-md border-success/30 hover:border-success/50 transition-all duration-500 hover:scale-105 hover:shadow-glow"
              gradientColor="rgba(var(--success), 0.15)"
            >
              <div className="flex items-center gap-3 text-foreground">
                <Shield className="h-6 w-6 text-primary-glow animate-pulse" />
                <span className="font-semibold font-lexend">Privacy-First</span>
              </div>
            </MagicCard>
            
            <MagicCard 
              className="p-6 bg-gradient-glass backdrop-blur-md border-warning/30 hover:border-warning/50 transition-all duration-500 hover:scale-105 hover:shadow-glow"
              gradientColor="rgba(var(--warning), 0.15)"
            >
              <div className="flex items-center gap-3 text-foreground">
                <Zap className="h-6 w-6 text-warning animate-pulse" />
                <span className="font-semibold font-lexend">Real-Time Optimization</span>
              </div>
            </MagicCard>
          </FadeInText>

          {/* Enhanced CTA Buttons with MagicUI effects */}
          <FadeInText
            direction="up"
            delay={6}
            duration={1}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Button 
              size="lg" 
              className="group relative overflow-hidden bg-gradient-primary hover:bg-gradient-hero shadow-glow hover:shadow-lg hover:scale-105 transition-all duration-500 px-8 py-4 text-lg font-semibold border-0"
            >
              <span className="relative z-10 flex items-center text-white">
                Start Your Journey
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-500" />
              </span>
              <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
              <div className="absolute inset-0 animate-shimmer opacity-20" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="group border-2 border-primary/40 hover:border-primary bg-gradient-glass backdrop-blur-md hover:bg-gradient-primary/10 transition-all duration-500 px-8 py-4 text-lg font-semibold hover:scale-105 hover:shadow-glow"
            >
              <span className="flex items-center">
                <Play className="mr-3 h-5 w-5 group-hover:animate-bounce" />
                Watch Demo
                <div className="ml-3 w-3 h-3 bg-primary rounded-full animate-pulse" />
              </span>
            </Button>
          </FadeInText>

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