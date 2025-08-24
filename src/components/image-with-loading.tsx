'use client';

import { cn } from '@/lib/utils';
import { ClassValue } from 'clsx';
import Image from 'next/image';
import { useState } from 'react';

interface IProps {
  src: string;
  alt: string;
  className?: ClassValue;
  delay?: number;
  fill?: boolean | undefined;
  width?: number;
  height?: number;
}

export function ImageWithLoading({
  src,
  alt,
  className,
  delay = 0,
  fill = true,
  height,
  width,
}: IProps) {
  const [loading, setLoading] = useState(true);

  return (
    <div className='absolute top-0 left-0 w-full h-full'>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        height={height}
        width={width}
        priority
        sizes='auto'
        className={cn(
          `object-cover brightness-[0.9] transition-all duration-700 ease-out`,
          loading ? `opacity-0 scale-105 blur-sm` : `opacity-100 scale-100 blur-0`,
          className,
        )}
        style={{
          transitionDelay: `${delay}ms`,
        }}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  );
}
