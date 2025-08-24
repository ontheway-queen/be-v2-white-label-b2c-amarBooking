import { Loader } from 'lucide-react';
import React from 'react';

const Loading = () => {
  return (
    <div className='flex justify-center items-center min-h-[80vh]'>
      <Loader className='animate-spin size-5 p-0 m-0' strokeWidth={1} />
    </div>
  );
};

export default Loading;
