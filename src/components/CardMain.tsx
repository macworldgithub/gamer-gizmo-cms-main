import React from "react";
import { FaUserPlus, FaUsers, FaBoxOpen, FaChartLine } from "react-icons/fa";
import Card from "./Card";

interface Stat {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const stats: Stat[] = [
  { value: "1,503", label: "Daily Signup", icon: FaUserPlus },
  { value: "79,503", label: "Daily Visitors", icon: FaUsers },
  { value: "15,503", label: "Daily Orders", icon: FaBoxOpen },
  { value: "$98,503", label: "Daily Revenue", icon: FaChartLine },
];

const CardMain: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-5 overflow-auto ">
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
