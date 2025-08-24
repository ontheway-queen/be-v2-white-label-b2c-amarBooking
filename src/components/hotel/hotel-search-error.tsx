import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle, ArrowLeft, Home } from 'lucide-react';

interface ErrorDisplayProps {
  message?: string;
  subtitle?: string;
  onBack?: () => void;
  onHome?: () => void;
  backLabel?: string;
  homeLabel?: string;
}

export default function HotelSearchError({
  message = 'An unexpected error occurred.',
  subtitle = 'Please try again later or return to the previous page.',
  onBack,
  onHome,
  backLabel = 'Go Back',
  homeLabel = 'Go Home',
}: ErrorDisplayProps) {
  return (
    <div className='min-h-screen flex justify-center items-center flex-col space-y-8  relative'>
      {/* Animated background elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'></div>

      {/* Main content */}
      <div className='relative z-10 flex flex-col items-center space-y-6 max-w-md w-full'>
        {/* Icon with animation */}
        <div className='relative'>
          <div className='absolute inset-0 bg-red-500/20 rounded-full blur-xl animate-pulse'></div>
          <div className='relative bg-white rounded-full p-4 shadow-lg border border-red-100'>
            <AlertCircle className='w-12 h-12 text-red-500 animate-bounce' />
          </div>
        </div>

        {/* Error message */}
        <Alert
          variant='destructive'
          className='border-l-4 border-red-500 bg-white/80 dark:bg-background backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1'
        >
          <AlertDescription className='text-xs lg:text-lg  font-semibold text-center leading-relaxed text-gray-800 py-2'>
            {message}
          </AlertDescription>
        </Alert>

        {/* Subtitle */}
        {subtitle && (
          <p className='text-text-muted text-center text-sm leading-relaxed max-w-sm'>{subtitle}</p>
        )}

        {/* Action buttons */}
        <div className='flex flex-col sm:flex-row gap-3 w-full'>
          {onBack && (
            <Button
              onClick={onBack}
              className='flex-1 bg-secondary group hover:bg-gray-50 transition-all duration-200 transform hover:scale-105'
            >
              <ArrowLeft className='w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200' />
              {backLabel}
            </Button>
          )}

          {onHome && (
            <Button
              onClick={onHome}
              className='flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/80 hover:primary shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105'
            >
              <Home className='w-4 h-4 mr-2' />
              {homeLabel}
            </Button>
          )}
        </div>
      </div>

      {/* Decorative elements */}
      <div className='absolute top-1/4 left-1/4 w-2 h-2 bg-red-300 rounded-full animate-ping delay-300'></div>
      <div className='absolute top-1/3 right-1/3 w-1 h-1 bg-orange-400 rounded-full animate-ping delay-700'></div>
      <div className='absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-pink-300 rounded-full animate-ping delay-1000'></div>
    </div>
  );
}
