"use client";

import React, { useState } from "react";
import { Card, List } from "antd";
import Image from "next/image";

interface CountryData {
  name: string;
  flag?: string;
  amount: string;
}

const TopCountries = () => {
  const [countries] = useState<CountryData[]>([
    { name: "United States", flag: "/us.png", amount: "$55.00" },
    { name: "Mexico", flag: "/maxico.png", amount: "$63.00" },
    { name: "Brazil", flag: "/brazil.png", amount: "$100.00" },
    { name: "Canada", flag: "/canada.png", amount: "$29.00" },
    { name: "Ireland", flag: "/ireland.png", amount: "$88.00" },
    { name: "New Zealand", flag: "/newzeland.png", amount: "$100.00" },
    { name: "Spain", flag: "/spain.png", amount: "$75.00" },
    { name: "Turkey", flag: "/turkey.png", amount: "$80.00" },
    { name: "Italy", flag: "/italy.png", amount: "$450.00" },
    { name: "Argentina", flag: "/argentina.png", amount: "$50.00" },
    { name: "Mexico", flag: "/maxico.png", amount: "$90.00" },
  ]);

  return (
    <Card
      title="Top Countries"
      bordered
      className="w-full xl:max-w-lg max-w-md mx-auto !my-0 !py-0]"
    >
      <List
        dataSource={countries}
        renderItem={(country) => (
          <List.Item className="!py-2 !my-0 !px-0">
            <div className="flex justify-between w-full items-center">
              <div className="flex items-center space-x-2">
                <Image
                  width={20}
                  height={20}
                  alt="img"
                  src={country.flag || "/Action.png"}
                />
                <p className="lg:text-sm font-normal md:text-[0.6rem] text-gray-400">
                  {country.name}
                </p>
              </div>
              <p className="lg:text-gray-400 md:text-[0.6rem]">
                {country.amount}
              </p>
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default TopCountries;
