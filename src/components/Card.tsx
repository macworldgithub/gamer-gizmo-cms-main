import React from "react";

interface CardProps {
  value: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const Card: React.FC<CardProps> = ({ value, label, Icon }) => {
  return (
    <div className="bg-white shadow-md rounded-xl   w-[100%] max-w-xs">
      <div className="lg:p-5 md:p-3">
        <div>
          <h2 className="lg:text-3xl font-bold text-xl">{value}</h2>
          <p className="text-gray-500 md:text-xs lg:text-lg pt-1">{label}</p>
          <div className="flex justify-end md:pt-1 lg:pt-0">
          <Icon className="text-purple-500 bg-gray-200 p-1  rounded-full w-7 h-7" />
        </div>
        </div>
     
      </div>
    </div>
  );
};

export default Card;
