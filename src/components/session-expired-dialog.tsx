'use client';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';
import { useRef } from 'react';

type SessionExpiredDialogProps = {
  open: boolean;
  onReload?: () => void;
};

export default function SessionExpiredDialog({ open, onReload }: SessionExpiredDialogProps) {
  const reloadButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog open={open}>
      <AlertDialogContent
        onEscapeKeyDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          reloadButtonRef?.current?.focus();
        }}
        className='gap-2'
      >
        <AlertDialogHeader>
          <AlertDialogTitle className='flex items-center gap-2'>
            <Clock className='h-5 w-5' />
            Session Expired
          </AlertDialogTitle>
        </AlertDialogHeader>

        <p>Your session has expired. Please reload the page to start a new session.</p>

        <AlertDialogFooter>
          <Button ref={reloadButtonRef} autoFocus variant='destructive' onClick={onReload}>
            Reload Page
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
