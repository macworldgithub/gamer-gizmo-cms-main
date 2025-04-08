"use client";  // Add this at the top

import React from 'react';
import ProfileCard from './ProfileCard';
import Notification from './Notification';
import { useRouter } from 'next/navigation';  

const Page = () => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push('./UsersProductList');  
  };

  return (
    <div className='relative'>
      <div className='flex gap-4 absolute right-2 -top-16'>
        <div
          className='bg-custom-gradient px-6 py-3 rounded-xl text-white font-bold w-fit cursor-pointer'
          onClick={handleNavigate}
        >
          PRODUCT HISTORY
        </div>
        <div className='bg-custom-gradient px-6 py-3 rounded-xl text-white font-bold w-fit'>DOWNLOAD CHAT</div>
        <div className='bg-custom-gradient px-6 py-3 rounded-xl text-white font-bold w-fit'>EDIT</div>
      </div>
      <div className='flex gap-4 mt-10 max-lg:flex-col'>
        <div className='w-[30%] max-lg:w-full mx-auto'>
          <ProfileCard />
        </div>
        <div className='w-[70%] max-lg:w-full mx-auto'>
          <Notification />
        </div>
      </div>
    </div>
  );
};

export default Page;
