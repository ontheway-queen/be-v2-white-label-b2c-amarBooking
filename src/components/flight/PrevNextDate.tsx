import { IFlightTripType } from '@/type/flight/flight.interface';
import { addDays, format, isAfter, isSameDay, parseISO, startOfDay, subDays } from 'date-fns';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';

const PrevNextDate = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const departure_date = searchParams.get('departure');
  const return_date = searchParams.get('return');
  const way = searchParams.get('tripType') as IFlightTripType;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const prevDate = () => {
    const currentDate = startOfDay(new Date());
    const previousDayDate = startOfDay(subDays(parseISO(departure_date!), 1));

    if (isSameDay(previousDayDate, currentDate) || isAfter(previousDayDate, currentDate)) {
      if (way === 'One-way' || way === 'Multi-city') {
      }
      router.replace(
        pathname + '?' + createQueryString('departure', format(previousDayDate, 'yyyy-MM-dd'))
      );
    } else {
      toast('Departure date cannot be less than the current date', {
        icon: '✈️',
      });
    }
  };

  const nextDate = () => {
    const nex_dep_date = departure_date && startOfDay(addDays(parseISO(departure_date), 1));
    const nex_ret_date = return_date && startOfDay(addDays(parseISO(return_date), 1));

    if (way === 'One-way') {
      router.replace(
        pathname + '?' + createQueryString('departure', format(nex_dep_date!, 'yyyy-MM-dd'))
      );
    } else if (way === 'Round-trip') {
      router.replace(
        pathname + '?' + createQueryString('return', format(nex_ret_date!, 'yyyy-MM-dd'))
      );
    }
  };

  if (way == 'Multi-city') return null;

  return (
    <div className='flex justify-between items-center gap-3'>
      <Button onClick={prevDate} size={'sm'}>
        <div className='flex justify-center items-center gap-1 p-1 group'>
          <ArrowLeft className='font-bold' />
          <span className='text-xs mr-2'>PREV. DAY</span>
        </div>
      </Button>

      <Button onClick={nextDate} size={'sm'}>
        <div className='flex justify-center items-center gap-1 p-1 group'>
          <span className='text-xs ml-2 '>NEXT. DAY</span>
          <ArrowRight className='font-bold' />
        </div>
      </Button>
    </div>
  );
};

export default PrevNextDate;
