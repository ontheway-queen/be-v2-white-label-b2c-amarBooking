import HeaderTitle from '@/components/Header-title';
import ChangePassword from '../_components/change-password';

const page = () => {
  return (
    <div>
      <HeaderTitle title='Change password' description='Change your current password' />
      <ChangePassword />
    </div>
  );
};

export default page;
