"use client";

import { useEffect, useState, useCallback } from "react";
import { Table, Select, Image, Button, message, Popconfirm, Modal } from "antd";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
import AddNewBrand from "../../../components/AddBrandModal";
import dynamic from "next/dynamic";

interface Category {
  id: number;
  name: string;
}

interface Brand {
  id: number;
  name: string;
  logo: string;
  status: boolean;
}

const BrandList = () => {
  // @ts-ignore
  const token = localStorage.getItem("admin-x-token");
  console.log("token",token)
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  // Fetch Brands
  const fetchBrands = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/brands/getAll?category=${selectedCategory}`
      );
      setBrands(res.data.data);
    } catch (error) {
      console.error("Error fetching brands:", error);
      message.error("Failed to load brands.");
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  // Handle Category Change
  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  // Handle Brand Deletion
  const handleDeleteBrand = async (brandId: number) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/brands/delete?id=${brandId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      message.success("Brand deleted successfully!");
      fetchBrands(); // Refresh the list
    } catch (error) {
      console.error("Error deleting brand:", error);
      message.error("Failed to delete brand.");
    }
  };

  // Table Columns
  const columns = [
    {
      title: "Brand Logo",
      dataIndex: "logo",
      key: "logo",
      render: (text: string) => (
        <Image src={` ${text}`} alt="Brand Logo" width={50} height={50} />
      ),
    },
    {
      title: "Brand Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: Brand, b: Brand) => a.name.localeCompare(b.name),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: Brand) => (
        <Popconfirm
          title="Are you sure you want to delete this brand?"
          onConfirm={() => handleDeleteBrand(record.id)}
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
      <h2 className="text-2xl font-semibold mb-4">Brand Management</h2>

      {/* Category Filter Dropdown */}
      <div className="mb-4 flex items-center gap-4">
        <Select
          placeholder="Filter by Category"
          className="w-full md:w-1/3"
          onChange={handleCategoryChange}
          value={selectedCategory}
        >
          {categories.map((category) => (
            <Select.Option key={category.id} value={category.id}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
          className="bg-custom-gradient"
        >
          Add Brand
        </Button>
      </div>

      {/* Brand List Table */}
      <Table
        dataSource={brands}
        columns={columns}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        bordered
      />

      {/* Add Brand Modal */}
      <Modal
        title="Add Brand"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <AddNewBrand
          fetchBrands={fetchBrands}
          categories={categories.map((category) => ({
            id: category.id.toString(),
            name: category.name,
          }))}
          setIsModalOpen={setIsModalOpen}
        />
      </Modal>
    </div>
  );
};

export default dynamic(() => Promise.resolve(BrandList), { ssr: false });
