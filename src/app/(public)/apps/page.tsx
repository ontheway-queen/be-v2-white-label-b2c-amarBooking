import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getSiteInfo } from '@/lib/APIs/config-api';
import { Apple, Smartphone } from 'lucide-react';

const AppDownload = async () => {
  const { data } = await getSiteInfo();
  const site_data = data?.site_data;

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
        <div className='flex flex-wrap justify-center gap-4 mx-auto'>
          {/* iOS Card */}
          <Card className='hover:shadow-lg transition-shadow max-w-[300px]'>
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
                <a href={site_data?.ios_app_link} target='_blank' rel='noopener noreferrer'>
                  Download on iOS
                </a>
              </Button>
            </CardContent>
          </Card>
          {/* Android Card */}
          <Card className='hover:shadow-lg transition-shadow max-w-[300px]'>
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
                <a href={site_data?.android_app_link} target='_blank' rel='noopener noreferrer'>
                  Get it on Android
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;
