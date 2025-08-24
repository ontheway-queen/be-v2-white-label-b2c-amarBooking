import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getFlightDetailsTabName } from '@/lib/flight/flight-formatter-helper';
import {
  IAvailability,
  IFlight,
  IFlightListFare,
  IFlightListPassenger,
} from '@/type/flight/flight.search.interface';
import FlightAvailabilityTable from './flight-availability';
import FlightFareSummaryTab from './flight-fare-summary-tab';
import FlightDetailsTab from './flights-details-tab';
import { FlightFarePolicy } from '../../../booking/_components/info/flight-fare-policy';

type Props = {
  flights?: IFlight[];
  fareSummary: {
    pax: IFlightListPassenger[] | undefined;
    fare: IFlightListFare | undefined;
  };
  availability?: IAvailability[] | undefined;
  searchId?: string;
  flight_id?: string;
};

const CardExpandDetails = ({ flights, fareSummary, availability, flight_id, searchId }: Props) => {
  const flightDetailsTab = getFlightDetailsTabName(availability);

  return (
    <div>
      <Tabs defaultValue='flight_details' className='relative'>
        <div className='w-full h-1 border-t absolute top-1.5' />
        <TabsList className='grid grid-cols-3 w-fit bg-transparent pt-2.5'>
          <TabsTrigger value='flight_details' className='rounded-none'>
            Flight Details
          </TabsTrigger>
          <TabsTrigger value='fare_details' className='rounded-none'>
            Fare Breakdown
          </TabsTrigger>
          <TabsTrigger value='fare_policy' className='rounded-none'>
            Fare Rules
          </TabsTrigger>
        </TabsList>
        <div className='w-full h-1 border-t relative bottom-0' />
        <TabsContent value='flight_details'>
          <div className='flex flex-col md:flex-row mt-2'>
            <div className='flex-[2] border-r border-off'>
              <FlightDetailsTab flights={flights} flightDetailsTab={flightDetailsTab} />
            </div>
            <div className='flex-1'>
              <FlightAvailabilityTable availability={availability} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value='fare_details'>
          <FlightFareSummaryTab fareSummary={fareSummary} />
        </TabsContent>
        <TabsContent value='fare_policy'>
          <FlightFarePolicy flight_id={flight_id} search_id={searchId} />{' '}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CardExpandDetails;
