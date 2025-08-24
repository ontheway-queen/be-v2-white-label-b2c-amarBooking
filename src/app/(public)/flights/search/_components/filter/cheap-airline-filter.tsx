'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { hostedImage } from '@/lib/helper';
import { setFlightFilters } from '@/lib/redux/slice/flight/extract-flight-filter-slice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';

import 'swiper/css';

const CheapAirlineFilter = () => {
  const selected = useAppSelector((state) => state.extractFightFilter.selectOption.airline);

  const airlineList = useAppSelector(
    (state) => state.extractFightFilter.defaultOption?.airlines_lowest_price,
  );

  const { isLoading } = useAppSelector((state) => state.flightSearchStatus);

  const dispatch = useAppDispatch();

  const airlineClick = (value: string) => {
    const isSelected = selected?.includes(value);

    const updatedAirlines = isSelected
      ? selected?.filter((airline) => airline !== value)
      : [...(selected ?? []), value];

    dispatch(setFlightFilters({ airline: updatedAirlines }));
  };

  if (isLoading) return null;

  return (
    <div className='w-full overflow-hidden rounded-md bg-background mb-2'>
      <Swiper
        spaceBetween={10}
        slidesPerView={1.5}
        touchRatio={1}
        loop={false}
        className='w-full m-1'
        breakpoints={{
          480: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 4 },
        }}
      >
        {airlineList?.map((airline, index) => (
          <SwiperSlide className='max-w-[300px] min-w-[250px] truncate' key={index}>
            <div
              onClick={() => airlineClick(airline.airline_name)}
              className={`cursor-pointer h-[60px] px-2 truncate w-full flex flex-col items-center justify-center rounded-md transition 
                ${
                  selected?.includes(airline.airline_name)
                    ? 'bg-primary text-white'
                    : 'border border-gray-300 hover:bg-gray-100'
                }`}
            >
              <div className='flex items-center gap-2 w-full'>
                <div className='w-10 shrink-0'>
                  <Image
                    className='w-10 h-10 rounded-full'
                    src={hostedImage(`/${airline?.airline_logo}`)}
                    alt={airline.airline_name}
                    height={50}
                    width={50}
                  />
                </div>
                <div className='flex flex-col justify-center text-start overflow-hidden'>
                  <p className='text-sm font-medium truncate'>{airline.airline_name}</p>
                  <p className='text-sm'>৳ {airline.price.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

CheapAirlineFilter.displayName = 'CheapAirlineFilter';

export default CheapAirlineFilter;
