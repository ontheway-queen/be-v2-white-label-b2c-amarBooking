'use client';

import { FLIGHT_DURATION_EXPIRED } from '@/lib/CONSTANT';
import { useAppSelector } from '@/lib/redux/store';
import { Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Countdown from 'react-countdown';
import Skeleton from 'react-loading-skeleton';
import SessionExpiredDialog from '../session-expired-dialog';

type Props = {
  buttonLink?: string;
};

const AirlineTimeCounter = ({ buttonLink }: Props) => {
  const [parentage, setParentage] = useState(0);
  const router = useRouter();

  const [searchExpired, setSearchExpired] = useState(false);
  const flightExpired = useAppSelector((state) => state.flightTimer.flightTimer);
  const { isLoading } = useAppSelector((state) => state.flightSearchStatus);

  const endtime = flightExpired;

  const handleExpire = () => {
    setSearchExpired(true);
  };

  const handleReload = async () => {
    if (buttonLink) {
      router.replace(buttonLink, { scroll: true });
      return;
    }
    router.replace('/', { scroll: true });
  };

  return (
    <div className='px-4 py-3 bg-white rounded-md '>
      <div className='flex items-center justify-between'>
        <h2 className='text-sm font-semibold'>Flight Search </h2>
        {isLoading ? (
          <Skeleton width={60} height={18} />
        ) : (
          <div className='flex items-center gap-1'>
            <Clock className='h-4 w-4 text-primary ' />
            {endtime && (
              <Countdown
                onTick={async () => {
                  const timeLeft = endtime - Date.now();
                  const percentage = Math.round((timeLeft / FLIGHT_DURATION_EXPIRED) * 100);
                  setParentage(percentage);
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
        )}
      </div>

      <SessionExpiredDialog open={searchExpired} onReload={handleReload} />
    </div>
  );
};

export default AirlineTimeCounter;
