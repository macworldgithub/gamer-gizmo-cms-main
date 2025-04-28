"use client";
import React from "react";
import RootHeader from "./header";
import SideBar from "./sidebar";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout>
      <RootHeader />
      <Layout>
        <SideBar />

        <Layout style={{ padding: "0 12px 24px" }}>
          {/* <Breadcrumb
            items={[{ title: "" }, { title: "List" }, { title: "App" }]}
            style={{ margin: "16px 0" }}
          /> */}
          <Content
            style={{
              paddingTop: 20,
              paddingBottom: 20,
              margin: 0,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default RootLayout;
