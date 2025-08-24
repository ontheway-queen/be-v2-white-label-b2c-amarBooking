import { Suspense } from 'react';
import SearchBox from '../search-box';
import HeroLoadingBackground from './HeroLoadingBackground';
import HeroBackgroundAndTitle from './HeroBackgroundAndTitle';
import { IHeroBgTab } from '@/type/site.config.interface';

interface IProps {
  defaultValue: IHeroBgTab;
}

export default function HeroWrapper({ defaultValue }: IProps) {
  return (
    <section className='md:relative md:h-[600px] lg:min-h-[620px]'>
      <Suspense fallback={<HeroLoadingBackground />}>
        <HeroBackgroundAndTitle defaultValue={defaultValue} />
      </Suspense>

      <div className='relative -top-20 z-10 container pt-24 md:pt-24 lg:pt-32'>
        <SearchBox defaultValue={defaultValue} />
      </div>
    </section>
  );
}
