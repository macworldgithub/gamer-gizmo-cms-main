import CardMain from "@/components/CardMain";
import React from "react";
import SalesChart from "./SalesChart";
import TopCountries from "./TopCountries";
import SalesTable from "./SalesEarning";

const Page = () => {
  return (
    <div className="p-4 bg-gray-100 min-h-screen container">
      <h3 className="text-xl font-bold text-black mb-2 ml-4">
        Welcome back! Michel
      </h3>
      
        <CardMain />
      
      <div className="flex justify-between container mb-6">
        <div className="w-[55%] ">
          <SalesChart />
        </div>
        <div className="w-[40%]">
          <TopCountries />
        </div>
      </div>

      <SalesTable />
      <div className="flex justify-between px-1 text-gray-400">
        <p className="md:text-[0.6rem] md:w-36 lg:w-[70%] lg:text-sm">
          Copyright © 2024 Gamergizmo, All rights reserved.
        </p>
        <div className="flex justify-center md:gap-2 lg:gap-6 ">
          <p className="md:text-[0.6rem] lg:text-sm">Terms of Services</p>
          <p className="md:text-[0.6rem] lg:text-sm">Privacy policy</p>
          <p className="md:text-[0.6rem] lg:text-sm">Cookies</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
