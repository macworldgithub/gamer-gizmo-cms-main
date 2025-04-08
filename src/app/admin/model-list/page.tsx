"use client";

import { useEffect, useState, useCallback } from "react";
import { Table, Select, Button, message, Popconfirm } from "antd";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import AddNewModelModal from "@/components/AddModelModal";
import dynamic from "next/dynamic";

// @ts-ignore
// interface Category {
//   id: number;
//   name: string;
// }

interface Brand {
  id: number;
  name: string;
}

interface Model {
  id: number;
  name: string;
}

const ModelList = () => {
  const token = localStorage.getItem("admin-x-token");
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(1);
  const [selectedBrand, setSelectedBrand] = useState<number | null>(29);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/getAll`
        );
        setCategories(res.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch Brands using useCallback to avoid dependency warning
  const fetchBrands = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/brands/getAll?category=${selectedCategory}`
      );
      setBrands(res.data.data);
      setSelectedBrand(res.data.data[0]?.id || null);
      setModels([]);
    } catch (error) {
      console.error("Error fetching brands:", error);
      message.error("Failed to load brands.");
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedCategory) {
      fetchBrands();
    }
  }, [selectedCategory, fetchBrands]);

  // Fetch Models using useCallback to avoid dependency warning
  const fetchModels = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/models/getAll?brand=${selectedBrand}`
      );
      setModels(res.data.data);
    } catch (error) {
      console.error("Error fetching models:", error);
      message.error("Failed to load models.");
    } finally {
      setLoading(false);
    }
  }, [selectedBrand]);

  useEffect(() => {
    if (selectedBrand) {
      fetchModels();
    }
  }, [selectedBrand, fetchModels]);

  // Handle Category Change
  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategory(categoryId);
    setBrands([]);
    setModels([]);
  };

  // Handle Brand Change
  const handleBrandChange = (brandId: number) => {
    setSelectedBrand(brandId);
  };

  // Table Columns for Models
  const modelColumns = [
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
      render: (_: unknown, __: unknown, index: number) => index + 1, // Serial number starts from 1
    },
    {
      title: "Model Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: Model, b: Model) => a.name.localeCompare(b.name),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: Model) => (
        <Popconfirm
          title="Are you sure you want to delete this model?"
          onConfirm={() => handleDeleteModel(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  // Handle Model Deletion
  const handleDeleteModel = async (modelId: number) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/models/delete?id=${modelId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Model deleted successfully!");
      fetchModels(); // Refresh the list
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete model.");
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Model Management</h2>

      {/* Category and Brand Dropdowns */}
      <div className="mb-4 flex gap-4">
        <Select
          placeholder="Select Category"
          className="w-1/3"
          onChange={handleCategoryChange}
          value={selectedCategory ?? undefined}
          loading={loading}
        >
          {categories.map((category) => (
            <Select.Option key={category.id} value={category.id}>
              {category.name}
            </Select.Option>
          ))}
        </Select>

        <Select
          placeholder="Select Brand"
          className="w-1/3"
          onChange={handleBrandChange}
          value={selectedBrand ?? undefined}
          disabled={!selectedCategory}
          loading={loading}
        >
          {brands.map((brand) => (
            <Select.Option key={brand.id} value={brand.id}>
              {brand.name}
            </Select.Option>
          ))}
        </Select>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
        >
          Add Model
        </Button>
      </div>

      {/* Models Table */}
      <Table
        dataSource={models}
        columns={modelColumns}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        bordered
      />

      <AddNewModelModal
        fetchModels={fetchModels}
        categories={categories}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
    </div>
  );
};

export default dynamic(() => Promise.resolve(ModelList), { ssr: false });
