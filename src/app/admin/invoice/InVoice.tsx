"use client";
import React from "react";
import { Button, Table } from "antd";
import Image from "next/image";

const InvoicePage = () => {
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

  return (
    <div className="w-full mx-auto p-6 bg-white min-h-screen">
     
      <div className="flex gap-2 justify-end -mt-4">
        <Image src="/button.png" width={150} height={100} alt="Button" />
      </div>

      
      <div className="flex justify-between items-center mb-4 mt-10 border-b-2 border-gray-400 pb-4">
        <h2 className="text-sm font-semibold">Invoice #125</h2>
        <div className="font-semibold text-sm">Order Id: #1082</div>
      </div>

  
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 justify-center">
        {["From", "To", "Details"].map((title, index) => (
          <div
            key={index}
            className="border border-black rounded-md shadow-sm text-xs w-full md:w-auto lg:max-w-[320px] "
          >
            <div className="bg-gray-200 py-2 rounded-b-xl text-center font-bold">
              {title}
            </div>
            <div className="p-3 text-gray-400">
              {title === "From" && (
                <>
                  <p>Twitter, Inc.</p>
                  <p>795 Folsom Ave, Suite 600</p>
                  <p>San Francisco, CA 94107</p>
                  <p>P: (123) 456-7890</p>
                </>
              )}
              {title === "To" && (
                <>
                  <p>Elaine Hernandez</p>
                  <p>P. Sherman 42, Wallaby Way, Sidney</p>
                  <p>P: (123) 345-6789</p>
                </>
              )}
              {title === "Details" && (
                <>
                  <p>Visa ending ****1234</p>
                  <p>h.elaine@gmail.com</p>
                </>
              )}
            </div>
          </div>
        ))}
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
            className="w-full "
            scroll={{ x: "100%" }} 
            rowClassName={(record, index) =>
              index % 2 === 0 ? "bg-gray-100 rounded-2xl" : "rounded-2xl"
            }
          />
        </div>
      </div>

      
      <div className="flex flex-col items-end space-y-2 text-gray-500 text-sm mt-11">
        <div className="flex justify-between w-48">
          <span>Subtotal</span>
          <span>$1200.00</span>
        </div>
        <div className="flex justify-between w-48">
          <span>Vat(10%)</span>
          <span>$100.00</span>
        </div>
        <div className="flex justify-between w-48 font-semibold">
          <span>Total</span>
          <span>$1300.00</span>
        </div>
      </div>

    
      <div className="flex justify-end mt-4">
        <Button className="bg-custom-gradient text-white px-6 py-5 rounded-2xl">
          Proceed To Payment
        </Button>
      </div>
    </div>
  );
};

export default InvoicePage;
