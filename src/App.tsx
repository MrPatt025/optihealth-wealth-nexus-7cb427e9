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
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load pages สำหรับ code splitting
const DesignSystem = createLazyComponent(() => import("./pages/DesignSystem"));

const queryClient = new QueryClient();

const App = () => (
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
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
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

export default App;
