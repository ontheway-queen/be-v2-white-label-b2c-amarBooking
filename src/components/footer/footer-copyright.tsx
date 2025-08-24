import { getSiteInfo } from '@/lib/APIs/config-api';
import Link from 'next/link';

type Props = {};

const FooterCopyRight = async (props: Props) => {
  const { data } = await getSiteInfo();
  const site_config = data?.site_data;
  return (
    <div>
      <p className='text-center md:text-left'>
        &copy; {new Date().getFullYear()}. All rights reserved.
        {site_config?.show_developer && (
          <span className='block md:inline'>
            {' '}
            Designed & Developed by{' '}
            <Link
              href={site_config.developer_link ?? '#'}
              target='_blank'
              className='hover:underline'
            >
              {site_config.developer_name}
            </Link>
          </span>
        )}
      </p>
    </div>
  );
};

export default FooterCopyRight;

// sdsds
