import HotelSearchError from '@/components/hotel/hotel-search-error';
import LoginWarning from '@/components/login-warning';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSmoothScrollToTop } from '@/hooks/useSmoothScrollToTop';
import { formatCurrency, formatDate } from '@/lib/helper';
import { formattedFormData } from '@/lib/hotel/hotel-formatter-helper';
import { setHotelPage, useSelectedHotel } from '@/lib/redux/slice/hotel/hotel-data-slice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { IHotelsSearchSchema } from '@/type/hotel/hotel.interface';
import { Bed, CheckCircle, Clock, CreditCard, Users, XCircle } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useHotelRoomRecheckQuery } from '../_api/hotel-endpoint';
import HotelBookingForm from '../_components/room-booking/hotel-booking-form';
import HotelRateCheckLoading from '../_components/room-booking/hotel-rate-check-loading';

type Props = {
  searchData: IHotelsSearchSchema;
};

const HotelBooking = ({ searchData }: Props) => {
  const dispatch = useAppDispatch();
  const scrollToTop = useSmoothScrollToTop();

  const searchParams = useSearchParams();

  const { status } = useSession();
  const { roomCheckInfo } = useAppSelector(useSelectedHotel);

  const {
    data: response,
    isLoading,
    isError,
    isSuccess,
  } = useHotelRoomRecheckQuery(roomCheckInfo!, {
    skip: !roomCheckInfo,
  });
  const data = response?.data;
  const formData = formattedFormData(data);

  useEffect(() => {
    scrollToTop();
  }, []);

  if (isError)
    return (
      <HotelSearchError
        message='This room is not available right now'
        backLabel='Back to list'
        homeLabel='Search again'
        onBack={() => dispatch(setHotelPage('hotel-details'))}
        onHome={() => dispatch(setHotelPage('hotel-list'))}
      />
    );

  if (isLoading) return <HotelRateCheckLoading />;

  return (
    <div className='min-h-screen container px-0! xl:px-6 mx-auto'>
      <div className='px-2 py-2 space-y-2 rounded-none'>
        <div className='flex gap-5'>
          <div className='w-full mx-auto flex-2'>
            {data?.rates?.map((rate, index) => (
              <Card key={index} className='w-full p-0 '>
                <CardHeader className='bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg py-3'>
                  <div className='flex justify-between items-start'>
                    <div>
                      <CardTitle className='text-xl font-semibold mb-2'>Rate Option</CardTitle>
                      <div className='flex gap-2 flex-wrap'>
                        <Badge
                          variant='secondary'
                          className='bg-white/20 text-white border-white/30'
                        >
                          {rate?.boarding_details.join(', ')}
                        </Badge>
                        <Badge
                          variant='secondary'
                          className='bg-white/20 text-white border-white/30'
                        >
                          <Bed className='w-3 h-3 mr-1' />
                          {rate?.no_of_rooms} Room
                          {rate?.no_of_rooms > 1 ? 's' : ''}
                        </Badge>
                        {rate?.refundable && (
                          <Badge
                            variant='secondary'
                            className='bg-green-500/20 text-white border-green-300/30'
                          >
                            <CheckCircle className='w-3 h-3 mr-1' />
                            Refundable
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className='text-right'>
                      <div className='text-2xl font-bold'>
                        {formatCurrency(rate?.price_details.total_price)}
                      </div>
                      <div className='text-sm opacity-90'>Total Price</div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className='m-0 px-1.5 lg:px-6 pb-5'>
                  <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                    {/* Room Details */}
                    <div className='space-y-4'>
                      <h3 className='font-semibold text-lg border-b pb-2'>Room Details</h3>
                      {rate?.rooms?.map((room, roomIndex) => (
                        <div key={roomIndex} className='bg-muted p-4 rounded-lg'>
                          <div className='font-medium opacity-90'>{room.room_type}</div>
                          <div className='text-sm mt-1'>{room.description}</div>
                          <div className='flex items-center gap-4 mt-2 text-sm'>
                            <div className='flex items-center gap-1'>
                              <Users className='w-4 h-4 text-blue-500' />
                              <span>{room.no_of_adults} Adults</span>
                            </div>
                            {room.no_of_children > 0 && (
                              <div className='flex items-center gap-1'>
                                <Users className='w-4 h-4 text-green-500' />
                                <span>
                                  {room.no_of_children} Children (Ages:{' '}
                                  {room.children_ages.join(', ')})
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Pricing & Payment */}
                    <div className='space-y-4'>
                      <h3 className='font-semibold text-lg border-b pb-2'>Pricing & Payment</h3>
                      <div className='bg-blue-50 p-4 rounded-lg space-y-3 dark:bg-muted'>
                        <div className='flex justify-between'>
                          <span className='opacity-90'>Base Price:</span>
                          <span className='font-medium'>
                            {formatCurrency(rate?.price_details.price)}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='opacity-90'>Tax:</span>
                          <span className='font-medium'>
                            {formatCurrency(rate?.price_details.tax)}
                          </span>
                        </div>
                        <div className='flex justify-between border-t pt-2 font-semibold text-lg'>
                          <span>Total:</span>
                          <span className='text-blue-600'>
                            {formatCurrency(rate?.price_details.total_price)}
                          </span>
                        </div>
                      </div>

                      <div className='space-y-2'>
                        <div className='flex items-center gap-2'>
                          <CreditCard className='w-4 h-4 text-gray-500' />
                          <span className='text-sm'>Payment: {rate?.payment_type.join(', ')}</span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <Clock className='w-4 h-4 text-gray-500' />
                          <span className='text-sm'>
                            Credit Deduction: {rate?.credit_deduction}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Policies & Check-in */}
                    <div className='space-y-4'>
                      <h3 className='font-semibold text-lg border-b pb-2'>Policies & Times</h3>

                      <div className='bg-green-50 p-4 rounded-lg dark:bg-muted'>
                        <h4 className='font-medium opacity-90 mb-2'>Check-in/Check-out</h4>
                        <div className='text-sm space-y-1'>
                          <div>
                            Check-in: {rate?.rate_comments.checkin_begin_time} -{' '}
                            {rate?.rate_comments.checkin_end_time}
                          </div>
                          <div>Check-out: {rate?.rate_comments.checkout_time}</div>
                        </div>
                      </div>

                      <div className='bg-orange-50 p-4 rounded-lg dark:bg-muted'>
                        <h4 className='font-medium opacity-90 mb-2'>Cancellation Policy</h4>
                        <div className='text-sm space-y-2'>
                          {rate?.cancellation_policy?.free_cancellation ? (
                            <Badge variant='secondary' className='bg-green-100 text-green-800'>
                              <CheckCircle className='w-3 h-3 mr-1' />
                              Free Cancellation
                            </Badge>
                          ) : (
                            <Badge variant='secondary' className='bg-orange-100 text-orange-800'>
                              <XCircle className='w-3 h-3 mr-1' />
                              Paid Cancellation
                            </Badge>
                          )}
                          {rate?.cancellation_policy?.details?.map((detail, detailIndex) => (
                            <div key={detailIndex} className='flex justify-between text-xs'>
                              <span>From - {formatDate(detail.from_date)}</span>
                              <span className='font-medium'>{formatCurrency(detail.fee)}</span>
                            </div>
                          ))}
                          <div className='flex justify-between text-xs border-t pt-1'>
                            <span>No-show fee:</span>
                            <span className='font-medium'>
                              {formatCurrency(rate?.cancellation_policy?.no_show_fee)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className='space-y-2'>
                        <div className='flex items-center gap-2'>
                          {rate?.supports_cancellation ? (
                            <CheckCircle className='w-4 h-4 text-green-500' />
                          ) : (
                            <XCircle className='w-4 h-4 text-red-500' />
                          )}
                          <span className='text-sm'>Supports Cancellation</span>
                        </div>
                        <div className='flex items-center gap-2'>
                          {rate?.supports_amendment ? (
                            <CheckCircle className='w-4 h-4 text-green-500' />
                          ) : (
                            <XCircle className='w-4 h-4 text-red-500' />
                          )}
                          <span className='text-sm'>Supports Amendment</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Comments */}
                  {rate?.rate_comments.comments && (
                    <div className='mt-6 p-4 mb-1.5 lg:mb-6 bg-muted rounded-lg dark:bg-muted'>
                      <h4 className='font-medium mb-2'>Additional Information</h4>

                      <div
                        className='prose '
                        dangerouslySetInnerHTML={{
                          __html: rate?.rate_comments.comments,
                        }}
                      />
                      {rate?.rate_comments.pax_comments && (
                        <p className='text-sm font-semibold mt-2 italic text-destructive'>
                          {rate?.rate_comments.pax_comments}
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {status !== 'authenticated' ? (
          <LoginWarning redirect={`hotels/search?${searchParams.toString()}`} />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className='text-lg font-semibold'>Passenger Information</CardTitle>
            </CardHeader>

            <CardContent className='m-0 px-1.5 lg:px-6'>
              {formData?.roomsData.length ? (
                <HotelBookingForm
                  formData={formData}
                  searchData={searchData}
                  city_code={data?.contact_details.city_code}
                  group_code={data?.rates?.[0]?.group_code}
                />
              ) : undefined}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default HotelBooking;
