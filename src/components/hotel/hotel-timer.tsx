'use client';

import SessionExpiredDialog from '@/components/session-expired-dialog';
import { Clock } from 'lucide-react';
import { useState } from 'react';
import Countdown from 'react-countdown';

import { HOTEL_DURATION_EXPIRED } from '@/lib/CONSTANT';
import { useSelectedHotel } from '@/lib/redux/slice/hotel/hotel-data-slice';
import { useAppSelector } from '@/lib/redux/store';
import { cn } from '@/lib/utils';

interface HotelTimerProps {
  bottom?: boolean;
}

export const HotelTimer = ({ bottom = false }: HotelTimerProps) => {
  const [parent, setParent] = useState(0);
  const [searchExpired, setSearchExpired] = useState(false);
  const { hotelTimer } = useAppSelector(useSelectedHotel);

  const endtime = hotelTimer;

  const handleExpire = () => {
    setSearchExpired(true);
  };

  const handleReload = async () => {
    try {
      window.location.reload();
    } catch (error) {
      console.error('Error during reload:', error);
    }
  };

  return (
    <div className={cn('w-full bg-background rounded-lg', bottom && 'bg-transparent p-0')}>
      {!bottom && (
        <div className='px-4 py-3'>
          <div className='flex items-center justify-between'>
            <h2 className='text-sm font-semibold'>Hotel Search </h2>
            <div className='flex items-center'>
              <Clock className='h-5 w-5 text-primary mr-2' />
              {endtime && (
                <Countdown
                  onTick={async () => {
                    const timeLeft = endtime - Date.now();
                    const percentage = Math.round((timeLeft / HOTEL_DURATION_EXPIRED) * 100);
                    setParent(percentage);
                  }}
                  renderer={({ hours, minutes, seconds }) => (
                    <span className='text-sm text-muted-foreground'>
                      {hours > 0 && `${hours}h `}
                      {minutes > 0 && `${minutes}m `}
                      {seconds}s
                    </span>
                  )}
                  onComplete={handleExpire}
                  date={endtime}
                />
              )}
            </div>
          </div>
        </div>
      )}
      {bottom && endtime && (
        <div className='flex items-center gap-2 text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-md border'>
          <Clock className='h-4 w-4 text-gray-600' />
          <div className='flex flex-col'>
            <span className='text-xs text-gray-500 uppercase tracking-wide font-medium'>
              Time Remaining
            </span>
            <Countdown
              onTick={async () => {
                const timeRemaining = endtime - Date.now();
                const completionPercentage = Math.round(
                  (timeRemaining / HOTEL_DURATION_EXPIRED) * 100
                );
                setParent(completionPercentage);
              }}
              renderer={({ hours, minutes, seconds, total }) => {
                const totalMinutes = Math.floor(total / (1000 * 60));
                const colorClass =
                  totalMinutes < 1
                    ? 'text-red-600'
                    : totalMinutes <= 5
                    ? 'text-yellow-600'
                    : 'text-green-600';

                return (
                  <span className={`text-base font-mono font-semibold ${colorClass}`}>
                    {hours > 0 && `${String(hours).padStart(2, '0')}:`}
                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                  </span>
                );
              }}
              onComplete={handleExpire}
              date={endtime}
            />
          </div>
        </div>
      )}

      {!bottom && (
        <div
          className='h-[1px] bg-primary rounded-full transition-all duration-1000 ease-in-out'
          style={{ width: `${parent}%` }}
        />
      )}

      <SessionExpiredDialog open={searchExpired} onReload={handleReload} />
    </div>
  );
};
