import { renderStarRating } from '@/components/hotel/hotel-location-select';
import SimpleCarousel from '@/components/simple-carousel';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { setHotelPage, setSelectHotel } from '@/lib/redux/slice/hotel/hotel-data-slice';
import { setExpanded } from '@/lib/redux/slice/ModifySearchState';
import { useAppDispatch } from '@/lib/redux/store';
import { IHotelsSearchSchema } from '@/type/hotel/hotel.interface';
import { IHotelList } from '@/type/hotel/hotel.search.interface';
import { ChevronsRight, HandPlatter, MapPinCheck } from 'lucide-react';
import { memo } from 'react';

type Props = {
  hotel: IHotelList;
  searchData: IHotelsSearchSchema;
  no_of_night: number | undefined;
};

const HotelListCard = memo(({ hotel, no_of_night }: Props) => {
  const dispatch = useAppDispatch();

  const facilities =
    hotel?.facilities
      ?.split(';')
      ?.map((f) => f.trim())
      .filter(Boolean) || [];

  const extraFacilities = facilities?.slice(0, 5);
  const showFacilities = facilities.length > 1;

  return (
    <Card className='w-full p-0 mb-4 rounded-lg shadow overflow-hidden'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-0'>
        {/* Hotel Image */}
        <div className='w-full '>
          <SimpleCarousel
            height='100%'
            minHeight='230px'
            data={hotel?.images.additional_images.map(({ image_url, image_caption }) => ({
              url: image_url,
              title: image_caption as string,
              description: '',
            }))}
          />
        </div>

        {/* Hotel Info */}
        <div className='w-full px-4 py-3 flex flex-col justify-between'>
          <div>
            <h2 className='text-lg font-semibold'>{hotel.name}</h2>
            <div className='flex items-center gap-2 mt-1'>
              <div className='flex'>{renderStarRating(hotel.category, 'size-[15px]')}</div>
              <span className='text-xs text-muted-foreground font-semibold'>
                ({hotel.category} Star)
              </span>
            </div>

            <div className='mt-2 text-primary leading-tight'>
              <MapPinCheck className='inline size-3 mr-1' />
              <span className='text-xs'>
                {hotel.contact_details.address} - {hotel.contact_details.country}
              </span>
            </div>

            {/* Meal Plan */}
            <div className='flex flex-wrap gap-2 items-center mt-4'>
              <div className='text-xs font-medium flex items-center gap-1'>
                <HandPlatter className='inline size-3' />
                <span>Meal Plan:</span>
              </div>
              <div className='flex flex-wrap gap-1'>
                {hotel.details?.boarding_details?.map((item, index) => (
                  <Badge
                    key={index}
                    variant='default'
                    className='bg-primary text-[10px] py-0.5 px-1'
                  >
                    {item.trim()}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Facilities */}
            <div className='mt-4'>
              {showFacilities ? (
                <div className='flex flex-wrap gap-1'>
                  {extraFacilities.map((item, index) => (
                    <Badge
                      key={index}
                      variant='outline'
                      className='text-[10px] border px-1.5 py-0 text-muted-foreground'
                    >
                      {item}
                    </Badge>
                  ))}
                  {facilities.length > 6 && (
                    <Badge variant='secondary' className='text-[10px] border px-1.5 py-0'>
                      +{facilities.length - 6} more
                    </Badge>
                  )}
                </div>
              ) : (
                <p className='text-xs mt-3 italic'>
                  No facilities or amenities available for this property.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Price and Booking */}
        <div className='w-full bg-primary/10 px-4 py-3 flex flex-col justify-between text-right'>
          <div className='flex lg:flex-col items-end justify-between'>
            <div>
              <Badge
                className={`${
                  hotel.refundable
                    ? 'border-green-600 text-green-600'
                    : 'border-red-600 text-red-600'
                } bg-transparent`}
              >
                {hotel.refundable ? 'Refundable' : 'Non-Refundable'}
              </Badge>

              {hotel.refundable && (
                <p
                  className={`text-xs mt-3 ${
                    hotel.cancellation_policy?.free_cancellation ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {hotel.cancellation_policy?.free_cancellation
                    ? 'Free Cancellation'
                    : 'Partial Cancellation'}
                </p>
              )}

              <p className='text-xs mt-2 text-muted-foreground'>
                for {no_of_night} Nights, per room
              </p>
            </div>
            <div>
              <p className='mt-2 font-bold text-xl'>
                <span className='text-primary'>{hotel.currency || 'N/A'}</span>{' '}
                {Number(hotel.price_details?.total_price).toLocaleString()}
              </p>

              <p className='text-xs mt-1 text-muted-foreground'>Price per night </p>
            </div>
          </div>

          <Button
            onClick={() => {
              dispatch(setSelectHotel(hotel));
              dispatch(setHotelPage('hotel-details'));
              dispatch(setExpanded(false));
            }}
            className='mt-4 w-full sm:w-[150px] ml-auto'
          >
            See availability <ChevronsRight />
          </Button>
        </div>
      </div>
    </Card>
  );
});

HotelListCard.displayName = 'HotelListCard';
export default HotelListCard;
