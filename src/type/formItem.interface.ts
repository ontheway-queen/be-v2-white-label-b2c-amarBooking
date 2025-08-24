import { ClassValue } from 'clsx';
import { FieldValues, Path } from 'react-hook-form';

interface BaseFormFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  label: string;
  disabled?: boolean;
  readOnly?: boolean;
}

export interface FormInputProps<TFieldValues extends FieldValues>
  extends BaseFormFieldProps<TFieldValues> {
  type?: 'text' | 'password' | 'number' | 'email' | 'date' | 'file' | 'tel';
  placeholder?: string;
  className?: ClassValue;
  labelClassName?: string;
  inputWrapperClassName?: string;
}
export interface FormInputTextAreaProps<TFieldValues extends FieldValues>
  extends BaseFormFieldProps<TFieldValues> {
  placeholder?: string;
  className?: ClassValue;
}
export interface FormSelectProps<TFieldValues extends FieldValues>
  extends BaseFormFieldProps<TFieldValues> {
  placeholder?: string;
  options: { label: string; value: string }[];
  className?: ClassValue;
}

export interface FormRadioProps<TFieldValues extends FieldValues>
  extends BaseFormFieldProps<TFieldValues> {
  type?: string;
  placeholder?: string;
  className?: ClassValue;

  options: { label: string; value: string }[];
}
