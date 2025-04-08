"use client";

import DataTable from "@/components/layout/DataTable";
import { Tag } from "antd";
import { MoreOutlined } from "@ant-design/icons";

const statusColors: Record<string, string> = {
  Completed: "#008952",
  Delayed: "#a66c00",
  "On Hold": "#a66c00",
  Canceled: "#890007",
};

const columns = [
  {
    title: <span className="font-bold">Order_ID</span>,
    dataIndex: "orderId",
    key: "orderId",
  },
  {
    title: <span className="font-bold ">Product_Name</span>,
    dataIndex: "productName",
    key: "productName",
  },
  {
    title: <span className="font-bold">Units</span>,
    dataIndex: "units",
    key: "units",
  },
  {
    title: <span className="font-bold ">Order_Date</span>,
    dataIndex: "orderDate",
    key: "orderDate",
  },
  {
    title: <span className="font-bold ">Order_Cost</span>,
    dataIndex: "orderCost",
    key: "orderCost",
  },
  {
    title: <span className="font-bold">Status</span>,
    dataIndex: "status",
    key: "status",
    render: (status: string) => (
      <div className="flex justify-between">
        <Tag color={statusColors[status]} className="rounded-xl px-2 text-[10px]">
          {status}
        </Tag>
        <MoreOutlined className="text-gray-500 cursor-pointer" />
      </div>
    ),
  },
];

// Sample Data
const sampleData = [
  { orderId: 24541, productName: "Coach Swagger", units: "1 Unit", orderDate: "Oct 20, 2024", orderCost: "$230", status: "Completed" },
  { orderId: 24541, productName: "Coach Swagger", units: "2 Unit", orderDate: "Nov 15, 2024", orderCost: "$230", status: "Delayed" },
  { orderId: 24541, productName: "Coach Swagger", units: "3 Unit", orderDate: "Nov 18, 2024", orderCost: "$230", status: "On Hold" },
  { orderId: 24541, productName: "Coach Swagger", units: "4 Unit", orderDate: "Dec 13, 2024", orderCost: "$230", status: "Completed" },
  { orderId: 24541, productName: "Coach Swagger", units: "5 Unit", orderDate: "Dec 23, 2024", orderCost: "$230", status: "Canceled" },
];

export default function RecentOrders() {
  return (
    <div className="border border-black rounded-lg mt-4">
      <div className="flex justify-between items-center pt-4 px-4 border-b border-black">
        <div className="text-lg font-bold">Recent Orders</div>
        <div>Dec 4, 2024 - Jan 2, 2025</div>
      </div>
      <div>
        <DataTable columns={columns} data={sampleData} showEntries={false} showSearch={false} />
      </div>
    </div>
  );
}
