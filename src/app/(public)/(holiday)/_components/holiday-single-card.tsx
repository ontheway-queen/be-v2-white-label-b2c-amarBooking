import { Badge } from '@/components/ui/badge';
import { formatCurrency, getImageLink } from '@/lib/helper';
import { cn } from '@/lib/utils';
import { ITourList } from '@/type/holiday/holiday.interface';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
type Props = {
  item: ITourList;
};

const HolidaySingleCard = ({ item }: Props) => {
  return (
    <Link href={`/${item.slug}`}>
      <div className='relative group overflow-hidden rounded-md shadow-lg border-none cursor-pointer'>
        {/* Background Image */}
        <Image
          src={getImageLink(item.image)}
          alt={item.title}
          width={500}
          height={1000}
          className='object-cover group-hover:scale-105 transition-transform duration-700 h-[450px]'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />

        {/* Overlay */}
        <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 z-10' />

        {/* Top Labels */}
        <div className='absolute top-4 left-4 right-4 z-20 flex justify-between items-start'>
          {item.status && (
            <Badge className='bg-green-500 hover:bg-green-600 px-3 py-0.5 text-[10px] rounded-full'>
              Available
            </Badge>
          )}
          <Badge variant='default' className='px-3 py-0.5 text-[10px] rounded-full'>
            {item.holiday_type}
          </Badge>
        </div>

        {/* Content Info */}
        <div className='absolute bottom-28 left-6 right-6 z-20 text-white text-sm space-y-2'>
          <div className='flex items-center gap-2'>
            <Clock className='h-4 w-4 text-white' />
            <span>{item.duration} Days</span>
          </div>
        </div>

        {/* Title */}
        <div className='absolute bottom-20 left-6 right-6 z-20'>
          <h3 className='text-xl md:text-xl font-bold text-white drop-shadow-md line-clamp-2'>
            {item.title}
          </h3>
        </div>

        {/* Footer Buttons */}
        <div className='absolute bottom-4 left-6 right-6 z-20 flex justify-between items-center'>
          <div className='flex items-center gap-2 bg-black/10 px-2 rounded-full backdrop-blur'>
            <Tag className='h-4 w-4 text-white' />
            <span className='font-bold text-lg text-white'>
              {formatCurrency(Number(item.price))}
            </span>
          </div>
          <button
            className={cn(
              'rounded-full bg-primary hover:bg-primary/90 transition-colors w-8 h-8 text-white flex items-center justify-center'
            )}
          >
            <ArrowRight className='rounded-full transition-transform group-hover:translate-x-1' />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default HolidaySingleCard;
