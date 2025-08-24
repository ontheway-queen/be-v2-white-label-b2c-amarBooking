import { IHotelsSearchSchema } from '@/type/hotel/hotel.interface';
import { IPopularPlace } from '@/type/site.config.interface';
import { getImageLink } from '../helper';

export const formatTopDestination = (
  result: IPopularPlace[] | undefined,
): IFormatDestinationList => {
  const data = result?.map((item, index) => ({
    id: index,
    title: item.country_name.toLowerCase()?.replace(/\b\w/g, (char) => char.toUpperCase()),
    description: item.short_description,
    img: getImageLink(item.thumbnail),
    hotel: {
      location: {
        id: item.id,
        name: item.location_name,
        code: item.location_id,
        star_category: 0,
        type: item.location_type,
        city_code: 0,
        city_name: item.location_name,
        country_code: '',
        country_name: item.country_name,
      },
      date: {
        from: new Date(new Date().setDate(new Date().getDate() + 12)).toISOString(),
        to: new Date(new Date().setDate(new Date().getDate() + 20)).toISOString(),
      },
      rooms: [
        {
          adults: 2,
          children: 0,
          infants: 0,
          children_ages: [],
        },
      ],
    },
  }));

  return data;
};

interface IFormatDestination {
  id: number;
  title: string;
  description: string;
  img: any;
  hotel: IHotelsSearchSchema;
}

export type IFormatDestinationList = IFormatDestination[] | undefined;
