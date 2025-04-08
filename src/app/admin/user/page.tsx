"use client";
import React from "react";
import ListUser from "./ListUser";
import dynamic from "next/dynamic";

const UserPage = () => {
  return (
    <div>
      <ListUser />
    </div>
  );
};

export default dynamic(() => Promise.resolve(UserPage), { ssr: false });
