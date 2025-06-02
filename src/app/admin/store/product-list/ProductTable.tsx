"use client";

import { useEffect, useState, useCallback } from "react";
import { Table, Select, Button, message, Popconfirm } from "antd";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import AddNewModelModal from "@/components/AddModelModal";
import dynamic from "next/dynamic";
import Image from "next/image";
import { FormatDate } from "@/components/dateFormate";
import { useRouter } from "next/navigation";

const ProductLust = () => {
  const token = localStorage.getItem("admin-x-token");
  const [variants, setVariants] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(1);
  const [categories, setCategories] = useState<any[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 1. Load categories and selectedCategory from localStorage
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/getAll`
        );
        setCategories(res.data.data);

        // Read from localStorage
        const savedCategory = localStorage.getItem("selectedCategory");
        const defaultCategory = savedCategory
          ? Number(savedCategory)
          : res.data.data[0]?.id;

        setSelectedCategory(defaultCategory);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);


  useEffect(() => {
    if (selectedCategory !== null) {
      fetchProducts(selectedCategory);
    }
  }, [selectedCategory]);

  // 3. Fetch products
  const fetchProducts = async (categoryId: number) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getAll?category_id=${categoryId}&is_store_product=true`
      );
      setVariants(res.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

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
      title: "Image",
      dataIndex: "images",
      key: "name",
      // @ts-expect-error jh kj
      render: (text, record) => (
        <div className="w-[50px] h-[50px] overflow-hidden flex items-center justify-center">
          {text && text[0]?.image_url ? (
            <Image
              src={text[0].image_url.startsWith('http') ? text[0].image_url : `${process.env.NEXT_PUBLIC_API_BASE_URL}/${text[0].image_url}`}
              alt="Product Image"
              width={50}
              height={50}
              className="object-cover rounded"
              onError={(e) => {
                // @ts-ignore
                e.target.src = '/placeholder-image.png'; // You should add a placeholder image in your public folder
              }}
            />
          ) : (
            <div className="w-[50px] h-[50px] bg-gray-200 rounded flex items-center justify-center">
              <span className="text-xs text-gray-500">No image</span>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      // @ts-expect-error jh kj
      render: (_, record) => <p>{record.name.slice(0, 30)}...</p>,
    },

    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      // @ts-expect-error jh kj
      render: (_, record) => <p>{record.description.slice(0, 30)}...</p>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Posted At",
      dataIndex: "created_at",
      key: "created_at",
      // @ts-expect-error jh kj
      render: (_, record) => <p>{FormatDate(_)}</p>,
    },
    {
      title: "Posted By",
      dataIndex: "created_by",
      key: "created_by",
    },
    {
      title: "Actions",
      key: "actions",
      // @ts-expect-error jk jk
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            onClick={() =>
              router.push(`/admin/product-list/viewdetail/${record.id}`)
            }
            className="bg-custom-gradient text-white"
          >
            View Details
          </Button>
          <Button
            onClick={() =>
              router.push(`/admin/store/product-list/edit/${record.id}`)
            }
            className="bg-custom-gradient text-white"
          >
            Edit
          </Button>
        </div>

      ),
    },
  ];
  // 4. Update localStorage when category changes
  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategory(categoryId);
    localStorage.setItem("selectedCategory", String(categoryId));
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Store Products Management</h2>
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

      {/* <AddConditionModal
        fetch={fetchVaraints}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      /> */}
    </div>
  );
};

export default dynamic(() => Promise.resolve(ProductLust), { ssr: false });
