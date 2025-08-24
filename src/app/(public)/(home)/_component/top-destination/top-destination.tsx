import { getSiteInfo } from '@/lib/APIs/config-api';
import TopDestinationClient from './top-destination-client';

type Props = {};

const TopDestination = async (props: Props) => {
  const { data } = await getSiteInfo();
  const destination = data?.popular_places;

  return <TopDestinationClient data={destination} />;
};

export default TopDestination;
