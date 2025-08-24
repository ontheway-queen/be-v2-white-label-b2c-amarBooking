import {
  FormDateInput,
  FormInput,
  FormInputTextArea,
  FormSelectInput,
} from '@/components/form-items';
import { MultiImageUpload } from '@/components/multi-image-upload';
import { SelectCityForm } from '@/components/select/select-city-form';
import { SelectCountryForm } from '@/components/select/select-country-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { passportType, referenceType } from '@/lib/CONSTANT';
import { createFormData, formatDate } from '@/lib/helper';
import { visaApplicationSchema } from '@/lib/visa/visa-application-zod-schema';
import { IVisaApplication, IVisaDetails } from '@/type/visa/visa.interface';
import { zodResolver } from '@hookform/resolvers/zod';
import { differenceInYears } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useBookVisaMutation } from '../_api/visa-endpoints';
import VisaPriceSummary from './visa-price-summary';
import { useRouter } from 'next/navigation';
import TopUpModal from '@/components/top-up-modal';

type Props = {
  setShowForm: Dispatch<SetStateAction<boolean>>;
  showForm: boolean;
  visa: IVisaDetails | undefined;
  traveler: string | number;
};

const VisaApplicationForm = ({ setShowForm, showForm, traveler = 1, visa }: Props) => {
  const router = useRouter();
  const [bookVisa, { isLoading }] = useBookVisaMutation();

  const form = useForm<IVisaApplication>({
    resolver: zodResolver(visaApplicationSchema(visa?.required_fields || {})),
    defaultValues: defaultValues(traveler),
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: 'passengers',
  });

  const onSubmit = async (data: IVisaApplication) => {
    const formData = new FormData();
    const body = {
      from_date: formatDate(data.from_date),
      to_date: formatDate(data.to_date),
      contact_email: data.contact_email,
      contact_number: data.contact_number,
      whatsapp_number: data.whatsapp_number,
      nationality: data.nationality,
      residence: data.residence,
    };

    const passengers = data.passengers.map((passenger) => ({
      key: passenger.key,
      title: passenger.title,
      type: passenger.type,
      first_name: passenger.first_name,
      last_name: passenger.last_name,
      passport_number: passenger.passport_number,
      passport_type: passenger.passport_type,
      city: passenger.city,
      country_id: passenger.country_id,
      address: passenger.address,
      date_of_birth: formatDate(passenger.date_of_birth),
      passport_expiry_date: formatDate(passenger.passport_expiry_date),
    }));

    data?.passengers?.forEach((item, index) => {
      const { documents = undefined } = item;

      if (documents) {
        Object.entries(documents).forEach(([key, imageArr], index) => {
          if (imageArr?.length) {
            formData.append(`${key}-${item.key}`, imageArr?.[0]?.file);
          }
        });
      }
    });

    createFormData(body, formData);
    formData.append('passengers', JSON.stringify(passengers));

    const { data: res } = await bookVisa({ body: formData, id: visa?.id });

    if (res?.success) {
      router.push('/my-account/visa-application');
    }
  };

  return (
    <div className='container py-5 '>
      <Button onClick={() => setShowForm(false)} className='mb-3'>
        <ArrowLeft /> Back to details
      </Button>
      <div className='grid lg:grid-cols-3 gap-5 min-h-screen'>
        <div className='lg:col-span-2'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <Card className='border-0! gap-2!'>
                <CardHeader>
                  <CardTitle className='text-lg font-semibold tracking-tight'>
                    Please fill contact details
                  </CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className='space-y-6 mt-5'>
                  {/* Travel Dates */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <FormDateInput<IVisaApplication>
                      name='from_date'
                      label='Travel from date'
                      placeholder='Enter your travel from date'
                    />
                    <FormDateInput<IVisaApplication>
                      name='to_date'
                      label='Travel to date'
                      placeholder='Enter your travel to date'
                    />
                  </div>

                  {/* Contact Info */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <FormInput<IVisaApplication>
                      name='contact_email'
                      label='Contact email'
                      type='email'
                    />

                    <FormInput<IVisaApplication>
                      name='contact_number'
                      label='Contact number'
                      type='tel'
                    />

                    <FormInput<IVisaApplication>
                      name='whatsapp_number'
                      label='WhatsApp number'
                      type='tel'
                    />
                  </div>

                  {/* Nationality & Residence */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <FormInput<IVisaApplication> name='nationality' label='Your nationality' />
                    <FormInput<IVisaApplication> name='residence' label='Your residence' />
                  </div>
                </CardContent>
              </Card>

              <div className='space-y-4'>
                {fields?.map((field, index) => {
                  const country_id = form.watch(`passengers.${index}.country_id`) || '';

                  return (
                    <Card className='border-0! gap-2!' key={index}>
                      <CardHeader>
                        <CardTitle className='text-primary'>Traveler no - ({index + 1})</CardTitle>
                      </CardHeader>
                      <Separator />
                      <CardContent className='space-y-6 mt-5'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                          <div className='hidden'>
                            <FormInput<IVisaApplication>
                              name={`passengers.${index}.key`}
                              label='Key'
                              placeholder='Enter your key'
                            />
                            <FormInput<IVisaApplication>
                              name={`passengers.${index}.type`}
                              label='Type'
                              placeholder='Enter your type'
                            />
                          </div>

                          <div className='flex'>
                            <FormSelectInput<IVisaApplication>
                              name={`passengers.${index}.title`}
                              label='Ref:'
                              placeholder='Select reference type'
                              options={referenceType}
                              className='rounded-r-none max-w-24'
                            />

                            <FormInput<IVisaApplication>
                              name={`passengers.${index}.first_name`}
                              label='First Name'
                              placeholder='Enter your first name'
                              className='rounded-l-none'
                            />
                          </div>

                          <FormInput<IVisaApplication>
                            name={`passengers.${index}.last_name`}
                            label='Last name'
                            placeholder='Enter your last name'
                          />

                          <FormDateInput<IVisaApplication>
                            name={`passengers.${index}.date_of_birth`}
                            label='Date of birth'
                            placeholder='Enter your date of birth'
                            onChange={(dob) => {
                              if (!dob) return;

                              const ageYears = differenceInYears(new Date(), dob);

                              let type: 'ADT' | 'CHD' | 'INF' = 'ADT';

                              if (ageYears >= 11) type = 'ADT';
                              else if (ageYears >= 2 && ageYears <= 10) type = 'CHD';
                              else if (ageYears < 2) type = 'INF';

                              form.setValue(`passengers.${index}.type`, type);
                            }}
                          />
                          <SelectCountryForm
                            name={`passengers.${index}.country_id`}
                            label='Country'
                            placeholder='Enter your country'
                          />
                          <SelectCityForm
                            name={`passengers.${index}.city`}
                            label='City'
                            placeholder='Enter your city'
                            country_id={country_id}
                          />

                          <FormSelectInput<IVisaApplication>
                            name={`passengers.${index}.passport_type`}
                            label='Passport type'
                            placeholder='Select your passport type'
                            options={passportType}
                          />

                          <FormInput<IVisaApplication>
                            name={`passengers.${index}.passport_number`}
                            label='Passport number'
                            placeholder='Enter your passport number'
                          />

                          <FormDateInput<IVisaApplication>
                            name={`passengers.${index}.passport_expiry_date`}
                            label='Passport expiry date'
                            placeholder='Enter your passport expiry date'
                          />
                        </div>

                        <FormInputTextArea<IVisaApplication>
                          name={`passengers.${index}.address`}
                          label='Address'
                          placeholder='Enter your address'
                        />

                        <div className='bg-orange-50 p-3 py-4 border border-orange-200 rounded'>
                          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-start'>
                            {Object.keys(visa?.required_fields || {})?.map((docField) => (
                              <FormField
                                key={docField}
                                control={form.control}
                                name={`passengers.${index}.documents.${docField}`}
                                render={({ field }) => (
                                  <FormItem className='relative overflow-hidden'>
                                    <FormLabel>
                                      {docField
                                        .replace(/[^a-zA-Z0-9]+/g, ' ')
                                        .trim()
                                        .replace(/^./, (c) => c.toUpperCase())}{' '}
                                    </FormLabel>
                                    <FormControl>
                                      <MultiImageUpload
                                        field={field}
                                        maxNumber={1}
                                        listType='list'
                                      />
                                    </FormControl>
                                    <FormMessage className='absolute -bottom-4.5 right-0 text-xs' />
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <Button loading={isLoading} type='submit' className='w-full'>
                Submit Booking
              </Button>
            </form>
          </Form>

          <div className='mt-2 flex'>
            <TopUpModal />
          </div>
        </div>
        <aside className='lg:col-span-1  h-screen sticky top-3 '>
          <VisaPriceSummary visa={visa} traveler={traveler} />
        </aside>
      </div>
    </div>
  );
};

export default VisaApplicationForm;

const defaultValues = (traveler: number | string = 1) => ({
  from_date: undefined,
  to_date: undefined,
  contact_email: '',
  contact_number: '',
  whatsapp_number: '',
  nationality: 'Bangladesh',
  residence: 'Bangladesh',
  passengers: Array.from({ length: Number(traveler) }).map((_, index) => ({
    key: index + 1,
    title: 'Mr',
    type: 'ADT',
    first_name: '',
    last_name: '',
    passport_number: '',
    passport_type: 'Regular',
    city: '',
    country_id: 18,
    address: '',
    documents: undefined,
    date_of_birth: undefined,
    passport_expiry_date: undefined,
  })),
});
