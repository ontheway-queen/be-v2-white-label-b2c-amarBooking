'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';

type Props = {
  images: string[] | undefined;
  lightboxOpen: boolean;
  setLightboxOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
  currentSlide: number;
};

const ImageLightBox = ({
  images,
  lightboxOpen,
  setLightboxOpen,
  currentSlide,
  setCurrentSlide,
}: Props) => {
  const [direction, setDirection] = useState(0);

  const closeLightbox = () => setLightboxOpen(false);

  const goToNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % (images?.length ?? 0));
  };

  const goToPrev = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + (images?.length ?? 0)) % (images?.length ?? 0));
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;

      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'Escape') closeLightbox();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  // Disable body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxOpen]);

  if (!lightboxOpen) return null;

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 10 : -10,
        opacity: 0,
      };
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        x: direction < 0 ? 10 : -10,
        opacity: 0,
      };
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center'
      onClick={closeLightbox}
    >
      {/* Close Button */}
      <Button
        onClick={closeLightbox}
        className='absolute top-6 right-6 rounded-full'
        variant='destructive'
      >
        <X size={24} />
      </Button>

      {/* Counter */}
      <div className='absolute top-6 text-white text-sm'>
        {currentSlide + 1} / {images?.length}
      </div>

      {/* Image Container */}
      <div
        className='relative max-w-5xl max-h-[80vh] w-full h-full flex items-center justify-center overflow-hidden'
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence initial={false} custom={direction} mode='wait'>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={variants}
            initial='enter'
            animate='center'
            exit='exit'
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className='absolute w-full h-full flex items-center justify-center'
          >
            <Image
              src={images?.[currentSlide] as string}
              alt={`Photo ${currentSlide + 1}`}
              width={1024}
              height={1024}
              className='object-contain max-h-[80vh] max-w-full'
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Prev Button */}
      <Button
        onClick={(e) => {
          e.stopPropagation();
          goToPrev();
        }}
        className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-background p-2 rounded-full text-black w-10 h-10'
        aria-label='Previous photo'
      >
        <ArrowLeft className='size-7' />
      </Button>

      {/* Next Button */}
      <Button
        onClick={(e) => {
          e.stopPropagation();
          goToNext();
        }}
        className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-background p-2 rounded-full text-black w-10 h-10'
        aria-label='Next photo'
      >
        <ArrowRight className='size-7' />
      </Button>
    </motion.div>
  );
};

export default ImageLightBox;
