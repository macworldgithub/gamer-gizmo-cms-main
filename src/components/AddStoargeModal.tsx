import { Modal, Form, Input, Button } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { Dispatch, SetStateAction } from "react";

interface AddStorageModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  fetch: () => void;
}

export default function AddStorageModal({
  isOpen,
  setIsOpen,
  fetch,
}: AddStorageModalProps) {
  const [form] = Form.useForm();
  // @ts-ignore
  const token = localStorage.getItem("admin-x-token");

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/storage/createStorage`,
        values,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Storage Type added successfully!");
      fetch(); // Refresh the storage list
      setIsOpen(false);
      form.resetFields();
    } catch (error) {
      console.error("Error adding storage:", (error as Error).message || error);
      toast.error("Failed to add storage.");
    }
  };

  return (
    <Modal
      title="Add New Storage"
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      footer={[
        <Button key="cancel" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>,
        <Button
          className="bg-custom-gradient text-white"
          key="create"
          onClick={handleCreate}
        >
          Create
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Storage Name"
          rules={[{ required: true, message: "Please enter Storage" }]}
        >
          <Input placeholder="Enter Storage" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
