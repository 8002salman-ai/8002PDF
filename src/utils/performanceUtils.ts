// Performance optimization utilities for Core Web Vitals and Lighthouse

// Measure Core Web Vitals
export interface WebVitals {
  lcpValue?: number;
  fidValue?: number;
  clsValue?: number;
}

export function measureWebVitals(onMetric: (metric: WebVitals) => void) {
  const vitals: WebVitals = {};

  // Largest Contentful Paint (LCP)
  if ('PerformanceObserver' in window) {
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        vitals.lcpValue = lastEntry.renderTime || lastEntry.loadTime;
        onMetric(vitals);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // LCP not supported
    }

    // First Input Delay (FID)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if ('processingDuration' in entry) {
            vitals.fidValue = (entry as any).processingDuration;
            onMetric(vitals);
          }
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      // FID not supported
    }

    // Cumulative Layout Shift (CLS)
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
            vitals.clsValue = clsValue;
            onMetric(vitals);
          }
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      // CLS not supported
    }
  }
}

// Optimize image loading with lazy loading
export function lazyLoadImages() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach((img) => {
      imageObserver.observe(img);
    });
  }
}

// Preload critical resources
export function preloadResource(href: string, as: 'script' | 'style' | 'image' | 'font' = 'script') {
  const link = document.createElement('link');
  link.rel = 'preload';
  (link as any).as = as;
  link.href = href;
  if (as === 'font') {
    link.crossOrigin = 'anonymous';
  }
  document.head.appendChild(link);
}

// Prefetch non-critical resources
export function prefetchResource(href: string) {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  document.head.appendChild(link);
}

// Optimize script loading
export function loadScriptAsync(src: string, attributes?: Record<string, string>) {
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;

    if (attributes) {
      Object.entries(attributes).forEach(([key, value]) => {
        script.setAttribute(key, value);
      });
    }

    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));

    document.head.appendChild(script);
  });
}

// Debounce function for performance
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for performance
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Request idle callback polyfill
export function requestIdleCallback(callback: IdleRequestCallback, options?: IdleRequestOptions) {
  if ('requestIdleCallback' in window) {
    return window.requestIdleCallback(callback, options);
  }

  const start = Date.now();
  return setTimeout(() => {
    callback({
      didTimeout: false,
      timeRemaining: () => Math.max(0, 50 - (Date.now() - start)),
    });
  }, 1);
}

// Calculate file size for display
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

// Resource timing
export function getResourceTiming() {
  if (!('performance' in window)) return null;

  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  if (!navigation) return null;

  return {
    dns: navigation.domainLookupEnd - navigation.domainLookupStart,
    tcp: navigation.connectEnd - navigation.connectStart,
    ttfb: navigation.responseStart - navigation.requestStart,
    download: navigation.responseEnd - navigation.responseStart,
    dom: navigation.domInteractive - navigation.responseEnd,
    load: navigation.loadEventEnd - navigation.loadEventStart,
  };
}

// Monitor performance in development
export function monitorPerformance() {
  if (process.env.NODE_ENV === 'development') {
    measureWebVitals((vitals) => {
      if (vitals.lcpValue) console.log(`LCP: ${vitals.lcpValue.toFixed(0)}ms`);
      if (vitals.fidValue) console.log(`FID: ${vitals.fidValue.toFixed(0)}ms`);
      if (vitals.clsValue) console.log(`CLS: ${vitals.clsValue.toFixed(3)}`);
    });

    window.addEventListener('load', () => {
      const timing = getResourceTiming();
      if (timing) {
        console.log('Performance Timing:', {
          dns: `${timing.dns.toFixed(0)}ms`,
          tcp: `${timing.tcp.toFixed(0)}ms`,
          ttfb: `${timing.ttfb.toFixed(0)}ms`,
          download: `${timing.download.toFixed(0)}ms`,
          dom: `${timing.dom.toFixed(0)}ms`,
          load: `${timing.load.toFixed(0)}ms`,
        });
      }
    });
  }
}
