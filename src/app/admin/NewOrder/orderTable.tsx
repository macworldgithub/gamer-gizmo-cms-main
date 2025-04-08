"use client";

import React, { useState, useEffect } from "react";
import { Dropdown, Menu, Select, Input, Pagination } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";

const { Search } = Input;
const { Option } = Select;

const OrderTable = () => {
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = () => {
      const fakeData = Array.from({ length: 100 }, (_, i) => ({
        key: i,
        date: "2022-12-31 03:36 AM",
        orderId: `#DRS${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        product: "Console",
        price: "$1561",
      }));
      // @ts-expect-error kjhkj
      setData(fakeData);
    };

    fetchData();
  }, []);

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <a href="#details">View Details</a>
      </Menu.Item>
      <Menu.Item key="2">
        <a href="#edit">Edit Order</a>
      </Menu.Item>
      <Menu.Item key="3">
        <a href="#delete">Delete</a>
      </Menu.Item>
    </Menu>
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto py-8 max-sm:py-4">
      {/* Controls Section */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-4 max-sm:gap-2">
        <div className="flex items-center gap-4 max-sm:gap-2">
          <label className="text-black text-sm max-sm:text-xs">Show</label>
          <Select
            defaultValue={10}
            onChange={(value) => setPageSize(value)}
            className="w-20 max-sm:w-16 text-sm max-sm:text-xs"
          >
            {[7, 10, 20, 30, 50].map((size) => (
              <Option key={size} value={size}>
                {size}
              </Option>
            ))}
          </Select>
          <span className="text-black text-sm max-sm:text-xs">Entries</span>
        </div>
        <Search
          placeholder="Search"
          onSearch={(value) => console.log(value)}
          className="w-full sm:max-w-xs sm:w-1/2 md:w-1/3 max-sm:text-xs"
        />
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white p-4">
        {/* Header Row */}
        <div className="bg-gray-100 border border-gray-200 rounded-2xl shadow-sm grid grid-cols-5 gap-4 items-center min-w-[600px]">
          <div className="text-gray-600 font-semibold text-center">Date</div>
          <div className="text-gray-600 font-semibold text-center">
            Order ID
          </div>
          <div className="text-gray-600 font-semibold text-center">Product</div>
          <div className="text-gray-600 font-semibold text-center">Price</div>
          <div className="text-gray-600 font-semibold text-center">Action</div>
        </div>

        {/* Data Rows */}
        <div className="space-y-4 max-sm:space-y-2">
          {currentData.map((row) => (
            <div
              // @ts-expect-error kjhkj
              key={row.key}
              className="border border-black rounded-2xl p-4 shadow-sm grid grid-cols-5 gap-4 items-center min-w-[600px] md:grid-cols-5 max-sm:gap-2 max-sm:text-xs max-sm:p-2"
            >
              {/* @ts-expect-error kjhkj */}

              <div className="text-black text-center">{row.date}</div>
              {/* @ts-expect-error kjhkj */}
              <div className="text-black text-center">{row.orderId}</div>
              {/* @ts-expect-error kjhkj */}
              <div className="text-black text-center">{row.product}</div>
              {/* @ts-expect-error kjhkj */}
              <div className="text-black text-center">{row.price}</div>
              <div className="flex justify-center">
                <Dropdown overlay={menu} trigger={["click"]}>
                  <button className="flex items-center justify-center text-purple-500 border border-purple-500 px-3 py-1 rounded hover:bg-purple-500 hover:text-white transition max-sm:text-xs max-sm:px-2 max-sm:py-1">
                    Info <DownOutlined className="ml-2 max-sm:text-xs" />
                  </button>
                </Dropdown>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Pagination Section */}
      <div className="flex justify-between items-center mt-4 flex-wrap gap-4">
        <div className="text-gray-600">
          Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of{" "}
          {data.length}
        </div>
        <Pagination
          current={currentPage}
          total={data.length}
          pageSize={pageSize}
          onChange={handlePageChange}
          showSizeChanger={false}
          className="pagination-custom text-xs sm:text-sm"
          responsive
        />
      </div>
    </div>
  );
};

export default OrderTable;
