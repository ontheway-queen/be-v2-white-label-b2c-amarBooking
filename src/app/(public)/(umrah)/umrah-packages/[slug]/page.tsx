import { API_ENDPOINTS } from '@/lib/APIs/endpoint-list';
import { fetchRequest } from '@/lib/APIs/fetchApis';
import { formatCurrency, formatDate, getImageLink } from '@/lib/helper';
import { IUmrahDetails } from '@/type/umrah/umrah.interface';
import { CheckCircle, Clock, Star, Users } from 'lucide-react';
import { Metadata } from 'next';
import UmrahBookedFrom from '../_components/UmrahBookedFrom';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const data = await fetchRequest<IUmrahDetails>(`${API_ENDPOINTS.UMRAH_LIST}/${slug}`);
  const result = data?.data;

  return {
    title: result?.meta_title,
    description: result?.meta_description,
  };
}

const page = async ({ params }: Props) => {
  const { slug } = await params;

  const data = await fetchRequest<IUmrahDetails>(`${API_ENDPOINTS.UMRAH_LIST}/${slug}`);
  const result = data?.data;

  const {
    id,
    title,
    description,
    duration,
    valid_till_date,
    adult_price,
    child_price,
    short_description,
    package_details,
    package_accommodation_details,
    status,
    thumbnail,
    group_size,
    includes,
  } = result ?? {};

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Image - Full Width */}
      <div
        className='relative w-full h-96 '
        style={{
          backgroundImage: `url(${getImageLink(thumbnail)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
        }}
      >
        <div className='absolute inset-0 bg-black/10 bg-opacity-40'></div>
        <div className='relative z-10 flex items-center justify-center h-full text-white text-center px-4'>
          <div>
            <h1 className='text-4xl md:text-5xl font-bold mb-4 bg-black/50 py-1 px-2.5'>{title}</h1>
            <p className='text-xl md:text-2xl font-light'>{short_description}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='container mx-auto px-4 py-8'>
        <div className='flex flex-col lg:flex-row gap-4'>
          {/* Main Content Area */}
          <div className='lg:w-2/3'>
            {/* Package Overview */}
            <div className='bg-white rounded-lg shadow p-6 mb-4'>
              <h2 className='text-2xl font-bold text-gray-800 mb-4'>Package Overview</h2>

              <div
                className='prose text-gray-600 leading-relaxed'
                dangerouslySetInnerHTML={{ __html: description! }}
              />

              <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
                <div className='flex items-center space-x-3 p-4 bg-gray-50 rounded-lg'>
                  <Clock className='w-6 h-6 text-primary' />
                  <div>
                    <p className='text-sm text-gray-500'>Duration</p>
                    <p className='font-semibold'>{duration} Days</p>
                  </div>
                </div>
                <div className='flex items-center space-x-3 p-4 bg-gray-50 rounded-lg'>
                  <Users className='w-6 h-6 text-primary' />
                  <div>
                    <p className='text-sm text-gray-500'>Group Size</p>
                    <p className='font-semibold'>{group_size || 0} People</p>
                  </div>
                </div>
                <div className='flex items-center space-x-3 p-4 bg-gray-50 rounded-lg'>
                  <Star className='w-6 h-6 text-primary' />
                  <div>
                    <p className='text-sm text-gray-500'>Rating</p>
                    <p className='font-semibold'>4.8/5</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Package Features */}
            {includes?.length ? (
              <div className='bg-white rounded-lg shadow p-6 mb-8'>
                <h2 className='text-2xl font-bold text-gray-800 mb-4'>What's Included</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                  {includes?.map((feature, index) => (
                    <div key={index} className='flex items-center space-x-3'>
                      <CheckCircle className='w-5 h-5 text-primary flex-shrink-0' />
                      <span className='text-muted-foreground uppercase'>
                        {feature.service_name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              ''
            )}

            {description ? (
              <div className='bg-white rounded-lg shadow p-6 mb-8'>
                <h2 className='text-2xl font-bold text-gray-800 mb-4'>Description</h2>

                <div className='prose' dangerouslySetInnerHTML={{ __html: description }}></div>
              </div>
            ) : undefined}

            {package_accommodation_details ? (
              <div className='bg-white rounded-lg shadow p-6 mb-8'>
                <h2 className='text-2xl font-bold text-gray-800 mb-4'>Accommodation</h2>

                <div
                  className='prose'
                  dangerouslySetInnerHTML={{ __html: package_accommodation_details }}
                ></div>
              </div>
            ) : undefined}

            {package_details ? (
              <div className='bg-white rounded-lg shadow p-6 mb-8'>
                <h2 className='text-2xl font-bold text-gray-800 mb-4'>Package Details</h2>

                <div className='prose' dangerouslySetInnerHTML={{ __html: package_details }}></div>
              </div>
            ) : undefined}
          </div>

          {/* Sticky Sidebar */}
          <div className='lg:w-1/3 '>
            <div className='sticky top-8 space-y-6 overflow-y-auto lg:h-[95vh] no-scrollbar'>
              {/* Booking Card */}
              <div className='bg-white rounded-lg shadow p-6'>
                <h3 className='text-xl font-bold text-gray-800 mb-4'>Pricing</h3>

                <div className='space-y-4'>
                  <div className='flex justify-between items-center p-3 bg-gray-50 rounded-lg'>
                    <span className='text-gray-600'>Adult Price</span>
                    <span className='font-bold text-primary'>
                      {formatCurrency(adult_price)}/Person
                    </span>
                  </div>
                  <div className='flex justify-between items-center p-3 bg-gray-50 rounded-lg'>
                    <span className='text-gray-600'>Child Price</span>
                    <span className='font-bold text-primary'>
                      {formatCurrency(child_price)}/Person
                    </span>
                  </div>
                </div>
              </div>

              <div className='bg-white rounded-lg shadow p-6'>
                <h3 className='text-xl font-bold text-gray-800 mb-4'>Book This Package</h3>

                <UmrahBookedFrom id={id} slug={slug} />
              </div>

              {/* Package Status */}
              <div className='bg-white rounded-lg shadow p-6'>
                <h3 className='text-xl font-bold text-gray-800 mb-4'>Package Status</h3>
                <div className='flex items-center space-x-2 mb-3'>
                  <div
                    className={`w-3 h-3 rounded-full ${status ? 'bg-green-500' : 'bg-red-500'}`}
                  ></div>
                  <span className={`font-semibold ${status ? 'text-primary' : 'text-red-600'}`}>
                    {status ? `Available (${formatDate(valid_till_date)})` : 'Unavailable'}
                  </span>
                </div>
                <p className='text-sm text-gray-600'>
                  This package is currently{' '}
                  {status ? 'accepting bookings' : 'not available for booking'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
