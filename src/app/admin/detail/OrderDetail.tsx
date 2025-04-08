"use client";
import React from "react";
import {  Table, Steps } from "antd";
import Image from "next/image";

const { Step } = Steps;

const OrderDetail = () => {
  const columns = [
    { title: "#", dataIndex: "key", key: "key" },
    { title: "Image", dataIndex: "image", key: "image" },
    { title: "Product", dataIndex: "product", key: "product" },
    { title: "Price/Unit", dataIndex: "price", key: "price" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Sub Total", dataIndex: "subtotal", key: "subtotal" },
  ];

  const data = [
    {
      key: 1,
      product: "Gaming Console",
      price: "15",
      quantity: "$75",
      subtotal: "$1255.00",
    },
    {
      key: 2,
      product: "Gaming Console",
      price: "15",
      quantity: "$75",
      subtotal: "$1250.00",
    },
    {
      key: 3,
      product: "Gaming Console",
      price: "2",
      quantity: "$75",
      subtotal: "$3400.00",
    },
  ];
  const steps = [
    { title: "Confirmed Order", img: "/Confirm.png" },
    { title: "Processing Order", img: "/Processing.png" },
    { title: "Order Dispatched", img: "/Dispatched.png" },
    { title: "On Delivery", img: "/Delivery.png" },
    { title: "Product Delivered", img: "/Product.png" },
  ];

  return (
    <div className="w-full mx-auto p-6 bg-white min-h-screen">
    
      <div className="flex justify-between items-center mb-4 mt-10 border-b-2 border-gray-400 pb-4">
        <h2 className="text-sm font-semibold">Invoice #125</h2>
        <div className="font-semibold text-sm">Order Id: #1082</div>
      </div>

    
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10 justify-center">
        {["Customer", "Shipped To", "Payment Method", "OrderDate"].map(
          (title, index) => (
            <div
              key={index}
              className="border border-black  shadow-sm text-xs w-full md:w-auto lg:max-w-[320px] rounded-t-lg rounded-b-2xl"
            >
              <div className="bg-gray-200 py-2 rounded-b-xl text-center font-bold">
                {title}
              </div>
              <div className="p-3 text-gray-400">
                {title === "Customer" && (
                  <>
                    <p>Twitter, Inc.</p>
                    <p>795 Folsom Ave, Suite 600</p>
                    <p>San Francisco, CA 94107</p>
                    <p>P: (123) 456-7890</p>
                  </>
                )}
                {title === "Shipped To" && (
                  <>
                    <p>Elaine Hernandez</p>
                    <p>P. Sherman 42, Wallaby Way, Sidney</p>
                    <p>P: (123) 345-6789</p>
                  </>
                )}
                {title === "Payment Method" && (
                  <>
                    <p>Visa ending ****1234</p>
                    <p>h.elaine@gmail.com</p>
                  </>
                )}
                {title === "OrderDate" && (
                  <>
                    <p>4:34PM,</p>
                    <p> Wed, Aug 13,2020</p>
                  </>
                )}
              </div>
            </div>
          )
        )}
      </div>

    
      <div className="mt-16">
        <div className="bg-gray-200 px-8 font-semibold text-sm text-center rounded-2xl h-6">
          Product Summary
        </div>

        <div className="overflow-x-auto ">
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            className="w-full"
            scroll={{ x: "100%" }}
            rowClassName={(record, index) =>
              index % 2 === 0 ? "bg-gray-100 rounded-2xl" : "rounded-2xl"
            }
          />
        </div>
      </div>
      <div className="flex flex-col items-end space-y-2 text-gray-500 text-sm mt-11">
        <div className="flex justify-between w-48">
          <span>Taxes</span>
          <span>N/A</span>
        </div>

        <div className="relative w-full flex justify-end">
          
          <div className="absolute inset-0 bg-gray-300 rounded-lg"></div>

     
          <div className="flex justify-between w-48  relative z-10">
            <span>Total (10%)</span>
            <span>$2400.00</span>
          </div>
        </div>

        <div className="flex justify-between w-48 font-semibold">
          <span>Payment Status</span>
          <span>Paid</span>
        </div>
      </div>

      
      <div className="mt-10 p-4 rounded-lg text-center">
        <p className="text-sm text-gray-600 ">
          Tracking Order No - 34VB5540K83
        </p>
        <div className="flex flex-col md:flex-row justify-between items-center mt-2 bg-gray-300 md:bg-gray-200 md:p-1 md:text-xs p-3 w-full rounded-lg">
          <span className="flex-1 text-center">Shipped Via: UPS Ground</span>
          <span className="font-bold flex-1 text-center">
            Status: Checking Quality
          </span>
          <span className="flex-1 text-center">Expected Date: DEC 09,2024</span>
        </div>

        <div className="mt-10 p-4 rounded-lg text-center  ">
          <Steps current={5} className="mt-2">
            {steps.map((step, index) => (
              <Step
                key={index}
                icon={
                  <div className="flex flex-col items-center">
                    <Image
                      src={step.img}
                      width={50}
                      height={50}
                      className="md:w-[2rem] md:h-[2rem] lg:w-[3rem] lg:h-[3rem]"
                      alt={step.title}
                    />
                    <span className="mt-2 text-xs md:text-[8px] lg:text-xs text-black">
                      {step.title}
                    </span>
                  </div>
                }
              />
            ))}
          </Steps>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
