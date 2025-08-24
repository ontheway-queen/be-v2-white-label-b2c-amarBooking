'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { formatCurrency } from '@/lib/helper';
import { AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface FlightPriceChangeProps {
  show?: boolean;
  currentPrice: number;
  onClose?: (confirmed: boolean) => void; // true = confirmed, false = cancelled
}

const FlightPriceChange = ({ show, currentPrice, onClose }: FlightPriceChangeProps) => {
  const [isOpen, setIsOpen] = useState(show);
  const [previousPrice, setPreviousPrice] = useState<number | null>(null);

  useEffect(() => {
    if (show) {
      setPreviousPrice(currentPrice - 50); // Example
      setIsOpen(true);
    }
  }, [show, currentPrice]);

  const handleConfirm = () => {
    setIsOpen(false);
    onClose && onClose(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
    onClose && onClose(false);
  };

  if (!isOpen || previousPrice === null) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={() => {}}>
      <AlertDialogContent className='sm:max-w-md'>
        <AlertDialogHeader>
          <AlertDialogTitle className='flex items-center gap-2'>
            <AlertTriangle className='h-5 w-5 text-amber-600' />
            Price Change Notice
          </AlertDialogTitle>
          <AlertDialogDescription>
            The price for this item has changed since you last viewed it.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className='space-y-4'>
          <div className='bg-amber-50 border border-amber-200 rounded-lg p-4'>
            <div className='flex justify-between items-center'>
              <span className='text-sm font-medium text-gray-700'>Current Price:</span>
              <span className='text-lg font-semibold text-amber-600'>
                {formatCurrency(currentPrice)}
              </span>
            </div>
          </div>

          <p className='text-sm text-muted-foreground'>
            Please review the updated pricing before proceeding with your booking.
          </p>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={handleCancel}
            className='bg-gray-100 text-gray-800 hover:bg-gray-200'
          >
            Cancel Booking
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className='bg-blue-600 hover:bg-blue-700 text-white'
          >
            Confirm Booking
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FlightPriceChange;
