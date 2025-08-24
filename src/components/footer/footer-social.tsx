import { getSiteInfo } from '@/lib/APIs/config-api';
import { getImageLink } from '@/lib/helper';
import Image from 'next/image';
import Link from 'next/link';

type Props = {};

const FooterSocial = async (props: Props) => {
  const data = await getSiteInfo();

  const social_links = data.data?.social_links;
  const siteData = data?.data?.site_data;

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-wrap items-center gap-3'>
        {social_links?.map(({ id, logo, link }, key) => (
          <Link href={link} target='_blank' key={key}>
            <Image
              src={getImageLink(logo)}
              alt='Social logo'
              key={id}
              rel='noopener noreferrer'
              aria-label='Social'
              width={30}
              height={30}
              className='rounded-full'
            />
          </Link>
        ))}
      </div>
      <div>
        {siteData?.address?.length && (
          <div className='flex flex-col gap-1 text-sm '>
            {siteData.address.map((item, idx) => (
              <div key={idx}>
                <p className='font-medium text-lg'>{item.title}</p>
                <p className='text-sm'>{item.address}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FooterSocial;
