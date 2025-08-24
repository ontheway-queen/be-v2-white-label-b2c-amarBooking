import { getSiteInfo } from '@/lib/APIs/config-api';
import HotDealsClient from './hot-deals-client';

type Props = {};

const HotDeals = async (props: Props) => {
  const { data } = await getSiteInfo();
  const hotDeals = data?.hot_deals;

  return <HotDealsClient hotDeals={hotDeals} />;
};

export default HotDeals;
