import { getSiteInfo } from '@/lib/APIs/config-api';
import AppDownloadClient from './app-download-client';

const AppDownload = async () => {
  const { data } = await getSiteInfo();
  const site_data = data?.site_data;

  if (!site_data?.android_app_link || !site_data?.ios_app_link) return '';

  return <AppDownloadClient site_data={site_data} />;
};

export default AppDownload;
