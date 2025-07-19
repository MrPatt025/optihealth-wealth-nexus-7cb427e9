import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { FeatureCarousel } from "@/components/FeatureCarousel";
import { ConversationalInterface } from "@/components/ConversationalInterface";
import { DashboardPreview } from "@/components/DashboardPreview";
import { UserProfile } from "@/components/UserProfile";
import { PluginMarketplace } from "@/components/PluginMarketplace";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-16">
        <HeroSection />
        <FeatureCarousel />
        <ConversationalInterface />
        <DashboardPreview />
        
        <section id="profile" className="py-20">
          <UserProfile />
        </section>
        
        <section id="plugins" className="py-20 bg-gradient-subtle">
          <PluginMarketplace />
        </section>
      </div>
    </div>
  );
};

export default Index;
