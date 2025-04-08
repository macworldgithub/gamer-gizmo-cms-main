import React from 'react';
import NewCategory from './NewCategory';
import SubCategoryTable from './SubCategoryTable';

const Page = () => {
  return (
    <div className="flex gap-4 p-4 max-lg:flex-col">
      {/* Left Sidebar - Form */}
      <div className="w-[30%] max-lg:w-full mx-auto h-full ">
        <NewCategory/>
      </div>

      {/* Right Section - Table */}
      <div className="w-[70%] max-lg:w-full mx-auto">
        <SubCategoryTable/>
      </div>
    </div>
  );
};

export default Page;



