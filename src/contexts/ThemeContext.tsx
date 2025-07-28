import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Theme = 'light' | 'dark' | 'auto';
export type ColorScheme = 'default' | 'health' | 'wealth' | 'aurora' | 'neon';

interface ThemeContextType {
  theme: Theme;
  colorScheme: ColorScheme;
  setTheme: (theme: Theme) => void;
  setColorScheme: (scheme: ColorScheme) => void;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_KEY = 'opti-theme';
const COLOR_SCHEME_KEY = 'opti-color-scheme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('auto');
  const [colorScheme, setColorSchemeState] = useState<ColorScheme>('default');
  const [isDark, setIsDark] = useState(false);

  // Load theme from localStorage and system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY) as Theme;
    const savedColorScheme = localStorage.getItem(COLOR_SCHEME_KEY) as ColorScheme;
    
    if (savedTheme) {
      setThemeState(savedTheme);
    }
    
    if (savedColorScheme) {
      setColorSchemeState(savedColorScheme);
    }
  }, []);

  // Apply theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Determine if dark mode should be active
    const shouldBeDark = 
      theme === 'dark' || 
      (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    setIsDark(shouldBeDark);
    
    // Apply theme classes
    root.classList.remove('light', 'dark');
    root.classList.add(shouldBeDark ? 'dark' : 'light');
    
    // Apply color scheme
    root.classList.remove('scheme-default', 'scheme-health', 'scheme-wealth', 'scheme-aurora', 'scheme-neon');
    root.classList.add(`scheme-${colorScheme}`);
    
    // Apply theme-specific CSS variables
    switch (colorScheme) {
      case 'health':
        root.style.setProperty('--theme-primary', '160 84% 39%');
        root.style.setProperty('--theme-accent', '120 60% 50%');
        break;
      case 'wealth':
        root.style.setProperty('--theme-primary', '45 93% 47%');
        root.style.setProperty('--theme-accent', '35 90% 55%');
        break;
      case 'aurora':
        root.style.setProperty('--theme-primary', '240 80% 60%');
        root.style.setProperty('--theme-accent', '300 85% 65%');
        break;
      case 'neon':
        root.style.setProperty('--theme-primary', '280 90% 70%');
        root.style.setProperty('--theme-accent', '320 85% 75%');
        break;
      default:
        root.style.setProperty('--theme-primary', '180 83% 25%');
        root.style.setProperty('--theme-accent', '190 95% 45%');
    }
  }, [theme, colorScheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== 'auto') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDark(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
  };

  const setColorScheme = (newScheme: ColorScheme) => {
    setColorSchemeState(newScheme);
    localStorage.setItem(COLOR_SCHEME_KEY, newScheme);
  };

  const toggleTheme = () => {
    if (theme === 'auto') {
      setTheme(isDark ? 'light' : 'dark');
    } else {
      setTheme(theme === 'light' ? 'dark' : 'light');
    }
  };

  const value: ThemeContextType = {
    theme,
    colorScheme,
    setTheme,
    setColorScheme,
    isDark,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}