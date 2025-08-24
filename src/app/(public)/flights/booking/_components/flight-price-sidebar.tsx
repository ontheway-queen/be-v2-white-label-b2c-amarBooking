'use client';
import AirlineTimeCounter from '@/components/flight/airline-time-counter';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/helper';
import { cn } from '@/lib/utils';
import { IFlightListFare } from '@/type/flight/flight.search.interface';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  fare: IFlightListFare | undefined;
  setFormVisible: Dispatch<SetStateAction<boolean>>;
  formVisible: boolean;
};

const FlightPriceSidebar = ({ fare, setFormVisible, formVisible }: Props) => {
  // Demo coupons
  const validCoupons = {
    FLY10: 10,
    SAVE20: 20,
    TRAVEL50: 50,
  };

  // Calculate the final payable amount with custom coupon discount
  const calculatePayable = () => {
    if (!fare) return 0;

    // Start with the original payable amount
    let payable = Number(fare.payable);

    return payable;
  };

  if (!fare) {
    return (
      <div className='bg-background rounded-lg shadow p-6 w-full max-w-md'>
        <div className='text-center text-gray-500'>No fare information available</div>
      </div>
    );
  }

  return (
    <div>
      <AirlineTimeCounter buttonLink={'../'} />
      <div className='bg-background rounded-lg shadow p-6 w-full mt-2'>
        <h2 className='text-xl font-bold text-gray-800 mb-4'>Price Summary</h2>

        <div className='space-y-3 mb-6'>
          <div className='flex justify-between items-center'>
            <span className='text-gray-600'>Base Fare</span>
            <span className='font-medium'>{formatCurrency(fare.base_fare)}</span>
          </div>

          <div className='flex justify-between items-center'>
            <span className='text-gray-600'>Taxes</span>
            <span className='font-medium'>{formatCurrency(fare.total_tax)}</span>
          </div>
          <div className='flex justify-between items-center'>
            <span className='text-gray-600'>Ait</span>
            <span className='font-medium'>{formatCurrency(fare.ait)}</span>
          </div>

          {fare.discount !== undefined && Number(fare.discount || 0) > 0 && (
            <div className='flex justify-between items-center text-green-600'>
              <span>Promotional Discount</span>
              <span className='font-medium'>-{formatCurrency(fare.discount)}</span>
            </div>
          )}

          <div className='border-t border-gray-200 pt-3 mt-3'>
            <div className='flex justify-between items-center font-bold text-lg'>
              <span>Total</span>
              <span>{formatCurrency(calculatePayable())}</span>
            </div>
          </div>
        </div>

        {/* Coupon Section */}

        <Button
          onClick={() => setFormVisible(true)}
          className={cn('w-full mt-6 bg-secondary', formVisible && 'hidden')}
        >
          Proceed to Payment
        </Button>

        <p className={cn('text-xs text-gray-500 mt-4 text-center', formVisible && 'hidden')}>
          Prices are inclusive of all applicable taxes and fees
        </p>
      </div>
    </div>
  );
};

export default FlightPriceSidebar;
