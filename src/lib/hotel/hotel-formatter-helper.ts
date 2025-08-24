import { IHotelBookingForm } from '@/app/(public)/hotels/_components/room-booking/hotel-booking-form';
import { IHotelRoomList } from '@/type/hotel/hotel-room-list.interface';
import { IHotelSearchParams, IHotelsSearchSchema, Room } from '@/type/hotel/hotel.interface';
import { IHotelReCheckData } from '@/type/hotel/hotel.rateCheck.interface';
import { HOTEL_NATIONALITY } from '../CONSTANT';
import { formatDate } from '../helper';

export const encodedHotelParams = (data: IHotelsSearchSchema) => {
  const { date, location: locationData, rooms: roomData } = data;

  const check_in = formatDate(date.from);
  const check_out = formatDate(date.to);
  const rooms = encodeURIComponent(JSON.stringify(roomData));
  const location = encodeURIComponent(JSON.stringify(locationData));

  const query = `check_in=${check_in}&check_out=${check_out}&rooms=${rooms}&location=${location}`;

  return query;
};

export const decodedHotelParams = (data: IHotelSearchParams): IHotelsSearchSchema => {
  const { check_in, check_out, location, rooms } = data;

  return {
    date: { from: new Date(check_in), to: new Date(check_out) },
    rooms: JSON.parse(decodeURIComponent(rooms as any)),
    location: JSON.parse(decodeURIComponent(location as any)),
  };
};

export const getTotalHotelGuestAndRoom = (searchData: IHotelsSearchSchema) => {
  const paxDetails = searchData.rooms?.reduce(
    (acc, curr) => {
      acc.total_adults += curr.adults;
      acc.total_children += curr.children;
      acc.total_infants += curr.infants;
      return acc;
    },
    { totalRooms: searchData.rooms.length, total_adults: 0, total_children: 0, total_infants: 0 },
  );

  return paxDetails;
};

interface IProps {
  roomDetails?: IHotelRoomList[];
  searchData: IHotelsSearchSchema;
}

export const formatHotelRoomDetails = ({ roomDetails, searchData }: IProps) => {
  const numberOfRoom = searchData.rooms.length;

  const matchWithRoom = roomDetails?.filter((item) => item.no_of_rooms === numberOfRoom);
  const roomTypes = [
    ...new Set(matchWithRoom?.flatMap((room) => room.rooms.map((item) => item.room_type)) || []),
  ];

  const paxDetails = searchData.rooms?.reduce(
    (acc, curr) => {
      acc.total_adults += curr.adults;
      acc.total_children += curr.children;
      acc.total_infants += curr.infants;
      return acc;
    },
    {
      rooms: searchData.rooms.length,
      total_adults: 0,
      total_children: 0,
      total_infants: 0,
    },
  );

  return { rooms: matchWithRoom, room_type: roomTypes, paxDetails };
};

export const formattedFormData = (data?: IHotelReCheckData): IHotelBookingForm | undefined => {
  const createPaxes = (count: number, type: 'AD' | 'CH', title: string) =>
    Array.from({ length: count }, () => ({
      title,
      name: '',
      surname: '',
      type,
    }));

  if (!data) return undefined;

  return {
    roomsData: data?.rates?.map((rate) => ({
      room_code: rate.room_code,
      rate_key: rate.rate_key,
      rooms: rate.rooms.map((room) => ({
        room_reference: room.room_reference,
        paxes: [
          ...createPaxes(room.no_of_adults, 'AD', 'Mr.'),
          ...createPaxes(room.no_of_children, 'CH', 'Mstr.'),
        ],
      })),
    })),
    client_nationality: HOTEL_NATIONALITY,
    email: '',
    phone_number: '',
    booking_comments: '',
  };
};

export function calculateTotalsPaxAndRooms(rooms?: Room[]) {
  let totalRooms = 0;
  let totalPax = 0;

  rooms?.forEach((room) => {
    const adults = room.no_of_adults ?? 0;
    const children = room.no_of_children ?? 0;
    const roomsCount = room.no_of_rooms ?? 0;

    totalRooms += roomsCount;
    totalPax += (adults + children) * roomsCount;
  });

  return { total_rooms: totalRooms, total_pax: totalPax };
}
