import { Modal, Form, Input, Button } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { Dispatch, SetStateAction } from "react";

interface AddLocationModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  fetch: () => void;
}

export default function AddLocationModal({ isOpen, setIsOpen, fetch }: AddLocationModalProps) {
  const [form] = Form.useForm();
  // @ts-ignore
  const token = localStorage.getItem("admin-x-token");

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/location/create`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Location added successfully!");
      fetch(); // Refresh the location list
      setIsOpen(false);
      form.resetFields();
    } catch (error) {
      console.error("Error adding location:", (error as Error).message || error);
      toast.error("Failed to add location. Please try again.");
    }
  };

  return (
    <Modal
      title="Add New Location"
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
          label="Location Name"
          rules={[{ required: true, message: "Please enter location name" }]}
        >
          <Input placeholder="Enter location name" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
