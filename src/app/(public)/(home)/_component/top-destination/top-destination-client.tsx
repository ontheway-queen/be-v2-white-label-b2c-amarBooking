'use client';

import { fadeIn } from '@/lib/varients/varients';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import Marquee from 'react-fast-marquee';
import { useDispatch } from 'react-redux';
import { formatTopDestination } from '@/lib/hotel/formate-top-destination';
import { encodedHotelParams } from '@/lib/hotel/hotel-formatter-helper';
import { setHotelPage } from '@/lib/redux/slice/hotel/hotel-data-slice';
import { setHotelSearch } from '@/lib/redux/slice/hotel/hotel-search-form-slice';
import { setExpanded } from '@/lib/redux/slice/ModifySearchState';
import { IPopularPlace } from '@/type/site.config.interface';
import { IHotelsSearchSchema } from '@/type/hotel/hotel.interface';
import { clearAllHotelFilters } from '@/lib/redux/slice/hotel/extract-hotel-filter-slice';

interface IProps {
  data: IPopularPlace[] | undefined;
}

const TopDestinationClient = ({ data }: IProps) => {
  const [isPending, startTransition] = useTransition();
  const dispatch = useDispatch();
  const route = useRouter();

  const result = formatTopDestination(data);

  const handleSearchHotel = (searchData: IHotelsSearchSchema) => {
    if (isPending) return false;

    startTransition(() => {
      const res = encodedHotelParams(searchData);
      dispatch(setHotelSearch(searchData));
      route.push(`/hotels/search?${res}`);
    });
    dispatch(clearAllHotelFilters());
    dispatch(setExpanded(false));
    dispatch(setHotelPage('hotel-list'));
  };

  return (
    <div className='relative py-10 md:py-20'>
      <div
        style={{
          backgroundImage: 'url(/photos/destination/icotrav022.png)',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          opacity: '0.15',
        }}
        className='absolute w-full h-full z-[-1]'
      />
      <div>
        <div className='text-center'>
          <motion.h1
            variants={fadeIn('up', 0.2)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: true, amount: 0.1 }}
            className='text-3xl font-bold text-neutral-800 text-center'
          >
            Must-Visit Places
          </motion.h1>
          <motion.p
            variants={fadeIn('up', 0.3)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: true, amount: 0.1 }}
            className='mt-4 max-w-3xl mx-auto text-neutral-600 text-center'
          >
            Discover More About Us
          </motion.p>
        </div>

        <motion.div
          variants={fadeIn('up', 0.4)}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: true, amount: 0.1 }}
        >
          <Marquee className='pt-10 custom-marquee' speed={100} pauseOnHover={true}>
            {result?.map((top) => (
              <div
                key={top.id}
                role='button'
                tabIndex={0}
                onClick={() => handleSearchHotel(top.hotel)}
                className='bg-white cursor-pointer rounded-lg block transition-shadow duration-300 hover:shadow-xl xl:mr-6 mr-3 outline-none'
                style={{ boxShadow: '0px 11px 40px 0px rgba(0, 0, 0, 0.04)' }}
              >
                <div
                  className='
                    overflow-hidden rounded-t-lg
                    2xl:h-[300px] md:h-[220px] h-[200px]
                    2xl:w-[320px] md:w-[240px] w-[220px]
                  '
                >
                  <Image
                    src={top.img}
                    alt={top.title}
                    width={500}
                    height={500}
                    className='w-full h-full object-cover transition-opacity opacity-0 duration-[2s] ease-in-out hover:scale-105'
                    onLoadingComplete={(image) => image.classList.remove('opacity-0')}
                  />
                </div>

                <div
                  className='
                    bg-white rounded-b-lg p-4 flex flex-col justify-between
                    2xl:h-[200px] md:h-[220px] h-[230px]
                    2xl:w-[320px] md:w-[240px] w-[220px]
                  '
                >
                  <h1
                    className='
                      font-bold text-[#1B2B47]
                      2xl:text-[28px] xl:text-[24px] md:text-[22px] text-[18px]
                    '
                    style={{ fontWeight: 600, letterSpacing: '1.2px' }}
                  >
                    {top.title}
                  </h1>
                  <hr className='my-2' />
                  <p className='text-[#7A7A7A] 2xl:text-base text-sm leading-snug'>
                    {top.description}
                  </p>
                </div>
              </div>
            ))}
          </Marquee>
        </motion.div>
      </div>
    </div>
  );
};

export default TopDestinationClient;
