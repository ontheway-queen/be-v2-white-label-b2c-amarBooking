import { z } from 'zod';

export const visaCountrySchema = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
});

export const visaSearchSchema = z.object({
  country: visaCountrySchema.optional(),
  traveler: z.union([z.string(), z.number()]).optional(),
  visa_type_id: z.number().optional(),
});
