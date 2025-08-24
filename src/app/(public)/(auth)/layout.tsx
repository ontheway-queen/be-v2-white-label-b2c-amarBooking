import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const layout = async ({ children }: Props) => {
  const data = await auth();

  if (data?.user?.email) {
    redirect('/');
  }

  return children;
};

export default layout;
