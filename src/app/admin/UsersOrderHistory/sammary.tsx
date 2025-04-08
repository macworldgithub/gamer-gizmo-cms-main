"use client";

import React from "react";

const SalesSummary = () => {
  const data = [
    {
      title: "Total Sell",
      sales: [
        {
          product: "Console",
          price: "$5162",
          status: "Active",
          date: "2021-10-20",
          action: "In Stock",
        },
        {
          product: "Laptop",
          price: "$2200",
          status: "Active",
          date: "2021-11-10",
          action: "Out of Stock",
        },
      ],
    },
    {
      title: "Monthly Sell",
      sales: [
        {
          product: "Tablet",
          price: "$3000",
          status: "Active",
          date: "2021-12-01",
          action: "In Stock",
        },
        {
          product: "Phone",
          price: "$1500",
          status: "Inactive",
          date: "2021-12-05",
          action: "In Stock",
        },
      ],
    },
  ];

  return (
    <div className="flex justify-between gap-4 bg-gray-100 rounded-lg w-full max-lg:flex-col">
      {data.map((summary, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg p-4 flex-1 w-1/2 max-lg:w-full"
        >
          <h3 className="text-sm font-semibold mb-2">{summary.title}</h3>
          <div className="grid grid-cols-5 text-xs text-gray-700 font-semibold mb-2">
            <div>Product</div>
            <div>Price</div>
            <div>Status</div>
            <div>Date</div>
            <div>Action</div>
          </div>
          {summary.sales.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-5 text-xs text-gray-700 border-t py-1 font-semibold"
            >
              <div>{item.product}</div>
              <div>{item.price}</div>
              <div
                className={`font-semibold ${
                  item.status === "Active" ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.status}
              </div>
              <div className="font-semibold">{item.date}</div>
              <div className="text-blue-600 font-semibold">{item.action}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SalesSummary;
