import { Modal, Form, Input, Button } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { Dispatch, SetStateAction } from "react";

interface AddGpuModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  fetch: () => void;
}

export default function AddGpuModal({ isOpen, setIsOpen, fetch }: AddGpuModalProps) {
  const [form] = Form.useForm();
  const token = localStorage.getItem("admin-x-token");

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/gpu/create`,
        values,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("GPU added successfully!");
      fetch();
      setIsOpen(false);
      form.resetFields();
    } catch (error) {
      console.error("Error adding GPU:", (error as Error).message || error);
      toast.error("Failed to add GPU. Please try again.");
    }
  };

  return (
    <Modal
      title="Add New GPU"
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
          label="GPU Name"
          rules={[{ required: true, message: "Please enter GPU name" }]}
        >
          <Input placeholder="Enter GPU name" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
