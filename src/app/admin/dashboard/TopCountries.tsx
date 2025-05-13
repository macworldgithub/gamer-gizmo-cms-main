"use client";

import React, { useState, useEffect } from "react";
import { Card, List } from "antd";
import axios from "axios";

interface LocationData {
  name: string;
  productCount: number;
}

const TopCountries = () => {
  const [locations, setLocations] = useState<LocationData[]>([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/analytics/locations`, {
          headers: {
            Authorization: "Bearer your_jwt_token_here", // Replace with actual token
          },
        });

        const locations: { id: number; name: string; productCount: number }[] = response.data;
        const locationData: LocationData[] = locations.map((location) => ({
          name: location.name,
          productCount: location.productCount,
        }));

        setLocations(locationData);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  return (
    <Card
      title="Top Locations"
      bordered
      className="w-full xl:max-w-lg max-w-md mx-auto !my-0 !py-0"
    >
      <List
        dataSource={locations}
        renderItem={(location) => (
          <List.Item className="!py-2 !my-0 !px-0">
            <div className="flex justify-between w-full items-center">
              <p className="lg:text-sm font-normal md:text-[0.6rem] text-gray-400">
                {location.name}
              </p>
              <p className="lg:text-sm font-normal md:text-[0.6rem] text-gray-400">
                {location.productCount} Products
              </p>
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default TopCountries;