import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useAppSelector } from '@/lib/redux/store';
import { Loader } from 'lucide-react';
import React from 'react';
import Skeleton from 'react-loading-skeleton';

type AccordionSectionProps = {
  value: string;
  label: string;
  children: React.ReactNode;
  className?: string;
};

const AccordionSection: React.FC<AccordionSectionProps> = ({
  value,
  label,
  children,
  className = '',
}) => {
  const { isResponseEnd, isLoading } = useAppSelector((state) => state.flightSearchStatus);

  return (
    <AccordionItem value={value} className={`bg-background rounded-md ${className}`}>
      <AccordionTrigger className='hover:no-underline py-3 px-4 font-semibold'>
        <div className='flex items-center gap-2'>
          {label}
          {!isResponseEnd ? <Loader className='size-3 animate-spin' strokeWidth={1.2} /> : ''}
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className='space-y-4 pt-4 border-t px-4 text-gray-800'>
          {isLoading ? (
            <div>
              <div className='space-y-1'>
                <div className='flex gap-2 items-center'>
                  <Skeleton width={20} height={20} className='rounded ' />
                  <Skeleton height={18} width={200} className='rounded   w-full' />
                </div>
                <div className='flex gap-2 items-center'>
                  <Skeleton width={20} height={20} className='rounded ' />
                  <Skeleton height={18} width={200} className='rounded   w-full' />
                </div>
                <div className='flex gap-2 items-center'>
                  <Skeleton width={20} height={20} className='rounded ' />
                  <Skeleton height={18} width={200} className='rounded   w-full' />
                </div>
                <div className='flex gap-2 items-center'>
                  <Skeleton width={20} height={20} className='rounded ' />
                  <Skeleton height={18} width={200} className='rounded   w-full' />
                </div>
              </div>
            </div>
          ) : (
            children
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default AccordionSection;
