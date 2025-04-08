"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FormatDate } from "@/components/dateFormate";
import { Table, Button, message, Popconfirm } from "antd";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

// Blog type definition
interface Blog {
  key: number;
  Created_at: string;
  blogId: string;
  title: string;
  description: string;
  tags: string;
}

const BlogList = () => {
  // @ts-ignore
  const token = localStorage.getItem("admin-x-token");
  const [data, setData] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  console.log(data, "data");
  const router = useRouter();
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/getAll`
      );
      // @ts-expect-error hbk jk
      const blogs: Blog[] = response.data.data.map((blog, index: number) => ({
        key: index,
        Created_at: blog.created_at,
        blogId: blog.id,
        title: blog.title,
        description: blog.content,
        tags: blog.tags,
      }));
      setData(blogs);
    } catch (error) {
      message.error("Failed to fetch blog data!");
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const columns = [
    {
      title: "Created_at",
      dataIndex: "Created_at",
      key: "date",
      render: (date: string) => <p>{FormatDate(date)}</p>,
    },
    {
      title: "Blog ID",
      dataIndex: "blogId",
      key: "blogId",
    },
    {
      title: "Blog Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (html: string) => {
        if (!html) return "-";
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;
        const textContent = tempDiv.textContent || tempDiv.innerText || "";
        return textContent.length > 40
          ? `${textContent.slice(0, 40)}...`
          : textContent;
      },
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: Blog) => (
        <div className="flex gap-2">
          {/* Delete Button with Popconfirm */}
          <Popconfirm
            title="Are you sure you want to delete this blog?"
            onConfirm={() => handleDeleteBlog(record.blogId)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger className="w-12">
              Delete
            </Button>
          </Popconfirm>

          {/* Edit Button */}
          <Button
            // type="primary"
            className="w-12 bg-custom-gradient text-white"
            onClick={() => router.push(`BlogList/edit/${record?.blogId}`)}
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  const handleDeleteBlog = async (blogId: string) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/delete?id=${blogId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Blog deleted successfully!");
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
      message.error("Failed to delete blog.");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Blog List</h2>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{ pageSize: 10 }}
        bordered
      />
    </div>
  );
};

export default dynamic(() => Promise.resolve(BlogList), { ssr: false });
