import { ISiteConfig } from '@/type/site.config.interface';
import { API_ENDPOINTS } from './endpoint-list';
import { fetchRequest } from './fetchApis';

export async function getSiteInfo() {
  const res = await fetchRequest<ISiteConfig>(API_ENDPOINTS.SITE_CONFIG_HOME, {
    method: 'GET',
    next: { revalidate: 60 },
    // cache: 'no-store',
  });

  return res;
}

// import { cache } from 'react';
// import { fetchRequest } from './fetchApis';
// import { ISiteConfig } from '@/type/site.config.interface';
// import { API_ENDPOINTS } from './endpoint-list';

// export const getSiteInfo = cache(async () => {
//   const res = await fetchRequest<ISiteConfig>(API_ENDPOINTS.SITE_CONFIG_HOME, {
//     method: 'GET',
//     cache: 'no-store',
//   });

//   return res;
// });
