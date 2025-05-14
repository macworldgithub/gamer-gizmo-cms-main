"use client";
import React, { useState } from "react";
import Sider from "antd/es/layout/Sider";
import { FaListUl } from "react-icons/fa";

const ClientSideBar = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <>
      <Sider
        collapsed={isCollapsed}
        width={250}
        className="h-full  min-h-screen bg-white max-md:hidden"
        collapsible
        trigger={null}
      >
        {children}
      </Sider>
      {isCollapsed ? (
        <div
          onClick={() => {
            setIsCollapsed(false);
          }}
          className="p-2 hover:bg-gray-200 hover:cursor-pointer h-fit"
        >
          <FaListUl size={20} />
          {/* <TbLayoutSidebarRightCollapseFilled size={20} /> */}
        </div>
      ) : (
        <div
          onClick={() => {
            setIsCollapsed(true);
          }}
          className="p-2 hover:bg-gray-200 hover:cursor-pointer "
        >
          <FaListUl size={20} />
          {/* <TbLayoutSidebarLeftCollapseFilled size={20} /> */}
        </div>
      )}
    </>
  );
};

export default ClientSideBar;
