import HeaderTitle from '@/components/Header-title';
import CreateDeposit from '../_component/create-deposit';

type Props = {
  searchParams: Promise<{ account: string }>;
};

const page = async ({ searchParams }: Props) => {
  const { account } = await searchParams;

  return (
    <div>
      <HeaderTitle
        title='Add a new deposit'
        description='Please fill up below form after your deposit'
      />
      <CreateDeposit account_id_params={account} />
    </div>
  );
};

export default page;
