"use client";
import React, { useState } from "react";
import { Table, Input, Select, Button, Dropdown, Menu, Pagination } from "antd";
import "antd/dist/reset.css";
import { DownOutlined } from "@ant-design/icons";
import Image from "next/image";
import profile from "../../../../public/Profile image.png";
const { Search } = Input;
const { Option } = Select;

import { useRouter } from "next/navigation";
const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const router = useRouter();

  const handleNavigate = () => {
    router.push("./UsersOrderHistory");
  };

  const [data] = useState([
    {
      key: "1",
      profile: "/Gpu.png",
      name: "Marlee Reena",
      price: "2161",
      offer: "30% OFF",
      purchased: "+1-256-325-8652",
      stock: "2161",
      status: "ACTIVE",
      date: "2021-10-30",
    },
    {
      key: "2",
      profile: "/Mouse.png",
      name: "Johnee Bolbi",
      price: "2161",
      offer: "30% OFF",
      purchased: "+1-256-325-8652",
      stock: "2161",
      status: "ACTIVE",
      date: "2021-10-30",
    },
    {
      key: "3",
      profile: "/Pc.png",
      name: "Mohini Marlo",
      price: "2161",
      offer: "30% OFF",
      purchased: "+1-256-325-8652",
      stock: "2161",
      status: "ACTIVE",
      date: "2021-10-30",
    },
    {
      key: "4",
      profile: "/Mouse.png",
      name: "Mohini Marlo",
      price: "2161",
      offer: "30% OFF",
      purchased: "+1-256-325-8652",
      stock: "2161",
      status: "ACTIVE",
      date: "2021-10-30",
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

  const menu = (
    <Menu>
      <Menu.Item key="1">View Details</Menu.Item>
      <Menu.Item key="2">Edit</Menu.Item>
      <Menu.Item key="3">Delete</Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "Profile",
      dataIndex: "profile",
      key: "profile",
      render: (text: string) => (
        <div className="flex items-center justify-center w-12 h-12 rounded-full overflow-hidden">
          <Image src={text} alt="Profile" />
        </div>
      ),
    },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Offer", dataIndex: "offer", key: "offer" },
    { title: "Purchased", dataIndex: "purchased", key: "purchased" },
    { title: "Stock", dataIndex: "stock", key: "stock" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Dropdown overlay={menu} trigger={["click"]}>
          <Button className="flex items-center gap-2 border-2 border-purple-500 text-purple-500 rounded-full px-4 py-1 hover:bg-purple-100">
            Info <DownOutlined />
          </Button>
        </Dropdown>
      ),
    },
  ];

  const TableTitle = () => (
    <div className="sm:flex justify-between items-center gap-4 flex-wrap ">
      <div className="flex items-center gap-4 ">
        <span className="text-sm font-medium text-gray-600">Show</span>
        <Select
          defaultValue={4}
          className="w-20"
          onChange={handlePageSizeChange}
        >
          {[1, 2, 3, 4].map((size) => (
            <Option key={size} value={size}>
              {size}
            </Option>
          ))}
        </Select>
        <span className="text-gray-600">Entries</span>
      </div>
      <div className="">
        <Search
          placeholder="Search"
          onSearch={(value) => console.log(value)}
          className="w-full  lg:w-full max-w-xs "
        />
      </div>
    </div>
  );

  return (
    <>
      <div className="flex justify-between px-4">
        <div className="flex gap-4">
          <div>
            <Image src={profile} alt="profile" width={45} height={45} />
          </div>
          <div className="font-bold text-xl mt-2">Michel Smith</div>
        </div>

        <Button
          className="text-white px-6 py-5 font-bold rounded-xl bg-custom-gradient"
          onClick={handleNavigate}
        >
          ORDER HISTORY
        </Button>
      </div>
      <div className="mx-auto px-2 py-8">
        <div className="overflow-x-auto">
          <Table
            title={TableTitle}
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
      </div>
    </>
  );
};

export default ProductList;
