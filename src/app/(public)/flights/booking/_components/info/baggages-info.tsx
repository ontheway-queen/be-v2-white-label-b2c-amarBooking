import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getFullPaxType } from '@/lib/flight/flight-formatter-helper';
import { IAvailability } from '@/type/flight/flight.search.interface';
import { Plane } from 'lucide-react';

type Props = {
  availability: IAvailability[] | undefined;
};

const BaggagesInfo = ({ availability }: Props) => {
  if (!availability) return <div>No baggage information available</div>;

  return (
    <Table className=''>
      <TableHeader className='bg-muted'>
        <TableRow>
          <TableHead>Route</TableHead>
          <TableHead>Passengers</TableHead>
          <TableHead>Baggage</TableHead>
          <TableHead>Available seat</TableHead>
          <TableHead>B. Code</TableHead>
          <TableHead className='text-right'>Details</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {availability?.map((flight, flightIndex) =>
          flight?.segments?.map((segment, segmentIndex) =>
            segment?.passenger?.map((pass, passIndex) => (
              <TableRow key={`${flightIndex}-${segmentIndex}-${passIndex}`}>
                <TableCell>
                  <div className='flex items-center space-x-2'>
                    <span className='font-medium'>{flight.from_airport}</span>
                    <Plane className='text-blue-500' size={14} />
                    <span className='font-medium'>{flight.to_airport}</span>
                  </div>
                </TableCell>

                <TableCell>
                  {getFullPaxType(pass.type)} <span className='text-[8px]'>✖</span> {pass.count}
                </TableCell>
                <TableCell>
                  {pass.baggage_count} - {pass.baggage_unit}
                </TableCell>
                <TableCell>{pass.available_seat}</TableCell>
                <TableCell>{pass.booking_code}</TableCell>

                <TableCell className='text-right'>
                  <div className='space-x-2'>
                    <Badge variant='outline' className='text-xs'>
                      {pass.cabin_type} ({pass.cabin_code})
                    </Badge>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )
        )}
      </TableBody>
    </Table>
  );
};

export default BaggagesInfo;
