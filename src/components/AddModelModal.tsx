import { useState } from "react";
import { Modal, Form, Select, Input, Button } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { Dispatch, SetStateAction } from "react";

interface Category {
  id: string;
  name: string;
}

interface AddNewModelModalProps {
  isOpen: boolean;
  categories: Category[];
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  fetchModels: () => void;
}

export default function AddNewModelModal({
  isOpen,
  categories,
  setIsOpen,
  fetchModels,
}: AddNewModelModalProps) {
  const [form] = Form.useForm();
  // @ts-ignore
  const token = localStorage.getItem("admin-x-token");
  const [brands, setBrands] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const fetchBrands = async (categoryId: string) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/brands/getAll?category=${categoryId}`
      );
      setBrands(res.data.data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    form.setFieldsValue({ brand_id: null }); // Reset brand selection
    fetchBrands(value);
  };

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/models/create`,
        values,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Model added successfully!");
      fetchModels(); // Refresh the model list
      setIsOpen(false);
      form.resetFields();
    } catch (error) {
      console.error("Error adding model:", error);
      toast.error("Failed to add model.");
    }
  };

  return (
    <Modal
      title="Add New Model"
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      footer={[
        <Button key="cancel" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>,
        <Button key="create" type="primary" onClick={handleCreate}>
          Create
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="category_id"
          label="Category"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Select placeholder="Select Category" onChange={handleCategoryChange}>
            {categories.map((category) => (
              <Select.Option key={category.id} value={category.id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="brand_id"
          label="Brand"
          rules={[{ required: true, message: "Please select a brand" }]}
        >
          <Select
            placeholder="Select Brand"
            loading={loading}
            disabled={!selectedCategory}
          >
            {brands.map((brand) => (
              <Select.Option key={brand.id} value={brand.id}>
                {brand.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="name"
          label="Model Name"
          rules={[{ required: true, message: "Please enter model name" }]}
        >
          <Input placeholder="Enter Model Name" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
