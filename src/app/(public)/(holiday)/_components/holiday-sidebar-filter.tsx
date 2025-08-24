import { CommonQueryCheckBoxFilter } from '@/components/filter/common-query-checkbox-filter';
import { CommonQueryPriceRange } from '@/components/filter/common-query-price-range';
import { Accordion } from '@/components/ui/accordion';
import { IExtractHolidayFilterDataReturn } from '@/lib/holiday/extract-holiday-filter-data';

interface IProps {
  filterData: IExtractHolidayFilterDataReturn;
}
const HolidaySidebarFilter = ({ filterData }: IProps) => {
  return (
    <>
      <Accordion
        className='space-y-3'
        type='multiple'
        defaultValue={['price_range', 'cities', 'countries', 'type'].filter(Boolean) as string[]}
      >
        {filterData?.minPrice !== filterData?.maxPrice ? (
          <CommonQueryPriceRange
            price_range={[filterData?.minPrice, filterData?.maxPrice]}
            label='Filter by price'
            name='price_range'
          />
        ) : (
          ''
        )}

        <CommonQueryCheckBoxFilter
          name='cities'
          label='Filter by cities'
          data={filterData.cities?.map((item) => ({
            label: item,
            value: item,
          }))}
        />

        <CommonQueryCheckBoxFilter
          name='countries'
          label='Filter by countries'
          data={filterData.countries?.map((item) => ({
            label: item,
            value: item,
          }))}
        />

        <CommonQueryCheckBoxFilter
          name='type'
          label='Filter by type'
          data={filterData.holidayTypes?.map((item) => ({
            label: item,
            value: item,
          }))}
        />
      </Accordion>
    </>
  );
};

export default HolidaySidebarFilter;
