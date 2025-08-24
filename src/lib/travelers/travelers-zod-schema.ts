import { differenceInMonths, differenceInYears } from 'date-fns';
import z from 'zod';

export const travelerSchema = z
  .object({
    reference: z.enum(['Mr', 'Mrs', 'Miss', 'MSTR'], { message: 'Required' }),
    type: z.enum(['INF', 'ADT', 'C11', 'C04']),
    first_name: z.string().min(1, 'First name is required'),
    last_name: z.string().min(1, 'Last name is required'),
    contact_email: z.string().email('Invalid email format'),
    contact_number: z
      .string()
      .min(10, 'Must be at least 10 digits')
      .max(12, 'Must be at most 12 digits')
      .regex(/^\d+$/, 'Must contain only digits'),
    issuing_country: z.number(),
    nationality: z.number(),
    date_of_birth: z.date(),
    gender: z.enum(['Male', 'Female']),
    frequent_flyer_number: z.string().optional().nullable(),
    frequent_flyer_airline: z.string().optional().nullable(),
    passport_number: z.string().optional().nullable(),
    passport_expiry_date: z.date().optional().nullable(),
    passport_file: z
      .array(
        z.object({
          image: z.string().optional().nullable(),
          file: z.any().optional().nullable(),
        }),
      )
      .max(1, 'You can upload up to 1 images')
      .optional()
      .nullable(),
    visa_file: z
      .array(
        z.object({
          image: z.string().optional().nullable(),
          file: z.any().optional().nullable(),
        }),
      )
      .max(1, 'You can upload up to 1 images')
      .optional()
      .nullable(),
  })
  .superRefine((data, ctx) => {
    const adultOptions = ['Mr', 'Mrs'];
    const childOptions = ['Miss', 'MSTR'];

    // Reference validation
    if (data.type === 'ADT' && !adultOptions.includes(data.reference)) {
      ctx.addIssue({
        path: ['reference'],
        code: z.ZodIssueCode.custom,
        message: `Required`,
      });
    }

    if (['INF', 'C11', 'C04'].includes(data.type) && !childOptions.includes(data.reference)) {
      ctx.addIssue({
        path: ['reference'],
        code: z.ZodIssueCode.custom,
        message: `Required`,
      });
    }

    // DOB Age validation
    const age = differenceInYears(new Date(), data.date_of_birth);
    const birthDate = new Date(data.date_of_birth);
    const today = new Date();
    const ageInMonths = differenceInMonths(today, birthDate);

    if (data.type === 'ADT') {
      // 12 years or older
      if (ageInMonths < 12 * 12) {
        ctx.addIssue({
          path: ['date_of_birth'],
          code: z.ZodIssueCode.custom,
          message: 'Adult must be 12 years or older.',
        });
      }
    } else if (data.type === 'INF') {
      // 0 to 23 months
      if (ageInMonths < 0 || ageInMonths >= 24) {
        ctx.addIssue({
          path: ['date_of_birth'],
          code: z.ZodIssueCode.custom,
          message: 'Infant must be between 0 and 23 months.',
        });
      }
    } else {
      switch (data.type) {
        case 'C11':
          // Between 4 years (48m) and 11 years (132m)
          if (ageInMonths < 48 || ageInMonths >= 132) {
            ctx.addIssue({
              path: ['date_of_birth'],
              code: z.ZodIssueCode.custom,
              message: 'Child must be between 4 and 11 years.',
            });
          }
          break;

        case 'C04':
          // More than 2 years (24m) up to 4 years (48m)
          if (ageInMonths <= 24 || ageInMonths > 48) {
            ctx.addIssue({
              path: ['date_of_birth'],
              code: z.ZodIssueCode.custom,
              message: 'Kids must be 2 years and up to 4 years.',
            });
          }
          break;

        // 🔹 You can extend the same pattern for C02, C03, C05..C10
        default:
          break;
      }
    }
  });
