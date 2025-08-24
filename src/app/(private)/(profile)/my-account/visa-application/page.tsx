import HeaderTitle from '@/components/Header-title';
import VisaList from './_components/visa-list';

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <HeaderTitle title='Visa Application' description='Manage your visa application' />
      <VisaList />
    </div>
  );
};

export default page;
