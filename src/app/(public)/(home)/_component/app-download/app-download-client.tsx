'use client';

import { Button } from '@/components/ui/button';
import { fadeIn } from '@/lib/varients/varients';
import { ISiteConfigSiteData } from '@/type/site.config.interface';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

interface IProps {
  site_data: ISiteConfigSiteData | undefined;
}

const AppDownloadClient = ({ site_data }: IProps) => {
  const handlePlayStoreClick = () => {
    window.open(site_data?.android_app_link, '_blank');
  };

  const handleAppStoreClick = () => {
    window.open(site_data?.ios_app_link, '_blank');
  };

  return (
    <section className='bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 md:py-24 overflow-hidden'>
      <div className='container mx-auto max-w-4xl px-4 sm:px-6'>
        <div className='text-center space-y-8'>
          {/* Badge */}
          <motion.div
            variants={fadeIn('up', 0.1)}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true, amount: 0.1 }}
            className='inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium'
          >
            <Download size={16} />
            Now Available
          </motion.div>

          {/* Title */}
          <motion.h2
            variants={fadeIn('up', 0.2)}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true, amount: 0.1 }}
            className='text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight max-w-3xl mx-auto'
          >
            Travel Smarter with Our{' '}
            <span className='text-primary bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
              Mobile App
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={fadeIn('up', 0.3)}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true, amount: 0.1 }}
            className='text-lg text-muted-foreground max-w-2xl mx-auto'
          >
            Book flights, find hotels, discover local experiences, and manage your entire trip from
            anywhere. Available on iOS and Android.
          </motion.p>

          {/* Download Buttons */}
          <motion.div
            variants={fadeIn('up', 0.5)}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true, amount: 0.1 }}
            className='flex flex-col sm:flex-row gap-4 justify-center'
          >
            {site_data?.android_app_link ? (
              <Button
                onClick={handlePlayStoreClick}
                variant='outline'
                size='lg'
                className='group bg-black text-white  border-black h-14 px-6 rounded-xl transition-all duration-300 transform '
              >
                <div className='flex items-center gap-3'>
                  <svg className='w-6 h-6' viewBox='0 0 24 24' fill='currentColor'>
                    <path d='M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.92 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z' />
                  </svg>
                  <div className='text-left'>
                    <div className='text-xs opacity-80'>Get it on</div>
                    <div className='text-sm font-semibold'>Google Play</div>
                  </div>
                </div>
              </Button>
            ) : (
              ''
            )}

            {site_data?.ios_app_link ? (
              <Button
                onClick={handleAppStoreClick}
                variant='outline'
                size='lg'
                className='group bg-black text-white  border-black h-14 px-6 rounded-xl transition-all duration-300 transform '
              >
                <div className='flex items-center gap-3'>
                  <svg className='w-6 h-6' viewBox='0 0 24 24' fill='currentColor'>
                    <path d='M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z' />
                  </svg>
                  <div className='text-left'>
                    <div className='text-xs opacity-80'>Download on the</div>
                    <div className='text-sm font-semibold'>App Store</div>
                  </div>
                </div>
              </Button>
            ) : (
              ''
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AppDownloadClient;
