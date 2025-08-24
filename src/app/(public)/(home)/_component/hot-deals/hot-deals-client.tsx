'use client';

import { ImageWithLoading } from '@/components/image-with-loading';
import { getImageLink } from '@/lib/helper';
import { IHotDeals } from '@/type/site.config.interface';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

type Props = { hotDeals: IHotDeals[] | undefined };

const HotDealsClient = ({ hotDeals }: Props) => {
  return (
    <div className='-mt-10 md:-mt-0 pb-10 md:py-20 relative'>
      <div className='container px-4 md:px-6'>
        <h3 className='text-3xl font-bold mb-4'>Exclusive Offers</h3>
        <p className='mb-12 text-neutral-600'>
          Discover unbeatable offers that won't last long. Grab these premium deals before they're
          gone!
        </p>

        {!hotDeals?.length ? <span>No offer found</span> : ''}
        <Swiper
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 1.5,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 2.5,
            },
            1280: {
              slidesPerView: 3,
            },
          }}
          spaceBetween={20}
          autoplay={{ delay: 3000, disableOnInteraction: true }}
          loop={true}
          pagination={{
            clickable: true,
            el: '.custom-pagination',
          }}
          modules={[Autoplay, Pagination]}
          className='h-full'
        >
          {hotDeals?.map((item, index) => (
            <SwiperSlide key={item.id}>
              <div className='relative h-52 overflow-hidden group'>
                <ImageWithLoading
                  src={getImageLink(item.thumbnail)}
                  alt={item.title}
                  delay={index * 300}
                  className='brightness-[1] rounded-lg shadow-lg border border-gray-100'
                />
                {/* Hover overlay */}
                <div className='absolute inset-0 flex flex-col justify-center items-center bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm text-white p-4 text-center rounded-lg w-full'>
                  <Link target='_blank' href={item.link}>
                    <h4 className='text-lg font-semibold mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500'>
                      {item.title}
                    </h4>
                  </Link>
                  <Link
                    target='_blank'
                    href={item.link}
                    className='text-sm opacity-100 flex gap-2 items-center underline-offset-2 underline'
                  >
                    <span>See Details</span>

                    <ExternalLink size={20} />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom pagination below */}
        <div className='custom-pagination flex justify-center mt-4'></div>
      </div>
    </div>
  );
};

export default HotDealsClient;
