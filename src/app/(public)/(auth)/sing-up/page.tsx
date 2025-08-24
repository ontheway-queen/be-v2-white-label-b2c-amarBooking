import { SITE_INFO } from '@/site-config';
import SignUpPage from '../_components/sign-up-page';
import { Metadata } from 'next';
import { getSiteInfo } from '@/lib/APIs/config-api';

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
    title: `Open a new account | ${site_data.site_name}`,
    description: `Search and book the best flight deals with ${site_data.site_name}.`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

const page = () => <SignUpPage />;

export default page;
