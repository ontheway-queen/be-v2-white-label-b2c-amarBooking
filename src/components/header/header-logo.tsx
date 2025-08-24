import { getSiteInfo } from '@/lib/APIs/config-api';
import { getImageLink } from '@/lib/helper';
import Image from 'next/image';
import Link from 'next/link';

export default async function HeaderLogo() {
  const data = await getSiteInfo();

  return (
    <Link href='/' className='flex items-center gap-3'>
      <div className='relative p-1 rounded-md'>
        <Image
          src={getImageLink(data.data?.site_data.main_logo)}
          alt={data.data?.site_data.site_name || 'Logo'}
          width={190}
          height={55}
          className='h-8 lg:h-12 object-contain transition-opacity duration-300'
          priority
        />
      </div>
    </Link>
  );
}
