import React from 'react';
import FlightBookingDetails from '../../_components/FlightBookingDetails';
import { getSiteInfo } from '@/lib/APIs/config-api';

type Props = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: Props) => {
  const { id } = await params;
  const { data } = await getSiteInfo();

  return <FlightBookingDetails id={id} site_info={data?.site_data} />;
};

export default page;
