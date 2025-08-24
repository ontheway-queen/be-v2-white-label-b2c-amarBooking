import { auth } from '@/auth';
import Unauthorized from '@/components/unauthorized';
import { getSiteInfo } from '@/lib/APIs/config-api';
import { Metadata } from 'next';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

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
    title: `Mange your account | ${site_data.site_name}`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

const layout = async ({ children }: Props) => {
  const data = await auth();

  if (data?.user.email) return children;

  return <Unauthorized />;
};

export default layout;
