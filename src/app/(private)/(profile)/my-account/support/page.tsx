import HeaderTitle from '@/components/Header-title';
import SupportList from './_components/support-list';

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <HeaderTitle
        title='Support List'
        description='Manage your supports history'
        buttonLabel={'Open Support Ticket'}
        link='/my-account/support/create'
      />
      <SupportList />
    </div>
  );
};

export default page;
