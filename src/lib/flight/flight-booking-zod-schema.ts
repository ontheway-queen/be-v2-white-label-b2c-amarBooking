import { differenceInMonths } from 'date-fns';
import { z } from 'zod';

export const PaxBookingSchema = z.enum([
  'ADT',
  'INF',
  'C02',
  'C03',
  'C04',
  'C05',
  'C06',
  'C07',
  'C08',
  'C09',
  'C10',
  'C11',
]);

// Passenger schema
export const flightBookingPassengerSchema = (domestic: boolean = true) =>
  z.object({
    key: z.number(),
    type: PaxBookingSchema,
    reference: z.string().nonempty('Reference is required'),
    first_name: z.string().nonempty('First name is required'),
    last_name: z.string().nonempty('Last name is required'),
    contact_number: z.string().nonempty('Contact number is required'),
    date_of_birth: z.union([z.string().nonempty('Date of birth is required'), z.date()]),
    gender: z.string().nonempty('Gender is required'),
    contact_email: z.string().email('Invalid email').nonempty('Email is required'),
    nationality: z.number({ invalid_type_error: 'Nationality is required' }),
    issuing_country: z.number({ invalid_type_error: 'Issuing country is required' }),
    frequent_flyer_number: z.string().optional(),
    frequent_flyer_airline: z.string().optional(),
    passport_number: domestic
      ? z.string().optional()
      : z.string().nonempty('Passport number is required'),
    passport_expiry_date: domestic
      ? z.union([z.string(), z.date()]).optional()
      : z.date({ message: 'Passport expiry date is required' }),
    visa: domestic
      ? z.any().optional()
      : z
          .array(
            z.object({
              image: z.string().optional().nullable(),
              file: z.any().optional().nullable(),
            }),
          )
          .max(1, 'You can upload up to 1 image'),
    passport: domestic
      ? z.any().optional()
      : z
          .array(
            z.object({
              image: z.string().optional().nullable(),
              file: z.any().optional().nullable(),
            }),
          )
          .max(1, 'You can upload up to 1 image'),
    domestic: z.any().optional(),
  });

// export const getValidatedPassengerSchema = (domestic: boolean = true) =>
//   flightBookingPassengerSchema(domestic).superRefine((data, ctx) => {
//     const birthDate = new Date(data.date_of_birth);
//     const today = new Date();
//     const ageInMonths = differenceInMonths(today, birthDate);
//     const ageInYears = ageInMonths / 12;

//     if (data.type === 'ADT') {
//       if (ageInMonths < 12 * 12) {
//         ctx.addIssue({
//           path: ['date_of_birth'],
//           code: z.ZodIssueCode.custom,
//           message: 'Adult must be 12 years or older.',
//         });
//       }
//     } else if (data.type === 'INF') {
//       if (ageInMonths >= 24) {
//         ctx.addIssue({
//           path: ['date_of_birth'],
//           code: z.ZodIssueCode.custom,
//           message: 'Infant must be under 24 months.',
//         });
//       }
//     } else {
//       switch (data.type) {
//         case 'C11':
//           if (ageInYears >= 11) {
//             ctx.addIssue({
//               path: ['date_of_birth'],
//               code: z.ZodIssueCode.custom,
//               message: 'Age must be 11 or younger for C11.',
//             });
//           }
//           break;
//         case 'C10':
//           if (ageInYears >= 10) {
//             ctx.addIssue({
//               path: ['date_of_birth'],
//               code: z.ZodIssueCode.custom,
//               message: 'Age must be 10 or younger for C10.',
//             });
//           }
//           break;
//         case 'C09':
//           if (ageInYears >= 9) {
//             ctx.addIssue({
//               path: ['date_of_birth'],
//               code: z.ZodIssueCode.custom,
//               message: 'Age must be 9 or younger for C09.',
//             });
//           }
//           break;
//         case 'C08':
//           if (ageInYears >= 8) {
//             ctx.addIssue({
//               path: ['date_of_birth'],
//               code: z.ZodIssueCode.custom,
//               message: 'Age must be 8 or younger for C08.',
//             });
//           }
//           break;
//         case 'C07':
//           if (ageInYears >= 7) {
//             ctx.addIssue({
//               path: ['date_of_birth'],
//               code: z.ZodIssueCode.custom,
//               message: 'Age must be 7 or younger for C07.',
//             });
//           }
//           break;
//         case 'C06':
//           if (ageInYears >= 6) {
//             ctx.addIssue({
//               path: ['date_of_birth'],
//               code: z.ZodIssueCode.custom,
//               message: 'Age must be 6 or younger for C06.',
//             });
//           }
//           break;
//         case 'C05':
//           if (ageInYears >= 5) {
//             ctx.addIssue({
//               path: ['date_of_birth'],
//               code: z.ZodIssueCode.custom,
//               message: 'Age must be 5 or younger for C05.',
//             });
//           }
//           break;
//         case 'C04':
//           if (ageInYears >= 4) {
//             ctx.addIssue({
//               path: ['date_of_birth'],
//               code: z.ZodIssueCode.custom,
//               message: 'Age must be 4 or younger for C04.',
//             });
//           }
//           break;
//         case 'C03':
//           if (ageInYears >= 3) {
//             ctx.addIssue({
//               path: ['date_of_birth'],
//               code: z.ZodIssueCode.custom,
//               message: 'Age must be 3 or younger for C03.',
//             });
//           }
//           break;
//         case 'C02':
//           if (ageInYears >= 2) {
//             ctx.addIssue({
//               path: ['date_of_birth'],
//               code: z.ZodIssueCode.custom,
//               message: 'Age must be 2 or younger for C02.',
//             });
//           }
//           break;
//       }
//     }
//   });

export const getValidatedPassengerSchema = (domestic: boolean = true) =>
  flightBookingPassengerSchema(domestic).superRefine((data, ctx) => {
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
export const getFlightBookingFormSchema = (domestic: boolean = true) =>
  z.object({
    search_id: z.string().nonempty('Search ID is required'),
    flight_id: z.string().nonempty('Flight ID is required'),
    passengers: z
      .array(getValidatedPassengerSchema(domestic))
      .min(1, 'At least one passenger is required'),
    booking_confirm: z.boolean().optional(),
  });
