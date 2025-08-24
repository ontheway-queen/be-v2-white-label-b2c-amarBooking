import { SITE_INFO } from '@/site-config';
import { decodeFlightSearchParams } from '@/lib/flight/flight-formatter-helper';
import { formatDate } from '@/lib/helper';
import { IFlightSearchQueryParams } from '@/type/flight/flight.interface';
import FlightSearchModify from './_components/flight-search-modify';
import { FlightSearchResults } from './_components/flight-search-results';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<IFlightSearchQueryParams>;
};

export async function generateMetadata({ searchParams }: Props) {
  const params = await searchParams;
  const decodeData = decodeFlightSearchParams(params);

  const from = decodeData.from.iata_code;
  const to = decodeData.to.iata_code;
  const departure = formatDate(decodeData.departure);
  const tripType = decodeData.tripType || 'One-way';

  const title =
    from && to
      ? `Flights from ${from} to ${to} | ${tripType} on ${departure}`
      : `Flight Search Results`;

  const description =
    from && to
      ? `Compare ${tripType.toLowerCase()} flights from ${from} to ${to} departing on ${departure}.`
      : `Find the best flight deals with ${SITE_INFO.url_name}`;

  return {
    title,
    description,
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: null,
    },
  };
}

const page = async ({ searchParams }: Props) => {
  const params = await searchParams;

  return (
    <div>
      <FlightSearchModify params={params} />
      <FlightSearchResults params={params} />
    </div>
  );
};

export default page;
