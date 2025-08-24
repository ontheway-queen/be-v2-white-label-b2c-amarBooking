import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getFullPaxType } from '@/lib/flight/flight-formatter-helper';
import { formatCurrency } from '@/lib/helper';
import { IFlightListPassenger } from '@/type/flight/flight.search.interface';
type Props = {
  fare: IFlightListPassenger[] | undefined;
};

const FareInfo = ({ fare }: Props) => {
  if (!fare?.length) {
    return (
      <Card className='w-full'>
        <CardContent className='p-6 text-center text-gray-500'>
          No fare information available
        </CardContent>
      </Card>
    );
  }

  // Calculate totals
  const totals = fare.reduce(
    (acc, passenger) => ({
      baseFare: acc.baseFare + Number(passenger.per_pax_fare.base_fare) * passenger.number,
      tax: acc.tax + Number(passenger.per_pax_fare.tax) * passenger.number,
      ait: acc.ait + Number(passenger.per_pax_fare.ait) * passenger.number,
      discount: acc.discount + Number(passenger.per_pax_fare.discount) * passenger.number,
      totalFare: acc.totalFare + Number(passenger.per_pax_fare.total_fare) * passenger.number,
    }),
    { baseFare: 0, tax: 0, ait: 0, totalFare: 0, discount: 0 },
  );
  return (
    <div className='overflow-x-auto'>
      <Table>
        <TableHeader className='bg-muted'>
          <TableRow>
            <TableHead className='w-[200px] font-medium'>Passenger Type</TableHead>
            <TableHead className='text-right font-medium'>Base Fare</TableHead>
            <TableHead className='text-right font-medium'>Ait</TableHead>
            <TableHead className='text-right font-medium'>Tax</TableHead>
            <TableHead className='text-right font-medium'>Discount</TableHead>
            <TableHead className='text-right font-medium'>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fare?.map((item, index) => (
            <TableRow key={index} className='hover:bg-gray-50'>
              <TableCell className='font-medium'>
                <div className='flex items-center space-x-2'>
                  <span>{getFullPaxType(item.type)}</span>
                  <span className='text-gray-500'>×</span>
                  <span className='text-gray-500'>{item.number}</span>
                </div>
              </TableCell>
              <TableCell className='text-right'>
                {formatCurrency(Number(item.per_pax_fare.base_fare) * item.number)}
              </TableCell>
              <TableCell className='text-right'>
                {formatCurrency(Number(item.per_pax_fare.ait) * item.number)}
              </TableCell>
              <TableCell className='text-right'>
                {formatCurrency(Number(item.per_pax_fare.tax) * item.number)}
              </TableCell>
              <TableCell className='text-right text-red-800'>
                {formatCurrency(Number(item.per_pax_fare.discount) * item.number)}
              </TableCell>

              <TableCell className='text-right font-medium'>
                {formatCurrency(Number(item.per_pax_fare.total_fare) * item.number)}
              </TableCell>
            </TableRow>
          ))}

          {/* Total row */}
          <TableRow className='bg-gray-50 font-semibold'>
            <TableCell className='font-medium'>Total</TableCell>
            <TableCell className='text-right'>{formatCurrency(totals.baseFare)}</TableCell>
            <TableCell className='text-right'>{formatCurrency(totals.ait)}</TableCell>
            <TableCell className='text-right'>{formatCurrency(totals.tax)}</TableCell>
            <TableCell className='text-right text-red-800'>
              {formatCurrency(totals.discount)}
            </TableCell>
            <TableCell className='text-right text-blue-600 font-bold'>
              {formatCurrency(totals.totalFare)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default FareInfo;
