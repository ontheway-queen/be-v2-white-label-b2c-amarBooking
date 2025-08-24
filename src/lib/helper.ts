import { imageHostLink } from '@/request';
import { IFlight } from '@/type/flight/flight.search.interface';
import { differenceInCalendarDays, format, isValid, parse, parseISO } from 'date-fns';

export function hostedImage(path: string) {
  return `${imageHostLink}${path}`;
}

export const formatDuration = (minutes?: number) => {
  if (!minutes) return null;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

export const formatCustomDate = (dateStr?: any) => {
  if (!dateStr) return null;

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return dateStr;
  }
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export function formatDate(date?: Date | string | null, dateFormat: string = 'yyyy-MM-dd'): string {
  if (!date) return '';

  const parsedDate = typeof date === 'string' ? new Date(date) : date;

  if (!isValid(parsedDate)) return '';

  return format(parsedDate, dateFormat);
}

export const formatTime = (timeString?: string) => {
  if (!timeString) return '';
  const match = timeString.match(/(\d{2}):(\d{2})/);
  if (match) {
    return `${match[1]}:${match[2]}`;
  }
  return timeString;
};

export const formatCurrency = (amount?: number | string, fraction: number = 2) => {
  if (!amount) return '0.00';
  const number = Number(amount);

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: fraction,
  }).format(number);
};

export const formatDateTime = (date: Date | string | undefined): string => {
  if (!date) return '';

  let parsedDate: Date;

  if (typeof date === 'string') {
    parsedDate = parse(date, 'dd-MM-yyyy', new Date());

    if (!isValid(parsedDate)) {
      parsedDate = new Date(date);
    }
  } else {
    parsedDate = date;
  }

  return isValid(parsedDate) ? format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss") : '';
};

export const minutesToHoursAndMinutes = (minutes?: number) => {
  if (!minutes) return { time: '0h 0m', hours: 0, mins: 0 };
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return {
    time: `${hours}h ${mins}m`,
    hours,
    mins,
  };
};

export const getStopoverAirportCodes = (flight: IFlight) => {
  const options = flight?.options || [];
  if (options.length <= 1) return [];

  return options.slice(0, -1).map((option) => option?.arrival?.airport_code);
};

export function formatNumber(num: number | string | undefined) {
  return new Intl.NumberFormat('en-US').format(num as number);
}

export function capitalizeFirstLetter(str?: string) {
  if (!str) return null;
  const lowerCaseStr = str.toLowerCase();
  const capitalizedFirstLetter = lowerCaseStr[0].toUpperCase();
  const capitalizedStr = capitalizedFirstLetter + lowerCaseStr.slice(1);
  return capitalizedStr;
}

export const parseJSON = (value: string) => {
  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
};

export function getDateDifference(from: Date | string, to: Date | string): number {
  try {
    const fromDate = typeof from === 'string' ? parseISO(from) : from;
    const toDate = typeof to === 'string' ? parseISO(to) : to;

    return differenceInCalendarDays(toDate, fromDate);
  } catch (error) {
    console.error('Invalid date input:', error);
    return 0;
  }
}

export const getImageLink = (url?: string | undefined | null): any => {
  if (!url) return undefined;
  return `${imageHostLink}/${url}`;
};

export const createFormData = <T>(data: T, formData: FormData): FormData => {
  Object.entries(data as keyof T).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0 && value[0]?.originFileObj) {
      formData.append(key, value[0].originFileObj);
    } else if (value !== undefined && value !== null && value !== '') {
      formData.append(key, value as string | Blob);
    }
  });

  return formData;
};

export const getRTKError = (error: any) => {
  return error?.data?.message;
};

export function formatQueryParams(baseUrl: string, params: Record<string, any>): string {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === '') continue;

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item !== undefined && item !== null && item !== '') {
          searchParams.append(key, String(item));
        }
      });
    } else {
      searchParams.append(key, String(value));
    }
  }

  const queryString = searchParams.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

type AnyObject = { [key: string]: any };

function isPlainObject(value: any): value is AnyObject {
  return Object.prototype.toString.call(value) === '[object Object]';
}

export function removeEmptyValues<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj
      .map((item) => removeEmptyValues(item))
      .filter((item) => item !== null && item !== undefined && item !== '') as T;
  } else if (isPlainObject(obj)) {
    const result: AnyObject = {};
    for (const [key, value] of Object.entries(obj)) {
      const cleaned = removeEmptyValues(value);
      const isEmptyObject = isPlainObject(cleaned) && Object.keys(cleaned).length === 0;

      if (cleaned !== null && cleaned !== undefined && cleaned !== '' && !isEmptyObject) {
        result[key] = cleaned;
      }
    }
    return result as T;
  }

  // Don't recurse into Date or other special object types
  return obj;
}
