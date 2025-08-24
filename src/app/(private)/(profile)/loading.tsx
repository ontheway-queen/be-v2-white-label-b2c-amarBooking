import Loading from '@/components/loading';
import React from 'react';

type Props = {};

const loading = (props: Props) => {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <Loading />
    </div>
  );
};

export default loading;
