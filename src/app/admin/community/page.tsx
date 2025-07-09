"use client";

import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm, message } from "antd";
import axios from "axios";



interface CommunityItem {
  key: number;
  username: string;
  title: string;
  description: string;
}

const CommunityPage = () => {
  const [data, setData] = useState<CommunityItem[]>([]);
  const [loading, setLoading] = useState(false);
  const limit = 10;


  const token = typeof window !== 'undefined' ? localStorage.getItem("admin-x-token") : null;


  const fetchCommunity = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/chats/community/list?limit=${limit}`,
         token ? { headers: { Authorization: `Bearer ${token}` } } : {}
         
      );
      const items: CommunityItem[] = (response.data.data || []).map((item: any, index: number) => ({
        key: item.id || index,
        username: item.creator?.username || "-",
        title: item.name || "-",
        description: item.description || "-",
      }));
      setData(items);
    } catch (error) {
      message.error("Failed to fetch community data!");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

//   const fetchCommunity = async () => {
//   setLoading(true);
//   try {
//     const response = await axios.get(
//       `${process.env.NEXT_PUBLIC_API_BASE_URL}/chats/community/list`,
//       token ? { headers: { Authorization: `Bearer ${token}` } } : {}
//     );
//     const items: CommunityItem[] = (response.data.data || []).map((item: any, index: number) => ({
//       key: item.id || index,
//       username: item.creator?.username || "-",
//       title: item.name || "-",
//       description: item.description || "-",
//     }));
//     setData(items);
//   } catch (error) {
//     message.error("Failed to fetch community data!");
//     setData([]);
//   } finally {
//     setLoading(false);
//   }
// };

  useEffect(() => {
    fetchCommunity();
  }, []);


  const handleDelete = async (key: number) => {
    if (!token) {
      message.error("No token found. Please login again.");
      return;
    }
    try {
      setLoading(true);
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/chats/community/delete/${key}`,
       { params: { communityChatId: key }, headers: { Authorization: `Bearer ${token}` } }

      );
      message.success("Community deleted successfully!");
      fetchCommunity();
    } catch (error) {
      message.error("Failed to delete community!");
    } finally {
      setLoading(false);
    }
  };

//   const handleDelete = async (key: number) => {
//   if (!token) {
//     message.error("No token found. Please login again.");
//     return;
//   }
//   try {
//     setLoading(true);
//     await axios.delete(
//       `${process.env.NEXT_PUBLIC_API_BASE_URL}/chats/community/delete/${key}`,
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     message.success("Community deleted successfully!");
//     fetchCommunity();
//   } catch (error) {
//     message.error("Failed to delete community!");
//   } finally {
//     setLoading(false);
//   }
// };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text: string) => text?.length > 40 ? `${text.slice(0, 40)}...` : text,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: CommunityItem) => (
        <Popconfirm
          title="Are you sure you want to delete this item?"
          onConfirm={() => handleDelete(record.key)}
          okText="Yes"
          cancelText="No"
        >
         
          <Button  className="bg-custom-gradient text-white">  Delete</Button>
        
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Community List</h2>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{ pageSize: 10 }}
        // pagination={false}

        bordered
      />
    </div>
  );
};

export default CommunityPage;