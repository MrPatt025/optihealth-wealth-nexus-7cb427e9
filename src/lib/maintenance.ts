/**
 * Maintenance Utilities
 * Centralized maintenance functions for code organization
 */

export const maintenanceUtils = {
  // Safe cleanup of unused event listeners
  cleanupEventListeners: () => {
    try {
      const events = ['scroll', 'resize', 'mousemove', 'click'];
      events.forEach(event => {
        try {
          const listeners = document.querySelectorAll(`[data-${event}-listener]`);
          listeners.forEach(el => {
            try {
              const listener = (el as any)[`_${event}Listener`];
              if (listener && el.parentNode) {
                el.removeEventListener(event, listener);
                delete (el as any)[`_${event}Listener`];
                el.removeAttribute(`data-${event}-listener`);
              }
            } catch (e) {
              // Silent fail for individual listeners
            }
          });
        } catch (e) {
          // Silent fail for event type
        }
      });
    } catch (e) {
      console.warn('Event listener cleanup failed:', e);
    }
  },

  // Safe cleanup of abandoned DOM nodes
  cleanupDOMNodes: () => {
    try {
      const selectors = [
        '[data-cleanup]',
        '[data-removed]',
        '.cleanup-target',
        '[aria-hidden="true"]:empty'
      ];
      
      selectors.forEach(selector => {
        try {
          const nodes = document.querySelectorAll(selector);
          nodes.forEach(node => {
            try {
              if (node.parentNode) {
                node.parentNode.removeChild(node);
              }
            } catch (e) {
              // Silent fail for individual nodes
            }
          });
        } catch (e) {
          // Silent fail for selector
        }
      });
    } catch (e) {
      console.warn('DOM cleanup failed:', e);
    }
  },

  // Performance check
  checkPerformance: () => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      const usage = memory.usedJSHeapSize / memory.totalJSHeapSize;
      
      return {
        memoryUsage: Math.round(usage * 100),
        needsCleanup: usage > 0.85,
        totalMemory: Math.round(memory.totalJSHeapSize / 1024 / 1024), // MB
        usedMemory: Math.round(memory.usedJSHeapSize / 1024 / 1024) // MB
      };
    }
    return null;
  },

  // Force garbage collection if available
  forceGC: () => {
    if ('gc' in window && typeof (window as any).gc === 'function') {
      (window as any).gc();
      return true;
    }
    return false;
  },

  // Get app health status
  getHealthStatus: () => {
    const perf = maintenanceUtils.checkPerformance();
    const domNodes = document.querySelectorAll('*').length;
    const eventListeners = document.querySelectorAll('[data-click-listener], [data-scroll-listener]').length;
    
    return {
      performance: perf,
      domComplexity: {
        nodeCount: domNodes,
        isHealthy: domNodes < 5000
      },
      eventListeners: {
        count: eventListeners,
        isHealthy: eventListeners < 100
      },
      timestamp: new Date().toISOString()
    };
  }
};

// Production maintenance runner
export const runMaintenance = () => {
  if (import.meta.env.PROD) {
    maintenanceUtils.cleanupEventListeners();
    maintenanceUtils.cleanupDOMNodes();
    
    const health = maintenanceUtils.getHealthStatus();
    if (health.performance?.needsCleanup) {
      maintenanceUtils.forceGC();
    }
    
    return health;
  }
  return null;
};