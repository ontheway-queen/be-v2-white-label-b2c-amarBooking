'use client';

import { renderStarRating } from '@/components/hotel/hotel-location-select';
import ImageGrid from '@/components/image-grid';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency, formatDate } from '@/lib/helper';
import { useSelectedHotel } from '@/lib/redux/slice/hotel/hotel-data-slice';
import { useAppSelector } from '@/lib/redux/store';
import { grnImageBase } from '@/request';
import { IHotelsSearchSchema } from '@/type/hotel/hotel.interface';

import { useSmoothScrollToTop } from '@/hooks/useSmoothScrollToTop';
import { Calendar, CheckCircle, Mail, MapPin, Phone } from 'lucide-react';
import { useEffect } from 'react';
import HotelRoomList from '../_components/room-list/hotel-room-list';

type Props = {
  searchData: IHotelsSearchSchema;
};

const HotelDetails = ({ searchData }: Props) => {
  const { selectedHotel } = useAppSelector(useSelectedHotel);
  const scrollToTop = useSmoothScrollToTop();

  const allImageUrls = [
    `${grnImageBase}${selectedHotel?.images?.main_image}`,
    ...(selectedHotel?.images?.additional_images ?? []).map(
      (img) => `${grnImageBase}${img.image_url}`,
    ),
  ];

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className='container px-0! xl:px-6! min-h-screen mx-auto'>
      <Card className='px-3 py-3 lg:px-5 lg:py-5 '>
        <div className='flex justify-between flex-col lg:flex-row'>
          <div>
            <div className='flex items-center gap-3 mb-2'>
              <h2 className='text-2xl font-bold'>{selectedHotel?.name}</h2>
              <div className='flex items-center'>{renderStarRating(selectedHotel?.category)}</div>
            </div>
            <div className='flex items-center text-muted-foreground mb-2 '>
              <MapPin className='h-4 w-4 mr-2' />
              <p className='text-xs lg:text-base'>{selectedHotel?.contact_details?.address}</p>
            </div>
            <div className='flex flex-col lg:flex-row lg:items-center gap-1.5 lg:gap-4 text-sm text-muted-foreground'>
              <div className='flex items-center'>
                <Phone className='h-4 w-4 mr-1' />
                <span>{selectedHotel?.contact_details?.phone.split(',')[0]}</span>
              </div>
              <div className='flex items-center gap-0.5'>
                <Mail className='h-4 w-4 mr-1' />
                <span>{selectedHotel?.contact_details?.email}</span>
              </div>
            </div>
          </div>
          <div className='text-right'>
            <div className='text-2xl font-bold'>
              {formatCurrency(selectedHotel?.price_details?.price)}
            </div>
            <div className='text-sm text-muted-foreground'>per night</div>
            <Badge variant={selectedHotel?.refundable ? 'default' : 'secondary'} className='mt-2'>
              {selectedHotel?.refundable ? 'Refundable' : 'Non-refundable'}
            </Badge>
          </div>
        </div>

        <ImageGrid imageUrl={allImageUrls} />

        <div>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Image Gallery */}

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Hotel</CardTitle>
              </CardHeader>
              <CardContent className='m-0 px-6'>
                <div className='text-muted-foreground leading-relaxed'>
                  {selectedHotel?.description ? (
                    <p dangerouslySetInnerHTML={{ __html: selectedHotel?.description }}></p>
                  ) : (
                    ''
                  )}
                </div>
              </CardContent>
            </Card>
            {selectedHotel?.refundable ? (
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Calendar className='h-5 w-5' />
                    Cancellation Policy
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-3 px-1.5 lg:px-6'>
                  <div className='space-y-2'>
                    <div className='space-y-2 text-sm'>
                      <div className='font-medium '>Cancellation Fees:</div>
                      {selectedHotel?.cancellation_policy?.details?.map((fee, index) => (
                        <div key={index} className='flex justify-between text-muted-foreground'>
                          <span>From {formatDate(fee.from_date)}:</span>
                          <span>
                            {formatCurrency(fee.fee)} {selectedHotel?.currency}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              ''
            )}
            <Card>
              <CardHeader>
                <CardTitle>Room List</CardTitle>
              </CardHeader>
              <CardContent className='m-0 px-6'>
                <HotelRoomList searchData={searchData} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Facilities & Amenities</CardTitle>
              </CardHeader>
              <CardContent className='px-1.5 lg:px-6'>
                <div className='flex flex-wrap gap-4'>
                  {selectedHotel?.facilities?.split(';')?.map((facility, index) => (
                    <div key={index} className='flex items-center gap-2'>
                      <CheckCircle className='h-4 w-4 text-green-500 flex-shrink-0' />
                      <span className='text-sm text-muted-foreground'>{facility}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HotelDetails;
