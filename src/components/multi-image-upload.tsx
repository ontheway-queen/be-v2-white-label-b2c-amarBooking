import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ClassValue } from 'clsx';
import { SquarePen, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { ControllerRenderProps } from 'react-hook-form';
import ImageUploading, { ImageListType } from 'react-images-uploading';

type MultiImageUploadProps = {
  field: ControllerRenderProps<any, any>;
  label?: string;
  maxNumber?: number;
  listType?: 'list' | 'grid';
  className?: ClassValue;
};

export function formatFileSizeAuto(bytes?: number): string {
  if (!bytes) return '';
  if (bytes >= 1000 * 1000) {
    return (bytes / (1000 * 1000)).toFixed(2) + ' MB';
  }
  return (bytes / 1000).toFixed(2) + ' KB';
}

export function MultiImageUpload({
  field,
  maxNumber = 10,
  listType = 'grid',
  className,
}: MultiImageUploadProps) {
  const onChange = (imageList: ImageListType, addUpdateIndex?: Array<number>) => {
    field.onChange(imageList);
  };

  return (
    <div className='space-y-2'>
      <ImageUploading
        multiple
        value={field.value || []}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey='image'
        acceptType={['jpg', 'png']}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => {
          if (listType === 'grid') {
            return (
              <div className='space-y-3'>
                <div className='flex gap-2'>
                  <Button
                    type='button'
                    size={'sm'}
                    variant='outline'
                    className={isDragging ? 'border-red-500 text-red-500' : ''}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    Click or Drop Here
                  </Button>
                </div>

                <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
                  {imageList.map((image, index) => {
                    return (
                      <Card
                        key={index}
                        className='relative group overflow-hidden w-full h-32 border-none shadow-none border border-primary p-0 cursor-pointer'
                      >
                        <Image
                          src={image.image}
                          alt='images'
                          className='w-full h-full object-cover'
                          width={100}
                          height={100}
                        />
                        <CardContent className='absolute bottom-0 left-0 right-0 flex justify-end gap-2 bg-white bg-opacity-80 p-2 opacity-100 group-hover:opacity-100 transition-opacity'>
                          <SquarePen
                            onClick={() => onImageUpdate(index)}
                            className='text-primary bg-white rounded p-1 cursor-pointer hover:bg-primary hover:text-white transition-all duration-200'
                          />
                          <Trash2
                            onClick={() => onImageRemove(index)}
                            className='text-red-500 bg-white rounded p-1 cursor-pointer hover:bg-red-500 hover:text-white transition-all duration-200'
                          />
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          }
          if (listType === 'list') {
            return (
              <div>
                <div
                  onClick={onImageUpload}
                  className={cn(
                    'flex w-full cursor-pointer items-center gap-3 rounded-md border border-input bg-background p-2 text-sm shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground h-9',
                    className,
                  )}
                >
                  <span className='rounded-md bg-muted px-3 text-xs'>Upload</span>
                  <span className='text-muted-foreground truncate'>
                    {imageList?.length
                      ? `${imageList.length} image selected`
                      : 'Click to upload image'}
                  </span>
                </div>

                <div className='space-y-4 mt-1'>
                  {imageList.map((image, index) => (
                    <div
                      key={index}
                      className='flex items-center justify-between p-1 rounded-lg border shadow-sm hover:shadow-md transition-shadow'
                    >
                      <div className='flex items-center gap-4'>
                        <Image
                          src={image.image}
                          alt='Uploaded'
                          className='w-24 h-16 object-cover rounded-md border'
                          width={96}
                          height={64}
                        />

                        <div className='space-y-1'>
                          <p className='text-sm font-medium text-muted-foreground'>
                            {image.file?.name}
                          </p>
                          <p className='text-xs text-gray-500'>
                            {formatFileSizeAuto(image.file?.size)}
                          </p>
                        </div>
                      </div>

                      <div className='flex items-center gap-2'>
                        <SquarePen
                          onClick={() => onImageUpdate(index)}
                          className='bg-muted text-blue-600 hover:bg-blue-600 hover:text-white p-2 rounded-md cursor-pointer transition-colors'
                        />
                        <Trash2
                          onClick={() => onImageRemove(index)}
                          className='bg-muted text-red-600 hover:bg-red-600 hover:text-white p-2 rounded-md cursor-pointer transition-colors'
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
        }}
      </ImageUploading>
    </div>
  );
}
