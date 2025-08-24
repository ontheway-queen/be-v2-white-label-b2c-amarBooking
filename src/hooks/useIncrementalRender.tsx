import { useState, useRef, useEffect, RefObject } from 'react';

export function useIncrementalRender<T>(
  data: T[] | undefined | null,
  batchSize: number = 10,
): {
  items: T[];
  loaderRef: RefObject<HTMLDivElement | null>;
  hasMore: boolean;
} {
  const safeData = data ?? [];
  const [visibleCount, setVisibleCount] = useState(batchSize);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + batchSize, safeData.length));
        }
      },
      {
        rootMargin: '200px',
      },
    );

    observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [safeData.length, batchSize, loaderRef.current]);

  // reset when data changes
  useEffect(() => {
    setVisibleCount(batchSize);
  }, [safeData.length, batchSize]);

  return {
    items: safeData.slice(0, visibleCount),
    loaderRef,
    hasMore: visibleCount < safeData.length,
  };
}
