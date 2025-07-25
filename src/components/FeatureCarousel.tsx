import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Heart, DollarSign, Brain, Users, Shield, Smartphone } from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

const features = [
  {
    id: 1,
    icon: <Heart className="h-8 w-8" />,
    title: "Health Intelligence",
    description: "AI-powered health insights that adapt to your lifestyle patterns and goals.",
    gradient: "bg-gradient-to-br from-primary to-primary-glow",
    image: "🏃‍♀️"
  },
  {
    id: 2,
    icon: <DollarSign className="h-8 w-8" />,
    title: "Wealth Optimization",
    description: "Smart financial guidance that grows with your ambitions and risk tolerance.",
    gradient: "bg-gradient-to-br from-accent to-success",
    image: "💰"
  },
  {
    id: 3,
    icon: <Brain className="h-8 w-8" />,
    title: "Conversational AI",
    description: "Natural language interface that understands context and learns from interactions.",
    gradient: "bg-gradient-to-br from-warning to-accent",
    image: "🤖"
  },
  {
    id: 4,
    icon: <Users className="h-8 w-8" />,
    title: "Social Insights",
    description: "Community-driven insights while maintaining complete privacy and anonymity.",
    gradient: "bg-gradient-to-br from-primary-glow to-warning",
    image: "👥"
  },
  {
    id: 5,
    icon: <Shield className="h-8 w-8" />,
    title: "Privacy Shield",
    description: "Blockchain-backed data sovereignty with zero-knowledge proof verification.",
    gradient: "bg-gradient-to-br from-success to-primary",
    image: "🛡️"
  },
  {
    id: 6,
    icon: <Smartphone className="h-8 w-8" />,
    title: "Edge-First Mobile",
    description: "Offline-capable PWA with sub-100ms AI inference and seamless sync.",
    gradient: "bg-gradient-to-br from-accent to-primary-glow",
    image: "📱"
  }
];

export const FeatureCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(features.length / 3));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(features.length / 3)) % Math.ceil(features.length / 3));
  };

  const visibleFeatures = features.slice(currentIndex * 3, currentIndex * 3 + 3);

  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Netflix-Style Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Swipe through personalized insights, binge-worthy content, and AI-powered recommendations 
            that evolve with your journey.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-semibold">Featured Capabilities</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={prevSlide}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={nextSlide}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleFeatures.map((feature, index) => (
              <MagicCard 
                key={feature.id}
                className="group hover:shadow-2xl transition-all duration-500 hover:scale-[1.03] bg-gradient-card/80 backdrop-blur-sm border-primary/10"
                gradientColor="hsl(var(--primary-glow) / 0.15)"
              >
                <div className="p-6">
                  <div className={`w-16 h-16 rounded-xl ${feature.gradient} flex items-center justify-center text-white mb-4 group-hover:shadow-glow transition-all duration-300 group-hover:scale-110`}>
                    {feature.icon}
                  </div>
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.image}</div>
                  <h4 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">{feature.title}</h4>
                  <p className="text-muted-foreground leading-relaxed mb-4">{feature.description}</p>
                  <Button variant="ghost" className="mt-2 p-0 h-auto text-accent hover:text-accent/80 group-hover:translate-x-1 transition-all duration-300">
                    Learn more →
                  </Button>
                </div>
              </MagicCard>
            ))}
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: Math.ceil(features.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-accent w-8' : 'bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};