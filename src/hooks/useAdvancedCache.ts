import { useCallback, useEffect, useState } from 'react';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class AdvancedCache {
  private cache = new Map<string, CacheEntry<any>>();
  private maxSize: number;

  constructor(maxSize = 100) {
    this.maxSize = maxSize;
  }

  set<T>(key: string, data: T, ttl = 300000): void { // 5 minutes default
    if (this.cache.size >= this.maxSize) {
      this.evictOldest();
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) return null;
    
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;
    
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return false;
    }
    
    return true;
  }

  clear(): void {
    this.cache.clear();
  }

  private evictOldest(): void {
    let oldestKey = '';
    let oldestTime = Date.now();

    for (const [key, entry] of this.cache.entries()) {
      if (entry.timestamp < oldestTime) {
        oldestTime = entry.timestamp;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
    }
  }

  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      keys: Array.from(this.cache.keys())
    };
  }

  // Public method to delete a key
  delete(key: string): void {
    this.cache.delete(key);
  }
}

const globalCache = new AdvancedCache(200);

export function useAdvancedCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: {
    ttl?: number;
    staleWhileRevalidate?: boolean;
    revalidateOnFocus?: boolean;
  } = {}
) {
  const { ttl = 300000, staleWhileRevalidate = true, revalidateOnFocus = false } = options;
  
  const [data, setData] = useState<T | null>(globalCache.get<T>(key));
  const [loading, setLoading] = useState(!data);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async (useCache = true) => {
    if (useCache && globalCache.has(key)) {
      const cachedData = globalCache.get<T>(key);
      if (cachedData) {
        setData(cachedData);
        setLoading(false);
        return cachedData;
      }
    }

    try {
      setLoading(true);
      setError(null);
      
      const result = await fetcher();
      globalCache.set(key, result, ttl);
      setData(result);
      
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [key, fetcher, ttl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!revalidateOnFocus) return;

    const handleFocus = () => {
      if (document.visibilityState === 'visible') {
        fetchData(false);
      }
    };

    document.addEventListener('visibilitychange', handleFocus);
    return () => document.removeEventListener('visibilitychange', handleFocus);
  }, [fetchData, revalidateOnFocus]);

  const mutate = useCallback((newData?: T) => {
    if (newData) {
      globalCache.set(key, newData, ttl);
      setData(newData);
    } else {
      fetchData(false);
    }
  }, [key, ttl, fetchData]);

  const invalidate = useCallback(() => {
    globalCache.delete(key);
    setData(null);
    fetchData(false);
  }, [key, fetchData]);

  return {
    data,
    loading,
    error,
    mutate,
    invalidate,
    refetch: () => fetchData(false)
  };
}

export function usePrefetch() {
  const prefetch = useCallback(<T>(key: string, fetcher: () => Promise<T>, ttl = 300000) => {
    if (!globalCache.has(key)) {
      fetcher().then(data => {
        globalCache.set(key, data, ttl);
      }).catch(() => {
        // Silent fail for prefetch
      });
    }
  }, []);

  return { prefetch };
}

// Memory management utilities
export const memoryUtils = {
  // Monitor memory usage
  getMemoryInfo: () => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return {
        used: Math.round(memory.usedJSHeapSize / 1024 / 1024),
        total: Math.round(memory.totalJSHeapSize / 1024 / 1024),
        limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024),
        usage: memory.usedJSHeapSize / memory.totalJSHeapSize
      };
    }
    return null;
  },

  // Clear all caches
  clearAllCaches: () => {
    globalCache.clear();
    
    // Clear other caches
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => caches.delete(name));
      });
    }
  },

  // Force garbage collection
  forceGC: () => {
    if ('gc' in window && typeof (window as any).gc === 'function') {
      (window as any).gc();
      return true;
    }
    return false;
  },

  // Get cache statistics
  getCacheStats: () => globalCache.getStats(),
  
  // Access cache size for memory management
  getCacheSize: () => globalCache.getStats().size
};