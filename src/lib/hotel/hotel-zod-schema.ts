import { z } from 'zod';

export const HotelListSchema = z.object({
  id: z.number(),
  name: z.string(),
  code: z.number(),
  type: z.enum(['Hotel', 'City']),
  city_code: z.number(),
  country_code: z.string(),
  star_category: z.number().optional(),
  country_name: z.string(),
  city_name: z.string(),
});

export const RoomSchema = z
  .object({
    adults: z.number().min(1, 'At least 1 adult'),
    children: z.number().min(0),
    infants: z.number().min(0),
    children_ages: z.array(z.number().min(2).max(17)).optional(),
  })
  .refine(
    (data) => {
      if (data.children > 0) {
        return data.children_ages?.length === data.children;
      }
      return true;
    },
    {
      message: 'All children ages must be specified',
      path: ['children_ages'],
    },
  );

export const hotelSearchSchema = z.object({
  location: HotelListSchema,
  date: z.object({
    from: z
      .date({ message: 'Check-out date is required' })
      .or(z.string({ message: 'Check-out date is required' })),
    to: z
      .date({ message: 'Check-in date is required' })
      .or(z.string({ message: 'Check-in date is required' })),
  }),
  rooms: z.array(RoomSchema).min(1),
});
