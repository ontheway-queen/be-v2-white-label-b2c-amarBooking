import HeaderTitleTwo from '@/components/Header-title-two';
import { buttonVariants } from '@/components/ui/button';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import TravelersList from './_components/travelers-details-list';

type Props = {};

const Page = (props: Props) => {
  return (
    <div>
      <div className='flex items-start justify-between pb-2 border-b mb-4'>
        <HeaderTitleTwo title='Travelers List' description='Manage Travelers Details' />
        <Link className={cn(buttonVariants({}))} href='/my-account/travelers/add'>
          Add Traveler
        </Link>
      </div>
      <TravelersList />
    </div>
  );
};

export default Page;
