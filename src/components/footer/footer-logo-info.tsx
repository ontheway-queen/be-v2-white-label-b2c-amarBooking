import { getSiteInfo } from '@/lib/APIs/config-api';
import { getImageLink } from '@/lib/helper';
import { Mail, Phone } from 'lucide-react';
import Image from 'next/image';

type Props = {};

const FooterLogoInfo = async (props: Props) => {
  const { data } = await getSiteInfo();
  const siteData = data?.site_data;

  return (
    <div className='flex flex-col gap-4'>
      {/* Logo and Site Name */}
      <div className='bg-white w-fit p-2'>
        <Image
          src={getImageLink(siteData?.main_logo)}
          alt={siteData?.site_name || 'Logo'}
          width={50}
          height={55}
          className=' object-contain bg-white'
          priority
          sizes='auto'
        />
      </div>
      <h4 className='text-xl font-semibold'>{siteData?.site_name}</h4>
      {/* Emails */}
      {siteData?.emails?.length && (
        <div className='flex flex-col gap-1'>
          {siteData.emails.map((item, idx) => (
            <a key={idx} href={`mailto:${item.email}`} className='text-sm '>
              <Mail className='inline-block mr-2 h-3 w-3' />
              {item.email}
            </a>
          ))}
        </div>
      )}
      {/* Address */}
      {/* {siteData?.address?.length && (
        <div className='flex flex-col gap-1'>
          {siteData.address.map((item, idx) => (
            <a key={idx} href={`mailto:${item.address}`} className='text-sm '>
              <Mail className='inline-block mr-1' />
              {item.address}
            </a>
          ))}
        </div>
      )} */}

      {/* Phone Numbers */}
      {siteData?.numbers?.length && (
        <div className='flex flex-col gap-1'>
          {siteData.numbers.map((item, idx) => (
            <a key={idx} href={`tel:${item.number}`} className='text-sm '>
              <Phone className='inline-block mr-2 w-3 h-3' />
              {item.number}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
export default FooterLogoInfo;
