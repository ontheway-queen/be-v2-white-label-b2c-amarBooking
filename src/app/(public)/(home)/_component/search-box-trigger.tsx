'use client';

import { TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Props = {
  tab: {
    value: string;
    label: string;
    icon: string;
    href: string;
  };
};

const baseClasses = cn(
  'flex items-center justify-center md:p-[15px] rounded-lg transition-all duration-500 ease-in-out hover:bg-gray-100 hover:text-primary data-[state=active]:text-primary data-[state=active]:bg-primary/10 border-none space-x-5 py-1 cursor-pointer',
);

const SearchBoxTrigger = ({ tab }: Props) => {
  const router = useRouter();

  const tabContent = (
    <div className='flex flex-col md:flex-row justify-center items-center gap-1 md:gap-2'>
      <Image
        src={tab.icon}
        alt={tab.label}
        width={40}
        height={10}
        className='md:h-6 md:w-8 h-5 w-7'
      />
      <span className='font-bold text-[10px] md:text-sm'>{tab.label}</span>
    </div>
  );

  if (tab.href === 'umrah-packages') {
    return (
      <Link href={`/${tab.href}`} key={tab.value} className={baseClasses}>
        {tabContent}
      </Link>
    );
  }

  return (
    <TabsTrigger
      key={tab.value}
      value={tab.value}
      onClick={() => router.push(`/${tab.href}`)}
      className={baseClasses}
    >
      {tabContent}
    </TabsTrigger>
  );
};

export default SearchBoxTrigger;
