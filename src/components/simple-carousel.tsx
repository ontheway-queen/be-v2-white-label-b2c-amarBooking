'use client';

import { grnImageBase } from '@/request';
import Image from 'next/image';
import { useEffect, useMemo, useState, useRef } from 'react';

interface Props {
  data: Array<{ url: string; title?: string; description?: string }>;
  minHeight?: string;
  height?: string;
  width?: string;
  imgUrl?: string;
  hasImgUrl?: boolean;
  showDots?: boolean;
}

const SimpleCarousel: React.FC<Props> = ({
  data,
  minHeight = '100%',
  height = '100%',
  width = '100%',
  imgUrl = grnImageBase,
  showDots = true,
  hasImgUrl = true,
}) => {
  const [active, setActive] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const image_slider = useMemo(() => {
    if (Number(data.length) > 0 && Array.isArray(data)) {
      return data.map(({ url, title, description }) => ({
        url,
        title,
        description,
      }));
    }
    return [
      {
        url: 'https://i.pinimg.com/736x/2c/dd/c1/2cddc183b3bec98bc34e401428cbae5b.jpg',
        title: 'Discover Our Platform',
        description: 'Innovative solutions for your business needs',
      },
    ];
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        setActive((prev) => (prev + 1) % image_slider.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [image_slider.length, isDragging]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);

    // Get the starting position (handle both mouse and touch events)
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;

    setStartX(clientX);
    setTranslateX(0);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;

    // Get current position
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;

    const diff = clientX - startX;
    setTranslateX(diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;

    // Determine slide change based on drag distance
    const threshold = 100; // minimum drag distance to change slide

    if (translateX > threshold) {
      // Dragged right - go to previous slide
      setActive((prev) => (prev - 1 + image_slider.length) % image_slider.length);
    } else if (translateX < -threshold) {
      // Dragged left - go to next slide
      setActive((prev) => (prev + 1) % image_slider.length);
    }

    setIsDragging(false);
    setTranslateX(0);
  };

  return (
    <div
      ref={carouselRef}
      style={{
        height: height,
        minHeight: minHeight,
        width: width,
        position: 'relative',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid #f2f2f2',
        cursor: isDragging ? 'grabbing' : 'grab',
        touchAction: 'none', // Prevent browser handling of touch events
      }}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    >
      {image_slider.map((image, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: active === index ? 1 : 0,
            transition: isDragging
              ? 'none'
              : 'opacity 0.8s ease-in-out, transform 0.8s ease-in-out',
            transform: `${active === index ? 'scale(1)' : 'scale(1.1)'} 
                       ${active === index && isDragging ? `translateX(${translateX}px)` : ''}`,
            zIndex: active === index ? 2 : 1,
          }}
        >
          <Image
            src={hasImgUrl ? imgUrl.concat(image.url) : image.url}
            alt={`Slide ${index + 1}`}
            width={1000}
            height={1000}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              filter: active === index ? 'brightness(100%)' : 'brightness(70%)',
              transition: isDragging ? 'none' : 'filter 0.8s ease-in-out',
              pointerEvents: 'none',
              userSelect: 'none',
            }}
            draggable={false} // Prevent image dragging
          />

          {/* Overlay Content */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '2em 1em',
              background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
              color: '#fff',
              zIndex: 10,
              opacity: active === index ? 1 : 0,
              transform: active === index ? 'translateY(0)' : 'translateY(20px)',
              transition: isDragging
                ? 'none'
                : 'opacity 0.8s ease-in-out, transform 0.8s ease-in-out',
            }}
          >
            <p
              style={{
                transform: active === index ? 'translateX(0)' : 'translateX(-20px)',
                opacity: active === index ? 1 : 0,
                transition: isDragging
                  ? 'none'
                  : 'transform 0.8s ease-in-out, opacity 0.8s ease-in-out',
                lineHeight: 0.5,
                fontSize: '14px',
              }}
            >
              {image.title}
            </p>
            <p
              style={{
                transform: active === index ? 'translateX(0)' : 'translateX(20px)',
                opacity: active === index ? 1 : 0,
                transition: isDragging
                  ? 'none'
                  : 'transform 0.8s ease-in-out, opacity 0.8s ease-in-out',
                transitionDelay: isDragging ? '0s' : '0.2s',
                color: '#cccccc',
                lineHeight: 0.5,
                fontSize: '10px',
              }}
            >
              {image.description}
            </p>
          </div>
        </div>
      ))}

      {/* Pagination Dots */}
      {showDots && (
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '10px',
            right: '10px',
            display: 'flex',
            justifyContent: 'center',
            zIndex: 20,
          }}
        >
          {image_slider?.map((__, index) => (
            <div
              key={index}
              style={{
                width: active === index ? '24px' : '14px',
                height: '2px',
                backgroundColor: active === index ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.5)',
                margin: '0 5px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transformOrigin: 'center',
              }}
              onClick={() => setActive(index)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.8)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  active === index ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.5)';
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SimpleCarousel;
