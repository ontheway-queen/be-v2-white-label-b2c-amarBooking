'use client';

import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const LoadingRetaliate = () => {
  return (
    <div className='bg-muted min-h-screen p-0!'>
      <div className='lg:flex gap-5 container px-0!  mx-auto py-5 truncate overflow-hidden'>
        {/* Left Section (Flight Details) */}
        <div className='flex-2 flex flex-col gap-5'>
          {[0, 1, 2].map((item, index) => (
            <div key={index} className='border border-gray-200 rounded-lg p-4 bg-white'>
              <div className='flex justify-between items-center mb-4'>
                <Skeleton width={120} height={20} />
                <Skeleton width={80} height={20} />
              </div>
              <div className='flex items-center gap-4 mb-4'>
                <Skeleton circle width={40} height={40} />
                <Skeleton width={200} height={20} />
              </div>
              <div className='flex justify-between items-center'>
                <div className='flex-1'>
                  <Skeleton width={80} height={20} />
                  <Skeleton width={150} height={20} />
                  <Skeleton width={200} height={20} />
                </div>
                <div className='flex-1 flex justify-center'>
                  <Skeleton width={100} height={10} style={{ borderRadius: '5px' }} />
                </div>
                <div className='hidden lg:block flex-1 text-right'>
                  <Skeleton width={80} height={20} />
                  <Skeleton width={150} height={20} />
                  <Skeleton width={200} height={20} />
                </div>
              </div>
              <div className='flex justify-between mt-4 pt-4 border-t border-dashed border-gray-300'>
                <Skeleton width={120} height={20} />
                <Skeleton width={100} height={20} />
                <Skeleton width={80} height={20} />
              </div>
            </div>
          ))}
        </div>

        {/* Right Section (Price Summary) */}
        <div className='flex-1 border border-gray-200 rounded-lg p-5 flex flex-col gap-4 bg-white'>
          <Skeleton width={150} height={24} className='mb-2' />
          <div className='flex justify-between'>
            <Skeleton width={100} height={18} />
            <Skeleton width={80} height={18} />
          </div>
          <div className='flex justify-between'>
            <Skeleton width={100} height={18} />
            <Skeleton width={80} height={18} />
          </div>
          <div className='flex justify-between'>
            <Skeleton width={100} height={18} />
            <Skeleton width={80} height={18} />
          </div>
          <div className='flex justify-between'>
            <Skeleton width={120} height={18} />
            <Skeleton width={90} height={18} />
          </div>
          <div className='border-t border-gray-300 pt-4 mt-4'>
            <div className='flex justify-between'>
              <Skeleton width={80} height={22} />
              <Skeleton width={100} height={22} />
            </div>
          </div>
          <Skeleton width={150} height={20} className='mt-5' />
          <div className='flex gap-2'>
            <Skeleton width={'70%'} height={38} />
            <Skeleton width={'30%'} height={38} />
          </div>
          <Skeleton width={'full'} height={18} />
          <Skeleton width={'full'} height={45} className='mt-5' />
          <Skeleton width={'full'} height={18} />
        </div>
      </div>
    </div>
  );
};

export default LoadingRetaliate;
