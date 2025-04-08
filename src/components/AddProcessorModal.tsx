"use client";

import { useState } from "react";
import { Modal, Form, Input, Select, Button } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { Dispatch, SetStateAction } from "react";

// @ts-ignore
interface Variant {
  id: string;
  name: string;
}

interface AddProcessorModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  fetchProcessors: () => void;
  variants: Variant[];
}

interface ProcessorFormValues {
  name: string;
  variant_id: string;
}

export default function AddProcessorModal({
  isOpen,
  setIsOpen,
  fetchProcessors,
  variants,
}: AddProcessorModalProps) {
  const [form] = Form.useForm<ProcessorFormValues>();
  const token = localStorage.getItem("admin-x-token");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: ProcessorFormValues) => {
    setLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/processor/createProcessor`,
        values,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Processor added successfully!");
      setIsOpen(false);
      form.resetFields();
      fetchProcessors();
    } catch (error) {
      console.error("Error adding processor:", error);
      toast.error("Failed to add processor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Add Processor"
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {/* Processor Name */}
        <Form.Item
          name="name"
          label="Processor Name"
          rules={[{ required: true, message: "Please enter processor name" }]}
        >
          <Input placeholder="Enter processor name" />
        </Form.Item>

        {/* Select Variant */}
        <Form.Item
          name="variant_id"
          label="Processor Variant"
          rules={[{ required: true, message: "Select a variant" }]}
        >
          <Select placeholder="Select Variant">
            {variants.map((variant) => (
              <Select.Option key={variant.id} value={variant.id}>
                {variant.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Cores, Threads, Base Clock */}
        {/* <Form.Item name="cores" label="Cores" rules={[{ required: true, message: "Enter number of cores" }]}>          
          <InputNumber min={1} className="w-full" placeholder="Enter cores" />
        </Form.Item>
        
        <Form.Item name="threads" label="Threads" rules={[{ required: true, message: "Enter number of threads" }]}>          
          <InputNumber min={1} className="w-full" placeholder="Enter threads" />
        </Form.Item>
        
        <Form.Item name="base_clock" label="Base Clock (GHz)" rules={[{ required: true, message: "Enter base clock speed" }]}>          
          <InputNumber min={0.1} step={0.1} className="w-full" placeholder="Enter base clock speed" />
        </Form.Item> */}

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full bg-custom-gradient"
          >
            Add Processor
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
