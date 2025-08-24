'use client';

import { IHeroBgData } from '@/type/site.config.interface';
import { useState } from 'react';
import HeroBackground from './HeroBackground';

interface Props {
  data?: IHeroBgData[];
}

export default function HeroBackgroundClient({ data = [] }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = data[activeIndex];

  return (
    <>
      <HeroBackground slides={data} onSlideChange={setActiveIndex} />

      <div className='relative z-10 container pt-20 md:pt-20 lg:pt-32 text-center text-white mt-10 md:mt-0'>
        <h2 className='mb-2 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl'>
          {activeItem?.quote}
        </h2>
        <p className='text-lg md:text-xl'>{activeItem?.sub_quote}</p>
      </div>
    </>
  );
}
