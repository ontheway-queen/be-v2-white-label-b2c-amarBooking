import FlightSearchBox from '@/components/flight/flight-search-box';
import HolidaySearchBox from '@/components/holiday/holiday-search-box';
import HotelSearchBox from '@/components/hotel/hotel-search-box';
import { Tabs } from '@/components/ui/tabs';
import VisaSearchBox from '@/components/visa/visa-search-box';
import { IHeroBgTab } from '@/type/site.config.interface';
import { TabsContent, TabsList } from '@radix-ui/react-tabs';
import SearchBoxTrigger from './search-box-trigger';

interface IProps {
  defaultValue?: IHeroBgTab;
}

const SearchBox = ({ defaultValue = 'FLIGHT' }: IProps) => {
  return (
    <div className='w-full mx-auto  md:py-8 relative'>
      <div>
        <Tabs defaultValue={defaultValue} className='mb-10 md:mb-0 relative'>
          {/* Tab Buttons Styled as Cards */}

          <TabsList
            className='grid h-auto w-full max-w-[300px] xs:max-w-[350px] sm:max-w-[350px] mx-auto md:max-w-2xl grid-cols-5 
             md:absolute md:-top-8 md:left-1/2 md:-translate-x-1/2 
             z-30 bg-white shadow rounded-lg overflow-hidden gap-1 -mb-8 md:-mb-8'
          >
            {[
              { href: 'flights', label: 'Flights', icon: '/tabs/FLIGHT.svg', value: 'FLIGHT' },
              { href: 'hotels', label: 'Hotels', icon: '/tabs/Hotel.svg', value: 'HOTEL' },
              { href: 'holidays', label: 'Holidays', icon: '/tabs/Holiday.svg', value: 'HOLIDAY' },
              { href: 'visa', label: 'Visa', icon: '/tabs/Visa.svg', value: 'VISA' },
              {
                href: 'umrah-packages',
                label: 'Umarah',
                icon: '/tabs/Makkah.svg',
                value: 'UMRAH',
              },
            ].map((tab) => {
              return <SearchBoxTrigger tab={tab} key={tab.value} />;
            })}
          </TabsList>

          {/* Content Box Styled Separately */}
          <div className='bg-white rounded-2xl shadow-lg px-4 sm:px-8 pt-12 pb-8'>
            <TabsContent value='FLIGHT'>
              <FlightSearchBox />
            </TabsContent>

            <TabsContent value='VISA'>
              <VisaSearchBox />
            </TabsContent>

            <TabsContent value='HOTEL'>
              <HotelSearchBox />
            </TabsContent>

            <TabsContent value='HOLIDAY'>
              <HolidaySearchBox />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default SearchBox;
