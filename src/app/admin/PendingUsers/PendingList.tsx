"use client";
import React, { useState } from "react";
import { Table, Input, Select, Pagination } from "antd";
import "antd/dist/reset.css";
import Image from "next/image";

const { Search } = Input;
const { Option } = Select;

const PendingList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [data] = useState([
    {
      key: "1",
      profile: "/Person.png",
      name: "Marlee Reena",
      email: "marleereena@gmail.com",
      phone: "+1-256-325-8652",
      totalBuy: "2161",
      status: "ACTIVE",
      joinOn: "2021-10-30",
    },
    {
      key: "2",
      profile: "/Person2.png",
      name: "Johnee Bolbi",
      email: "johneebolbi@gmail.com",
      phone: "+1-256-325-8652",
      totalBuy: "5161",
      status: "ACTIVE",
      joinOn: "2021-10-30",
    },

    {
      key: "10",
      profile: "/Person2.png",
      name: "Mohini Marlo",
      email: "mohinimarloo2@gmail.com",
      phone: "+1-256-325-8652",
      totalBuy: "1561",
      status: "ACTIVE",
      joinOn: "2021-10-30",
    },
  ]);

  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
    setCurrentPage(1);
  };

  const columns = [
    {
      title: "Profile",
      dataIndex: "profile",
      key: "profile",
      render: (text: number) => (
        <Image
          src={text.toString()}
          alt="Profile"
          className="w-12 h-12 rounded-full"
        />
      ),
    },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Total Buy", dataIndex: "totalBuy", key: "totalBuy" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Join On", dataIndex: "joinOn", key: "joinOn" },
  ];

  return (
    <>
      <div className="text-xl font-bold">Pending Users</div>
      <div className="flex justify-between items-center px-4 py-4">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-600">Show</span>
          <Select
            defaultValue={10}
            className="w-20"
            onChange={handlePageSizeChange}
          >
            {[1, 2, 3, 7].map((size) => (
              <Option key={size} value={size}>
                {size}
              </Option>
            ))}
          </Select>
          <span className="text-gray-600">Entries</span>
        </div>
        <Search placeholder="Search" className="lg:w-full max-w-xs md:w-20" />
      </div>

      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={paginatedData}
          pagination={false}
          className="md:min-w-[250%] lg:min-w-[800px]"
        />
      </div>

      <div className="flex justify-end mt-4">
        <Pagination
          current={currentPage}
          total={data.length}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default PendingList;
