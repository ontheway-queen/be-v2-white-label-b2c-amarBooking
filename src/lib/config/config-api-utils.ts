import { IHeroBgData, IHeroBgTab } from '@/type/site.config.interface';

export const getHeroBg = (items?: IHeroBgData[], tab?: IHeroBgTab): IHeroBgData[] => {
  if (!items?.length) return [];
  const matched = items.filter((item) => item.tab === tab);
  return matched.length > 0 ? matched : items.slice(0, 1);
};
