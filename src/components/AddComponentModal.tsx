import { Modal, Form, Input, Button } from "antd";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddComponentModal({ isOpen, setIsOpen, fetch }: any) {
  const [form] = Form.useForm();
  // @ts-ignore
  const token = localStorage.getItem("admin-x-token");

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/component-category/create`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Component category added successfully!");
      fetch(); // Refresh the component list
      setIsOpen(false);
      form.resetFields();
    } catch (error) {
      console.error("Error adding component category:", error);
      toast.error("Failed to add component category.");
    }
  };

  return (
    <Modal
      title="Add New Component Category"
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
          label="Component Category"
          rules={[
            { required: true, message: "Please enter the component category" },
          ]}
        >
          <Input placeholder="Enter component category" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
