'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { getImageLink } from '@/lib/helper';
import { closePopup, openPopup } from '@/lib/redux/slice/popupSlice';
import { useAppSelector } from '@/lib/redux/store';
import { IPopUpData } from '@/type/site.config.interface';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

type Props = {
  popup: boolean | undefined;
  popupData: IPopUpData | undefined;
};

const PopupClient = ({ popup, popupData }: Props) => {
  const dispatch = useDispatch();
  const { isOpen, hasBeenShown } = useAppSelector((state) => state.popup);

  const handleClose = useCallback(() => {
    dispatch(closePopup());
  }, [dispatch]);

  const handleLinkClick = useCallback(() => {
    if (popupData?.link) {
      window.open(popupData.link, '_blank', 'noopener,noreferrer');
      handleClose();
    }
  }, [popupData?.link, handleClose]);

  useEffect(() => {
    if (popup && popupData && !hasBeenShown) {
      const timer = setTimeout(() => {
        dispatch(openPopup());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [popup, popupData, hasBeenShown, dispatch]);

  // Don't render if no popup data
  if (!popupData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className='max-w-md p-0 overflow-hidden border-0 shadow-2xl'
        aria-describedby={popupData.description ? 'notice-description' : undefined}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className='absolute top-3 right-3 z-10 p-1 rounded-full bg-black/20 hover:bg-black/40 transition-colors duration-200'
          aria-label='Close notice'
        >
          <X className='h-4 w-4 text-white' />
        </button>

        {/* Thumbnail Image */}
        {popupData.thumbnail && (
          <div className='relative overflow-hidden'>
            <Image
              src={getImageLink(popupData.thumbnail)}
              alt={popupData.title || 'Notice image'}
              width={500}
              height={300}
              className='object-cover w-full h-60 transition-transform duration-300 hover:scale-105'
              priority
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent' />
          </div>
        )}

        {/* Content */}
        <div className='p-6 space-y-4'>
          <DialogHeader className='space-y-3'>
            {popupData.title && (
              <DialogTitle className='text-2xl font-bold text-gray-900 leading-tight'>
                {popupData.title}
              </DialogTitle>
            )}
            {popupData.description && (
              <DialogDescription id='notice-description' className='text-gray-600 leading-relaxed'>
                {popupData.description}
              </DialogDescription>
            )}
          </DialogHeader>

          {/* Action Buttons */}
          <DialogFooter className='flex gap-3 pt-2'>
            <Button
              variant='outline'
              onClick={handleClose}
              className='flex-1 border-gray-300 hover:bg-gray-50'
            >
              Maybe Later
            </Button>
            {popupData.link && (
              <Button
                onClick={handleLinkClick}
                className='flex-1 bg-primary hover:bg-primary/90 transition-colors duration-200'
              >
                Learn More
              </Button>
            )}
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PopupClient;
