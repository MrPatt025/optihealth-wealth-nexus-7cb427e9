/**
 * Design Tokens - Fusion of Lightswind + MagicUI Design Systems
 * 
 * Core principles:
 * - Lightswind: Futuristic animations, Aurora effects, Electric Indigo palette
 * - MagicUI: Production-ready components, Motion patterns, Neomorphic surfaces
 * - OptiHealth-Wealth: Health & Finance domain-specific tokens
 */

export const designTokens = {
  // Color Palette - Fusion of Lightswind Electric Indigo + MagicUI Neutrals
  colors: {
    // Primary: Electric Indigo (Lightswind inspired)
    'electric-indigo': {
      50: '240 100% 98%',   // hsl(240, 100%, 98%)
      100: '240 100% 95%',  // hsl(240, 100%, 95%)
      200: '240 100% 90%',  // hsl(240, 100%, 90%)
      300: '240 90% 80%',   // hsl(240, 90%, 80%)
      400: '240 85% 70%',   // hsl(240, 85%, 70%)
      500: '240 80% 60%',   // hsl(240, 80%, 60%) - Primary
      600: '240 75% 50%',   // hsl(240, 75%, 50%)
      700: '240 70% 40%',   // hsl(240, 70%, 40%)
      800: '240 65% 30%',   // hsl(240, 65%, 30%)
      900: '240 60% 20%',   // hsl(240, 60%, 20%)
      950: '240 55% 10%',   // hsl(240, 55%, 10%)
    },
    
    // Secondary: Slate Charcoal (Lightswind inspired)
    'slate-charcoal': {
      50: '215 25% 97%',    // hsl(215, 25%, 97%)
      100: '215 25% 94%',   // hsl(215, 25%, 94%)
      200: '215 25% 87%',   // hsl(215, 25%, 87%)
      300: '215 20% 75%',   // hsl(215, 20%, 75%)
      400: '215 18% 60%',   // hsl(215, 18%, 60%)
      500: '215 16% 45%',   // hsl(215, 16%, 45%) - Secondary
      600: '215 18% 35%',   // hsl(215, 18%, 35%)
      700: '215 20% 25%',   // hsl(215, 20%, 25%)
      800: '215 22% 18%',   // hsl(215, 22%, 18%)
      900: '215 24% 12%',   // hsl(215, 24%, 12%)
      950: '215 26% 8%',    // hsl(215, 26%, 8%)
    },
    
    // Accent: Cyber Teal (Health & Wealth fusion)
    'cyber-teal': {
      50: '180 100% 97%',   // hsl(180, 100%, 97%)
      100: '180 95% 92%',   // hsl(180, 95%, 92%)
      200: '180 90% 85%',   // hsl(180, 90%, 85%)
      300: '180 85% 75%',   // hsl(180, 85%, 75%)
      400: '180 80% 65%',   // hsl(180, 80%, 65%)
      500: '180 83% 25%',   // hsl(180, 83%, 25%) - Current primary
      600: '180 85% 20%',   // hsl(180, 85%, 20%)
      700: '180 87% 15%',   // hsl(180, 87%, 15%)
      800: '180 89% 12%',   // hsl(180, 89%, 12%)
      900: '180 91% 8%',    // hsl(180, 91%, 8%)
      950: '180 93% 5%',    // hsl(180, 93%, 5%)
    },
    
    // Status Colors (Health & Finance specific)
    status: {
      health: '160 84% 39%',     // Green for health
      wealth: '45 93% 47%',      // Gold for wealth
      risk: '0 84% 60%',         // Red for risk/danger
      growth: '120 60% 50%',     // Vibrant green for growth
      neutral: '215 16% 45%',    // Neutral gray
    }
  },

  // Typography Scale (Lightswind + MagicUI fusion)
  typography: {
    fontFamilies: {
      display: ['Lexend', 'Inter', 'system-ui', 'sans-serif'],
      body: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      heading: ['Lexend', 'Inter', 'system-ui', 'sans-serif'],
    },
    fontSizes: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    }
  },

  // Spacing System (Based on 8px grid)
  spacing: {
    0: '0px',
    px: '1px',
    0.5: '0.125rem',   // 2px
    1: '0.25rem',      // 4px
    1.5: '0.375rem',   // 6px
    2: '0.5rem',       // 8px
    2.5: '0.625rem',   // 10px
    3: '0.75rem',      // 12px
    3.5: '0.875rem',   // 14px
    4: '1rem',         // 16px
    5: '1.25rem',      // 20px
    6: '1.5rem',       // 24px
    7: '1.75rem',      // 28px
    8: '2rem',         // 32px
    9: '2.25rem',      // 36px
    10: '2.5rem',      // 40px
    11: '2.75rem',     // 44px
    12: '3rem',        // 48px
    14: '3.5rem',      // 56px
    16: '4rem',        // 64px
    20: '5rem',        // 80px
    24: '6rem',        // 96px
    28: '7rem',        // 112px
    32: '8rem',        // 128px
    36: '9rem',        // 144px
    40: '10rem',       // 160px
    44: '11rem',       // 176px
    48: '12rem',       // 192px
    52: '13rem',       // 208px
    56: '14rem',       // 224px
    60: '15rem',       // 240px
    64: '16rem',       // 256px
    72: '18rem',       // 288px
    80: '20rem',       // 320px
    96: '24rem',       // 384px
  },

  // Animation Presets (Lightswind + MagicUI fusion)
  animations: {
    // Lightswind Aurora effects
    aurora: {
      duration: '8s',
      timing: 'ease-in-out',
      iteration: 'infinite',
      transform: 'translate, scale, rotate',
    },
    
    // MagicUI Production-ready animations
    'magic-in': {
      duration: '0.6s',
      timing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      iteration: '1',
      transform: 'translateY, opacity',
    },
    
    // Health-Wealth specific animations
    'health-pulse': {
      duration: '2s',
      timing: 'ease-in-out',
      iteration: 'infinite',
      transform: 'scale',
    },
    
    'wealth-glow': {
      duration: '3s',
      timing: 'ease-in-out',
      iteration: 'infinite',
      property: 'box-shadow',
    }
  },

  // Component Variants
  components: {
    button: {
      variants: {
        primary: 'bg-electric-indigo-500 text-white hover:bg-electric-indigo-600',
        secondary: 'bg-slate-charcoal-500 text-white hover:bg-slate-charcoal-600',
        accent: 'bg-cyber-teal-500 text-white hover:bg-cyber-teal-600',
        health: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
        wealth: 'bg-gradient-to-r from-yellow-500 to-amber-500 text-black',
        glass: 'bg-white/10 backdrop-blur-md border border-white/20 text-white',
        neon: 'bg-transparent border-2 border-electric-indigo-500 text-electric-indigo-500 hover:bg-electric-indigo-500 hover:text-white',
      },
      sizes: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
        xl: 'px-8 py-4 text-xl',
      }
    },
    
    card: {
      variants: {
        default: 'bg-card border border-border rounded-lg shadow-card',
        glass: 'bg-white/10 backdrop-blur-md border border-white/20 rounded-lg',
        neon: 'bg-card border-2 border-electric-indigo-500 rounded-lg shadow-glow',
        health: 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg',
        wealth: 'bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-lg',
        aurora: 'bg-gradient-mesh rounded-lg backdrop-blur-sm',
      }
    }
  },

  // Breakpoints (Mobile-first approach)
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Z-Index Scale
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },

  // Effects and Filters
  effects: {
    blur: {
      none: '0',
      sm: '4px',
      md: '8px',
      lg: '16px',
      xl: '24px',
      '2xl': '40px',
      '3xl': '64px',
    },
    
    glow: {
      sm: '0 0 10px currentColor',
      md: '0 0 20px currentColor',
      lg: '0 0 30px currentColor',
      xl: '0 0 40px currentColor',
    }
  }
} as const;

// Export type for TypeScript support
export type DesignTokens = typeof designTokens;