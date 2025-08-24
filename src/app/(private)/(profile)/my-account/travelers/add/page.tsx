import HeaderTitle from '@/components/Header-title';
import AddTravelers from '../_components/add-travelers-details';

type Props = {};

const Page = async (props: Props) => {
  return (
    <div>
      <HeaderTitle title='Add Travelers List' description='Manage Travelers Details' />
      <AddTravelers />
    </div>
  );
};

export default Page;
