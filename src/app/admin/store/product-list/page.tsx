"use client";
import React from "react";
import ProductTable from "./ProductTable";
import dynamic from "next/dynamic";
const page = () => {
  return (
    <div>
      <ProductTable />
    </div>
  );
};

export default dynamic(() => Promise.resolve(page), { ssr: false });
