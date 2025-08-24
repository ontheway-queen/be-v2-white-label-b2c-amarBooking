'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Apple, Smartphone } from 'lucide-react';

export default function OurAppsPage() {
  return (
    <section className='min-h-screen bg-background py-16 px-4'>
      <div className='container mx-auto text-center'>
        {/* Heading */}
        <h1 className='text-4xl font-bold tracking-tight mb-4'>Download Our App</h1>
        <p className='text-muted-foreground mb-10 max-w-2xl mx-auto'>
          Experience the best travel booking features right from your phone. Available on iOS and
          Android.
        </p>

        {/* Cards */}
        <div className='grid gap-8 md:grid-cols-3 max-w-6xl mx-auto'>
          {/* iOS Card */}
          <Card className='hover:shadow-lg transition-shadow'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Apple className='w-6 h-6' /> iOS App
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-sm text-muted-foreground'>
                Download our app from the Apple App Store and start your journey today.
              </p>
              <Button asChild className='w-full' variant='default'>
                <a href='https://apps.apple.com' target='_blank' rel='noopener noreferrer'>
                  Download on iOS
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* App Mockup (Center) */}
          {/* <div className='hidden md:flex justify-center items-center'>
            <Image
              src='/images/app-mockup.png' // Place your mockup in public/images
              alt='App Mockup'
              width={250}
              height={500}
              className='rounded-2xl shadow-xl'
            />
          </div> */}

          {/* Android Card */}
          <Card className='hover:shadow-lg transition-shadow'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Smartphone className='w-6 h-6' /> Android App
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-sm text-muted-foreground'>
                Get our Android app from Google Play and enjoy smooth booking anytime.
              </p>
              <Button asChild className='w-full' variant='secondary'>
                <a href='https://play.google.com' target='_blank' rel='noopener noreferrer'>
                  Get it on Android
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
