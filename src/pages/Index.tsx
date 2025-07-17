import { HeroSection } from "@/components/HeroSection";
import { FeatureCarousel } from "@/components/FeatureCarousel";
import { ConversationalInterface } from "@/components/ConversationalInterface";
import { DashboardPreview } from "@/components/DashboardPreview";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <FeatureCarousel />
      <ConversationalInterface />
      <DashboardPreview />
    </div>
  );
};

export default Index;
