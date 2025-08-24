'use client';

import { Input } from '@/components/ui/input';
import { FieldValues, get, useFormContext } from 'react-hook-form';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import {
  FormInputProps,
  FormInputTextAreaProps,
  FormRadioProps,
  FormSelectProps,
} from '@/type/formItem.interface';
import { format } from 'date-fns';
import { CalendarIcon, ChevronLeft, ChevronRight, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';

export function FormInput<T extends FieldValues>({
  name,
  label,
  type = 'text',
  placeholder = 'Enter your input',
  disabled,
  readOnly,
  className,
}: FormInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    formState: { errors },
    control,
  } = useFormContext<T>();

  const error = get(errors, name)?.message as string | undefined;

  return (
    <FormField
      control={control}
      name={name}
      disabled={disabled}
      render={({ field }) => (
        <FormItem className='w-full relative'>
          <FormLabel className='w-full'>
            {disabled ? <span className='text-[#838383]'>{label}</span> : label}
          </FormLabel>
          <FormControl>
            <div className='relative'>
              <Input
                readOnly={readOnly}
                type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                placeholder={placeholder}
                {...field}
                className={cn('pr-10', error && 'border-red-500', className)}
              />
              {type === 'password' && (
                <Button
                  type='button'
                  variant='ghost'
                  size='sm'
                  className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className='h-4 w-4 text-gray-500' />
                  ) : (
                    <Eye className='h-4 w-4 text-gray-500' />
                  )}
                </Button>
              )}
            </div>
          </FormControl>
          <FormMessage className='absolute -bottom-4.5 right-0 text-xs' />
        </FormItem>
      )}
    />
  );
}

export function FormSelectInput<T extends FieldValues>({
  name,
  label,
  placeholder = 'Enter your input',
  options,
  className,
}: FormSelectProps<T>) {
  const { formState, control } = useFormContext<T>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        // console.log({ value: field.value });
        return (
          <FormItem className='relative'>
            <FormLabel>{label}</FormLabel>
            <Select key={field.value} onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger className={cn('w-full', className)}>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options.map((item, index) => (
                  <SelectItem key={index} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage className='absolute -bottom-4.5 right-0 text-xs' />
          </FormItem>
        );
      }}
    />
  );
}

export function FormDateInput<T extends FieldValues>({
  name,
  label,
  placeholder = 'Enter your input',
  disabled,
  onChange,
}: FormInputProps<T> & { onChange?: (date?: Date) => void }) {
  const [month, setMonth] = useState<Date>(new Date());
  const [open, setOpen] = useState(false);

  const {
    formState: { errors },
    control,
  } = useFormContext<T>();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear + 40 - 1950 }, (_, i) => 1950 + i);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='w-full relative'>
          <FormLabel>{label}</FormLabel>
          <Popover open={open} onOpenChange={setOpen} modal>
            <PopoverTrigger asChild className='bg-white'>
              <FormControl>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-full pl-3 text-left font-normal',
                    !field.value && 'text-muted-foreground',
                  )}
                >
                  {field.value ? format(field.value, 'yyyy-MM-dd') : <span>{placeholder}</span>}
                  <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                mode='single'
                selected={field.value}
                onSelect={(e) => {
                  onChange && onChange(e);
                  setOpen(false);
                  field.onChange(e);
                }}
                disabled={disabled}
                initialFocus
                month={month}
                onMonthChange={setMonth}
                components={{
                  Caption: () => {
                    return (
                      <div className='flex justify-between items-center w-full px-1 pt-1'>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='h-7 w-7'
                          onClick={() => {
                            const prev = new Date(month);
                            if (prev.getMonth() === 0) {
                              // If January, set to December of previous year
                              prev.setFullYear(prev.getFullYear() - 1);
                              prev.setMonth(11);
                            } else {
                              // Otherwise just decrement month
                              prev.setMonth(prev.getMonth() - 1);
                            }
                            setMonth(prev);
                          }}
                        >
                          <ChevronLeft className='h-4 w-4' />
                        </Button>

                        <div className='flex items-center gap-1'>
                          <Select
                            value={month.getMonth().toString()}
                            onValueChange={(value) => {
                              const newMonth = new Date(month);
                              newMonth.setMonth(Number.parseInt(value));
                              setMonth(newMonth);
                            }}
                          >
                            <SelectTrigger className='h-7 border-0 shadow-none text-xs font-normal'>
                              <SelectValue>
                                <span className='font-semibold text-lg'>
                                  {months[month.getMonth()]}
                                </span>
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {months.map((monthName, index) => (
                                <SelectItem
                                  key={monthName}
                                  value={index.toString()}
                                  className='text-xs'
                                >
                                  {monthName}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <Select
                            value={month.getFullYear().toString()}
                            onValueChange={(value) => {
                              const newMonth = new Date(month);
                              newMonth.setFullYear(Number.parseInt(value));
                              setMonth(newMonth);
                            }}
                          >
                            <SelectTrigger className='h-7 border-0 shadow-none text-xs font-normal'>
                              <SelectValue className='border-0'>
                                <span className='font-semibold'>{month.getFullYear()}</span>
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent className='max-h-96'>
                              {years.map((year) => (
                                <SelectItem key={year} value={year.toString()} className='text-xs'>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <Button
                          variant='ghost'
                          size='icon'
                          className='h-7 w-7'
                          onClick={() => {
                            const next = new Date(month);
                            if (next.getMonth() === 11) {
                              // If December, set to January of next year
                              next.setFullYear(next.getFullYear() + 1);
                              next.setMonth(0);
                            } else {
                              // Otherwise just increment month
                              next.setMonth(next.getMonth() + 1);
                            }
                            setMonth(next);
                          }}
                        >
                          <ChevronRight className='h-4 w-4' />
                        </Button>
                      </div>
                    );
                  },
                }}
              />
            </PopoverContent>
          </Popover>
          <FormMessage className='absolute -bottom-4.5 right-0 text-xs' />
        </FormItem>
      )}
    />
  );
}

export function FormRadioInput<T extends FieldValues>({ name, label, options }: FormRadioProps<T>) {
  const { formState, control } = useFormContext<T>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='relative'>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className='flex flex-row items-center space-x-2'
            >
              {options.map((item, index) => (
                <FormItem key={index} className='space-y-0'>
                  <FormControl>
                    <RadioGroupItem value={item.value} id={item.value} />
                  </FormControl>
                  <FormLabel htmlFor={item.value}>{item.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage className='absolute -bottom-4.5 right-0 text-xs' />
        </FormItem>
      )}
    />
  );
}

export function FormInputTextArea<T extends FieldValues>({
  name,
  label,
  placeholder = 'Enter your input',
  disabled,
  className,
}: FormInputTextAreaProps<T>) {
  const {
    formState: { errors },
    control,
  } = useFormContext<T>();

  const error = get(errors, name)?.message as string | undefined;

  return (
    <FormField
      control={control}
      name={name}
      disabled={disabled}
      render={({ field }) => (
        <FormItem className='w-full relative'>
          <FormLabel className='w-full'>
            {disabled ? <span className='text-[#838383]'>{label}</span> : label}
          </FormLabel>
          <FormControl>
            <div className='relative'>
              <Textarea
                placeholder={placeholder}
                {...field}
                className={cn('pr-10', error && 'border-red-500', className)}
              />
            </div>
          </FormControl>
          <FormMessage className='absolute -bottom-4.5 right-0 text-xs' />
        </FormItem>
      )}
    />
  );
}
