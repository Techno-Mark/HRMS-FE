import React from 'react';
import Image from "next/image";

const ThankYou: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center h-[100vh] gap-[20px]'>
      <Image src="/images/thankyou.gif" alt="thankyou" width={100} height={100}/>
      <h1 className='text-5xl font-bold text-black'>Thank You!</h1>
      <h2 className='text-2xl font-medium text-gray-700'>Your Submisson has been received.</h2>
    </div>
  );
};

export default ThankYou;
