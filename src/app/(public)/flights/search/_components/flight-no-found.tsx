import { Button, buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type Props = {};

const FlightNotFound = (props: Props) => {
  return (
    <>
      <Card className='min-h-[600px] flex items-center justify-center'>
        <div className=' w-full rounded'>
          <div className=''>
            <div className='text-center'>
              <h1 className='text-4xl font-bold mb-4'>No Flights Found</h1>
              <p className='text-muted-foreground'>
                Sorry, we {`couldn't`} find any flights for your search.
              </p>

              <Link href={`/flights`} className={cn(buttonVariants({ className: 'mt-5' }))}>
                Search again
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default FlightNotFound;
