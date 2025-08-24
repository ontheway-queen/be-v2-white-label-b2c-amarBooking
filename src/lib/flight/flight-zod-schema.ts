import { z } from 'zod';

// FLIGHT SEARCH BAR -----------------------------------------------------------------------------------------------------

export const AirportSchema = z.object({
  id: z.number().optional(),
  country_id: z.number().optional(),
  country: z.string().optional(),
  name: z.string(),
  iata_code: z.string(),
  city_id: z.number().optional(),
  city_name: z.string().optional(),
});

export const IFlightPaxSchema = z.object({
  adults: z.number().min(1, { message: 'At least one adult is required' }),
  child: z.number().min(0),
  infant: z.number().min(0),
  kids: z.number().min(0),
});

export const MultiCityTripSchema = z.object({
  from: AirportSchema.optional(),
  to: AirportSchema.optional(),
  departure: z.date().or(z.string()).optional(),
});

export const tripTypeSchema = z.enum(['One-way', 'Round-trip', 'Multi-city']);
export const classSchema = z.enum(['economy', 'business', 'first']);

export const FlightFormSchema = z
  .object({
    tripType: tripTypeSchema,
    passenger: IFlightPaxSchema,
    class: classSchema,
    from: AirportSchema,
    to: AirportSchema,
    departure: z.date().or(z.string()),
    return: z.date().or(z.string()).optional(),
    multiCityTrips: z.array(MultiCityTripSchema),
  })
  .superRefine((data, ctx) => {
    if (data.tripType === 'Multi-city') {
      data.multiCityTrips.forEach((trip, index) => {
        if (!trip.from) {
          ctx.addIssue({
            path: ['multiCityTrips', index, 'from'],
            code: z.ZodIssueCode.custom,
            message: 'From airport is required',
          });
        }
        if (!trip.to) {
          ctx.addIssue({
            path: ['multiCityTrips', index, 'to'],
            code: z.ZodIssueCode.custom,
            message: 'To airport is required',
          });
        }
        if (!trip.departure) {
          ctx.addIssue({
            path: ['multiCityTrips', index, 'departure'],
            code: z.ZodIssueCode.custom,
            message: 'Departure date is required',
          });
        }
      });
    } else if (data.tripType === 'Round-trip') {
      if (!data.return) {
        ctx.addIssue({
          path: ['return'],
          code: z.ZodIssueCode.custom,
          message: 'Return date is required',
        });
      }
    }
  });
