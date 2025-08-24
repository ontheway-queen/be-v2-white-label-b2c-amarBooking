'use client';

import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { useGetProfileQuery } from '@/lib/APIs/common-api';
import { formatCurrency, formatDate, getImageLink } from '@/lib/helper';
import { useSession } from 'next-auth/react';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useInvoiceDetailsQuery } from '../_api/invoice-api';
import { ISiteConfigSiteData } from '@/type/site.config.interface';
import { Separator } from '@/components/ui/separator';

type Props = {
  id: string;
  site_info: ISiteConfigSiteData | undefined;
};

const InvoiceView = ({ id, site_info }: Props) => {
  const { data, isLoading } = useInvoiceDetailsQuery({ id });

  const session = useSession();
  const { data: result } = useGetProfileQuery({}, { skip: session.status !== 'authenticated' });
  const profileData = result?.data;

  const receiptData = data?.data;

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    pageStyle: '@page {padding: 5px; margin: 0; shadow: none;}',
  });

  if (isLoading) return <Loading />;

  return (
    <>
      <div className='flex justify-between items-center p-4 bg-white shadow z-10 mb-3'>
        <h1 className='text-lg font-bold'></h1>
        <Button onClick={reactToPrintFn}>Print This</Button>
      </div>
      <div ref={contentRef} className='py-4 bg-white border min-w-3xl'>
        {/* Header */}
        <div className='flex justify-between items-center px-4'>
          <div className='flex items-center space-x-4'>
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

          <div className='flex flex-col'>
            <div>
              <p className='text-lg font-mono font-bold'>#{receiptData?.invoice_no}</p>
            </div>
            <div className='text-right'>
              <p className='text-sm font-medium'>{formatDate(receiptData?.created_at)}</p>
            </div>
          </div>
        </div>

        <Separator className='mt-3' />

        {/* Customer and Service Information */}
        <div className='grid grid-cols-2 gap-8 my-8  px-4'>
          <div>
            <h3 className='text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1'>
              Customer Details
            </h3>
            <div className='space-y-2'>
              <div className='flex justify-between'>
                <span className='text-sm text-gray-600'>Customer:</span>
                <span className='text-sm font-medium'>{profileData?.name}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-sm text-gray-600'>Email:</span>
                <span className='text-sm font-medium'>{profileData?.user_email}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className='text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1'>
              Service Details
            </h3>
            <div className='space-y-2'>
              <div className='flex justify-between'>
                <span className='text-sm text-gray-600'>Service Type:</span>
                <span className='text-sm font-medium'>{receiptData?.ref_type}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-sm text-gray-600'>Reference:</span>
                <span className='text-sm font-medium'>{receiptData?.invoice_no}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Details */}
        <div className='mb-8  px-4'>
          <h3 className='text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1'>
            Transaction Details
          </h3>
          <div className='space-y-3'>
            <div className='flex justify-between py-2 border-b border-gray-100'>
              <span className='text-sm text-gray-600'>Transaction Type:</span>
              <span className='text-sm font-medium'>{receiptData?.type}</span>
            </div>
            <div className='flex justify-between py-2 border-b border-gray-100'>
              <span className='text-sm text-gray-600'>Source:</span>
              <span className='text-sm font-medium'>{receiptData?.source_type}</span>
            </div>
            <div className='flex justify-between py-2 border-b border-gray-100'>
              <span className='text-sm text-gray-600'>Status:</span>
              <span className='text-sm font-medium uppercase'>{receiptData?.status}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className='mb-8  px-4'>
          <h3 className='text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1'>
            Description
          </h3>
          <p className='text-sm text-gray-700 leading-relaxed border border-gray-200 p-4'>
            {receiptData?.details}
          </p>
        </div>

        {/* Amount Summary */}

        <div className='  px-4'>
          <div className='border-2 p-6 mb-8'>
            <div className='space-y-3'>
              <div className='flex justify-between items-center border-b border-gray-300 pb-2'>
                <span className='text-base font-semibold'>Total Amount:</span>
                <span className='text-xl font-bold font-mono'>
                  {formatCurrency(receiptData?.total_amount)}
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-base font-semibold'>Amount Due:</span>
                <span className='text-xl font-bold font-mono'>
                  {formatCurrency(receiptData?.due)}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className='border-t border-gray-300 pt-6 text-center space-y-4'>
          <div className='text-xs text-gray-500 space-y-1'>
            <p>This is a computer-generated receipt and does not require a physical signature.</p>
            <p>
              For inquiries, please contact customer service with reference:{' '}
              {receiptData?.invoice_no}
            </p>
          </div>

          <div className='mt-6'>
            <p className='text-sm font-medium text-gray-700'>Thank you for your business</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceView;
