import { getSiteInfo } from '@/lib/APIs/config-api';
import { getImageLink } from '@/lib/helper';
import HeaderClient from './header-client';

export default async function Header() {
  const data = await getSiteInfo();

  const siteLogo = getImageLink(data?.data?.site_data?.main_logo);
  const site_name = data?.data?.site_data?.site_name;
  const notice = data.data?.site_data.notice;

  return <HeaderClient siteLogo={siteLogo} siteName={site_name} notice={notice} />;
}
