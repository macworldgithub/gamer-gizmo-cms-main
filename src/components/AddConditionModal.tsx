import { Modal, Form, Input, Button } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { Dispatch, SetStateAction } from "react";

interface AddConditionModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  fetch: () => void;
}

export default function AddConditionModal({ isOpen, setIsOpen, fetch }: AddConditionModalProps) {
  const [form] = Form.useForm();
  // @ts-ignore
  const token = localStorage.getItem("admin-x-token");

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/conditions/create`,
        values,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Condition added successfully!");
      fetch();
      setIsOpen(false);
      form.resetFields();
    } catch (error) {
      console.error("Error adding condition:", error);
      toast.error("Failed to add condition. Please try again.");
    }
  };

  return (
    <Modal
      title="Add New Condition"
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
          label="Condition Name"
          rules={[{ required: true, message: "Please enter a condition name" }]}
        >
          <Input placeholder="Enter condition name" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
