import { IHotelsSearchSchema } from '@/type/hotel/hotel.interface';

type Props = {
  total?: number;
  searchData: IHotelsSearchSchema;
};

const HotelHeader = ({ searchData, total }: Props) => {
  return (
    <div className='bg-background rounded-md p-2 mb-2'>
      <div className='text-sm'>
        We found <span className='font-medium'>{total}</span> accommodations matching your search
        criteria in this location.
      </div>
    </div>
  );
};

export default HotelHeader;
