import { getSiteInfo } from '@/lib/APIs/config-api';
import { Metadata } from 'next';
import ForgotPassword from '../_components/forgot-page';

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getSiteInfo();
  const site_data = data?.site_data;

  if (!site_data) {
    return {
      title: 'Default Title',
      description: 'Default Description',
    };
  }

  return {
    title: `Forgot your password | ${site_data.site_name}`,
    description: `Search and book the best flight deals with ${site_data.site_name}.`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

const page = () => <ForgotPassword />;

export default page;
