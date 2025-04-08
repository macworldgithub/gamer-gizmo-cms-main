import { Modal, Form, Input, Button } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { Dispatch, SetStateAction } from "react";

interface AddStorageTypeModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  fetch: () => void;
}

export default function AddStorageTypeModal({
  isOpen,
  setIsOpen,
  fetch,
}: AddStorageTypeModalProps) {
  const [form] = Form.useForm();
  // @ts-ignore
  const token = localStorage.getItem("admin-x-token");

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/storage/createStorageType`,
        values,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Storage Type added successfully!");
      fetch(); // Refresh the storage type list
      setIsOpen(false);
      form.resetFields();
    } catch (error: unknown) {
      console.error("Error adding Storage Type:", error);
      toast.error("Failed to add Storage Type.");
    }
  };

  return (
    <Modal
      title="Add New Storage Type"
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
          label="Storage Type Name"
          rules={[{ required: true, message: "Please enter Storage Type" }]}
        >
          <Input placeholder="Enter Storage Type" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
