'use client';

import CreateDeposit from '@/app/(private)/(profile)/my-account/deposit/_component/create-deposit';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { Separator } from './ui/separator';
import { useSession } from 'next-auth/react';

type Props = {};

const TopUpModal = (props: Props) => {
  const [open, setOpen] = useState(false);
  const { status } = useSession();

  if (status === 'unauthenticated') return '';

  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogTrigger asChild>
        <Button className='flex-1' variant='secondary'>
          Top Up Balance
        </Button>
      </DialogTrigger>
      <DialogContent tabIndex={-1} onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Top Up Your Account</DialogTitle>
        </DialogHeader>
        <Separator />
        <CreateDeposit noRedirect setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default TopUpModal;
