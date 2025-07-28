import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/contexts/ThemeContext';
import { Palette, Sun, Moon, Monitor, Heart, DollarSign, Zap, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ThemeSelectorProps {
  className?: string;
  variant?: 'button' | 'compact' | 'icon';
}

export function ThemeSelector({ className, variant = 'button' }: ThemeSelectorProps) {
  const { theme, colorScheme, setTheme, setColorScheme, isDark, toggleTheme } = useTheme();

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'auto', label: 'System', icon: Monitor },
  ];

  const colorSchemeOptions = [
    { value: 'default', label: 'Default', icon: Palette, color: 'hsl(180, 83%, 25%)' },
    { value: 'health', label: 'Health', icon: Heart, color: 'hsl(160, 84%, 39%)' },
    { value: 'wealth', label: 'Wealth', icon: DollarSign, color: 'hsl(45, 93%, 47%)' },
    { value: 'aurora', label: 'Aurora', icon: Sparkles, color: 'hsl(240, 80%, 60%)' },
    { value: 'neon', label: 'Neon', icon: Zap, color: 'hsl(280, 90%, 70%)' },
  ];

  if (variant === 'icon') {
    return (
      <div className={cn('flex items-center gap-1', className)}>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="h-8 w-8 p-0"
          title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              title="Change color scheme"
            >
              <Palette className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Color Schemes</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {colorSchemeOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setColorScheme(option.value as any)}
                  className="flex items-center gap-3"
                >
                  <div 
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: option.color }}
                  />
                  <IconComponent className="h-4 w-4" />
                  <span className="flex-1">{option.label}</span>
                  {colorScheme === option.value && (
                    <Badge variant="secondary" className="text-xs">
                      Active
                    </Badge>
                  )}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-2">
              <Palette className="h-4 w-4" />
              Theme
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel>Theme Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <div className="p-2 space-y-2">
              <div className="text-sm font-medium">Appearance</div>
              <div className="grid grid-cols-3 gap-1">
                {themeOptions.map((option) => {
                  const IconComponent = option.icon;
                  return (
                    <Button
                      key={option.value}
                      variant={theme === option.value ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setTheme(option.value as any)}
                      className="h-8 text-xs"
                    >
                      <IconComponent className="h-3 w-3 mr-1" />
                      {option.label}
                    </Button>
                  );
                })}
              </div>
            </div>
            
            <DropdownMenuSeparator />
            
            <div className="p-2 space-y-2">
              <div className="text-sm font-medium">Color Scheme</div>
              <div className="space-y-1">
                {colorSchemeOptions.map((option) => {
                  const IconComponent = option.icon;
                  return (
                    <Button
                      key={option.value}
                      variant={colorScheme === option.value ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setColorScheme(option.value as any)}
                      className="w-full justify-start h-8"
                    >
                      <div 
                        className="w-3 h-3 rounded-full border mr-2"
                        style={{ backgroundColor: option.color }}
                      />
                      <IconComponent className="h-3 w-3 mr-2" />
                      {option.label}
                    </Button>
                  );
                })}
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <div className={cn('flex items-center gap-4', className)}>
      <div className="space-y-2">
        <div className="text-sm font-medium">Theme</div>
        <div className="flex gap-2">
          {themeOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <Button
                key={option.value}
                variant={theme === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme(option.value as any)}
                className="gap-2"
              >
                <IconComponent className="h-4 w-4" />
                {option.label}
              </Button>
            );
          })}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="text-sm font-medium">Color Scheme</div>
        <div className="flex gap-2 flex-wrap">
          {colorSchemeOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <Button
                key={option.value}
                variant={colorScheme === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => setColorScheme(option.value as any)}
                className="gap-2"
              >
                <div 
                  className="w-3 h-3 rounded-full border"
                  style={{ backgroundColor: option.color }}
                />
                <IconComponent className="h-4 w-4" />
                {option.label}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}