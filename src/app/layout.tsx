import CustomProvider from '@/components/custom-provider';
import Footer from '@/components/footer/footer';
import Header from '@/components/header/header';
import HeaderLoading from '@/components/header/header-loading';
import Popup from '@/components/popup/popup';
import { Toaster } from '@/components/ui/sonner';
import { getSiteInfo } from '@/lib/APIs/config-api';
import { getImageLink } from '@/lib/helper';
import { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Geist, Geist_Mono, Lato, Plus_Jakarta_Sans, Roboto } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import { Suspense } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700'],
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
  display: 'swap',
  variable: '--font-lato',
});
const plus_jakarta_sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-jakarta',
});

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getSiteInfo();
  const site_data = data?.site_data;

  if (!site_data) {
    return {
      title: 'Default Title',
      description: 'Default Description',
    };
  }

  return {
    title: site_data.meta_title || site_data.site_name || '',
    description: site_data.meta_description || '',
    keywords: site_data.meta_tags || '',
    openGraph: {
      title: site_data.meta_title || site_data.site_name || '',
      description: site_data.meta_description || '',
      images: [site_data.site_thumbnail ? `${getImageLink(site_data.site_thumbnail)}` : ''],
    },
    icons: {
      icon: site_data.favicon ? `${getImageLink(site_data.favicon)}` : undefined,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${lato.variable} ${geistSans.variable} ${geistMono.variable} ${roboto.variable} ${plus_jakarta_sans.variable} antialiased`}
      >
        <NextTopLoader />
        <SessionProvider>
          <CustomProvider>
            <Suspense fallback={<HeaderLoading />}>
              <Header />
            </Suspense>
            <Suspense fallback={''}>
              <Popup />
            </Suspense>
            <div className='min-h-screen'>{children}</div>
            <Toaster />
            <Footer />
          </CustomProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
