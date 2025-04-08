"use client";
import React, { useState } from "react";
import { Table, Input, Select, Button, Dropdown, Menu, Pagination } from "antd";
import "antd/dist/reset.css";
import { DownOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Image from "next/image";

const { Search } = Input;
const { Option } = Select;

interface VendorData {
  key: string;
  profile: string;
  name: string;
  email: string;
  product: number;
  totalSell: number;
  status: string;
  joinOn: string;
}

const VendorPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const router = useRouter();

  const handleNavigate = () => {
    router.push("./PendingUsers");
  };

  const [data] = useState<VendorData[]>([
    {
      key: "1",
      profile: "/Person.png",
      name: "Marlee Reena",
      email: "marleereena@gmail.com",
      product: 28,
      totalSell: 2161,
      status: "ACTIVE",
      joinOn: "2021-10-30",
    },
    {
      key: "2",
      profile: "/Person2.png",
      name: "Johnee Bolbi",
      email: "johneebolbi@gmail.com",
      product: 68,
      totalSell: 5161,
      status: "ACTIVE",
      joinOn: "2021-10-30",
    },
    // More data...
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
          <Image src={text} alt="Profile" width={48} height={48} />
        </div>
      ),
    },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Product", dataIndex: "product", key: "product" },
    { title: "Total Sell", dataIndex: "totalSell", key: "totalSell" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Join On", dataIndex: "joinOn", key: "joinOn" },
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
    <div className="sm:flex justify-between items-center gap-4 flex-wrap">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-600">Show</span>
        <Select defaultValue={10} className="w-20" onChange={handlePageSizeChange}>
          {[1, 2, 3, 4, 7].map((size) => (
            <Option key={size} value={size}>
              {size}
            </Option>
          ))}
        </Select>
        <span className="text-gray-600">Entries</span>
      </div>
      <div>
        <Search
          placeholder="Search"
          onSearch={(value) => console.log(value)}
          className="w-full lg:w-full max-w-x md:w-20"
        />
      </div>
    </div>
  );

  return (
    <>
      <div className="flex justify-end px-4 py-4 gap-4">
        <Button
          className="text-white px-4 py-5 rounded-XL bg-custom-gradient"
          onClick={handleNavigate}
        >
          PENDING USERS
        </Button>
        <Button className="text-white px-4 py-5 rounded-XL bg-custom-gradient">
          ADD VENDOR
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

export default VendorPage;
