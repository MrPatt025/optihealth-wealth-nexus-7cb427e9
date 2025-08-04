import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Brain, Zap, Play, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressiveImage } from "@/components/ui/progressive-image";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
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
import { MicroInteraction } from "@/components/ui/micro-interactions";

export const HeroSection = () => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <AnimatedBackground variant="mesh" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Particles className="absolute inset-0" />
      <FloatingElements className="absolute inset-0" count={8} />
      
      <div className="container mx-auto px-4 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <FadeInText delay={0.2}>
                <MicroInteraction type="hover-glow">
                  <Badge variant="secondary" className="mb-4 text-sm px-4 py-2 animate-pulse-glow">
                    🚀 Next-Gen Health & Wealth Platform
                  </Badge>
                </MicroInteraction>
              </FadeInText>
              
              <SplitText 
                text="OptiHealth-Wealth"
                className="text-5xl lg:text-7xl font-bold text-gradient leading-tight"
                delay={0.1}
              />
              
              <Typewriter
                text="Optimize Your Health Journey"
                className="text-xl lg:text-2xl text-muted-foreground"
                speed={100}
                delay={1000}
              />
            </div>

            <FadeInText delay={0.6} className="text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              Revolutionary platform combining cutting-edge health analytics with intelligent wealth management. 
              Experience the future of personal optimization.
            </FadeInText>

            <FadeInText delay={0.8} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <MicroInteraction type="hover-lift">
                <Button size="lg" className="text-lg px-8 py-4 hover-glow optimize-gpu">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </MicroInteraction>
              <MicroInteraction type="hover-glow">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                  Watch Demo
                  <Play className="ml-2 h-5 w-5" />
                </Button>
              </MicroInteraction>
            </FadeInText>
          </div>

          <FadeInText delay={1.0} className="relative">
            <MicroInteraction type="tilt">
              <Card className="relative overflow-hidden border-0 bg-gradient-card shadow-2xl hover-glow optimize-animations">
                <ProgressiveImage
                  src={heroImage}
                  alt="OptiHealth-Wealth Dashboard"
                  className="w-full h-auto rounded-lg"
                  placeholder="/placeholder.svg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between text-white">
                    <MicroInteraction type="hover-glow">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-5 w-5 text-success animate-bounce-gentle" />
                        <span className="text-sm font-medium">98% Success Rate</span>
                      </div>
                    </MicroInteraction>
                    <MicroInteraction type="hover-glow">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-5 w-5 text-primary animate-pulse-glow" />
                        <span className="text-sm font-medium">Bank-Grade Security</span>
                      </div>
                    </MicroInteraction>
                  </div>
                </div>
              </Card>
            </MicroInteraction>
          </FadeInText>
        </div>
      </div>
    </AnimatedBackground>
  );
};