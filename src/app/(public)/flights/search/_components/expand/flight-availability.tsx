import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { IAvailability } from '@/type/flight/flight.search.interface';

interface IProps {
  availability: IAvailability[] | undefined;
}

export default function FlightAvailabilityTable({ availability }: IProps) {
  if (!availability?.length) {
    return <div className='text-center p-4'>No flight availability data found.</div>;
  }

  const passengerTypeMap: Record<string, string> = {
    ADT: 'Adult',
    C11: 'Child (11)',
    C04: 'Child (4)',
    INF: 'Infant',
  };

  return (
    <div className='w-full max-w-xs space-y-2'>
      {availability?.map((route, index) => (
        <div key={index} className='overflow-hidden relative'>
          <div className='py-1 px-3 bg-amber-50'>
            <div className='text-sm font-medium'>
              {route.from_airport} - {route.to_airport}
            </div>
          </div>
          <div className='py-0 px-2 pb-2'>
            {route?.segments?.map((segment, segIndex) => (
              <div key={segIndex} className='space-y-1'>
                <div className='text-xs text-muted-foreground mb-1 absolute top-1 left-24'>
                  ({segment.name})
                </div>
                <Table>
                  <TableHeader>
                    <TableRow className='border-b '>
                      <TableHead className='py-0.5 px-1 h-6'>Type</TableHead>
                      <TableHead className='py-0.5 px-1 h-6'>Class</TableHead>
                      <TableHead className='py-0.5 px-1 h-6'>Baggage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {segment.passenger &&
                      segment.passenger.map((passenger, passengerIndex) => (
                        <TableRow key={passengerIndex} className='border-none'>
                          <TableCell className='py-0.5 px-1 h-6'>
                            <div className='flex items-center gap-1 text-xs'>
                              {passengerTypeMap[passenger.type!] || passenger.type}
                            </div>
                          </TableCell>
                          <TableCell className=' py-0.5 px-1 h-6'>{passenger.cabin_type}</TableCell>
                          <TableCell className='py-0.5 px-1 h-6'>
                            {passenger.baggage_count && (
                              <div className='flex items-center gap-1'>
                                <span className='text-xs'>
                                  {passenger.baggage_count}
                                  {passenger.baggage_unit && ` ${passenger.baggage_unit}`}
                                </span>
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
