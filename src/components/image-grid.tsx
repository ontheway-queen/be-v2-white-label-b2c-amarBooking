'use client';
import ImageLightBox from '@/components/image-light-box';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

type Props = {
  imageUrl: string[] | undefined;
};

const ImageGrid = ({ imageUrl }: Props) => {
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(0);

  // Toggle the all photos modal
  const toggleAllPhotos = () => {
    setShowAllPhotos(!showAllPhotos);
    if (lightboxOpen) setLightboxOpen(false);
  };

  // Open lightbox with specific image
  const openLightbox = (index: number) => {
    setCurrentPhoto(index);
    setLightboxOpen(true);
  };

  return (
    <div>
      <div className='relative w-full mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-2 overflow-hidden'>
          <div className='md:col-span-2 cursor-pointer relative h-64 md:h-[450px] overflow-hidden'>
            <div className='h-full' onClick={() => openLightbox(0)}>
              {imageUrl?.map((img, idx) => (
                <div key={idx} className=''>
                  <Image
                    src={img}
                    alt={`Main view ${idx + 1}`}
                    height={420}
                    width={450}
                    className='w-full h-64 md:h-[450px] object-cover rounded-lg'
                    priority
                  />
                </div>
              ))}
            </div>
          </div>

          <div className='grid grid-cols-2 col-span-2 gap-2'>
            {imageUrl?.slice(1, 5).map((img, index) => {
              const originalIndex = index + 1; // since slice starts from 1
              return (
                <div
                  key={index}
                  className='cursor-pointer relative h-32 md:h-[220px]'
                  onClick={() => openLightbox(originalIndex)}
                >
                  <Image
                    src={img}
                    alt={`View ${originalIndex + 1}`}
                    height={420}
                    width={450}
                    className='w-full h-full object-cover rounded-lg'
                  />

                  {originalIndex === 4 && imageUrl?.length > 5 && (
                    <div
                      className={cn(
                        'absolute inset-0 bg-black/60  flex items-center justify-center cursor-pointer rounded-lg transition-all duration-300 hover:backdrop-blur-lg hover:bg-black/70'
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleAllPhotos();
                      }}
                    >
                      <span className='text-white text-lg font-semibold drop-shadow-md'>
                        +{imageUrl.length - 5} more photo
                        {imageUrl.length - 5 > 1 ? 's' : ''}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {showAllPhotos && (
        <div className='fixed inset-0 bg-background z-50 overflow-y-auto'>
          <div className='p-4 relative'>
            <div className='flex justify-between items-center mb-4 sticky top-0 bg-background z-50 py-2'>
              <div className='w-10' />
              <h2 className='text-xl font-semibold'>All photos</h2>
              <Button onClick={toggleAllPhotos} className='p-2 rounded-full w-8 h-8'>
                <X size={24} />
              </Button>
            </div>

            <div className='columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4'>
              {imageUrl?.map((img, index) => (
                <div
                  key={index}
                  className='w-full break-inside-avoid cursor-pointer rounded overflow-hidden'
                  onClick={() => openLightbox(index)}
                >
                  <Image
                    width={1080}
                    height={720}
                    src={img}
                    alt={`Photo ${index + 1}`}
                    className='w-full h-auto object-cover hover:opacity-90 transition '
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <ImageLightBox
        images={imageUrl}
        lightboxOpen={lightboxOpen}
        setLightboxOpen={setLightboxOpen}
        currentSlide={currentPhoto}
        setCurrentSlide={setCurrentPhoto}
      />
    </div>
  );
};

export default ImageGrid;
