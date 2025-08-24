import HeaderTitle from '@/components/Header-title';
import InvoiceList from './_components/invoice-list';

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <HeaderTitle title='Invoice List' description='Manage your booking invoice' />
      <InvoiceList />
    </>
  );
};

export default page;
