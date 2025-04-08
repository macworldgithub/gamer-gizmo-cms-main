"use client";

import { useEffect, useState } from "react";
import { Table, Button, Popconfirm } from "antd";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import AddProcessorVariantModal from "@/components/AddProcessorVariantModal";
import dynamic from "next/dynamic";

const ProcessorVariant = () => {
  const token = localStorage.getItem("admin-x-token");
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchVaraints = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/processor/getProcessorVariant`
      );
      setVariants(res.data.data);
    } catch (error) {
      console.error("Error fetching models:", error);
      toast.error("Failed to load models.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchVaraints();
  }, []);

  // Table Columns for Models
  const modelColumns = [
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
      // @ts-expect-error jk jk
      render: (_, __, index) => index + 1,
    },
    {
      title: "Processor Variant Name",
      dataIndex: "name",
      key: "name",
      // @ts-expect-error jk jk
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Actions",
      key: "actions",
      // @ts-expect-error jk jk
      render: (_, record) => (
        <Popconfirm
          title="Are you sure you want to delete this variant?"
          onConfirm={() => handleDeleteVariant(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button className="bg-custom-gradient text-white">Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  // Handle Model Deletion
  // @ts-expect-error jk jk
  const handleDeleteVariant = async (id) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/processor/deleteVariant?id=${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Variant deleted successfully!");
      fetchVaraints(); // Refresh the list
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete variant.");
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">
        Processor Variants Management
      </h2>

      {/* Category Dropdown */}
      <div className="mb-4 flex gap-4">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
          className="bg-custom-gradient"
        >
          Add Processor Variant
        </Button>
      </div>

      {/* Models Table */}
      <Table
        dataSource={variants}
        columns={modelColumns}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        bordered
      />

      <AddProcessorVariantModal
        fetch={fetchVaraints}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
    </div>
  );
};

export default dynamic(() => Promise.resolve(ProcessorVariant), { ssr: false });
