import React from 'react';
import ProfileCard from './ProfileCard';
import PersonalInfo from './PersonalInfo';
import profile from "../../../../public/profile.png";
import Image from 'next/image';

const Page = () => {
  return (
    <div className='relative'>
       <div className="absolute right-4 -top-14 inline-flex items-center gap-1 bg-custom-gradient px-3 py-2 rounded-2xl w-fit">
  <Image src={profile} alt="profile" width={20} height={20} />
  <button className="text-white font-bold">CHANGE COVER</button>
</div>
      
    <div className="flex gap-4 max-lg:flex-col mt-10">
      <div className="w-[30%] max-lg:w-full mx-auto ">
        <ProfileCard/>
      </div>
      <div className="w-[70%] max-lg:w-full mx-auto ">
        <PersonalInfo/>
      </div>
    </div>
     </div>
  );
};

export default Page;



