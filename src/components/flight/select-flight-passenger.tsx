import { IFlightPaxSchema, IFlightSearchSchema } from '@/type/flight/flight.interface';
import { motion } from 'framer-motion';
import { ChevronDown, Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

export const variants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

const SelectFlightPassenger = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const {
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext<IFlightSearchSchema>();

  const passengerValues = watch('passenger');

  const handlePassengerChange = (key: keyof IFlightPaxSchema, val: number) => {
    setValue(`passenger.${key}`, val);
  };

  const totalPassenger =
    passengerValues?.adults +
    passengerValues?.child +
    passengerValues?.infant +
    passengerValues?.kids;

  const handleSave = async () => {
    const isValid = await trigger('passenger');
    if (isValid) setIsPopoverOpen(false);
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <div className={'flex items-center px-2 h-9 cursor-pointer border rounded-md'}>
          <Button type='button' size={'sm'} variant='ghost' className='hover:bg-transparent'>
            {totalPassenger} <span>Traveler</span>
          </Button>

          <ChevronDown className='h-4 w-4 opacity-50' />
        </div>
      </PopoverTrigger>
      <PopoverContent className='w-72 max-h-[400px] overflow-y-auto'>
        <motion.div
          initial='hidden'
          animate='visible'
          exit='hidden'
          variants={variants}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className='space-y-4'
        >
          <PassengerSelector
            title='Adults'
            subtitle='(12 years & above)'
            value={passengerValues?.adults}
            onChange={(value) => handlePassengerChange('adults', value)}
            min={1}
            max={9 - passengerValues?.child - passengerValues?.infant}
          />
          <PassengerSelector
            title='Child'
            subtitle='(From 5 to under 12)'
            value={passengerValues?.child}
            onChange={(value) => handlePassengerChange('child', value)}
            min={0}
            max={9 - passengerValues?.adults - passengerValues?.infant}
          />

          <PassengerSelector
            title='Kids'
            subtitle='(From 2 to under 5)'
            value={passengerValues?.kids}
            onChange={(value) => handlePassengerChange('kids', value)}
            min={0}
            max={9 - passengerValues?.adults - passengerValues?.infant}
          />
          <PassengerSelector
            title='Infants'
            subtitle='(Under 2 years)'
            value={passengerValues?.infant}
            onChange={(value) => handlePassengerChange('infant', value)}
            min={0}
            max={Math.min(
              passengerValues?.adults,
              9 - passengerValues?.adults - passengerValues?.child,
            )}
          />

          <Button onClick={handleSave} className='w-full'>
            Done
          </Button>
        </motion.div>
      </PopoverContent>
    </Popover>
  );
};

export default SelectFlightPassenger;

interface PassengerSelectorProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
}

function PassengerSelector({ title, subtitle, value, onChange, min, max }: PassengerSelectorProps) {
  return (
    <div className='flex items-center justify-between'>
      <div>
        <h3 className='font-medium text-sm'>{title}</h3>
        <p className='text-muted-foreground text-xs'>{subtitle}</p>
      </div>
      <div className='flex items-center'>
        <Button
          variant='outline'
          size='icon'
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className='rounded-full border-primary w-8 h-8'
        >
          <Minus className='h-4 w-4' />
        </Button>
        <span className='w-8 text-sm text-center font-bold text-primary'>{value}</span>
        <Button
          variant='outline'
          size='icon'
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className='rounded-full border-primary w-8 h-8'
        >
          <Plus className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
}
