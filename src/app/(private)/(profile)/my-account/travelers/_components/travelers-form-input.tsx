import { FormDateInput, FormInput, FormSelectInput } from '@/components/form-items';
import { MultiImageUpload } from '@/components/multi-image-upload';
import { SelectCountryForm } from '@/components/select/select-country-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ITravelerFormType } from '@/type/travelers/travelers.interface';
import { UseFormReturn } from 'react-hook-form';

type Props = { referenceOptions: string[]; methods: UseFormReturn<ITravelerFormType> };

const TravelerInputForm = ({ referenceOptions, methods }: Props) => {
  return (
    <>
      <FormSelectInput
        name='type'
        label='Passenger Type'
        placeholder='Select passenger type'
        options={[
          { label: 'Adult - 12 years and above', value: 'ADT' },
          { label: 'Child - Ages 5 to 11 years', value: 'C11' },
          { label: 'Kids - Ages 2 to under 5 years', value: 'C04' },
          { label: 'Infant - Under 2 years', value: 'INF' },
        ]}
      />

      {/* First Row Inputs */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='flex'>
          <FormSelectInput
            name='reference'
            label='Ref:'
            placeholder='Select reference type'
            options={referenceOptions.map((item) => ({ label: item, value: item }))}
            className='rounded-r-none max-w-24'
          />

          <FormInput
            name='first_name'
            label='First Name'
            placeholder='Enter your first name'
            className='rounded-l-none'
          />
        </div>
        <FormInput name='last_name' label='Last Name' placeholder='Enter your last name' />
        <FormSelectInput
          name='gender'
          label='Select Gender'
          options={[
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' },
          ]}
        />
        <FormDateInput name='date_of_birth' label='Date of Birth' />
        <FormInput name='contact_email' label='Email Address' placeholder='Enter email address' />
        <FormInput name='contact_number' label='Phone Number' placeholder='Enter phone number' />
        <SelectCountryForm name='issuing_country' label='Issuing Country' />
        <SelectCountryForm name='nationality' label='Nationality' />
      </div>

      {/* Second Row Inputs */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <FormInput name='passport_number' label='Passport Number' placeholder='Passport No' />
        <FormDateInput name='passport_expiry_date' label='Passport Expiry Date' />
        <FormInput
          name='frequent_flyer_number'
          label='Frequent Flyer Number'
          placeholder='Frequent Flyer Number'
        />
        <FormInput
          name='frequent_flyer_airline'
          label='Frequent Flyer Airline'
          placeholder='Frequent Flyer Airline'
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-start'>
        <FormField
          control={methods.control}
          name={`passport_file`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passport image</FormLabel>
              <FormControl>
                <MultiImageUpload field={field} maxNumber={1} listType={'list'} />
              </FormControl>
              <FormMessage className='text-xs' />
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name={`visa_file`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Visa image</FormLabel>
              <FormControl>
                <MultiImageUpload field={field} maxNumber={1} listType={'list'} />
              </FormControl>
              <FormMessage className='text-xs' />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default TravelerInputForm;
