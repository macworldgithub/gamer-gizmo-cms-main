"use client";

import React, { useState, useEffect } from "react";
import { FaUserPlus, FaUsers, FaBoxOpen, FaChartLine } from "react-icons/fa";
import axios from "axios";
import Card from "./Card";

interface Stat {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CardMain: React.FC = () => {
  const [stats, setStats] = useState<Stat[]>([
    { value: "0", label: "Daily Signup", icon: FaUserPlus },
    { value: "0", label: "Daily Visitors", icon: FaUsers },
    { value: "15,503", label: "Daily Orders", icon: FaBoxOpen },
    { value: "$98,503", label: "Daily Revenue", icon: FaChartLine },
  ]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/analytics/daily`, {
          headers: {
            Authorization: "Bearer your_jwt_token_here", // Replace with actual token
          },
        });

        // Get today's date in YYYY-MM-DD format
        const today = new Date().toISOString().split('T')[0]; // e.g., "2025-05-13"
        const todayData = response.data.find((record: { date: string }) => record.date === today);

        if (todayData) {
          setStats((prevStats) =>
            prevStats.map((stat) => {
              if (stat.label === "Daily Signup") {
                return { ...stat, value: todayData.signups.toLocaleString() };
              }
              if (stat.label === "Daily Visitors") {
                return { ...stat, value: todayData.visitors.toLocaleString() };
              }
              return stat;
            })
          );
        } else {
          console.warn("No data found for today:", today);
        }
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-5 overflow-auto">
      {stats.map((stat, index) => (
        <Card
          key={index}
          value={stat.value}
          label={stat.label}
          Icon={stat.icon}
        />
      ))}
    </div>
  );
};

export default CardMain;