'use client';

import { grnImageBase } from '@/request';
import Image from 'next/image';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

interface Image {
  url: string;
  title?: string;
  description?: string;
}

interface Props {
  images: Image[];
  height?: string;
  hasImgUrl?: boolean;
}

const AdvanceCarousel: React.FC<Props> = ({ images = [], hasImgUrl = true, height = '450px' }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragCoords, setDragCoords] = useState({ startX: 0, currentX: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Initialize isMobile state correctly with useEffect to avoid SSR issues
  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = useCallback(() => {
    if (!images.length) return;
    setCurrentSlide((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    if (!images.length) return;
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev);
  }, []);

  // Handle drag gestures
  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    setDragCoords({ startX: clientX, currentX: clientX });
  }, []);

  const handleDragMove = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
      setDragCoords((prev) => ({ ...prev, currentX: clientX }));
    },
    [isDragging]
  );

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;

    const { startX, currentX } = dragCoords;
    const diff = startX - currentX;
    const threshold = 50; // Minimum drag distance to change slide

    if (diff > threshold) {
      nextSlide(); // Dragging left, go to next slide
    } else if (diff < -threshold) {
      prevSlide(); // Dragging right, go to previous slide
    }

    setIsDragging(false);
  }, [isDragging, dragCoords, nextSlide, prevSlide]);

  // Auto-slide functionality
  useEffect(() => {
    if (!isDragging && !isFullscreen) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [isDragging, isFullscreen, nextSlide]);

  // Memoized styles
  const styles = useMemo(() => {
    const { startX, currentX } = dragCoords;

    return {
      container: {
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'center' : 'flex-start',
        gap: '10px',
      } as React.CSSProperties,

      sidebar: {
        display: isMobile ? 'none' : 'block',
        height: height,
        overflowY: 'auto',
        width: '20%',
        scrollbarWidth: 'none',
      } as React.CSSProperties,

      carousel: {
        position: 'relative',
        width: isMobile ? '100%' : '80%',
        maxWidth: '100%',
        height: height,
        overflow: 'hidden',
        borderRadius: '0px',
        border: 'none',
      } as React.CSSProperties,

      slideContainer: {
        display: 'flex',
        transition: isDragging ? 'none' : 'transform 0.5s ease-in-out',
        transform: isDragging
          ? `translateX(calc(-${currentSlide * 100}% + ${currentX - startX}px))`
          : `translateX(-${currentSlide * 100}%)`,
        height: '100%',
      } as React.CSSProperties,

      slide: {
        minWidth: '100%',
        opacity: 0,
        transition: 'opacity 0.5s ease-in-out',
        height: '100%',
        objectFit: 'cover',
        borderRadius: '0px',
        cursor: 'pointer',
        position: 'relative',
        userSelect: 'none',
      } as React.CSSProperties,

      activeSlide: {
        opacity: 1,
      } as React.CSSProperties,

      button: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        cursor: 'pointer',
        borderRadius: '50%',
        zIndex: 10,
        transition: 'background 0.3s ease',
      } as React.CSSProperties,

      fullscreenIcon: {
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        color: 'white',
        padding: '8px',
        display: hovering ? 'block' : 'none',
        cursor: 'pointer',
        zIndex: 15,
      } as React.CSSProperties,

      fullscreen: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      } as React.CSSProperties,
    };
  }, [isMobile, height, isDragging, currentSlide, dragCoords, hovering]);

  // Create image URL helper function
  const getImageUrl = useCallback(
    (url: string) => {
      return hasImgUrl ? grnImageBase.concat(url) : url;
    },
    [hasImgUrl]
  );

  // Return early if no images
  if (!images.length) {
    return null;
  }

  return (
    <div style={styles.container}>
      <div style={styles.carousel}>
        <button
          style={{ ...styles.button, left: '20px' }}
          onClick={prevSlide}
          aria-label='Previous slide'
        >
          &#8249;
        </button>

        <div
          style={styles.slideContainer}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {images.map((slide, index) => (
            <div
              key={index}
              style={{
                ...styles.slide,
                ...(index === currentSlide ? styles.activeSlide : {}),
              }}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              <Image
                width={1000}
                height={1000}
                src={getImageUrl(slide.url)}
                alt={slide.title || 'Carousel image'}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  aspectRatio: 1,
                  pointerEvents: 'none',
                  borderRadius: '0.5em',
                  overflow: 'hidden',
                }}
                onClick={toggleFullscreen}
              />
              <div style={styles.fullscreenIcon} onClick={toggleFullscreen}>
                &#x26F6;
              </div>
            </div>
          ))}
        </div>

        <button
          style={{ ...styles.button, right: '20px' }}
          onClick={nextSlide}
          aria-label='Next slide'
        >
          &#8250;
        </button>
      </div>

      <div style={styles.sidebar}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5em',
          }}
        >
          {images.map((slide, index) => (
            <div
              key={index}
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                scrollbarWidth: 'thin',
                borderRadius: '0.3em',
                overflow: 'hidden',
              }}
              onClick={() => setCurrentSlide(index)}
            >
              <Image
                width={1000}
                height={1000}
                src={getImageUrl(slide.url)}
                alt={slide.title || 'Thumbnail'}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 'none',
                  aspectRatio: 1,
                  border: index === currentSlide ? `0.2em solid #C41F35` : 'none',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {isMobile && (
        <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
          {images.map((_, index) => (
            <button
              key={index}
              style={{
                background: index === currentSlide ? '#005014' : '#e0e0e0',
                border: 'none',
                borderRadius: '50%',
                width: '10px',
                height: '10px',
                cursor: 'pointer',
              }}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {isFullscreen && (
        <div style={styles.fullscreen} onClick={toggleFullscreen}>
          <Image
            width={1000}
            height={1000}
            src={getImageUrl(images[currentSlide]?.url)}
            alt={images[currentSlide]?.title || 'Fullscreen image'}
            style={{ maxWidth: '100%', maxHeight: '100%', aspectRatio: 1 }}
          />
        </div>
      )}
    </div>
  );
};

export default React.memo(AdvanceCarousel);
