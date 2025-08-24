'use client';

import { FormInput, FormInputTextArea, FormSelectInput } from '@/components/form-items';
import { MultiImageUpload } from '@/components/multi-image-upload';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { createFormData, formatDate } from '@/lib/helper';
import { useSelectedHotel } from '@/lib/redux/slice/hotel/hotel-data-slice';
import { useAppSelector } from '@/lib/redux/store';
import { cn } from '@/lib/utils';
import { IHotelsSearchSchema } from '@/type/hotel/hotel.interface';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { z } from 'zod';
import { useHotelBookingConfirmMutation } from '../../_api/hotel-endpoint';
import { useRouter } from 'next/navigation';
import TopUpModal from '@/components/top-up-modal';

const paxSchema = z.object({
  title: z.string().min(1),
  name: z.string().min(1),
  surname: z.string().min(1),
  type: z.string().min(1),
  image: z
    .array(
      z.object({
        id: z.number().optional(),
        holiday_package_id: z.number().optional(),
        image: z.string().optional(),
        file: z.any().optional(),
        created_at: z.string().optional(),
      }),
    )
    .max(1, 'You can upload up to 1 images')
    .optional(),
});

const roomSchema = z.object({
  room_reference: z.string().min(1),
  paxes: z.array(paxSchema).min(1),
});

const roomGroupSchema = z.object({
  room_code: z.string().min(1),
  rate_key: z.string().min(1),
  rooms: z.array(roomSchema).min(1),
});

const formSchema = z.object({
  roomsData: z.array(roomGroupSchema).min(1),
  booking_comments: z.string().optional(),
  email: z.string().email({ message: 'Email is required' }),
  phone_number: z.string().regex(/^0\d{9,14}$/, 'Invalid phone number format'),
  client_nationality: z.string(),
});

export type IHotelBookingForm = z.infer<typeof formSchema>;

interface IProps {
  formData: IHotelBookingForm | undefined;
  searchData: IHotelsSearchSchema;
  city_code?: string;
  group_code?: string;
}

interface IHolderState {
  nestIndex: number;
  roomIndex: number;
  paxIndex: number;
}

export default function HotelBookingForm({ formData, searchData, city_code, group_code }: IProps) {
  const router = useRouter();
  const [bookedRoom, { isLoading, isError, error, isSuccess }] = useHotelBookingConfirmMutation();

  const { roomCheckInfo, selectedHotel } = useAppSelector(useSelectedHotel);

  const form = useForm<IHotelBookingForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...formData,
    },
  });
  const [holder, setHolder] = useState<IHolderState>({
    nestIndex: 0,
    roomIndex: 0,
    paxIndex: 0,
  });

  const { control, handleSubmit } = form;

  const { fields: roomGroups } = useFieldArray({
    control,
    name: 'roomsData',
  });

  const onSubmit = (formDataInput: IHotelBookingForm) => {
    const formData = new FormData();

    // --- Extract images and clean data
    const cleanedRoomsData = formDataInput.roomsData.map((roomData, roomIndex) => ({
      ...roomData,
      rooms: roomData.rooms.map((room, _roomInnerIndex) => ({
        ...room,
        paxes: room.paxes.map((pax, paxIndex) => {
          const key = `r_${roomIndex + 1}_p_${paxIndex + 1}`;

          // Add files to FormData
          pax.image?.forEach((imgObj) => {
            if (imgObj.file instanceof File) {
              formData.append(key, imgObj.file);
            }
          });

          // Return pax without image
          const { image, ...paxWithoutImage } = pax;
          return paxWithoutImage;
        }),
      })),
    }));

    const GET_HOLDER =
      cleanedRoomsData[holder.nestIndex].rooms[holder.roomIndex].paxes[holder.paxIndex];

    // --- Construct holder data

    const HOLDER_INFO = {
      ...GET_HOLDER,
      email: formDataInput.email,
      phone_number: formDataInput.phone_number,
      client_nationality: formDataInput.client_nationality,
    };
    delete (HOLDER_INFO as any).type;

    // --- Construct body
    const body = {
      search_id: roomCheckInfo?.search_id,
      hotel_code: selectedHotel?.hotel_code,
      city_code,
      group_code,
      checkin: formatDate(searchData.date.from),
      checkout: formatDate(searchData.date.to),
      booking_comments: formDataInput.booking_comments,
      booking_items: JSON.stringify(cleanedRoomsData),
      holder: JSON.stringify(HOLDER_INFO),
    };

    createFormData(body, formData);

    bookedRoom(formData);

    // for (let [key, value] of formData.entries()) {
    //   console.log(key, "->", value);
    // }
  };

  useEffect(() => {
    if (isSuccess) {
      router.push('/my-account/hotel-booking');
    }
  }, [isSuccess]);

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          {roomGroups?.map((group, groupIndex) => (
            <div key={group.id} className='p-0 space-y-4'>
              <div className='space-y-4'>
                <div className='grid-cols-2 gap-4 hidden'>
                  <FormInput<IHotelBookingForm>
                    label='Room Code'
                    name={`roomsData.${groupIndex}.room_code`}
                  />
                  <FormInput<IHotelBookingForm>
                    label='Rate Key'
                    name={`roomsData.${groupIndex}.rate_key`}
                  />
                </div>

                <RoomDetails nestIndex={groupIndex} setHolder={setHolder} holder={holder} />
              </div>
            </div>
          ))}

          <FormInputTextArea<IHotelBookingForm> name={'booking_comments'} label='Note' />

          <HolderInformation />

          {isError && (
            <Alert variant={'destructive'}>
              <AlertTitle>Something happen wrong</AlertTitle>
              <AlertDescription>{(error as any)?.data?.message}</AlertDescription>
            </Alert>
          )}
          <Button disabled={isLoading} loading={isLoading} type='submit'>
            Confirm Hotel Book
          </Button>
        </form>
      </Form>
      <div className='mt-2'>
        <TopUpModal />
      </div>
    </>
  );
}

interface IRoomDetails {
  nestIndex: number;
  setHolder: Dispatch<SetStateAction<IHolderState>>;
  holder: IHolderState;
}

function RoomDetails({ nestIndex, holder, setHolder }: IRoomDetails) {
  const { control } = useFormContext();

  const { fields: rooms } = useFieldArray({
    control,
    name: `roomsData.${nestIndex}.rooms`,
  });

  return (
    <div className='space-y-4'>
      {rooms.map((room, roomIndex) => (
        <div key={room.id} className='p-0 space-y-4'>
          <FormField
            control={control}
            name={`roomsData.${nestIndex}.rooms.${roomIndex}.room_reference`}
            render={({ field }) => (
              <FormItem className='hidden'>
                <FormLabel>Room Reference</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <PaxesList
            nestIndex={nestIndex}
            roomIndex={roomIndex}
            setHolder={setHolder}
            holder={holder}
          />
        </div>
      ))}
    </div>
  );
}

interface IPaxesListProps {
  nestIndex: number;
  roomIndex: number;
  setHolder: Dispatch<SetStateAction<IHolderState>>;
  holder: IHolderState;
}
function PaxesList({ nestIndex, roomIndex, holder, setHolder }: IPaxesListProps) {
  const { control } = useFormContext();

  const { fields: paxes } = useFieldArray({
    control,
    name: `roomsData.${nestIndex}.rooms.${roomIndex}.paxes`,
  });

  const info = [
    { key: 'name', title: 'Name', placeholder: 'Provide guest name' },
    {
      key: 'surname',
      title: 'Surname',
      placeholder: 'Provide guest surname',
    },
    { key: 'type', title: 'Type', placeholder: undefined, hidden: true },
  ];

  return (
    <div className='space-y-5'>
      <h3 className='border-b pb-2 text-sm font-semibold text-primary border-primary italic'>
        Gust information for room - {roomIndex + 1}
      </h3>
      <div className='grid lg:grid-cols-2 gap-4'>
        {paxes.map((pax, paxIndex) => {
          const isHolderSelected =
            nestIndex === holder.nestIndex &&
            holder.roomIndex === roomIndex &&
            holder.paxIndex === paxIndex;

          return (
            <div
              key={pax.id}
              className={cn('bg-muted p-3 rounded-sm', isHolderSelected && 'ring ring-amber-500')}
            >
              <div className='space-y-3'>
                <div className='border-b pb-1.5 text-sm font-semibold flex justify-between items-center gap-2'>
                  <div className='space-x-2'>
                    <Badge>{(pax as any).type === 'CH' ? 'Child' : 'Adult'}</Badge>
                    <span>Guest No: {paxIndex + 1}</span>
                  </div>

                  <div>
                    <RadioGroup
                      onValueChange={() =>
                        setHolder({
                          nestIndex: nestIndex,
                          paxIndex: paxIndex,
                          roomIndex: roomIndex,
                        })
                      }
                      value={`${holder.paxIndex}-${holder.roomIndex}`}
                    >
                      <div className='flex items-center space-x-2'>
                        <RadioGroupItem
                          value={`${paxIndex}-${roomIndex}`}
                          id={`${paxIndex}-${roomIndex}`}
                          className='cursor-pointer'
                        />
                        <Label htmlFor={`${paxIndex}-${roomIndex}`} className='cursor-pointer'>
                          Mark as Holder
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                <div className='grid lg:grid-cols-2 gap-2 items-start'>
                  <FormSelectInput<IHotelBookingForm>
                    name={`roomsData.${nestIndex}.rooms.${roomIndex}.paxes.${paxIndex}.title`}
                    label='Reference'
                    placeholder='Select a reference'
                    className='w-full bg-background!'
                    options={[
                      { value: 'Mr.', label: 'Mr.' },
                      { value: 'Ms.', label: 'Ms.' },
                      { value: 'Mrs.', label: 'Mrs.' },
                      { value: 'Mstr.', label: 'Mstr.' },
                    ]}
                  />

                  {info?.map((item, index) => (
                    <div className={cn(item.hidden && 'hidden')} key={index}>
                      <FormInput
                        label={item.title}
                        name={`roomsData.${nestIndex}.rooms.${roomIndex}.paxes.${paxIndex}.${item.key}`}
                        className='bg-background!'
                      />
                    </div>
                  ))}
                  <div className=''>
                    <FormField
                      control={control}
                      name={`roomsData.${nestIndex}.rooms.${roomIndex}.paxes.${paxIndex}.image`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Passport image</FormLabel>
                          <FormControl>
                            <MultiImageUpload field={field} maxNumber={1} listType={'list'} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function HolderInformation() {
  const { control } = useFormContext<IHotelBookingForm>();

  return (
    <div className='space-y-5 bg-primary/10 p-5 rounded-md'>
      <h3 className='border-b pb-2 text-sm font-semibold text-primary border-primary italic'>
        Holder information
      </h3>
      <div className='grid lg:grid-cols-3 gap-4'>
        <FormInput<IHotelBookingForm>
          name='email'
          label='Holder email'
          placeholder='Provide holder email'
          className='bg-background!'
        />

        <FormInput<IHotelBookingForm>
          name='phone_number'
          label='Phone number'
          placeholder='Provide phone number'
          className='bg-background!'
        />

        <div className='hidden'>
          <FormInput<IHotelBookingForm>
            name='client_nationality'
            label='Nationality'
            placeholder='Provide nationality'
            className='bg-background! '
          />
        </div>
      </div>
    </div>
  );
}
