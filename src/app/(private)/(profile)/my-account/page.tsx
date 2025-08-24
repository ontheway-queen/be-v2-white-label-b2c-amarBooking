import HeaderTitle from '@/components/Header-title';
import { API_ENDPOINTS } from '@/lib/APIs/endpoint-list';
import { fetchRequest } from '@/lib/APIs/fetchApis';
import { IMyProfileRes } from '@/type/type';
import ProfileUpdateOrView from './_components/profile-update-or-view';

type Props = {};

const page = async (props: Props) => {
  const response = await fetchRequest<IMyProfileRes>(`${API_ENDPOINTS.PROFILE}`);
  const data = response.data;

  return (
    <>
      <HeaderTitle title='User Profile' description='View and manage your profile information' />
      <ProfileUpdateOrView data={data} />
    </>
  );
};

export default page;
