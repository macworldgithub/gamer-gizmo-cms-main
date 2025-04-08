import { useState } from "react";
import { Button, Modal, message } from "antd";
import toast from "react-hot-toast";

const DeleteButton = ({ onDelete }: { onDelete: () => void }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    onDelete(); 
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button
        className="bg-red-700 px-6 py-2 rounded-xl cursor-pointer shadow-lg text-white fonr-bold"
        type="primary"
        danger
        onClick={showModal}
      >
        Delete
      </Button>

      <Modal
        title="Confirm Deletion"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Yes, Delete"
        cancelText="Cancel"
      >
        <p>
          Are you sure you want to delete this item? This action cannot be
          undone.
        </p>
      </Modal>
    </>
  );
};

export default DeleteButton;
