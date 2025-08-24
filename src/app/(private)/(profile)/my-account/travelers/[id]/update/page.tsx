import { UpdateTravelerForm } from '../../_components/update-travelers-details';

type Props = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: Props) => {
  const { id } = await params;
  return <UpdateTravelerForm id={id} />;
};

export default page;
