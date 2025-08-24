'use client';

import { ImageWithLoading } from '@/components/image-with-loading';
import { getImageLink } from '@/lib/helper';
import { IHeroBgData } from '@/type/site.config.interface';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface Props {
  slides: IHeroBgData[];
  onSlideChange: (index: number) => void;
}

export default function HeroBackground({ slides, onSlideChange }: Props) {
  return (
    <div className='w-full absolute inset-0 z-0 -top-[70px]'>
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect='fade'
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className='h-full'
        onSlideChange={(swiper) => onSlideChange(swiper.realIndex)}
      >
        {slides
          ?.slice()
          ?.sort((a, b) => a.order_number - b.order_number)
          ?.map((item) => {
            const isVideo = item.type === 'VIDEO';

            return (
              <SwiperSlide key={item.id}>
                <div className='relative h-full max-h-[700px] overflow-hidden'>
                  {isVideo ? (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className='absolute top-0 left-0 w-full h-full object-cover brightness-[0.8]'
                    >
                      <source src='/fly.mp4' type='video/mp4' />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <ImageWithLoading
                      src={getImageLink(item.content)}
                      alt='Slide'
                      className='brightness-[0.8] '
                    />
                  )}
                  {!isVideo && (
                    <div
                      className='absolute inset-0 pointer-events-none'
                      style={{
                        background: `
                        linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0) 50%), 
                        radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.5) 100%)`,
                      }}
                    />
                  )}
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
}
