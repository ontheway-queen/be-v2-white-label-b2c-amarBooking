import { getSiteInfo } from '@/lib/APIs/config-api';
import PopularDestinationClient from './popular-destination-client';

type Props = {};

const PopularDestination = async (props: Props) => {
  const { data } = await getSiteInfo();
  const destinations = data?.popular_destinations;

  return (
    <div>
      <PopularDestinationClient data={destinations} />
    </div>
  );
};

export default PopularDestination;
