import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

export interface PluginMetadata {
  id: string;
  name: string;
  version: string;
  author: string;
  description: string;
  icon: string;
  category: string;
  permissions: string[];
  enabled: boolean;
  installed: boolean;
  featured?: boolean;
  price?: string;
  rating?: number;
  downloads?: string;
  settings?: Record<string, any>;
  settingsSchema?: any; // JSON Schema for dynamic form generation
}

export interface PluginContextType {
  plugins: PluginMetadata[];
  installedPlugins: PluginMetadata[];
  enabledPlugins: PluginMetadata[];
  installPlugin: (plugin: PluginMetadata) => void;
  uninstallPlugin: (pluginId: string) => void;
  enablePlugin: (pluginId: string) => void;
  disablePlugin: (pluginId: string) => void;
  updatePluginSettings: (pluginId: string, settings: Record<string, any>) => void;
  getPluginSettings: (pluginId: string) => Record<string, any>;
}

type PluginAction = 
  | { type: 'INSTALL_PLUGIN'; payload: PluginMetadata }
  | { type: 'UNINSTALL_PLUGIN'; payload: string }
  | { type: 'ENABLE_PLUGIN'; payload: string }
  | { type: 'DISABLE_PLUGIN'; payload: string }
  | { type: 'UPDATE_SETTINGS'; payload: { pluginId: string; settings: Record<string, any> } }
  | { type: 'LOAD_FROM_STORAGE'; payload: PluginMetadata[] };

const initialState: PluginMetadata[] = [];

function pluginReducer(state: PluginMetadata[], action: PluginAction): PluginMetadata[] {
  switch (action.type) {
    case 'INSTALL_PLUGIN':
      return state.some(p => p.id === action.payload.id)
        ? state.map(p => p.id === action.payload.id ? { ...action.payload, installed: true } : p)
        : [...state, { ...action.payload, installed: true }];
    
    case 'UNINSTALL_PLUGIN':
      return state.map(p => 
        p.id === action.payload ? { ...p, installed: false, enabled: false } : p
      );
    
    case 'ENABLE_PLUGIN':
      return state.map(p => 
        p.id === action.payload ? { ...p, enabled: true } : p
      );
    
    case 'DISABLE_PLUGIN':
      return state.map(p => 
        p.id === action.payload ? { ...p, enabled: false } : p
      );
    
    case 'UPDATE_SETTINGS':
      return state.map(p => 
        p.id === action.payload.pluginId 
          ? { ...p, settings: { ...p.settings, ...action.payload.settings } }
          : p
      );
    
    case 'LOAD_FROM_STORAGE':
      return action.payload;
    
    default:
      return state;
  }
}

const PluginContext = createContext<PluginContextType | undefined>(undefined);

export function PluginProvider({ children }: { children: ReactNode }) {
  const [plugins, dispatch] = useReducer(pluginReducer, initialState);

  // Load plugins from localStorage on mount
  useEffect(() => {
    const savedPlugins = localStorage.getItem('opti-plugins');
    if (savedPlugins) {
      try {
        const parsedPlugins = JSON.parse(savedPlugins);
        dispatch({ type: 'LOAD_FROM_STORAGE', payload: parsedPlugins });
      } catch (error) {
        console.error('Failed to load plugins from localStorage:', error);
      }
    }
  }, []);

  // Save to localStorage whenever plugins change
  useEffect(() => {
    localStorage.setItem('opti-plugins', JSON.stringify(plugins));
  }, [plugins]);

  const installedPlugins = plugins.filter(p => p.installed);
  const enabledPlugins = plugins.filter(p => p.enabled && p.installed);

  const contextValue: PluginContextType = {
    plugins,
    installedPlugins,
    enabledPlugins,
    installPlugin: (plugin) => dispatch({ type: 'INSTALL_PLUGIN', payload: plugin }),
    uninstallPlugin: (pluginId) => dispatch({ type: 'UNINSTALL_PLUGIN', payload: pluginId }),
    enablePlugin: (pluginId) => dispatch({ type: 'ENABLE_PLUGIN', payload: pluginId }),
    disablePlugin: (pluginId) => dispatch({ type: 'DISABLE_PLUGIN', payload: pluginId }),
    updatePluginSettings: (pluginId, settings) => 
      dispatch({ type: 'UPDATE_SETTINGS', payload: { pluginId, settings } }),
    getPluginSettings: (pluginId) => 
      plugins.find(p => p.id === pluginId)?.settings || {},
  };

  return (
    <PluginContext.Provider value={contextValue}>
      {children}
    </PluginContext.Provider>
  );
}

export function usePlugins() {
  const context = useContext(PluginContext);
  if (context === undefined) {
    throw new Error('usePlugins must be used within a PluginProvider');
  }
  return context;
}