"use client";

import { Modal, Form, Input, Button } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { Dispatch, SetStateAction } from "react";

// @ts-ignore
interface AddProcessorVariantModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  fetch: () => void;
}

interface ProcessorVariantFormValues {
  name: string;
}

export default function AddProcessorVariantModal({
  isOpen,
  setIsOpen,
  fetch,
}: AddProcessorVariantModalProps) {
  const [form] = Form.useForm<ProcessorVariantFormValues>();
  const token = localStorage.getItem("admin-x-token");

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/processor/createVariant`,
        values,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Processor variant added successfully!");
      fetch(); // Refresh the processor variant list
      setIsOpen(false);
      form.resetFields();
    } catch (error) {
      console.error("Error adding processor variant:", error);
      toast.error("Failed to add processor variant.");
    }
  };

  return (
    <Modal
      title="Add New Processor Variant"
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
          name="name"
          label="Processor Variant Name"
          rules={[
            { required: true, message: "Please enter processor variant name" },
          ]}
        >
          <Input placeholder="Enter processor variant name" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
