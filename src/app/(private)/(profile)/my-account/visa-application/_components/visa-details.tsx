'use client';

import { useVisaApplicationDetailsQuery } from '@/app/(public)/visa/_api/visa-endpoints';
import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { formatCurrency, formatDate, getImageLink } from '@/lib/helper';
import { ISiteConfigSiteData } from '@/type/site.config.interface';
import { Printer } from 'lucide-react';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

type Props = {
  id?: string;
  site_info?: ISiteConfigSiteData | undefined;
};

const VisaDetails = ({ id, site_info }: Props) => {
  const { data: res, isLoading } = useVisaApplicationDetailsQuery({ id });

  const data = res?.data;

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    pageStyle: '@page {padding: 20px; margin: 0; shadow: none;}',
  });

  if (isLoading) return <Loading />;

  return (
    <div className='bg-gray-50/50 min-h-screen'>
      <div className='flex justify-between items-center p-4 bg-white shadow z-10 mb-3'>
        <h1 className='text-lg font-bold'>Booking Copy</h1>
        <Button onClick={reactToPrintFn}>Print This</Button>
      </div>
      <div ref={contentRef} className='bg-white min-w-3xl'>
        <div className='flex items-center justify-between mb-3  px-4'>
          <div className='flex items-center space-x-4 '>
            <img
              src={`${getImageLink(site_info?.main_logo)}`}
              alt={site_info?.site_name!}
              width={120}
              height={40}
              className='object-contain'
            />
            <div className='flex flex-col'>
              <h2 className='text-xl font-bold text-primary'>{site_info?.site_name}</h2>
              <p className='text-sm whitespace-pre-line'>{site_info?.address?.[0].address}</p>
              <p className='text-sm'>{site_info?.emails?.[0]?.email}</p>
              <p className='text-sm'> {site_info?.numbers?.[0]?.number}</p>
            </div>
          </div>

          <div className=''>
            <div className='flex flex-col'>
              <span className='text-muted-foreground text-xs'>Application Ref:</span>

              <span className='font-medium'>{data?.application_ref}</span>
            </div>
            <div>{data?.status}</div>
          </div>
        </div>

        <Separator className='mb-8' />
        <div className='space-y-8 '>
          {/* Application Overview & Payment Card */}
          <div className='bg-white border border-gray-200 rounded-lg shadow-sm'>
            <div className='p-4 border-b border-gray-200'>
              <h2 className='text-base font-semibold leading-7 text-gray-800'>
                Application Overview
              </h2>
            </div>
            <dl className='p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8'>
              <DetailItem label='Visa' value={data?.title} />
              <DetailItem label='Country' value={data?.country_name} />
              <DetailItem label='Visa Type' value={data?.visa_type} />
              <DetailItem label='Visa Mode' value={data?.visa_mode} />
              <DetailItem label='Application Date' value={formatDate(data?.application_date)} />
              <DetailItem label='Visa Start Date' value={formatDate(data?.from_date)} />
              <DetailItem label='Visa End Date' value={formatDate(data?.to_date)} />
            </dl>

            {/* Payment Summary */}
            <div className='p-4 border-t border-gray-200'>
              <h3 className='text-base font-semibold leading-7 text-gray-800 mb-4'>
                Payment Summary
              </h3>
              <div className='space-y-3'>
                <div className='flex justify-between'>
                  <span className='text-sm text-gray-600'>Visa Fee</span>
                  <span className='text-sm font-medium text-gray-800'>
                    {formatCurrency(data?.visa_fee)}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-sm text-gray-600'>Processing Fee</span>
                  <span className='text-sm font-medium text-gray-800'>
                    {formatCurrency(data?.processing_fee)}
                  </span>
                </div>
                <div className='flex justify-between border-t border-gray-200 pt-3 mt-3'>
                  <span className='text-base font-semibold text-gray-900'>Total Payable</span>
                  <span className='text-base font-bold text-gray-900'>
                    {formatCurrency(data?.payable)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Traveler Information Card */}
          <div className='bg-white border border-gray-200 rounded-lg shadow-sm'>
            <div className='p-4'>
              <h2 className='text-base font-semibold leading-7 text-gray-800'>Traveler Details</h2>
            </div>
            <div className='overflow-x-auto'>
              <table className='min-w-full text-sm'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th scope='col' className='px-6 py-3 text-left font-medium text-gray-600'>
                      Name
                    </th>

                    <th scope='col' className='px-6 py-3 text-left font-medium text-gray-600'>
                      Date of Birth
                    </th>
                    <th scope='col' className='px-6 py-3 text-left font-medium text-gray-600'>
                      Passport No.
                    </th>
                    <th scope='col' className='px-6 py-3 text-left font-medium text-gray-600'>
                      Passport Expiry
                    </th>
                    <th scope='col' className='px-6 py-3 text-left font-medium text-gray-600'>
                      Location
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                  {data?.travelers.map((traveler) => (
                    <tr key={traveler.id}>
                      <td className='whitespace-nowrap px-6 py-4 font-medium text-gray-900'>
                        {`${traveler.title} ${traveler.first_name} ${traveler.last_name}`}
                      </td>

                      <td className='whitespace-nowrap px-6 py-4 text-gray-600'>
                        {formatDate(traveler.date_of_birth)}
                      </td>
                      <td className='whitespace-nowrap px-6 py-4 text-gray-600'>
                        {traveler.passport_number}
                      </td>
                      <td className='whitespace-nowrap px-6 py-4 text-gray-600'>
                        {formatDate(traveler.passport_expiry_date)}
                      </td>
                      <td className='whitespace-nowrap px-6 py-4 text-gray-600'>
                        {`${traveler.city}, ${traveler.country}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisaDetails;

// Helper component for consistent key-value display
const DetailItem = ({ label, value }: { label: string; value?: string | null }) => (
  <div>
    <dt className='text-sm font-medium text-gray-500'>{label}</dt>
    <dd className='mt-1 text-sm font-semibold text-gray-900'>{value || 'N/A'}</dd>
  </div>
);
