'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getImageLink } from '@/lib/helper';
import { IVisaDetails } from '@/type/visa/visa.interface';
import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';
import VisaApplicationForm from './visa-application-form';
import VisaPriceSummary from './visa-price-summary';
import LoginWarning from '@/components/login-warning';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

type Props = {
  visa: IVisaDetails | undefined;
  traveler: string | number;
  slug: string;
};

const VisaDetails = ({ traveler, visa, slug }: Props) => {
  const [showForm, setShowForm] = useState(false);

  return showForm ? (
    <VisaApplicationForm
      setShowForm={setShowForm}
      showForm={showForm}
      traveler={traveler}
      visa={visa}
    />
  ) : (
    <VisaDetailsInfo traveler={traveler} visa={visa} setShowForm={setShowForm} slug={slug} />
  );
};

export default VisaDetails;

const VisaDetailsInfo = ({
  traveler,
  visa,
  setShowForm,
  slug,
}: Props & { setShowForm: Dispatch<SetStateAction<boolean>> }) => {
  const searchParams = useSearchParams();
  const { status } = useSession();

  return (
    <div className='container mx-auto px-4 lg:px-6'>
      <div className='min-h-screen py-10'>
        <div>
          {/* Header */}
          <div className='text-center mb-10'>
            <h1 className='text-4xl font-bold tracking-tight'>{visa?.title}</h1>
          </div>

          {/* Image & Main Info */}
          <div className='grid md:grid-cols-2 gap-8 items-start'>
            <div className='rounded overflow-hidden shadow-md'>
              <Image
                src={getImageLink(visa?.image)}
                alt={visa?.title!}
                width={600}
                height={400}
                className='object-cover w-full h-full'
              />
            </div>

            <VisaPriceSummary visa={visa} traveler={traveler} />
          </div>

          {/* Extra Notes */}
          <div className='mt-10'>
            <Card className='gap-3! border-0'>
              <CardHeader>
                <CardTitle>Document Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className='prose'
                  dangerouslySetInnerHTML={{ __html: visa?.documents_details! }}
                />
              </CardContent>
            </Card>
          </div>
          <div className='mt-4'>
            <Card className='gap-3! border-0'>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='prose' dangerouslySetInnerHTML={{ __html: visa?.description! }} />
              </CardContent>
            </Card>
          </div>
        </div>
        <div className='flex justify-end mt-5'>
          {status !== 'authenticated' ? (
            <LoginWarning redirect={`visa/${slug}?${searchParams.toString()}`} />
          ) : (
            <Button onClick={() => setShowForm(true)}>Apply for Visa</Button>
          )}
        </div>
      </div>
    </div>
  );
};
