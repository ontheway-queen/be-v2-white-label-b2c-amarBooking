import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/lib/helper';
import { IVisaDetails } from '@/type/visa/visa.interface';

type Props = {
  visa: IVisaDetails | undefined;
  traveler: string | number;
};

const VisaPriceSummary = ({ traveler, visa }: Props) => {
  return (
    <Card className='bg-white! border-0'>
      <CardHeader>
        <CardTitle className='text-lg font-semibold'>Pricing Summary</CardTitle>
      </CardHeader>
      <CardContent className='space-y-3 text-sm'>
        {/* Visa Type */}
        <div className='flex items-center justify-between'>
          <span className='text-muted-foreground'>Visa Type</span>
          <Badge variant='outline' className='px-3 py-1 text-xs'>
            {visa?.visa_type}
          </Badge>
        </div>

        {/* Mode */}
        <div className='flex items-center justify-between'>
          <span className='text-muted-foreground'>Mode</span>
          <Badge className='px-3 py-1 text-xs'>{visa?.visa_mode}</Badge>
        </div>

        {/* Visa Fee */}
        <div className='flex items-center justify-between'>
          <span className='text-muted-foreground'>Visa Fee</span>
          <span className='font-medium'>
            {`${visa?.visa_fee} × ${traveler} = `}
            <span className='text-primary font-semibold'>
              {formatCurrency(Number(visa?.visa_fee) * Number(traveler))}
            </span>
          </span>
        </div>

        {/* Processing Fee */}
        <div className='flex items-center justify-between'>
          <span className='text-muted-foreground'>Processing Fee</span>
          <span className='font-medium'>
            {`${visa?.processing_fee} × ${traveler} = `}
            <span className='text-primary font-semibold'>
              {formatCurrency(Number(visa?.processing_fee) * Number(traveler))}
            </span>
          </span>
        </div>

        <Separator />

        {/* Max Validity */}
        <div className='flex items-center justify-between'>
          <span className='text-muted-foreground'>Max Validity</span>
          <span className='font-medium'>{visa?.max_validity} days</span>
        </div>

        {/* Stay Validity */}
        <div className='flex items-center justify-between'>
          <span className='text-muted-foreground'>Stay Validity</span>
          <span className='font-medium'>{visa?.stay_validity} days</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisaPriceSummary;
