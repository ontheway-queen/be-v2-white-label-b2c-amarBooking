import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';

type Props = {
  title: string;
  description?: string;
  buttonLabel?: string;
  link?: string;
};

const HeaderTitle = ({ description, title, buttonLabel, link }: Props) => {
  return (
    <div>
      <div className='border-b pb-2 mb-5 flex justify-between items-center'>
        <div>
          <h2 className='text-xl font-semibold'>{title}</h2>
          {description ? <p className='text-gray-500'>{description}</p> : ''}
        </div>
        {buttonLabel && link ? (
          <Link href={link}>
            <Button>{buttonLabel}</Button>
          </Link>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default HeaderTitle;
