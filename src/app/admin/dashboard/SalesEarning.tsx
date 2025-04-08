"use client";

import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

interface SalesData {
  key: string;
  date: string;
  itemSales: number;
  earnings: string;
}

const salesData: SalesData[] = [
  { key: "1", date: "Saturday, 10", itemSales: 2, earnings: "$98.00" },
  { key: "2", date: "Sunday, 11", itemSales: 3, earnings: "$180.00" },
  { key: "3", date: "Monday, 12", itemSales: 6, earnings: "$15.00" },
  { key: "4", date: "Tuesday, 15", itemSales: 2, earnings: "$25.00" },
  { key: "5", date: "Wednesday, 16", itemSales: 5, earnings: "$20.00" },
  { key: "6", date: "Thursday, 17", itemSales: 3, earnings: "$33.00" },
  { key: "7", date: "Wednesday, 18", itemSales: 1, earnings: "$15.00" },
  { key: "8", date: "Thursday, 20", itemSales: 2, earnings: "$22.00" },
  { key: "9", date: "Wednesday, 22", itemSales: 8, earnings: "$98.00" },
  { key: "10", date: "Tuesday, 23", itemSales: 6, earnings: "$125.00" },
  { key: "11", date: "Wednesday, 24", itemSales: 3, earnings: "$15.00" },
  { key: "12", date: "Tuesday, 23", itemSales: 9, earnings: "$15.00" },
  { key: "13", date: "Monday, 24", itemSales: 5, earnings: "$23.00" },
];

const columns: ColumnsType<SalesData> = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Item Sales",
    dataIndex: "itemSales",
    key: "itemSales",
  },
  {
    title: "Earnings",
    dataIndex: "earnings",
    key: "earnings",
  },
];

export default function SalesTable() {
  return (
    <div className="w-full">
      <Table
        className="custom-table w-full pr"
        style={{ color: "!gray" }}
        dataSource={salesData}
        columns={columns}
        bordered
      />
    </div>
  );
}
