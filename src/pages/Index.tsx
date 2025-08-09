import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { FeatureCarousel } from "@/components/FeatureCarousel";
import { DashboardPreview } from "@/components/DashboardPreview";
import { UserProfile } from "@/components/UserProfile";
import { AdvancedAnalytics } from "@/components/AdvancedAnalytics";
import { NotificationSystem } from "@/components/NotificationSystem";
import { MobileOptimization } from "@/components/MobileOptimization";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { usePerformance } from "@/hooks/usePerformance";

const Index = () => {
  usePerformance();
  
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-background font-lexend antialiased">
        <Navigation />
      
      <div className="pt-16">
        <HeroSection />
        <FeatureCarousel />
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
        
        <section id="mobile" className="py-20 bg-gradient-subtle">
          <MobileOptimization />
        </section>
        </div>
      </div>
    </SmoothScroll>
  );
};

export default Index;
