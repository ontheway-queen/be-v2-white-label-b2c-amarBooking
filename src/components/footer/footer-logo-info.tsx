import { getSiteInfo } from '@/lib/APIs/config-api';
import { getImageLink } from '@/lib/helper';
import Image from 'next/image';

type Props = {};

const FooterLogoInfo = async (props: Props) => {
  const { data } = await getSiteInfo();
  const siteData = data?.site_data;

  return (
    <div className='flex flex-col gap-4'>
      {/* Logo and Site Name */}
      <div className='flex items-center gap-3'>
        <Image
          src={getImageLink(siteData?.main_logo)}
          alt={siteData?.site_name || 'Logo'}
          width={50}
          height={55}
          className='object-cover'
          priority
          sizes='auto'
        />
        <h4 className='text-xl font-semibold'>{siteData?.site_name}</h4>
      </div>

      {/* Emails */}
      {siteData?.emails?.length && (
        <div className='flex flex-col gap-1'>
          {siteData.emails.map((item, idx) => (
            <a key={idx} href={`mailto:${item.email}`} className='text-sm '>
              {item.email}
            </a>
          ))}
        </div>
      )}

      {/* Phone Numbers */}
      {siteData?.numbers?.length && (
        <div className='flex flex-col gap-1'>
          {siteData.numbers.map((item, idx) => (
            <a key={idx} href={`tel:${item.number}`} className='text-sm '>
              {item.number}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
export default FooterLogoInfo;
