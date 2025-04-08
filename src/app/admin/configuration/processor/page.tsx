"use client";

import { useEffect, useState } from "react";
import { Table, Select, Button, message, Popconfirm } from "antd";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import AddProcessorModal from "@/components/AddProcessorModal";
import dynamic from "next/dynamic";

interface Variant {
  id: number;
  name: string;
}

interface Processor {
  id: number;
  name: string;
}

function ProcessorList() {
  const token = localStorage.getItem("admin-x-token");
  const [variants, setVariants] = useState<Variant[]>([]);
  const [processors, setProcessors] = useState<Processor[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch Processor Variants
  useEffect(() => {
    const fetchVariants = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/processor/getProcessorVariant`
        );
        setVariants(res.data.data);
        setSelectedVariant(res.data.data[0]?.id || null);
      } catch (error) {
        console.error("Error fetching processor variants:", error);
      }
    };
    fetchVariants();
  }, []);

  // Fetch Processors based on selected variant
  useEffect(() => {
    const fetchProcessors = async () => {
      if (!selectedVariant) return;
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/processor/getProcessor?variant=${selectedVariant}`
        );
        setProcessors(res.data.data);
      } catch (error) {
        console.error("Error fetching processors:", error);
        message.error("Failed to load processors.");
      } finally {
        setLoading(false);
      }
    };
    fetchProcessors();
  }, [selectedVariant]);

  // Handle variant change
  const handleVariantChange = (variantId: number) => {
    setSelectedVariant(variantId);
    setProcessors([]); // Reset processor list
  };

  // Delete a processor
  const handleDeleteProcessor = async (processorId: number) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/processor/deleteProcessor?id=${processorId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Processor deleted successfully!");
      setProcessors((prev) =>
        prev.filter((processor) => processor.id !== processorId)
      );
    } catch (error) {
      console.error("Failed to delete processor:", error);
      toast.error("Failed to delete processor.");
    }
  };

  // Table columns definition with proper typing
  const processorColumns = [
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
      render: (_: unknown, __: unknown, index: number) => index + 1,
    },
    {
      title: "Processor Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: Processor, b: Processor) => a.name.localeCompare(b.name),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: Processor) => (
        <Popconfirm
          title="Are you sure you want to delete this processor?"
          onConfirm={() => handleDeleteProcessor(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button className="bg-custom-gradient text-white">Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Processor Management</h2>

      <div className="mb-4 flex gap-4">
        <Select
          placeholder="Select Processor Variant"
          className="w-1/3"
          onChange={(value) => handleVariantChange(Number(value))}
          value={selectedVariant}
          loading={loading}
        >
          {variants.map((variant) => (
            <Select.Option key={variant.id} value={variant.id}>
              {variant.name}
            </Select.Option>
          ))}
        </Select>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
          className="bg-custom-gradient"
        >
          Add Processor
        </Button>
      </div>

      <Table
        dataSource={processors}
        columns={processorColumns}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        bordered
      />

      <AddProcessorModal
        fetchProcessors={() => setSelectedVariant((prev) => prev)} // Trigger refresh
        variants={variants.map((variant) => ({
          ...variant,
          id: variant.id.toString(), // Convert id to string
        }))}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
    </div>
  );
}

export default dynamic(() => Promise.resolve(ProcessorList), { ssr: false });
