import React from 'react';
import UmrahViewDetails from '../../_components/umrah-view-details';
import { getSiteInfo } from '@/lib/APIs/config-api';

type Props = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: Props) => {
  const { id } = await params;
  const { data } = await getSiteInfo();
  const site_data = data?.site_data;
  return <UmrahViewDetails id={id} siteName={site_data} />;
};

export default page;
