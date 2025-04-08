"use client";

import DataTable from "@/components/layout/DataTable";
import { Tag } from "antd";
import { HiMiniArrowsUpDown } from "react-icons/hi2";
import { IoMdArrowDropdown } from "react-icons/io";

const trendingColors: Record<string, string> = {
  Top: "#008952",
  Medium: "#6345ed",
  Low: "#890007",
};

const renderTrending = (trend: string) => (
  <Tag color={trendingColors[trend]} className="font-bold px-6 rounded-xl">
    {trend}
  </Tag>
);

const renderSubCategories = (subCategories: { number: number; name: string }[]) => (
  <div className="flex flex-wrap gap-2">
    {subCategories.map((sub, index) => (
      <span key={index} className="flex items-center gap-4 text-sm ">
        <span className="bg-custom-gradient text-white px-4 py-2 rounded-lg">{sub.number}</span> 
        {sub.name}
      </span>
    ))}
  </div>
);

const columns = [
  {
    title: <div className="font-bold flex items-center gap-1 pb-2">Name</div>,
    dataIndex: "name",
    key: "name",
    render: (text: string) => <b>{text}</b>,
  },
  {
    title: (
      <div className="font-bold flex items-center gap-1 pb-2">
        <HiMiniArrowsUpDown size={22} className="text-gray-500 cursor-pointer" />
        Sub Categories
      </div>
    ),
    dataIndex: "subCategories",
    key: "subCategories",
    render: renderSubCategories,
  },
  {
    title: (
      <div className="font-bold flex items-center gap-1 pb-2">
        <HiMiniArrowsUpDown size={22} className="text-gray-500 cursor-pointer" />
        Product
      </div>
    ),
    dataIndex: "product",
    key: "product",
  },
  {
    title: (
      <div className="font-bold flex items-center gap-1 pb-2">
        <HiMiniArrowsUpDown size={22} className="text-gray-500 cursor-pointer" />
        Total Sell
      </div>
    ),
    dataIndex: "totalSell",
    key: "totalSell",
  },
  {
    title: (
      <div className="font-bold flex items-center gap-1 pb-2">
        <HiMiniArrowsUpDown size={22} className="text-gray-500 cursor-pointer" />
        Status
      </div>
    ),
    dataIndex: "status",
    key: "status",
  },
  {
    title: (
      <div className="font-bold flex items-center gap-1 pb-2">
        <HiMiniArrowsUpDown size={22} className="text-gray-500 cursor-pointer" />
        Trending
      </div>
    ),
    dataIndex: "trending",
    key: "trending",
    render: renderTrending,
  },
  {
    title: (
      <div className="font-bold flex items-center gap-1 pb-2">
        <HiMiniArrowsUpDown size={22} className="text-gray-500 cursor-pointer" />
        Action
      </div>
    ),
    key: "action",
    render: () => (
      <div className="border border-[#6345ed] text-[#6345ed] font-bold rounded-2xl px-4 flex gap-1">
        Info
        <div className="h-6 bg-[#6345ed] w-[2px]"></div>
        {<IoMdArrowDropdown size={18} className="mt-1" />}
      </div>
    ),
  },
];

// Sample Data with 10 Rows
const sampleData = [
  {
    name: "Console",
    subCategories: [
      { number: 5, name: "Console" },
    ],
    product: 28,
    totalSell: 2181,
    status: "ACTIVE",
    trending: "Top",
  },
  {
    name: "Console",
    subCategories: [
      { number: 5, name: "Console" },
    ],
    product: 28,
    totalSell: 2181,
    status: "ACTIVE",
    trending: "Top",
  },
  {
    name: "Console",
    subCategories: [
      { number: 5, name: "Console" },
    ],
    product: 28,
    totalSell: 2181,
    status: "ACTIVE",
    trending: "Top",
  },
  {
    name: "Console",
    subCategories: [
      { number: 5, name: "Console" },
    ],
    product: 28,
    totalSell: 2181,
    status: "ACTIVE",
    trending: "Top",
  },
  {
    name: "Console",
    subCategories: [
      { number: 5, name: "Console" },
    ],
    product: 28,
    totalSell: 2181,
    status: "ACTIVE",
    trending: "Top",
  },
  {
    name: "Console",
    subCategories: [
      { number: 5, name: "Console" },
    ],
    product: 28,
    totalSell: 2181,
    status: "ACTIVE",
    trending: "Top",
  },
  {
    name: "Console",
    subCategories: [
      { number: 5, name: "Console" },
    ],
    product: 28,
    totalSell: 2181,
    status: "ACTIVE",
    trending: "Top",
  },
  {
    name: "Console",
    subCategories: [
      { number: 5, name: "Console" },
    ],
    product: 28,
    totalSell: 2181,
    status: "ACTIVE",
    trending: "Top",
  },
  {
    name: "Earbuds",
    subCategories: [
      { number: 4, name: "Console" },
    ],
    product: 60,
    totalSell: 5181,
    status: "ACTIVE",
    trending: "Medium",
  },
  {
    name: "Mousepad",
    subCategories: [
      { number: 7, name: "Console" },
    ],
    product: 38,
    totalSell: 1061,
    status: "Inactive",
    trending: "Low",
  },
  {
    name: "Keyboard",
    subCategories: [
      { number: 2, name: "Monitor" },
    ],
    product: 45,
    totalSell: 3921,
    status: "ACTIVE",
    trending: "Medium",
  },
  {
    name: "Gaming Chair",
    subCategories: [
      { number: 3, name: "Chair" },
    ],
    product: 21,
    totalSell: 1234,
    status: "Inactive",
    trending: "Low",
  },
  {
    name: "Laptop",
    subCategories: [
      { number: 1, name: "Gaming" },
    ],
    product: 85,
    totalSell: 9823,
    status: "ACTIVE",
    trending: "Top",
  },
  {
    name: "Console",
    subCategories: [
      { number: 5, name: "Console" },
    ],
    product: 28,
    totalSell: 2181,
    status: "ACTIVE",
    trending: "Top",
  },
  {
    name: "Console",
    subCategories: [
      { number: 5, name: "Console" },
    ],
    product: 28,
    totalSell: 2181,
    status: "ACTIVE",
    trending: "Top",
  },
   {
    name: "Console",
    subCategories: [
      { number: 5, name: "Console" },
    ],
    product: 28,
    totalSell: 2181,
    status: "ACTIVE",
    trending: "Top",
  },
  {
    name: "Earbuds",
    subCategories: [
      { number: 4, name: "Console" },
    ],
    product: 60,
    totalSell: 5181,
    status: "ACTIVE",
    trending: "Medium",
  },
  {
    name: "Mousepad",
    subCategories: [
      { number: 7, name: "Console" },
    ],
    product: 38,
    totalSell: 1061,
    status: "Inactive",
    trending: "Low",
  },
  {
    name: "Keyboard",
    subCategories: [
      { number: 2, name: "Monitor" },
    ],
    product: 45,
    totalSell: 3921,
    status: "ACTIVE",
    trending: "Medium",
  },
  {
    name: "Gaming Chair",
    subCategories: [
      { number: 3, name: "Chair" },
    ],
    product: 21,
    totalSell: 1234,
    status: "Inactive",
    trending: "Low",
  },
  {
    name: "Laptop",
    subCategories: [
      { number: 1, name: "Gaming" },
    ],
    product: 85,
    totalSell: 9823,
    status: "ACTIVE",
    trending: "Top",
  },
  {
    name: "Headphones",
    subCategories: [
      { number: 9, name: "Audio" },
    ],
    product: 50,
    totalSell: 6543,
    status: "ACTIVE",
    trending: "Medium",
  },
  {
    name: "Smartwatch",
    subCategories: [
      { number: 3, name: "Wearable" },
    ],
    product: 33,
    totalSell: 4578,
    status: "Inactive",
    trending: "Low",
  },
  {
    name: "Monitor",
    subCategories: [
      { number: 1, name: "4K Display" },
    ],
    product: 67,
    totalSell: 8765,
    status: "ACTIVE",
    trending: "Top",
  },
  {
    name: "Tablet",
    subCategories: [
      { number: 2, name: "Education" },
    ],
    product: 40,
    totalSell: 7123,
    status: "ACTIVE",
    trending: "Medium",
  },
];

export default function SubCategoryTable() {
  return <DataTable columns={columns} data={sampleData} showEntries={true} showSearch={true} />;
}
