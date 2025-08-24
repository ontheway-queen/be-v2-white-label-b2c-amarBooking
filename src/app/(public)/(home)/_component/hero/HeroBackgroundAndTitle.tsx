import { getSiteInfo } from '@/lib/APIs/config-api';
import { getHeroBg } from '@/lib/config/config-api-utils';
import { IHeroBgTab } from '@/type/site.config.interface';
import HeroBackgroundClient from './HeroBackgroundClient';

interface IProps {
  defaultValue?: IHeroBgTab;
}

export default async function HeroBackgroundAndTitle({ defaultValue = 'FLIGHT' }: IProps) {
  const data = await getSiteInfo();
  const bgData = data.data?.hero_bg_data;
  const result = getHeroBg(bgData, defaultValue);

  return <HeroBackgroundClient data={result} />;
}
