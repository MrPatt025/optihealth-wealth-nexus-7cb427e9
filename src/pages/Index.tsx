import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { FeatureCarousel } from "@/components/FeatureCarousel";
import { ConversationalInterface } from "@/components/ConversationalInterface";
import { DashboardPreview } from "@/components/DashboardPreview";
import { UserProfile } from "@/components/UserProfile";
import { PluginMarketplace } from "@/components/PluginMarketplace";
import { AdvancedAnalytics } from "@/components/AdvancedAnalytics";
import { NotificationSystem } from "@/components/NotificationSystem";
import { SocialFeatures } from "@/components/SocialFeatures";

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
        
        <section id="analytics" className="py-20 bg-gradient-subtle">
          <AdvancedAnalytics />
        </section>
        
        <section id="notifications" className="py-20">
          <NotificationSystem />
        </section>
        
        <section id="community" className="py-20 bg-gradient-subtle">
          <SocialFeatures />
        </section>
        
        <section id="plugins" className="py-20">
          <PluginMarketplace />
        </section>
      </div>
    </div>
  );
};

export default Index;
