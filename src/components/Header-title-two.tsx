import React from 'react';

type Props = {
  title: string;
  description?: string;
};

const HeaderTitleTwo = ({ description, title }: Props) => {
  return (
    <div className=''>
      <h2 className='text-xl font-semibold'>{title}</h2>
      {description && <p className='text-gray-500'>{description}</p>}
    </div>
  );
};

export default HeaderTitleTwo;
