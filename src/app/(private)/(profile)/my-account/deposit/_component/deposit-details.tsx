'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatCurrency, formatDate, getImageLink } from '@/lib/helper';
import {
  AlertCircle,
  Building2,
  Calendar,
  CreditCard,
  Download,
  FileText,
  MapPin,
  User,
} from 'lucide-react';
import { useDepositDetailsQuery } from '../_api/deposit-api';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Loading from '@/components/loading';

type Props = {
  id: string;
};

const DepositDetails = ({ id }: Props) => {
  const { data, isLoading } = useDepositDetailsQuery({ id });

  if (isLoading) return <Loading />;

  const depositData = data?.data;

  return (
    <div className='min-h-screen'>
      <div className='max-w-4xl mx-auto space-y-6'>
        {/* Header */}
        <div className='text-center space-y-2'>
          <h1 className='text-3xl font-bold text-slate-900'>Deposit Request Details</h1>
          <p className='text-muted-foreground'>Request #{depositData?.request_no}</p>
        </div>

        {/* Status Card */}
        <Card className='border-0'>
          <CardContent>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div>
                  <h3 className='font-semibold text-lg'>Current Status</h3>
                  <p className='text-muted-foreground'>
                    Last updated: {formatDate(depositData?.created_at)}
                  </p>
                </div>
              </div>
              <Badge>{depositData?.status}</Badge>
            </div>
          </CardContent>
        </Card>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* Transaction Details */}
          <Card className='border-0'>
            <CardHeader className='pb-4'>
              <CardTitle className='flex items-center gap-2'>
                <CreditCard className='w-5 h-5' />
                Transaction Information
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-1'>
                  <p className='text-sm font-medium text-muted-foreground'>Amount</p>
                  <p className='text-2xl font-bold text-green-600'>
                    {formatCurrency(depositData?.amount)}
                  </p>
                </div>
              </div>

              <Separator />

              <div className='space-y-3'>
                <div className='flex items-center gap-3'>
                  <User className='w-4 h-4 text-slate-400' />
                  <div>
                    <p className='text-sm text-muted-foreground'>Deposit by</p>
                    <p className='font-medium'>{depositData?.created_by_name}</p>
                  </div>
                </div>

                <div className='flex items-center gap-3'>
                  <Calendar className='w-4 h-4 text-slate-400' />
                  <div>
                    <p className='text-sm text-muted-foreground'>Submitted on</p>
                    <p className='font-medium'>{formatDate(depositData?.created_at)}</p>
                  </div>
                </div>

                {depositData?.remarks && (
                  <div className='flex items-start gap-3'>
                    <FileText className='w-4 h-4 text-slate-400 mt-0.5' />
                    <div>
                      <p className='text-sm text-muted-foreground'>Remarks</p>
                      <p className='font-medium'>{depositData?.remarks}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Bank Details */}
          <Card className='border-0'>
            <CardHeader className='pb-4'>
              <CardTitle className='flex items-center gap-2'>
                <Building2 className='w-5 h-5' />
                Bank Information
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center gap-3 p-3 bg-slate-50 rounded-lg'>
                <div className='w-12 h-12 bg-slate-200 rounded-lg flex items-center justify-center'>
                  <Building2 className='w-6 h-6 text-muted-foreground' />
                </div>
                <div>
                  <h4 className='font-semibold text-lg'>{depositData?.bank_name}</h4>
                  <p className='text-muted-foreground'>{depositData?.account_name}</p>
                </div>
              </div>

              <div className='grid grid-cols-1 gap-3'>
                <div className='flex justify-between py-2 border-b border-slate-100'>
                  <span className='text-muted-foreground'>Account Number</span>
                  <span className='font-mono font-medium'>{depositData?.account_number}</span>
                </div>

                <div className='flex justify-between py-2 border-b border-slate-100'>
                  <span className='text-muted-foreground'>Branch</span>
                  <span className='font-medium flex items-center gap-1'>
                    <MapPin className='w-3 h-3' />
                    {depositData?.branch}
                  </span>
                </div>
                <div className='flex justify-between py-2 border-b border-slate-100'>
                  <span className='text-muted-foreground'>Payment Date</span>
                  <span className='font-medium flex items-center gap-1'>
                    {formatDate(depositData?.payment_date)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Document Section */}
        {depositData?.docs && (
          <Card className='border-0'>
            <CardHeader className='pb-4'>
              <CardTitle className='flex items-center gap-2'>
                <FileText className='w-5 h-5' />
                Supporting Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex items-center justify-between p-4 bg-slate-50 rounded-lg'>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center'>
                    <FileText className='w-5 h-5 text-blue-600' />
                  </div>
                  <div>
                    <p className='font-medium'>Payment Receipt</p>
                    <p className='text-sm text-muted-foreground'>Uploaded document</p>
                  </div>
                </div>
              </div>

              <div>
                <Image src={getImageLink(depositData.docs)} alt='docs' width={1000} height={1000} />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Status Alert */}
        <Alert className='border-0'>
          <AlertCircle className='h-4 w-4' />
          <AlertDescription>
            {depositData?.status === 'PENDING' &&
              "Your deposit request is currently being processed. We'll notify you once it's reviewed."}
            {depositData?.status === 'APPROVED' &&
              'Your deposit has been approved and processed successfully.'}
            {depositData?.status === 'REJECTED' &&
              'Your deposit request has been rejected. Please contact support for more information.'}
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default DepositDetails;
