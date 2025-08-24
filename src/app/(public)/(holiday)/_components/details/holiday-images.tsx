'use client';
import ImageLightBox from '@/components/image-light-box';
import { Button } from '@/components/ui/button';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

type Props = {
  imageUrl: string[] | undefined;
};

const HolidayImages = ({ imageUrl }: Props) => {
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(0);

  // Set up keen-slider for the main image
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      slides: {
        perView: 1,
      },
      defaultAnimation: {
        duration: 1000,
      },
    },
    [
      (slider) => {
        let timeout: any;
        let mouseOver = false;

        function clearNextTimeout() {
          clearTimeout(timeout);
        }

        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 3000); // Change image every 3 seconds
        }

        slider.on('created', () => {
          nextTimeout();
        });

        slider.on('dragStarted', clearNextTimeout);
        slider.on('animationEnded', nextTimeout);
        slider.on('updated', nextTimeout);

        // Add mouseenter and mouseleave events to pause/resume autoplay
        slider.container.addEventListener('mouseenter', () => {
          mouseOver = true;
          clearNextTimeout();
        });

        slider.container.addEventListener('mouseleave', () => {
          mouseOver = false;
          nextTimeout();
        });
      },
    ],
  );

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
    <div className='bg-background p-2 rounded'>
      <div className='relative w-full mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-2 overflow-hidden'>
          <div className='md:col-span-2 cursor-pointer relative h-64 md:h-[450px] overflow-hidden'>
            <div ref={sliderRef} className='keen-slider h-full ' onClick={() => openLightbox(0)}>
              {imageUrl?.map((img, idx) => (
                <div key={idx} className='keen-slider__slide'>
                  <Image
                    src={img}
                    alt={`Main view ${idx + 1}`}
                    height={1000}
                    width={1000}
                    className='w-full h-full object-cover'
                  />
                </div>
              ))}
            </div>
          </div>

          <div className='grid grid-cols-2 col-span-2 gap-2'>
            {imageUrl?.slice(0, 4).map((img, index) => (
              <div
                key={index}
                className='cursor-pointer relative h-32 md:h-[220px]'
                onClick={() => openLightbox(index)}
              >
                <Image
                  height={1200}
                  width={1200}
                  src={img}
                  alt={`View ${index + 2}`}
                  className='w-full h-full object-cover'
                />

                {index === 3 && imageUrl?.length > 5 && (
                  <div
                    className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center cursor-pointer'
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleAllPhotos();
                    }}
                  >
                    <span className='text-white font-medium text-base'>
                      +{imageUrl?.length - 5} photos
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <Button
          className='md:hidden absolute bottom-4 right-4 bg-background text-black px-4 py-2 rounded-lg shadow-md text-sm font-medium border border-gray-200'
          onClick={toggleAllPhotos}
        >
          Show all photos
        </Button>
      </div>

      {showAllPhotos && (
        <div className='fixed inset-0 bg-background z-50 overflow-y-auto'>
          <div className='p-4 relative'>
            <div className='flex justify-between items-center mb-4 sticky top-0 bg-background z-50 py-2'>
              <div className='w-10' />
              <h2 className='text-xl font-semibold'>All photos</h2>
              <Button onClick={toggleAllPhotos} className='p-2 rounded-full w-8 h-8 bg-secondary'>
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
                    className='w-full h-auto object-cover hover:opacity-90 transition'
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

export default HolidayImages;
