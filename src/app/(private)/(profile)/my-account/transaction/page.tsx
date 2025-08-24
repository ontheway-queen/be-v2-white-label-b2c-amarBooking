import HeaderTitle from '@/components/Header-title';
import TransactionList from './_components/transaction-list';

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <HeaderTitle title='Transaction List' description='See details of your transaction' />

      <TransactionList />
    </>
  );
};

export default page;
