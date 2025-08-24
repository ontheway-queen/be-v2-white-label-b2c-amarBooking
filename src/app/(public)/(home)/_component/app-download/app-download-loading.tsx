import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

type Props = {};

const AppDownloadLoading = (props: Props) => {
  return (
    <SkeletonTheme baseColor='#f3f4f6' highlightColor='#e5e7eb'>
      <section className='bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 md:py-24 overflow-hidden'>
        <div className='container mx-auto max-w-4xl px-4 sm:px-6'>
          <div className='text-center space-y-8'>
            {/* Badge Skeleton */}
            <div className='flex justify-center'>
              <Skeleton height={32} width={120} borderRadius={20} />
            </div>

            {/* Title Skeleton */}
            <div className='space-y-3 max-w-3xl mx-auto'>
              <Skeleton height={48} width='100%' />
              <Skeleton height={48} width='80%' />
            </div>

            {/* Description Skeleton */}
            <div className='space-y-2 max-w-2xl mx-auto'>
              <Skeleton height={20} width='100%' />
              <Skeleton height={20} width='90%' />
              <Skeleton height={20} width='70%' />
            </div>

            {/* Stats Skeleton */}
            <div className='grid grid-cols-3 gap-6 py-6 max-w-md mx-auto'>
              {[1, 2, 3].map((index) => (
                <div key={index} className='text-center space-y-2'>
                  <Skeleton height={24} width={24} className='mx-auto' />
                  <Skeleton height={24} width={40} />
                  <Skeleton height={16} width={60} />
                </div>
              ))}
            </div>

            {/* Download Buttons Skeleton */}
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Skeleton height={56} width={160} borderRadius={12} />
              <Skeleton height={56} width={160} borderRadius={12} />
            </div>
          </div>
        </div>
      </section>
    </SkeletonTheme>
  );
};

export default AppDownloadLoading;
