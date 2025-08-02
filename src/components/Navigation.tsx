import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AuthModal } from "./AuthModal";
import { Menu, X, Bell, Settings, User, Home, BarChart3, MessageCircle, Puzzle, Users, Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { FadeInText } from "@/components/ui/fade-in-text";
import { MagicCard } from "@/components/ui/magic-card";

const navigationItems = [
  { icon: Home, label: "Dashboard", href: "/", active: true, isInternal: true },
  { icon: BarChart3, label: "Analytics", href: "#analytics" },
  { icon: MessageCircle, label: "AI Coach", href: "#chat" },
  { icon: Bell, label: "Notifications", href: "#notifications" },
  { icon: Users, label: "Community", href: "#community" },
  { icon: Puzzle, label: "Plugins", href: "#plugins", badge: "Beta" },
  { icon: Palette, label: "Design System", href: "/design-system", badge: "New", isInternal: true },
];

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <FadeInText direction="down" duration={0.8}>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/20 shadow-elegant">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <FadeInText direction="right" delay={0.2} duration={0.8} className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow hover:scale-110 transition-transform duration-300">
              <span className="text-xs font-bold text-white">OH</span>
            </div>
            <span className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent hover:animate-glow transition-all duration-300">
              OptiHealth-Wealth
            </span>
          </FadeInText>

          {/* Desktop Navigation */}
          <FadeInText direction="down" delay={0.4} duration={1} className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item, index) => {
              if (item.isInternal) {
                return (
                  <Link key={index} to={item.href}>
                    <Button
                      variant={item.active ? "secondary" : "ghost"}
                      size="sm"
                      className={cn(
                        "flex items-center gap-2",
                        item.active && "bg-primary/10 text-primary"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                      {item.badge && (
                        <Badge variant="secondary" className="text-xs ml-1">
                          {item.badge}
                        </Badge>
                      )}
                    </Button>
                  </Link>
                );
              }
              
              return (
                <a key={index} href={item.href}>
                  <Button
                    variant={item.active ? "secondary" : "ghost"}
                    size="sm"
                    className={cn(
                      "flex items-center gap-2",
                      item.active && "bg-primary/10 text-primary"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs ml-1">
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                </a>
              );
            })}
          </FadeInText>

          {/* User Actions */}
          <FadeInText direction="left" delay={0.6} duration={0.8} className="flex items-center space-x-3">
            {isLoggedIn ? (
              <>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 text-xs p-0 flex items-center justify-center"
                  >
                    3
                  </Badge>
                </Button>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <AuthModal>
                <Button variant="premium" size="sm">
                  Get Started
                </Button>
              </AuthModal>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </FadeInText>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <FadeInText direction="down" duration={0.5} className="md:hidden border-t border-border/20 bg-background/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item, index) => {
                if (item.isInternal) {
                  return (
                    <Link key={index} to={item.href}>
                      <Button
                        variant={item.active ? "secondary" : "ghost"}
                        size="sm"
                        className={cn(
                          "w-full justify-start gap-2",
                          item.active && "bg-primary/10 text-primary"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                        {item.badge && (
                          <Badge variant="secondary" className="text-xs ml-auto">
                            {item.badge}
                          </Badge>
                        )}
                      </Button>
                    </Link>
                  );
                }
                
                return (
                  <a key={index} href={item.href}>
                    <Button
                      variant={item.active ? "secondary" : "ghost"}
                      size="sm"
                      className={cn(
                        "w-full justify-start gap-2",
                        item.active && "bg-primary/10 text-primary"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                      {item.badge && (
                        <Badge variant="secondary" className="text-xs ml-auto">
                          {item.badge}
                        </Badge>
                      )}
                    </Button>
                  </a>
                );
              })}
            </div>
          </FadeInText>
        )}
      </div>
    </nav>
    </FadeInText>
  );
};