import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ConfirmDeleteDialogProps {
  triggerText?: string;
  title: string;
  description: string;
  itemToCancel?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirm: () => void;
  children?: React.ReactNode;
  loading?: boolean;
}

export const ConfirmDeleteDialog = ({
  triggerText = 'Cancel',
  title = 'Confirm Cancellation',
  description = 'Are you sure you want to cancel?',
  itemToCancel,
  confirmButtonText = 'Yes, Cancel',
  cancelButtonText = 'Keep',
  onConfirm,
  children,
  loading = false,
}: ConfirmDeleteDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  const fullDescription = itemToCancel
    ? `${description} "${itemToCancel}"? This action cannot be undone.`
    : `${description} This action cannot be undone.`;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || <Button variant='destructive'>{triggerText}</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{fullDescription}</DialogDescription>
        </DialogHeader>
        <div className='bg-white w-full'>
          <div className='flex justify-end space-x-3'>
            <Button onClick={() => setOpen(false)}>{cancelButtonText}</Button>
            <Button variant='destructive' onClick={handleConfirm} loading={loading}>
              {confirmButtonText}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
