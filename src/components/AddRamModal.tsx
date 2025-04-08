import { Modal, Form, Input, Button } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { Dispatch, SetStateAction } from "react";

interface AddRamModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  fetch: () => void;
}

export default function AddRamModal({ isOpen, setIsOpen, fetch }: AddRamModalProps) {
  const [form] = Form.useForm();
  // @ts-ignore
  const token = localStorage.getItem("admin-x-token");

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ram/create`,
        values,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("RAM added successfully!");
      fetch(); // Refresh the RAM list
      setIsOpen(false);
      form.resetFields();
    } catch (error) {
      console.error("Error adding RAM:", (error as Error).message || error);
      toast.error("Failed to add RAM.");
    }
  };

  return (
    <Modal
      title="Add New RAM"
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
          label="RAM Name"
          rules={[{ required: true, message: "Please enter RAM name" }]}
        >
          <Input placeholder="Enter RAM name" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
