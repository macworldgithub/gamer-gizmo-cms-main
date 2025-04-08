"use client";

import { useEffect, useState } from "react";
import { Table, Tag, message } from "antd";
import axios from "axios";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/admin/getAll`
      );
      setCategories(res.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      message.error("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  };

  const categoryColumns = [
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
      // @ts-expect-error jk jk
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Product Count",
      dataIndex: "count",
      key: "count",
      // @ts-expect-error jk jk

      sorter: (a, b) => a.productCount - b.productCount,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",

      // @ts-expect-error jk jk
      onFilter: (value, record) => record.status === value,
      render: () => (
        <Tag className="bg-custom-gradient text-white">{"Active"}</Tag>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Our Categories</h2>
      <Table
        dataSource={categories}
        columns={categoryColumns}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        bordered
      />
    </div>
  );
}
