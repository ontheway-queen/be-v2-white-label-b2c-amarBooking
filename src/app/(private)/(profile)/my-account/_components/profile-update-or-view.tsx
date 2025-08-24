'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { z } from 'zod';

import { FormInput, FormSelectInput } from '@/components/form-items';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUpdateProfileMutation } from '@/lib/APIs/common-api';
import { createFormData } from '@/lib/helper';
import { imageHostLink } from '@/request';
import { IMyProfileRes } from '@/type/type';
import Image from 'next/image';
import { useState } from 'react';

export const UpdateUserSchema = z.object({
  username: z.string(),
  name: z.string().nonempty('Name is required'),
  phone_number: z.string().optional(),
  gender: z.enum(['Male', 'Female']),
  photo: z.union([z.string(), z.custom<File>()]).optional(),
  email: z.string().email().nonempty('Email is required'),
});

export type IUpdateUser = z.infer<typeof UpdateUserSchema>;

type Props = {
  data: IMyProfileRes | undefined;
};

const ProfileUpdateOrView = ({ data }: Props) => {
  const [images, setImages] = useState<ImageListType>(() =>
    data?.photo
      ? [
          {
            data_url: `${imageHostLink}/${data?.photo}`,
            file: undefined,
          },
        ]
      : [],
  );

  const methods = useForm<IUpdateUser>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      username: data?.username,
      gender: data?.gender,
      name: data?.name,
      phone_number: data?.phone_number,
      photo: `${imageHostLink}/${data?.photo}`,
      email: data?.user_email,
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const onSubmit = (data: IUpdateUser) => {
    const { photo, email, ...rest } = data;
    const formData = new FormData();
    createFormData(rest, formData);

    if (photo && typeof photo === 'object') formData.append('photo', photo);
    updateProfile(formData);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        <Card className='p-6'>
          <div className='flex flex-col lg:flex-row items-start lg:items-center gap-8'>
            <Controller
              control={control}
              name='photo'
              render={() => (
                <ImageUploading
                  value={images}
                  onChange={(imageList: ImageListType) => {
                    setImages(imageList);
                    const file = imageList[0]?.file;
                    if (file) {
                      setValue('photo', file);
                    } else if (imageList.length === 0) {
                      setValue('photo', undefined);
                    }
                  }}
                  maxNumber={1}
                  dataURLKey='data_url'
                  acceptType={['jpg', 'png']}
                >
                  {({ imageList, onImageUpload, onImageUpdate, onImageRemove, dragProps }) => (
                    <div className='flex flex-col items-center justify-center gap-3 w-full sm:w-auto px-4 sm:px-0'>
                      {imageList.length === 0 ? (
                        <div
                          onClick={onImageUpload}
                          {...dragProps}
                          className='w-full max-w-[224px] sm:w-56 aspect-square rounded-lg bg-muted flex items-center justify-center border-2 border-dashed border-gray-300 text-sm text-gray-500 hover:border-primary cursor-pointer transition'
                        >
                          Upload Image
                        </div>
                      ) : (
                        <div className='relative w-full max-w-[224px] sm:w-56 aspect-square rounded-lg overflow-hidden shadow-lg border border-gray-300'>
                          <Image
                            src={imageList[0].data_url}
                            alt='Preview'
                            fill
                            sizes='(max-width: 640px) 100vw, 224px'
                            className='object-cover object-center rounded-lg'
                          />
                          <div className='absolute bottom-0 left-0 right-0 flex justify-center gap-2 bg-black/50 py-2 rounded-b-lg'>
                            <Button
                              type='button'
                              size='sm'
                              variant='secondary'
                              className='text-xs px-3'
                              onClick={() => onImageUpdate(0)}
                            >
                              Update
                            </Button>
                            <Button
                              type='button'
                              size='sm'
                              variant='destructive'
                              className='text-xs px-3'
                              onClick={() => {
                                onImageRemove(0);
                                setValue('photo', undefined);
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </ImageUploading>
              )}
            />

            <div className='flex-1 w-full'>
              <CardHeader className='px-0 pb-2'>
                <CardTitle className='text-lg font-semibold'>Account Information</CardTitle>
              </CardHeader>
              <CardContent className='px-0'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <FormInput<IUpdateUser>
                    name='username'
                    label='Username'
                    placeholder='Enter your username'
                    disabled
                  />
                  <FormInput<IUpdateUser>
                    name='email'
                    label='Email'
                    placeholder='Enter your email'
                    disabled
                  />
                  <FormInput<IUpdateUser>
                    name='name'
                    label='Name'
                    placeholder='Enter your full name'
                  />
                  <FormInput<IUpdateUser>
                    name='phone_number'
                    label='Phone Number'
                    placeholder='Enter your phone number'
                  />
                  <FormSelectInput<IUpdateUser>
                    name='gender'
                    label='Gender'
                    placeholder='Select gender'
                    options={[
                      { label: 'Male', value: 'Male' },
                      { label: 'Female', value: 'Female' },
                    ]}
                  />
                </div>
              </CardContent>
            </div>
          </div>
        </Card>

        {/* Submit Button */}
        <div className='flex justify-end'>
          <Button type='submit' loading={isLoading} className='bg-primary px-6'>
            Update Profile
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ProfileUpdateOrView;
