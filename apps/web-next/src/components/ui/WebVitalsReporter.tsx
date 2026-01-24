'use client';

import { useEffect } from 'react';
import { reportWebVitals } from '@/lib/webVitals';

// Client component that initializes Web Vitals reporting
export default function WebVitalsReporter() {
  useEffect(() => {
    reportWebVitals();
  }, []);

  return null;
}
