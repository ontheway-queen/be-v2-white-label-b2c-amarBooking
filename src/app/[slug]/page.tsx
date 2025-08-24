import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card, CardTitle } from '@/components/ui/card';
import { API_ENDPOINTS } from '@/lib/APIs/endpoint-list';
import { fetchRequest } from '@/lib/APIs/fetchApis';
import { formatCurrency } from '@/lib/helper';
import { imageHostLink } from '@/request';
import { ITourDetails } from '@/type/holiday/holiday.interface';
import {
  CalendarX,
  Check,
  CheckSquare2,
  Clock,
  Globe,
  Package,
  Percent,
  Tags,
  X,
} from 'lucide-react';
import Link from 'next/link';
import HolidayBookingForm from '../(public)/(holiday)/_components/details/holiday-booking-form';
import HolidayImages from '../(public)/(holiday)/_components/details/holiday-images';

type Props = {
  params: Promise<{ slug: string }>;
};

const page = async ({ params }: Props) => {
  const { slug } = await params;

  const res = await fetchRequest<ITourDetails>(
    `${API_ENDPOINTS.HOLIDAY_DETAILS}/${decodeURIComponent(slug)}`,
  );

  const data = res.data;

  return (
    <div className='bg-muted min-h-screen py-5'>
      <div className='container'>
        <HolidayImages imageUrl={data?.images.map((item) => `${imageHostLink}/${item.image}`)} />
        <div className='font-roboto py-3'>
          <h1 className='mb-1 text-2xl font-semibold'>{data?.title}</h1>
          <div className='flex gap-2'>
            {data?.cities.map((item, index) => (
              <div key={index}>
                <Badge className='bg-primary/20 text-primary border border-primary rounded-full'>
                  {item.city_name}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-col lg:flex-row gap-3 mt-2 '>
          {/* Left Content */}
          <Card className='bg-background p-0 rounded shadow-none border-none flex-[3] gap-0'>
            <CardTitle className='flex gap-5 border-b pb-4  p-3 max-w-fit md:max-w-full overflow-y-auto'>
              <Link href={'#details'} className='text-primary'>
                Details
              </Link>
              <Link href={'#itinerary'} className='text-primary'>
                Itinerary
              </Link>
              <Link href={'#services'} className='text-primary'>
                Services
              </Link>
              <Link href={'#condition'} className='text-primary'>
                Condition
              </Link>
              <Link href={'#tax'} className='text-primary'>
                Tax
              </Link>
              <Link href={'#cancellation'} className='text-primary'>
                Cancellation
              </Link>
            </CardTitle>

            <div className='p-3'>
              <Accordion type='multiple' className='w-full ' defaultValue={['details', 'price']}>
                {/* Price Details */}
                {data?.details && (
                  <AccordionItem value='price' id='price'>
                    <AccordionTrigger className='text-lg font-semibold font-roboto text-gray-800'>
                      <div className='flex items-center gap-2'>
                        <Tags className='size-5' />
                        Details
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className='text-sm space-y-1 px-3 mt-3'>
                        <p className='flex justify-between'>
                          <span className='font-medium '>Duration:</span>
                          <span className='font-semibold font-sans'>{data?.duration} Days</span>
                        </p>
                        <p className='flex justify-between'>
                          <span className='font-medium '>Tour Group:</span>
                          <span className='font-semibold font-sans '>
                            {data?.group_size} Person
                          </span>
                        </p>
                      </div>

                      <div className='space-y-3 text-sm px-3 pb-5  mt-3'>
                        {data?.pricing?.map((item, index) => (
                          <div key={index} className='pt-2 border-t border-gray-100 space-y-1'>
                            <p className='flex justify-between'>
                              <span>Adult:</span>
                              <span className='font-semibold font-sans'>
                                {formatCurrency(item.adult_price)} /person
                              </span>
                            </p>
                            <p className='flex justify-between'>
                              <span>Children:</span>
                              <span className='font-semibold font-sans'>
                                {formatCurrency(item.child_price)} /person
                              </span>
                            </p>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {/* Tour Details */}
                {data?.details && (
                  <AccordionItem value='details' id='details'>
                    <AccordionTrigger className='text-lg font-semibold font-roboto text-gray-800'>
                      <div className='flex items-center gap-2'>
                        <Globe className='size-5' />
                        Overview
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div
                        className='prose max-w-none text-gray-700'
                        dangerouslySetInnerHTML={{ __html: data.details }}
                      />
                    </AccordionContent>
                  </AccordionItem>
                )}

                {/* General Conditions */}
                {data?.general_condition && (
                  <AccordionItem value='general_conditions' id='condition'>
                    <AccordionTrigger className='text-lg font-semibold font-roboto text-gray-800'>
                      <div className='flex items-center gap-2'>
                        <CheckSquare2 className='size-5' />
                        General Conditions
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div
                        className='prose max-w-none text-gray-700'
                        dangerouslySetInnerHTML={{ __html: data.general_condition }}
                      />
                    </AccordionContent>
                  </AccordionItem>
                )}

                {/* Tour Itinerary */}
                {data?.itinerary?.length && (
                  <AccordionItem value='itinerary' id='itinerary'>
                    <AccordionTrigger className='text-lg font-semibold font-roboto text-gray-800'>
                      <div className='flex items-center gap-2'>
                        <Clock className='size-5' />
                        Tour Itinerary
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className='space-y-6'>
                        {data.itinerary.map((item, index) => (
                          <div key={index} className='border rounded px-5 py-3 shadow'>
                            <div className='flex items-center gap-2 mb-3'>
                              <div className='bg-primary text-white h-6 w-6 rounded-full flex items-center justify-center font-bold'>
                                {item.day_number}
                              </div>
                              <h3 className='text-lg font-semibold'>{item.title}</h3>
                            </div>
                            <div
                              className='prose max-w-none text-gray-700'
                              dangerouslySetInnerHTML={{ __html: item.details }}
                            />
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {/* Inclusions & Exclusions */}
                {data?.services?.length && (
                  <AccordionItem value='services' id='services'>
                    <AccordionTrigger className='text-lg font-semibold font-roboto text-gray-800'>
                      <div className='flex items-center gap-2'>
                        <Package className='size-5' />
                        Inclusions & Exclusions
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className='grid md:grid-cols-2 gap-4'>
                        {/* Included */}
                        <div className='bg-green-50 px-5 py-3 rounded shadow border border-green-200'>
                          <h3 className='text-md font-semibold text-green-700 mb-2'>
                            {"What's Included"}
                          </h3>
                          <ul className='space-y-3 text-sm'>
                            {data.services
                              .filter((service) => service.type === 'INCLUDE')
                              .map((service, i) => (
                                <li key={i} className='flex items-start gap-2'>
                                  <Check size={18} className='text-green-500 mt-1' />
                                  <span>{service.title}</span>
                                </li>
                              ))}
                          </ul>
                        </div>

                        {/* Not Included */}
                        <div className='bg-red-50 px-5 py-3 rounded shadow border border-red-200'>
                          <h3 className='text-md font-semibold text-red-700 mb-2'>
                            {"What's Not Included"}
                          </h3>
                          <ul className='space-y-3 text-sm'>
                            {data.services
                              .filter((service) => service.type === 'EXCLUDE')
                              .map((service, i) => (
                                <li key={i} className='flex items-start gap-2'>
                                  <X size={18} className='text-red-500 mt-1' />
                                  <span>{service.title}</span>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {/* Tax Details */}
                {data?.tax_details && (
                  <AccordionItem value='tax_details' id='tax'>
                    <AccordionTrigger className='text-lg font-semibold font-roboto text-gray-800'>
                      <div className='flex items-center gap-2'>
                        <Percent className='size-5' />
                        Tax Details
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div
                        className='prose max-w-none text-gray-700'
                        dangerouslySetInnerHTML={{ __html: data.tax_details }}
                      />
                    </AccordionContent>
                  </AccordionItem>
                )}

                {/* Cancellation Policy */}
                {data?.cancellation_policy && (
                  <AccordionItem value='cancellation_policy' id='cancellation'>
                    <AccordionTrigger className='text-lg font-semibold font-roboto text-gray-800'>
                      <div className='flex items-center gap-2'>
                        <CalendarX className='size-5' />
                        Cancellation Policy
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div
                        className='prose max-w-none text-gray-700'
                        dangerouslySetInnerHTML={{ __html: data.cancellation_policy }}
                      />
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            </div>
          </Card>
          {/* Right Sidebar */}
          <aside className='flex-[1] bg-white rounded h-fit sticky top-2 text-gray-700'>
            <div>
              <h3 className='text-primary border-b font-semibold pb-1 p-3'>Booked Now</h3>
            </div>

            <HolidayBookingForm holiday_package_id={data?.id} />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default page;
