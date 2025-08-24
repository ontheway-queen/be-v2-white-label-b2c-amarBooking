'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useGetProfileQuery } from '@/lib/APIs/common-api';
import { getImageLink } from '@/lib/helper';
import { cn } from '@/lib/utils';
import {
  CircleUser,
  CreditCard,
  Dock,
  FileText,
  HelpCircle,
  Hotel,
  KeySquare,
  LogOut,
  Menu,
  MoonStar,
  Plane,
  Settings,
  TrendingUp,
  Umbrella,
  User,
} from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

interface MenuItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  category?: string;
}

interface LayoutProps {
  children: React.ReactNode;
}

export default function AccountLayout({ children }: LayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const session = useSession();
  const { data } = useGetProfileQuery({}, { skip: session.status !== 'authenticated' });
  const userProfile = data?.data;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems: MenuItem[] = [
    {
      name: 'Account Settings',
      icon: Settings,
      href: 'my-account',
      category: 'Account',
    },

    {
      name: 'Flight Bookings',
      icon: Plane,
      href: 'my-account/flight-booking',
      category: 'Bookings',
    },
    {
      name: 'Hotel Booking',
      icon: Hotel,
      href: 'my-account/hotel-booking',
      category: 'Bookings',
    },
    {
      name: 'Holiday Packages',
      icon: Umbrella,
      href: 'my-account/holiday-booking',
      category: 'Bookings',
    },
    {
      name: 'Umrah Services',
      icon: MoonStar,
      href: 'my-account/umrah-booking',
      category: 'Bookings',
    },
    {
      name: 'Visa Application',
      icon: Dock,
      href: 'my-account/visa-application',
      category: 'Bookings',
    },
    {
      name: 'Traveler Profiles',
      icon: CircleUser,
      href: 'my-account/travelers',
      category: 'Management',
    },
    {
      name: 'Wallet & Deposits',
      icon: CreditCard,
      href: 'my-account/deposit',
      category: 'Financial',
    },
    {
      name: 'Invoices',
      icon: FileText,
      href: 'my-account/invoice',
      category: 'Financial',
    },
    {
      name: 'Transaction History',
      icon: TrendingUp,
      href: 'my-account/transaction',
      category: 'Financial',
    },
    {
      name: 'Security Settings',
      icon: KeySquare,
      href: 'my-account/change-password',
      category: 'Security',
    },
    {
      name: 'Help & Support',
      icon: HelpCircle,
      href: 'my-account/support',
      category: 'Support',
    },
  ];

  const handleNavigation = (href: string) => {
    router.push(`/${href}`);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    setIsMenuOpen(false);
    signOut({ redirect: true, redirectTo: '/' });
  };

  const MenuItem = ({ item }: { item: MenuItem }) => {
    // const isActive = pathname === `/${item.href}`;
    const isActive =
      pathname === `/${item.href}` ||
      (item.href !== 'my-account' && pathname.startsWith(`/${item.href}`));

    const IconComponent = item.icon;

    return (
      <button
        onClick={() => handleNavigation(item.href)}
        className={cn(
          'w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm font-medium rounded-lg transition-all duration-200 hover:bg-gray-50',
          isActive && 'bg-blue-50 text-primary/70 border-r-2 border-primary/60 font-semibold',
          'cursor-pointer',
        )}
      >
        <IconComponent className={cn('w-4 h-4', isActive ? 'text-primary/60' : 'text-gray-500')} />
        <span className=''>{item.name}</span>
      </button>
    );
  };

  const SideMenuContent = () => (
    <div className='space-y-1'>
      {menuItems.map((item, index) => (
        <MenuItem key={index} item={item} />
      ))}

      <Separator className='my-4' />

      <button
        onClick={handleLogout}
        className='w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm font-medium text-red-600 rounded-lg transition-all duration-200 hover:bg-red-50 cursor-pointer'
      >
        <LogOut className='w-4 h-4' />
        <span>Sign Out</span>
      </button>
    </div>
  );

  const UserProfile = () => (
    <div className='flex flex-col items-center text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg'>
      <div className='relative mb-3'>
        {userProfile?.photo ? (
          <Image
            src={getImageLink(userProfile.photo)}
            alt='Profile'
            width={80}
            height={80}
            className='w-20 h-20 rounded-full object-cover border-3 border-white shadow-lg'
          />
        ) : (
          <div className='w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center border-3 border-white shadow-lg'>
            <User className='w-8 h-8 text-primary/60' />
          </div>
        )}
        <div className='absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white'></div>
      </div>

      <h3 className='font-semibold text-gray-900 text-lg mb-1'>
        {userProfile?.name || 'Welcome User'}
      </h3>
      <p className='text-sm text-gray-600 truncate max-w-full'>
        {userProfile?.user_email || 'user@example.com'}
      </p>
    </div>
  );

  return (
    <>
      <Head>
        <title>Account Management - Professional Travel Services</title>
        <meta
          name='description'
          content='Manage your travel bookings, profile, and account settings'
        />
        <meta name='robots' content='noindex,nofollow' />
      </Head>

      <div className='min-h-screen bg-gray-50'>
        <div className='max-w-7xl mx-auto'>
          {/* Header */}
          <header className='bg-white border-b border-gray-200 shadow-sm'>
            <div className='flex items-center justify-between h-16 px-4 lg:px-8'>
              <div className='flex items-center flex-1'>
                <h1 className='text-2xl font-bold text-gray-900 ml-2'>Account Management</h1>
              </div>

              {/* Mobile Menu Button */}
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant='outline' size='sm' className='lg:hidden'>
                    <Menu className='w-4 h-4 mr-2' />
                    Menu
                  </Button>
                </SheetTrigger>
                <SheetContent side='left' className='w-80 p-0'>
                  <div className='p-4'>
                    <SheetTitle>Account Settings</SheetTitle>
                  </div>
                  <Separator />
                  <div className='p-4'>
                    <UserProfile />
                    <div className='mt-6'>
                      <SideMenuContent />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </header>

          <div className='flex min-h-[calc(100vh-4rem)]'>
            {/* Desktop Sidebar */}
            <aside className='hidden lg:block w-80 bg-white border-r border-gray-200'>
              <div className='p-6 space-y-6'>
                <UserProfile />
                <SideMenuContent />
              </div>
            </aside>

            {/* Main Content Area */}
            <main className='flex-1 overflow-hidden'>
              <div className='h-full bg-white'>
                <div className='p-6 lg:p-8 h-full overflow-y-auto'>{children}</div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
