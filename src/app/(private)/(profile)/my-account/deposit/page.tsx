import HeaderTitle from '@/components/Header-title';
import DepositList from './_component/deposit-list';

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <HeaderTitle
        title='Deposit List'
        description='Manage your deposits'
        buttonLabel={'Add Deposit'}
        link='/my-account/deposit/add'
      />

      <DepositList />
    </div>
  );
};

export default page;
