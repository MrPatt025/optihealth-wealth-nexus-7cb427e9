import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PluginProvider } from "@/contexts/PluginContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { I18nProvider } from "@/contexts/I18nContext";
import { PerformanceMonitor } from "@/components/ui/performance-monitor";
import { AccessibilitySkipLinks } from "@/components/ui/accessibility-skip-links";
import { ReducedMotionProvider } from "@/components/ui/reduced-motion-provider";
import { createLazyComponent } from "@/components/ui/lazy-component";
import { useAdvancedPerformance } from "@/hooks/useAdvancedPerformance";
import { ResourceManager } from "@/components/ui/resource-manager";
import { HealthMonitor } from "@/components/ui/health-monitor";
import { runMaintenance } from "@/lib/maintenance";
import { memoryUtils } from "@/hooks/useAdvancedCache";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load pages สำหรับ code splitting
const DesignSystem = createLazyComponent(() => import("./pages/DesignSystem"));
const Dashboard = createLazyComponent(() => import("./pages/Dashboard"));
const Analytics = createLazyComponent(() => import("./pages/Analytics"));
const Community = createLazyComponent(() => import("./pages/Community"));
const Profile = createLazyComponent(() => import("./pages/Profile"));

const queryClient = new QueryClient();

function App() {
  const { preloadResources } = useAdvancedPerformance();

  // Enhanced resource preloading and maintenance
  React.useEffect(() => {
    preloadResources([
      '/assets/hero-image.jpg',
      '/assets/dashboard-bg.jpg'
    ]);

    // Advanced maintenance and memory management
    const healthStatus = runMaintenance();
    if (import.meta.env.DEV && healthStatus) {
      console.log('🚀 App Health Status:', healthStatus);
      console.log('💾 Memory Info:', memoryUtils.getMemoryInfo());
    }

    // Periodic cleanup for production
    if (import.meta.env.PROD) {
      const cleanupInterval = setInterval(() => {
        const memInfo = memoryUtils.getMemoryInfo();
        if (memInfo && memInfo.usage > 0.8) {
          memoryUtils.forceGC();
        }
      }, 60000); // Every minute

      return () => clearInterval(cleanupInterval);
    }
  }, [preloadResources]);

  return (
  <QueryClientProvider client={queryClient}>
    <ReducedMotionProvider>
      <I18nProvider>
        <ThemeProvider>
          <PluginProvider>
            <TooltipProvider>
              <AccessibilitySkipLinks />
              <Toaster />
              <Sonner />
              <PerformanceMonitor />
              <ResourceManager />
              <HealthMonitor />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/design-system" element={<DesignSystem />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </PluginProvider>
  </ThemeProvider>
</I18nProvider>
</ReducedMotionProvider>
</QueryClientProvider>
  );
}

export default App;
