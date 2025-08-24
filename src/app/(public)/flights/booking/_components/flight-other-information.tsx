'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { IRevalidateData } from '@/type/flight/flight.search.interface';
import { motion } from 'framer-motion';
import { Package } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import BaggagesInfo from './info/baggages-info';
import FareInfo from './info/fare-info';
import { FlightFarePolicy } from './info/flight-fare-policy';

type TabType = 'baggage' | 'fare' | 'policy';

interface Props {
  res: IRevalidateData | undefined;
}

const FlightOtherInformation = ({ res }: Props) => {
  const [activeTab, setActiveTab] = useState<TabType>('baggage');
  const [isOpen, setIsOpen] = useState(false);

  const searchParams = useSearchParams();
  const searchId = searchParams.get('searchId');

  const tabs: { id: TabType; label: string }[] = [
    { id: 'baggage', label: 'Baggage Allowance' },
    { id: 'fare', label: 'Fare Details' },
    { id: 'policy', label: 'Travel Policy' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'baggage':
        return <BaggagesInfo availability={res?.availability} />;
      case 'fare':
        return <FareInfo fare={res?.passengers} />;
      case 'policy':
        return <FlightFarePolicy flight_id={res?.flight_id!} search_id={searchId!} />;
      default:
        return null;
    }
  };

  return (
    <div className={cn('mx-auto')}>
      <Accordion
        defaultValue='flight-details'
        type='single'
        collapsible
        className='w-full  rounded-lg shadow'
      >
        <AccordionItem value='flight-details' className='border-none'>
          <AccordionTrigger
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              'px-6 py-4 hover:no-underline rounded-lg rounded-b-none transition-all bg-primary/15',
              isOpen && 'rounded-b-none border-b',
            )}
          >
            <div className='flex items-center space-x-3'>
              <div className='h-12 w-12 bg-primary flex justify-center items-center rounded-full'>
                <Package className='text-background' />
              </div>
              <div className='text-left'>
                <h2 className='font-medium text-lg'>Extra Information</h2>
                <p className='text-sm text-gray-600'>View baggage, fare and policy information</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className='bg-gray-50 border-t rounded-b-lg shadow'>
            <div className='w-full'>
              <div className='flex bg-background rounded-lg  m-3 shadow-sm'>
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        'relative z-10 flex-1 py-2 px-2 text-sm font-medium rounded-md transition-colors cursor-pointer',
                        isActive ? 'text-white' : 'text-primary hover:text-primary/80',
                      )}
                    >
                      {isActive && (
                        <motion.div
                          layoutId='tab-indicator'
                          className='absolute inset-0 bg-primary rounded-md z-[-1]'
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      )}
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className='bg-background overflow-hidden m-3 rounded-lg shadow-sm'
              >
                {renderTabContent()}
              </motion.div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FlightOtherInformation;
