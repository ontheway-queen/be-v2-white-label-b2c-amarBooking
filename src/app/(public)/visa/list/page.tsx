import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { Separator } from '@/components/ui/separator';
import { getSiteInfo } from '@/lib/APIs/config-api';
import { API_ENDPOINTS } from '@/lib/APIs/endpoint-list';
import { fetchRequest } from '@/lib/APIs/fetchApis';
import { formatCurrency, formatQueryParams, getImageLink } from '@/lib/helper';
import { SITE_INFO } from '@/site-config';
import { IVisaList } from '@/type/visa/visa.interface';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getSiteInfo();
  const api_data = data?.site_data;

  if (!api_data) {
    return {
      title: 'Default Title',
      description: 'Default Description',
    };
  }

  return {
    title: `${SITE_INFO.visa_search_list} | ${api_data.site_name}`,
    description: `${SITE_INFO.visa_search_description} | ${api_data.site_name}`,
  };
}
type Props = {
  searchParams: Promise<{ country?: string; id?: string; traveler?: string }>;
};
const page = async ({ searchParams }: Props) => {
  const { country, id, traveler = 1 } = await searchParams;

  const url = formatQueryParams(`${API_ENDPOINTS.VISA}`, { country_id: id, visa_type_id: null });

  const { data } = await fetchRequest<IVisaList[]>(url);
  const visaPackages = data;
  return (
    <div className='min-h-screen'>
      <div className='container mx-auto px-4 py-12'>
        {/* Page Heading */}
        <div className='text-center mb-10'>
          <h1 className='text-3xl md:text-4xl font-bold tracking-tight'>
            Available Visa Application Services
          </h1>
          <p className='text-muted-foreground mt-2 max-w-2xl mx-auto'>
            Explore and apply for the best visa packages tailored to your travel needs.
          </p>
        </div>

        <Separator />

        {/* Grid */}
        <div className='mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {visaPackages?.map((visa) => (
            <div
              key={visa.id}
              className='group rounded-2xl border overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-background'
            >
              {/* Image */}
              <div className='relative h-52 w-full overflow-hidden'>
                <Image
                  src={getImageLink(visa.image)}
                  alt={visa.title}
                  fill
                  className='object-cover group-hover:scale-105 transition-transform duration-500'
                />
              </div>

              {/* Content */}
              <div className='p-5 space-y-3'>
                <div className='flex items-center justify-between'>
                  <h2 className='text-lg font-semibold line-clamp-1'>{visa.title}</h2>
                  <Badge variant='secondary' className='shrink-0'>
                    {visa.max_validity} Days
                  </Badge>
                </div>

                {/* Fees */}
                <div className='space-y-2 text-sm'>
                  <div className='flex items-center justify-between'>
                    <span className='text-muted-foreground'>Visa Fee</span>
                    <span className='font-semibold text-primary'>
                      {formatCurrency(visa.visa_fee)}
                    </span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-muted-foreground'>Processing Fee</span>
                    <span className='font-semibold'>{formatCurrency(visa.processing_fee)}</span>
                  </div>
                </div>

                {/* CTA */}
                <Link href={`${visa.slug}?traveler=${traveler}`}>
                  <Button className='w-full mt-4' size='sm'>
                    See Details
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
