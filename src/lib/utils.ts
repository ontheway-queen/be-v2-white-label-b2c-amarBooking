import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getStatusClass = (status: string) => {
  const normalized = status.toLowerCase();

  const baseClasses = 'text-xs px-2 py-0.5 rounded font-medium border inline-block capitalize';

  const styles: Record<string, string> = {
    pending: 'text-yellow-600 border-yellow-300 bg-yellow-50',
    confirmed: 'text-blue-600 border-blue-300 bg-blue-50',
    cancelled: 'text-gray-600 border-gray-300 bg-gray-50',
    rejected: 'text-red-600 border-red-300 bg-red-50',
    'in progress': 'text-orange-600 border-orange-300 bg-orange-50',
    completed: 'text-green-700 border-green-300 bg-green-50',
    refunded: 'text-purple-600 border-purple-300 bg-purple-50',
    'booking in process': 'text-purple-600 border-purple-300 bg-purple-50',
  };

  return `${baseClasses} ${styles[normalized] ?? 'text-muted border-muted-foreground bg-muted/10'}`;
};
