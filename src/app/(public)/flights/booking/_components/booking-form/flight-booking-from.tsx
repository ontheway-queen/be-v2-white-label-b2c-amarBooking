import { FormDateInput, FormInput, FormRadioInput, FormSelectInput } from '@/components/form-items';
import { MultiImageUpload } from '@/components/multi-image-upload';
import { SelectCountryForm } from '@/components/select/select-country-form';

import LoginWarning from '@/components/login-warning';
import { SelectTraveler } from '@/components/select/select-traveller';
import TopUpModal from '@/components/top-up-modal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { filterReferenceType } from '@/lib/CONSTANT';
import { flightBookPaxFormat } from '@/lib/flight/flight-booking-info-formatter';
import {
  flightBookingPassengerSchema,
  getFlightBookingFormSchema,
} from '@/lib/flight/flight-booking-zod-schema';
import {
  formatFlightPassengers,
  selectTravelerFillFields,
} from '@/lib/flight/flight-formatter-helper';
import { IFlightListPassenger } from '@/type/flight/flight.search.interface';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Dispatch, SetStateAction, useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useBookFlightMutation } from '../../../_api/flight-endpoint';
import FlightPriceChange from '../flight-price-change';

export type IBookingPax = z.infer<ReturnType<typeof flightBookingPassengerSchema>>;
export type IUserFormData = z.infer<ReturnType<typeof getFlightBookingFormSchema>>;

type Props = {
  pax: IFlightListPassenger[] | undefined;
  setFormVisible: Dispatch<SetStateAction<boolean>>;
  domestic: boolean | undefined;
};

const FlightBookingForm = ({ pax, setFormVisible, domestic }: Props) => {
  const params = useSearchParams();
  const router = useRouter();
  const { status } = useSession();
  const [priceChangeModal, setPriceChangeModal] = useState(false);
  const [changedPrice, setChangedPrice] = useState<string>();

  const [bookedFlight, { isLoading }] = useBookFlightMutation();

  const search_id = params.get('searchId');
  const flight_id = params.get('flight');

  console.log(formatFlightPassengers(pax!));

  const methods = useForm<IUserFormData>({
    resolver: zodResolver(getFlightBookingFormSchema(domestic)),
    defaultValues: {
      flight_id: flight_id!,
      search_id: search_id!,
      passengers: formatFlightPassengers(pax!),
    },
  });

  const { fields } = useFieldArray({
    name: 'passengers',
    control: methods.control,
  });

  const onSubmit = async (data: IUserFormData, confirmed: boolean = false) => {
    const { flight_id, search_id, passengers } = data;
    const formData = new FormData();

    formData.append('flight_id', flight_id);
    formData.append('search_id', search_id);
    formData.append('passengers', JSON.stringify(flightBookPaxFormat(data.passengers)));

    passengers.forEach((item) => {
      if (item?.visa?.length) {
        if (item?.visa?.[0].file) formData.append(`visa-${item.key}`, item?.visa?.[0].file);
      }
    });
    passengers.forEach((item) => {
      if (item?.passport?.length) {
        if (item?.passport?.[0].file)
          formData.append(`passport-${item.key}`, item?.passport?.[0].file);
      }
    });

    if (confirmed) formData.append('booking_confirm', 'true');

    const result = await bookedFlight(formData);

    if (result?.data?.data?.new_fare) {
      setPriceChangeModal(true);
      setChangedPrice(result?.data?.data?.new_fare);
    }

    if (result.data?.data.booking_id) {
      router.replace(`/my-account/flight-booking`);
    }
  };

  if (status !== 'authenticated') {
    return (
      <div>
        <div className='items-center mb-2'>
          <Button
            size={'sm'}
            onClick={() => setFormVisible(false)}
            className='group flex items-center '
          >
            <ArrowLeft className='cursor-pointer' />
            <span className='inline font-medium text-xs  cursor-pointer'>
              Back to Flight Details
            </span>
          </Button>
        </div>
        <LoginWarning redirect={`flights/booking?searchId=${search_id}&flight=${flight_id}`} />
      </div>
    );
  }
  return (
    <>
      <FormProvider {...methods}>
        <FlightPriceChange
          currentPrice={Number(changedPrice ?? 0)}
          show={priceChangeModal}
          onClose={(confirmed) => {
            setPriceChangeModal(false);

            setTimeout(() => {
              if (confirmed) {
                methods.handleSubmit((data) => onSubmit(data, confirmed))();
              }
            }, 500);
          }}
        />

        <div className='items-center mb-2'>
          <Button
            size={'sm'}
            onClick={() => setFormVisible(false)}
            className='group flex items-center '
          >
            <ArrowLeft className='cursor-pointer' />
            <span className='inline font-medium text-xs  cursor-pointer'>
              Back to Flight Details
            </span>
          </Button>
        </div>
        <div className='mx-auto '>
          <div className='mb-6 relative bg-primary/15 shadow-md rounded-lg overflow-hidden'>
            <div className='px-4 py-6 md:py-8 max-w-6xl mx-auto'>
              {/* Header content with responsive padding to accommodate the button */}
              <div className='text-center sm:text-center'>
                <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 leading-tight'>
                  Provide Your Passenger Details
                </h1>
                <p className='text-gray-600 mt-2 text-sm md:text-base max-w-2xl mx-auto'>
                  Please complete all required information accurately for each passenger
                </p>
              </div>
            </div>

            {/* Decorative bottom accent */}
            <div className='h-1 bg-gradient-to-r from-primary to-primary/50'></div>
          </div>

          <form
            onSubmit={methods.handleSubmit((data) => onSubmit(data, false))}
            className='space-y-4'
          >
            <div className='hidden'>
              <FormInput<IUserFormData>
                name={`search_id`}
                label='Search id'
                placeholder='Enter search id'
              />
              <FormInput<IUserFormData>
                name={`flight_id`}
                label='Flight id'
                placeholder='Enter flight id'
              />
            </div>

            {fields.map((field, index) => {
              const type = field.type;

              return (
                <Card key={field.id} className='mx-auto shadow border-none'>
                  <CardContent className='px-6'>
                    <div className='flex justify-between items-center mb-6 border-b pb-1'>
                      <CardTitle className='lg:text-xl font-bold text-gray-800 '>
                        Passenger {index + 1}{' '}
                        <span className='text-gray-500 text-sm font-normal'>
                          (
                          {field.type === 'ADT'
                            ? 'Adult'
                            : field.type === 'INF'
                              ? 'Infant'
                              : field.type === 'C04'
                                ? 'Kids'
                                : 'Child'}
                          )
                        </span>
                      </CardTitle>
                    </div>

                    <div className='hidden'>
                      <FormInput<IUserFormData>
                        name={`passengers.${index}.type`}
                        label='Type'
                        placeholder='Enter type'
                      />

                      <FormInput<IUserFormData>
                        name={`passengers.${index}.key`}
                        label='Key'
                        placeholder='Enter key'
                      />
                      <FormInput<IUserFormData>
                        name={`passengers.${index}.domestic`}
                        label='domestic'
                        placeholder='Enter key'
                      />
                    </div>

                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 items-start'>
                      <div className='col-span-full flex items-center justify-between pb-2'>
                        <FormRadioInput<IUserFormData>
                          name={`passengers.${index}.reference`}
                          label='Reference'
                          placeholder='Enter reference'
                          options={filterReferenceType(type)}
                        />
                        <SelectTraveler
                          type={type}
                          onChange={(e) => selectTravelerFillFields(methods, index, e)}
                          label='Select Traveler (If exists)'
                        />
                      </div>

                      <FormInput<IUserFormData>
                        name={`passengers.${index}.first_name`}
                        label='First Name'
                        placeholder='Enter first name'
                      />

                      <FormInput<IUserFormData>
                        name={`passengers.${index}.last_name`}
                        label='Last Name'
                        placeholder='Enter last name'
                      />
                      <FormInput<IUserFormData>
                        name={`passengers.${index}.contact_number`}
                        label='Phone number'
                        placeholder='Enter phone number'
                        type='number'
                      />

                      <FormDateInput<IUserFormData>
                        name={`passengers.${index}.date_of_birth`}
                        label='Date of Birth'
                        placeholder='Select date of birth'
                      />

                      <FormSelectInput<IUserFormData>
                        name={`passengers.${index}.gender`}
                        label='Gender'
                        placeholder='Select gender'
                        options={[
                          { label: 'Male', value: 'Male' },
                          { label: 'Female', value: 'Female' },
                        ]}
                      />

                      <FormInput<IUserFormData>
                        name={`passengers.${index}.contact_email`}
                        label='Email Address'
                        placeholder='Enter email address'
                      />

                      <SelectCountryForm<IUserFormData>
                        name={`passengers.${index}.nationality`}
                        label='Nationality'
                        placeholder='Select nationality'
                      />

                      <SelectCountryForm<IUserFormData>
                        name={`passengers.${index}.issuing_country`}
                        label='Passport Issuing Country'
                        placeholder='Select country'
                      />

                      <FormInput<IUserFormData>
                        name={`passengers.${index}.passport_number`}
                        label='Passport Number'
                        placeholder='Enter passport number'
                      />

                      <FormDateInput<IUserFormData>
                        name={`passengers.${index}.passport_expiry_date`}
                        label='Passport Expiry Date'
                        placeholder='Select expiry date'
                      />

                      <FormInput<IUserFormData>
                        name={`passengers.${index}.frequent_flyer_number`}
                        label='Frequent Flyer No'
                        placeholder='Enter frequent flyer number'
                      />
                      <FormInput<IUserFormData>
                        name={`passengers.${index}.frequent_flyer_airline`}
                        label='Frequent Flyer airline'
                        placeholder='Enter frequent flyer airline'
                      />
                      {!domestic ? (
                        <>
                          <FormField
                            control={methods.control}
                            name={`passengers.${index}.visa`}
                            render={({ field }) => {
                              const error =
                                methods.control._formState.errors.passengers?.[index]?.visa;
                              return (
                                <FormItem className='relative'>
                                  <FormLabel>Visa image</FormLabel>
                                  <FormControl>
                                    <MultiImageUpload
                                      field={field}
                                      maxNumber={1}
                                      listType={'list'}
                                      className={error?.message && 'border-red-500'}
                                    />
                                  </FormControl>
                                  <FormMessage className='absolute -bottom-4.5 right-0 text-xs' />
                                </FormItem>
                              );
                            }}
                          />
                          <FormField
                            control={methods.control}
                            name={`passengers.${index}.passport`}
                            render={({ field }) => {
                              const error =
                                methods.control._formState.errors.passengers?.[index]?.passport;

                              return (
                                <FormItem className='relative'>
                                  <FormLabel>Passport image</FormLabel>
                                  <FormControl>
                                    <MultiImageUpload
                                      field={field}
                                      maxNumber={1}
                                      listType={'list'}
                                      className={error?.message && 'border-red-500'}
                                    />
                                  </FormControl>
                                  <FormMessage className='absolute -bottom-4.5 right-0 text-xs' />
                                </FormItem>
                              );
                            }}
                          />
                        </>
                      ) : (
                        ''
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            <div className='flex gap-4'>
              <Button type='submit' loading={isLoading} className='flex-1 '>
                Booked Flight With Current Balance
              </Button>
            </div>
          </form>
          <div className='mt-2 flex'>
            <TopUpModal />
          </div>
        </div>
      </FormProvider>
    </>
  );
};

export default FlightBookingForm;
