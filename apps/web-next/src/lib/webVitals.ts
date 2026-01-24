// Web Vitals reporting utility
// Captures Core Web Vitals metrics for performance monitoring

type MetricName = 'CLS' | 'FCP' | 'INP' | 'LCP' | 'TTFB';

interface Metric {
  name: MetricName;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

type ReportHandler = (metric: Metric) => void;

// Send metrics to analytics endpoint
function sendToAnalytics(metric: Metric) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}: ${metric.value.toFixed(2)} (${metric.rating})`);
  }

  // In production, you could send to your analytics service:
  // Example: Google Analytics
  // if (typeof window !== 'undefined' && window.gtag) {
  //   window.gtag('event', metric.name, {
  //     value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
  //     event_label: metric.id,
  //     non_interaction: true,
  //   });
  // }

  // Example: Custom analytics endpoint
  // navigator.sendBeacon('/api/vitals', JSON.stringify({
  //   name: metric.name,
  //   value: metric.value,
  //   rating: metric.rating,
  //   path: window.location.pathname,
  // }));
}

export function reportWebVitals(onPerfEntry?: ReportHandler) {
  if (typeof window === 'undefined') return;

  const handler = onPerfEntry || sendToAnalytics;

  // web-vitals v4+ removed onFID (replaced by onINP)
  import('web-vitals').then(({ onCLS, onFCP, onINP, onLCP, onTTFB }) => {
    onCLS(handler);
    onFCP(handler);
    onINP(handler);
    onLCP(handler);
    onTTFB(handler);
  }).catch(() => {
    // web-vitals not available
  });
}

// Get rating thresholds for each metric
export const thresholds = {
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  INP: { good: 200, poor: 500 },
  LCP: { good: 2500, poor: 4000 },
  TTFB: { good: 800, poor: 1800 },
};
