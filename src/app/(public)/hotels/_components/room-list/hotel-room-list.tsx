import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  setHotelPage,
  setRoomCheckInfo,
  useSelectedHotel,
} from '@/lib/redux/slice/hotel/hotel-data-slice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { IHotelsSearchSchema } from '@/type/hotel/hotel.interface';

import { formatDate, formatNumber } from '@/lib/helper';
import { formatHotelRoomDetails } from '@/lib/hotel/hotel-formatter-helper';
import { IHotelRoomList } from '@/type/hotel/hotel-room-list.interface';
import { IHotelRecheckBodyRoom } from '@/type/hotel/hotel.rateCheck.interface';
import { AlertCircle, BabyIcon, CheckCheck, Hotel, SlidersHorizontal, User } from 'lucide-react';
import { useState } from 'react';
import { useHotelRoomListQuery } from '../../_api/hotel-endpoint';
import RoomListLoading from './room-list-loading';

type Props = {
  searchData: IHotelsSearchSchema;
};

interface IRoomFilter {
  type: string[];
  status: string[];
}

export interface IHotelRoomListBody {
  hcode: number;
  search_id: string;
}

const HotelRoomList = ({ searchData }: Props) => {
  const dispatch = useAppDispatch();
  const { selectedHotel } = useAppSelector(useSelectedHotel);

  const body: IHotelRoomListBody = {
    hcode: Number(selectedHotel?.hotel_code),
    search_id: selectedHotel?.search_id as string,
  };

  const { data, isLoading, isError } = useHotelRoomListQuery(body);

  const roomsList = data?.data;

  const [roomFilters, setRoomFilters] = useState<IRoomFilter>({
    type: [],
    status: [],
  });

  const { room_type, rooms, paxDetails } = formatHotelRoomDetails({
    roomDetails: roomsList,
    searchData: searchData,
  });

  const toggleRoomTypeFilter = (type: string) => {
    setRoomFilters((prev) => ({
      ...prev,
      type: prev.type.includes(type)
        ? prev.type.filter((item) => item !== type)
        : [...prev.type, type],
    }));
  };

  const handleStatusFilterChange = (value: string) => {
    setRoomFilters((prev) => ({
      ...prev,
      status: prev.status.includes(value)
        ? prev.status.filter((item) => item !== value)
        : [...prev.status, value],
    }));
  };
  const filterRoomList = () => {
    if (!roomFilters?.type?.length && !roomFilters?.status?.length) {
      return rooms;
    }

    return rooms?.filter((item) => {
      const matchesStatus =
        !roomFilters.status?.length ||
        roomFilters.status.includes(item.refundable ? 'refundable' : 'non_refundable');

      const matchesType =
        !roomFilters.type?.length ||
        item.rooms.some((room) => roomFilters.type.includes(room.room_type));

      return matchesType && matchesStatus;
    });
  };

  const routeDetails = (rec: IHotelRoomList) => {
    const { date } = searchData;

    const rooms_key: IHotelRecheckBodyRoom[] = [
      {
        rate_key: rec.rate_key,
        group_code: rec.group_code,
      },
    ];

    dispatch(
      setRoomCheckInfo({
        from_date: formatDate(date.from) as string,
        to_date: formatDate(date.to) as string,
        rooms: rooms_key,
        search_id: selectedHotel?.search_id as string,
      }),
    );

    dispatch(setHotelPage('hotel-booking'));
  };

  if (isError) {
    return (
      <div className='flex items-center justify-center  px-4 py-8'>
        <Card className='w-full max-w-md text-center shadow-lg'>
          <CardHeader className='gap-4 pb-4'>
            <div className='mx-auto'>
              <AlertCircle className='h-12 w-12 text-red-500' />{' '}
            </div>
            <CardTitle className='text-2xl font-bold text-center'>No Rooms Found</CardTitle>
            <CardDescription className='text-muted-foreground'>
              It looks like we could not find any rooms that match your current search criteria.
            </CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col gap-4 pt-0'>
            <p className='text-sm text-muted-foreground'>
              Please try adjusting your filters, dates, or search terms to broaden your results.
            </p>
            <Button
              onClick={() => dispatch(setHotelPage('hotel-list'))}
              className='w-full mt-4 bg-secondary'
              variant='default'
            >
              Back to Search
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='flex flex-col space-y-3'>
      {/* Room Type Filters */}
      <div className='flex flex-col sm:flex-row sm:items-center gap-2 flex-wrap'>
        <div className='flex items-center gap-1 text-muted-foreground min-w-fit'>
          <SlidersHorizontal className='size-3' />
          <span className='text-sm'>Room type filters ({room_type?.length}): </span>
        </div>
        <div className='flex flex-wrap gap-2'>
          {room_type.map((type, key) => (
            <Badge
              key={key}
              variant={roomFilters?.type?.includes(type) ? 'default' : 'outline'}
              className='cursor-pointer capitalize text-xs sm:text-sm'
              onClick={() => toggleRoomTypeFilter(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
            </Badge>
          ))}
        </div>
      </div>

      {/* Status Filters */}
      <div className='flex flex-col sm:flex-row sm:items-center gap-2 flex-wrap'>
        <div className='flex items-center gap-1 text-muted-foreground min-w-fit'>
          <SlidersHorizontal className='size-3' />
          <span className='text-sm'>Room status filters: </span>
        </div>
        <div className='flex flex-col xs:flex-row gap-2 sm:gap-4'>
          {[
            { label: 'Refundable', value: 'refundable', color: 'green' },
            {
              label: 'Non Refundable',
              value: 'non_refundable',
              color: 'red',
            },
          ].map(({ label, value, color }) => (
            <div key={value} className='flex items-center space-x-2'>
              <Checkbox
                id={value}
                checked={roomFilters.status.includes(value)}
                onCheckedChange={() => handleStatusFilterChange(value)}
              />
              <label
                htmlFor={value}
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                <Badge variant='outline' className={`text-${color}-600 text-xs`}>
                  {label}
                </Badge>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Room List */}
      <div className='w-full'>
        <div className='w-full bg-background rounded-lg'>
          <p className='text-muted-foreground font-semibold mb-1 text-sm sm:text-base'>
            Total {filterRoomList()?.length} rooms available
          </p>
          {isLoading ? (
            <RoomListLoading />
          ) : (
            <>
              {/* Desktop Table View */}
              <div className='hidden lg:block overflow-x-auto'>
                <Table className='w-full border-collapse'>
                  <TableHeader>
                    <TableRow className='bg-primary border-b border divide-x-2 hover:bg-primary'>
                      <TableHead className='px-4 xl:px-6 py-2 text-left text-sm font-semibold text-white'>
                        Room Type
                      </TableHead>
                      <TableHead className='px-4 xl:px-6 py-2 text-left text-sm font-semibold text-white'>
                        Guest
                      </TableHead>
                      <TableHead className='px-4 xl:px-6 py-2 text-left text-sm font-semibold text-white'>
                        Price
                      </TableHead>
                      <TableHead className='px-4 xl:px-6 py-2 text-right text-sm font-semibold text-white'>
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filterRoomList()?.map((rec, index) => (
                      <TableRow
                        key={index}
                        className={`border-b border ${
                          index % 2 === 0 ? 'bg-background' : 'bg-muted'
                        }`}
                      >
                        <TableCell className='px-4 xl:px-6 py-4 text-sm'>
                          {rec.rooms.map((room, idx) => (
                            <div key={idx} className={idx > 0 ? 'mt-4' : ''}>
                              <p className='text-muted-foreground text-xs'>Room #{idx + 1}</p>
                              <h3 className='text-primary font-medium'>{room.description}</h3>
                              <div className='flex gap-4 text-sm mt-1'>
                                <span className='text-muted-foreground'>
                                  <span className='font-medium'>Adults:</span> {room.no_of_adults}
                                </span>
                                <span className='text-muted-foreground'>
                                  <span className='font-medium'>Children:</span>{' '}
                                  {room.no_of_children}
                                </span>
                              </div>
                            </div>
                          ))}

                          {rec?.boarding_details && rec?.boarding_details.length > 0 && (
                            <>
                              <div className='border-t my-3'></div>
                              <div className='flex flex-wrap gap-2'>
                                {rec?.boarding_details?.map((item, idx) => (
                                  <span
                                    key={idx}
                                    className='px-2 py-1 rounded-full bg-primary text-white text-xs font-medium'
                                  >
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </>
                          )}
                        </TableCell>
                        <TableCell className='px-4 xl:px-6 py-4 text-sm'>
                          <div className='space-y-1'>
                            <div className='flex items-center gap-2'>
                              <Hotel className='size-4 text-muted-foreground' />
                              <span className='text-muted-foreground'>
                                Rooms: <span className='font-medium'>{paxDetails.rooms}</span>
                              </span>
                            </div>
                            <div className='flex items-center gap-2'>
                              <User className='size-4 text-muted-foreground' />
                              <span className='text-muted-foreground'>
                                Adults:{' '}
                                <span className='font-medium'>{paxDetails.total_adults}</span>
                              </span>
                            </div>
                            <div className='flex items-center gap-2'>
                              <User className='size-4 text-muted-foreground' />
                              <span className='text-muted-foreground'>
                                Children:{' '}
                                <span className='font-medium'>{paxDetails.total_children}</span>
                              </span>
                            </div>
                            <div className='flex items-center gap-2'>
                              <BabyIcon className='size-4 text-muted-foreground' />
                              <span className='text-muted-foreground'>
                                Infants:{' '}
                                <span className='font-medium'>{paxDetails.total_infants}</span>
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className='px-4 xl:px-6 py-4 text-sm'>
                          <div className='space-y-1'>
                            <div className='flex justify-between'>
                              <span className='text-muted-foreground'>Price:</span>
                              <span className='font-medium'>
                                {rec.currency} {formatNumber(rec.price_details.price)}
                              </span>
                            </div>
                            <div className='flex justify-between'>
                              <span className='text-muted-foreground'>Tax:</span>
                              <span className='font-medium'>
                                {rec.currency} {formatNumber(rec.price_details.tax)}
                              </span>
                            </div>
                            <div className='pt-2 mt-2 border-t flex justify-end'>
                              <span className='font-bold text-primary'>
                                {rec.currency} {formatNumber(rec.price_details.total_price)}
                              </span>
                            </div>
                            <div className='mt-2'>
                              {rec.refundable ? (
                                <Badge className='bg-green-600 rounded-full text-xs'>
                                  Refundable
                                </Badge>
                              ) : (
                                <Badge className='bg-red-600 rounded-full text-xs'>
                                  Non-refundable
                                </Badge>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className='px-4 xl:px-6 py-4 text-right'>
                          <Button onClick={() => routeDetails(rec)} size='sm'>
                            <CheckCheck className='size-4' />
                            <span className='ml-1'>Select</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Card View */}
              <div className='lg:hidden space-y-4'>
                {filterRoomList()?.map((rec, index) => (
                  <div key={index} className='bg-white border rounded-lg p-4 shadow-sm'>
                    {/* Room Details */}
                    <div className='space-y-3'>
                      {rec.rooms.map((room, idx) => (
                        <div key={idx} className={idx > 0 ? 'border-t pt-3' : ''}>
                          <p className='text-muted-foreground text-xs mb-1'>Room #{idx + 1}</p>
                          <h3 className='text-primary font-medium text-sm sm:text-base mb-2'>
                            {room.description}
                          </h3>
                          <div className='grid grid-cols-2 gap-2 text-xs sm:text-sm'>
                            <span className='text-muted-foreground'>
                              <span className='font-medium'>Adults:</span> {room.no_of_adults}
                            </span>
                            <span className='text-muted-foreground'>
                              <span className='font-medium'>Children:</span> {room.no_of_children}
                            </span>
                          </div>
                        </div>
                      ))}

                      {rec?.boarding_details && rec?.boarding_details.length > 0 && (
                        <div className='border-t pt-3'>
                          <div className='flex flex-wrap gap-1'>
                            {rec?.boarding_details?.map((item, idx) => (
                              <span
                                key={idx}
                                className='px-2 py-1 rounded-full bg-primary text-white text-xs font-medium'
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Guest Information */}
                    <div className='mt-4 pt-4 border-t'>
                      <h4 className='text-sm font-medium mb-2 text-muted-foreground'>
                        Guest Details
                      </h4>
                      <div className='grid grid-cols-2 gap-2 text-xs sm:text-sm'>
                        <div className='flex items-center gap-1'>
                          <Hotel className='size-3 text-muted-foreground' />
                          <span className='text-muted-foreground'>
                            Rooms: <span className='font-medium'>{paxDetails.rooms}</span>
                          </span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <User className='size-3 text-muted-foreground' />
                          <span className='text-muted-foreground'>
                            Adults: <span className='font-medium'>{paxDetails.total_adults}</span>
                          </span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <User className='size-3 text-muted-foreground' />
                          <span className='text-muted-foreground'>
                            Children:{' '}
                            <span className='font-medium'>{paxDetails.total_children}</span>
                          </span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <BabyIcon className='size-3 text-muted-foreground' />
                          <span className='text-muted-foreground'>
                            Infants: <span className='font-medium'>{paxDetails.total_infants}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Price and Action */}
                    <div className='mt-4 pt-4 border-t'>
                      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3'>
                        <div className='space-y-1 flex-1'>
                          <div className='flex justify-between text-xs sm:text-sm'>
                            <span className='text-muted-foreground'>Price:</span>
                            <span className='font-medium'>
                              {rec.currency} {formatNumber(rec.price_details.price)}
                            </span>
                          </div>
                          <div className='flex justify-between text-xs sm:text-sm'>
                            <span className='text-muted-foreground'>Tax:</span>
                            <span className='font-medium'>
                              {rec.currency} {formatNumber(rec.price_details.tax)}
                            </span>
                          </div>
                          <div className='flex justify-between font-bold text-primary border-t pt-1'>
                            <span>Total:</span>
                            <span>
                              {rec.currency} {formatNumber(rec.price_details.total_price)}
                            </span>
                          </div>
                          <div className='mt-2'>
                            {rec.refundable ? (
                              <Badge className='bg-green-600 rounded-full text-xs'>
                                Refundable
                              </Badge>
                            ) : (
                              <Badge className='bg-red-600 rounded-full text-xs'>
                                Non-refundable
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className='flex-shrink-0'>
                          <Button
                            onClick={() => routeDetails(rec)}
                            className='w-full sm:w-auto'
                            size='sm'
                          >
                            <CheckCheck className='size-4' />
                            <span className='ml-1'>Select</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelRoomList;
