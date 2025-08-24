import { formatNumber } from '@/lib/helper';
import { cn } from '@/lib/utils';
import { IFlightListFare, IFlightListPassenger } from '@/type/flight/flight.search.interface';

type Props = {
  fareSummary: {
    pax: IFlightListPassenger[] | undefined;
    fare: IFlightListFare | undefined;
  };
};

const FlightFareSummaryTab = ({ fareSummary }: Props) => {
  const { fare, pax } = fareSummary;

  const fareDetails = [
    { label: 'Base Fare', value: fare?.base_fare },
    { label: 'Tax', value: fare?.total_tax },
    { label: 'Ait', value: fare?.ait },
    { label: 'Discount', value: fare?.discount },
    { label: 'Total Amount', value: fare?.payable },
  ];
  return (
    <div className='dark:bg-gray-900 dark:text-gray-100'>
      <div className='justify-between md:flex'>
        <div className='mt-2 basis-3/4 items-center justify-center border-r dark:border-gray-700'>
          <h3 className='dark:text-primary-light border-b pb-2 text-center text-[16px] font-bold text-primary'>
            Passenger Fare
          </h3>
          <div>
            <div className='overflow-x-auto'>
              <table className='min-w-full bg-primary/20 divide-y divide-gray-200 dark:divide-gray-700'>
                <thead>
                  <tr>
                    <th className='px-2 py-1 md:px-3 md:py-2 text-left text-xs font-medium uppercase tracking-wider'>
                      Type
                    </th>
                    <th className='px-2 py-1 md:px-3 md:py-2 text-left text-xs font-medium uppercase tracking-wider'>
                      Base Fare
                    </th>
                    <th className='px-2 py-1 md:px-3 md:py-2 text-left text-xs font-medium uppercase tracking-wider'>
                      Ait
                    </th>
                    <th className='px-2 py-1 md:px-3 md:py-2 text-left text-xs font-medium uppercase tracking-wider'>
                      Tax
                    </th>

                    <th className='px-2 py-1 md:px-3 md:py-2 text-left text-xs font-medium uppercase tracking-wider'>
                      Discount
                    </th>
                    <th className='px-2 py-1 md:px-3 md:py-2 text-left text-xs font-medium uppercase tracking-wider'>
                      Total Price
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 bg-background text-sm dark:divide-gray-700 dark:bg-gray-800'>
                  {pax?.map((passenger, index) => (
                    <tr key={index}>
                      <td className='px-2 py-1 md:px-3 md:py-2 text-left text-xs'>
                        {passenger.type} x{<span> {passenger.number}</span>}
                      </td>
                      <td className='px-2 py-1 md:px-3 md:py-2 text-left text-xs'>
                        <span className='font-mono text-sm'> ৳</span>{' '}
                        {Math.round(
                          Number(passenger?.per_pax_fare?.base_fare ?? 0),
                        ).toLocaleString()}
                      </td>
                      <td className='px-2 py-1 md:px-3 md:py-2 text-left text-xs'>
                        <span className='font-mono text-sm'> ৳</span>{' '}
                        {Math.round(Number(passenger?.per_pax_fare?.ait ?? 0)).toLocaleString()}
                      </td>
                      <td className='px-2 py-1 md:px-3 md:py-2 text-left text-xs'>
                        <span className='font-mono text-sm'> ৳</span>{' '}
                        {Math.round(Number(passenger?.per_pax_fare?.tax ?? 0)).toLocaleString()}
                      </td>
                      {passenger?.per_pax_fare?.discount ? (
                        <td className='px-2 py-1 md:px-3 md:py-2 text-left text-xs text-red-800'>
                          <span className='font-mono text-sm'> ৳</span>{' '}
                          {Math.round(
                            Number(passenger?.per_pax_fare?.discount ?? 0),
                          ).toLocaleString()}
                        </td>
                      ) : (
                        ''
                      )}
                      <td className='px-2 py-1 md:px-3 md:py-2 text-left text-xs font-bold'>
                        <span className='font-mono text-sm'> ৳</span>{' '}
                        {Math.round(
                          Number(passenger?.per_pax_fare?.total_fare ?? 0),
                        ).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className='flex-1'>
          <h3 className='dark:text-primary-light my-3 border-b pb-2 text-center text-sm font-bold text-primary'>
            Total Fare Summary
          </h3>
          <div className={'flex flex-col px-2'}>
            {fareDetails?.map((item, index) => {
              if (item?.value)
                return (
                  <div key={index}>
                    <div
                      className={cn(
                        `flex text-xs pb-2 justify-between`,
                        item.label === 'Discount' && 'text-red-800',
                        item.label === 'Total Amount' && ' font-bold text-primary',
                        !item.value && 'hidden',
                      )}
                    >
                      <span>{item.label}</span>
                      <span>৳ {formatNumber(item.value)}</span>
                    </div>
                  </div>
                );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightFareSummaryTab;
