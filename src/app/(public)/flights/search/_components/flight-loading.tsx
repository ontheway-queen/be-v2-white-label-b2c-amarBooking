import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const FlightLoading = () => {
  return (
    <div className='bg-background rounded-lg transition-shadow duration-300 mb-4 overflow-hidden'>
      <div>
        <div className='md:grid md:grid-cols-12 flex flex-col'>
          <div className='md:col-span-9 w-full p-2 space-y-3 my-auto'>
            {/* Simulate map over item?.flights */}
            {[...Array(1)].map((_, index) => (
              <div key={index} className='border-b last:border-b-0 pb-3'>
                <div className='flex flex-col md:flex-row items-center'>
                  {/* Airline Info Skeleton */}
                  <div className='md:w-1/6 w-full flex md:flex-col gap-2 md:gap-0 items-center p-2 md:border-r md:border-gray-100'>
                    <div className='mb-1'>
                      <Skeleton circle width={48} height={48} /> {/* Airline logo */}
                    </div>
                    <div className='md:text-center md:max-w-[100px]'>
                      <Skeleton width={80} height={16} /> {/* Airline name */}
                      <div className='flex items-center mt-1 md:justify-center'>
                        <Skeleton width={12} height={12} className='mr-1' /> {/* Clock icon */}
                        <Skeleton width={40} height={12} /> {/* Flight duration */}
                      </div>
                    </div>
                  </div>

                  {/* Flight Route Skeleton (md:w-5/6) */}
                  <div className='md:w-5/6 w-full p-3 flex-grow overflow-hidden'>
                    <div className='flex flex-row items-center justify-between'>
                      {/* Departure Skeleton */}
                      <div className='flex flex-col items-start w-auto'>
                        <Skeleton width={60} height={24} /> {/* Airport Code */}
                        <Skeleton width={80} height={16} /> {/* Time */}
                        <div className='flex items-center text-xs mt-1'>
                          <Skeleton width={12} height={12} className='mr-1' /> {/* Calendar icon */}
                          <Skeleton width={100} height={12} /> {/* Date */}
                        </div>
                        <div className='flex items-center text-xs mt-1'>
                          <Skeleton width={12} height={12} className='mr-1' /> {/* MapPin icon */}
                          <Skeleton width={150} height={12} /> {/* Airport Name */}
                        </div>
                      </div>

                      <div className='flex-1 flex flex-col items-center w-full px-2 md:px-1'>
                        <Skeleton width={70} height={20} className='rounded-full mb-1' />{' '}
                        <Skeleton width={100} height={12} className='mt-1' />{' '}
                      </div>

                      {/* Arrival Skeleton */}
                      <div className='flex flex-col items-end w-auto'>
                        <Skeleton width={60} height={24} /> {/* Airport Code */}
                        <Skeleton width={80} height={16} /> {/* Time */}
                        <div className='flex items-center text-xs mt-1'>
                          <Skeleton width={12} height={12} className='mr-1' /> {/* Calendar icon */}
                          <Skeleton width={100} height={12} /> {/* Date */}
                        </div>
                        <div className='flex items-center text-xs mt-1'>
                          <Skeleton width={12} height={12} className='mr-1' /> {/* MapPin icon */}
                          <Skeleton width={150} height={12} /> {/* Airport Name */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className='md:col-span-3 w-full bg-primary/20 p-4 flex md:flex-col items-center md:items-start justify-center'>
            <div className='text-left mb-0 w-full flex-1 md:flex-none'>
              <div className='flex items-center gap-3 mb-0'>
                <Skeleton width={80} height={16} /> {/* Original Price (line-through) */}
                <Skeleton width={70} height={18} className='rounded-md' /> {/* Save % Badge */}
              </div>
              <Skeleton width={120} height={25} /> {/* Payable Price */}
            </div>
            <div className='flex flex-col flex-1 md:flex-none w-full mt-4'>
              <Skeleton width={'100%'} height={35} className='rounded-md' />
            </div>
          </div>
        </div>

        <div className='bg-primary/10 flex justify-between px-5 py-0.5 items-center'>
          <div className='flex gap-2'>
            <Skeleton width={80} height={16} className='rounded-full' />
            <Skeleton width={70} height={16} className='rounded-full' />
            <Skeleton width={70} height={16} className='rounded-full' />
          </div>
          <div className='flex items-center gap-1'>
            <Skeleton width={80} height={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightLoading;
