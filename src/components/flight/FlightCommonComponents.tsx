import { cn } from '@/lib/utils';
import { IFlightSearchSchema, IFlightTripType } from '@/type/flight/flight.interface';
import { motion } from 'framer-motion';
import { ArrowLeftRight, CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { SITE_INFO } from '@/site-config';

type IEmptyDateProps = {
  onClick: () => void;
};

export const EmptyDateSelect = ({ onClick }: IEmptyDateProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus:border-ring focus:ring-ring/50 focus:ring-[3px]',
        'hover:ring-[3px] hover:ring-orange-300/50 hover:border-orange-300/50',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        'h-14 cursor-pointer bg-gray-100',
      )}
    >
      <div>
        <p className='flex justify-start items-center gap-1 font-semibold text-xs text-primary -ml-[1px] mb-1'>
          <CalendarIcon className='size-3 p-0' />
          Return date
        </p>

        <p className='font-light text-sm md:text-md'>Save more on roundtrip</p>
      </div>
    </div>
  );
};

export const SwapRoute = () => {
  const { setValue, getValues } = useFormContext<IFlightSearchSchema>();
  const [rotation, setRotation] = useState(0);

  const swapRoute = () => {
    const from = getValues('from');
    const to = getValues('to');
    setValue('from', to);
    setValue('to', from);

    setRotation(rotation === 0 ? -180 : 0);
  };

  return (
    <div
      onClick={swapRoute}
      className='absolute border p-1 rounded-full top-1/2 left-1/2 transform -translate-x-1/2  -translate-y-1/2 bg-primary-foreground shadow cursor-pointer'
    >
      <ArrowLeftRight
        className='text-primary p-1 transition-all duration-150'
        style={{ transform: `rotate(${rotation}deg)` }}
      />
    </div>
  );
};

interface ISelectTrip {
  name: keyof IFlightSearchSchema;
}

export const SelectTripType = ({ name }: ISelectTrip) => {
  const options: IFlightTripType[] = ['One-way', 'Round-trip', 'Multi-city'];

  const { setValue, watch } = useFormContext<IFlightSearchSchema>();
  const selected = watch(name);

  return (
    <div className='flex gap-2 justify-center sm:justify-start'>
      {options.map((option) => (
        <motion.div
          key={option}
          onClick={() => setValue(name, option)}
          initial={{ scale: 1 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            backgroundColor: option === selected ? `${SITE_INFO.primaryColor_light}` : '#F3F4F6',
            color: option === selected ? `${SITE_INFO.primaryColor}` : '#1F2937',
            transition: { duration: 0.2 },
          }}
          className={cn(
            'inline-flex items-center justify-center h-8 md:h-10 px-4 py-2 text-xs xs:text-sm  rounded-full cursor-pointer font-semibold',
          )}
        >
          {option}
        </motion.div>
      ))}
    </div>
  );
};

export const SelectClass = () => {
  const { setValue, watch, register, control } = useFormContext<IFlightSearchSchema>();

  return (
    <Controller
      name='class'
      control={control}
      render={({ field }) => (
        <Select value={field.value} onValueChange={field.onChange}>
          <SelectTrigger className='w-[120px] h-10 text-sm font-medium'>
            <SelectValue placeholder='Class' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='economy'>Economy</SelectItem>
            <SelectItem value='premium'>Premium Economy</SelectItem>
            <SelectItem value='business'>Business</SelectItem>
            <SelectItem value='first'>First Class</SelectItem>
          </SelectContent>
        </Select>
      )}
    />
  );
};
