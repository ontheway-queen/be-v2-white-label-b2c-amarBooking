import DepositDetails from '../../_component/deposit-details';

type Props = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: Props) => {
  const { id } = await params;

  return <DepositDetails id={id} />;
};

export default page;
