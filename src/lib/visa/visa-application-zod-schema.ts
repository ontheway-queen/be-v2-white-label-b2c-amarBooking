import z from 'zod';

const visaApplicationPaxSchema = (requiredFields: Record<string, boolean> = {}) =>
  z.object({
    key: z.union([z.number(), z.string()]),
    title: z.string(),
    type: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    date_of_birth: z.date(),
    passport_number: z.string(),
    passport_expiry_date: z.date(),
    passport_type: z.string(),
    city: z.string(),
    country_id: z.union([z.number(), z.string()]),
    address: z.string(),

    // dynamically generated documents
    documents: buildDynamicDocumentsSchema(requiredFields),
  });

export const visaApplicationSchema = (requiredFields: Record<string, boolean> = {}) =>
  z.object({
    from_date: z.date(),
    to_date: z.date(),
    contact_email: z.string().email(),
    contact_number: z.union([z.number(), z.string()]),
    whatsapp_number: z.union([z.number(), z.string()]),
    nationality: z.string(),
    residence: z.string(),
    passengers: z.array(visaApplicationPaxSchema(requiredFields)),
  });

const buildDynamicDocumentsSchema = (requiredFields: Record<string, boolean> = {}) => {
  const shape: Record<string, any> = {};

  Object.entries(requiredFields).forEach(([field, isRequired]) => {
    const fieldSchema = z
      .array(
        z.object({
          image: z.string().optional().nullable(),
          file: z.any().optional().nullable(),
        }),
      )
      .max(1, 'You can upload up to 1 image');

    shape[field] = isRequired ? fieldSchema.min(1, `${field} is required`) : fieldSchema.optional();
  });

  return z.object(shape);
};

export type IVisaApplication = z.infer<ReturnType<typeof visaApplicationSchema>>;
