"use client";

import React, { useState, useEffect } from "react";
import { Card, List } from "antd";
import Image from "next/image";
import axios from "axios";

interface CountryData {
  name: string;
  flag?: string;
  amount: string;
}

const flagMap: { [key: string]: string } = {
  "New York": "/us.png",
  "London": "/uk.png",
  "Tokyo": "/japan.png",
  "Paris": "/france.png",
  "Sydney": "/australia.png",
  "Toronto": "/canada.png",
  "Mexico City": "/maxico.png",
  "Sao Paulo": "/brazil.png",
  "Dublin": "/ireland.png",
  "Auckland": "/newzeland.png",
  "Madrid": "/spain.png",
  "Istanbul": "/turkey.png",
  "Rome": "/italy.png",
  "Buenos Aires": "/argentina.png",
  // Add more mappings as needed
};

const getRandomAmount = () => {
  const amounts = [
    "$29.00",
    "$50.00",
    "$55.00",
    "$63.00",
    "$75.00",
    "$80.00",
    "$88.00",
    "$90.00",
    "$100.00",
    "$450.00",
  ];
  return amounts[Math.floor(Math.random() * amounts.length)];
};

const TopCountries = () => {
  const [countries, setCountries] = useState<CountryData[]>([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/analytics/locations`);

        const locations: { id: number; name: string }[] = response.data;
        const countryData: CountryData[] = locations.map((location) => ({
          name: location.name,
          flag: flagMap[location.name] || "/Action.png", // Fallback image
          amount: getRandomAmount(),
        }));

        setCountries(countryData);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  return (
    <Card
      title="Top Countries"
      bordered
      className="w-full xl:max-w-lg max-w-md mx-auto !my-0 !py-0"
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