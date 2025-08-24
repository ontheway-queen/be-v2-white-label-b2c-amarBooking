import Skeleton from 'react-loading-skeleton';

export default function HeroLoadingBackground() {
  return (
    <>
      <div className='w-full absolute inset-0 z-0 -top-[70px]'>
        <div className='relative h-full min-h-[700px] bg-black/30'>
          {/* Optional: add some shimmer or gradient for loading bg */}
        </div>
      </div>

      <div className='relative z-10 container pt-20 md:pt-20 lg:pt-32 text-center text-white'>
        <h2 className='mb-2 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl'>
          <Skeleton height={56} baseColor='#aeb0b3' highlightColor='#e6e6e6' />
        </h2>
        <Skeleton height={24} width={'90%'} baseColor='#aeb0b3' highlightColor='#e6e6e6' />
      </div>
    </>
  );
}
