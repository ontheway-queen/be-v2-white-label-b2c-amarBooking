'use client';

import Skeleton from 'react-loading-skeleton';

export default function PopularDestinationsSkeleton() {
  return (
    <section className='py-10 md:py-20 bg-gradient-to-b from-white via-blue-50 to-white relative'>
      <div className='container px-4 md:px-6'>
        {/* Heading */}
        <div className='mb-12 text-center'>
          <Skeleton height={36} width={250} className='mx-auto' />
          <div className='mt-4'>
            <Skeleton height={20} width={350} className='mx-auto' />
          </div>
        </div>

        {/* Cards */}
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {[...Array(6)].map((_, i) => (
            <div key={i} className='relative overflow-hidden rounded-2xl'>
              {/* Image */}
              <Skeleton height={260} className='w-full rounded-2xl' />

              {/* Text content */}
              <div className='absolute bottom-0 w-full p-4 backdrop-blur-sm bg-white/10 text-white space-y-1'>
                <Skeleton height={24} width='80%' />
                <Skeleton height={16} width='60%' />
                <div className='flex items-center justify-between'>
                  <Skeleton height={14} width='30%' />
                  <Skeleton height={14} width='20%' />
                </div>
              </div>

              {/* Badge */}
              <div className='absolute top-3 left-3'>
                <Skeleton height={28} width={80} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
