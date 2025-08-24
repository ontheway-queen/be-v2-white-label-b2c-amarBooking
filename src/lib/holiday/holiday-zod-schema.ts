import { z } from 'zod';

export const holidayCityListSchema = z.object({
  city_id: z.number({ message: 'City is required' }),
  city: z.string().optional(),
  country_name: z.string().optional(),
});

export const holidaySearchSchema = z.object({
  city: holidayCityListSchema,
});
