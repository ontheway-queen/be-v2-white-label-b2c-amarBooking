import SupportDetails from '../../_components/support-details';

type Props = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: Props) => {
  const { id } = await params;

  return <SupportDetails id={id} />;
};

export default page;
