import { useCallback } from 'react';

export function useSmoothScrollToTop() {
  return useCallback(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);
}
