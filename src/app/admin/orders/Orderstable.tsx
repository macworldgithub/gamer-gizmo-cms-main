"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Tag, Button, Drawer, Spin, message, Modal } from "antd";
import moment from "moment";
import OrderDetailsDrawer from "./OderDetails";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import "antd/dist/reset.css"; // ✅ Required for Ant Design v5+
import ConfirmModal from "./StatusModal";

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [orderToUpdate, setOrderToUpdate] = useState<any>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const token = localStorage.getItem("admin-x-token");

    if (!token) {
      //@ts-ignore
      message.error("Please login to view orders."); // AntD message
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/admin/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      //@ts-ignore

      message.error("Failed to fetch orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const openConfirmModal = (order: any) => {
    setOrderToUpdate(order);
    setShowConfirmModal(true);
  };

  const handleConfirmStatusChange = async () => {
    if (!orderToUpdate) return;

    try {
      const token = localStorage.getItem("admin-x-token");
      console.log(token, "admin-x-toke");

      if (!token) {
        //@ts-ignore
        message.error("Token not found. Please login.");
        return;
      }

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/order/${orderToUpdate.id}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      message.success(`Status changed to "${response.data.payment_status}"`);
      fetchOrders();
    } catch (error) {
      console.error("Error changing status", error);
      //@ts-ignore
      message.error("Failed to change status.");
    } finally {
      setShowConfirmModal(false);
      setOrderToUpdate(null);
    }
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      render: (id: number) => `ORD-${id}`,
    },
    {
      title: "Status",
      key: "status",
      render: (_: any, record: any) => {
        const status =
          record.transactions?.[0]?.transaction_status || record.payment_status;
        let color =
          status === "pending"
            ? "orange"
            : status === "DELIVERED"
            ? "green"
            : "blue";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Customer",
      key: "customer",
      render: (_: any, record: any) =>
        `${record.users?.first_name || "-"} ${record.users?.last_name || ""}`,
    },
    {
      title: "Amount",
      dataIndex: "total_amount",
      key: "amount",
      render: (amount: string) => `AED ${amount}`,
    },
    {
      title: "Shipping Address",
      dataIndex: "shipping_address",
      key: "shipping_address",
    },
    {
      title: "Payment",
      key: "payment",
      render: (_: any, record: any) => (
        <span className="capitalize">
          {record.payment_method.replace("_", " ")}
        </span>
      ),
    },
    {
      title: "Date",
      key: "created_at",
      render: (_: any, record: any) =>
        moment(record.created_at).format("YYYY-MM-DD HH:mm"),
    },

    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) =>
        record.payment_method === "cash_on_delivery" ? (
          <Button
            type="default"
            className="text-white bg-[#dc39fc] hover:bg-[#c32ee0] border-none text-[0.7rem] p-2"
            onClick={(e) => {
              e.stopPropagation();
              openConfirmModal(record);
            }}
          >
            Change Status
          </Button>
        ) : (
          <div className="">-</div>
        ),
    },
  ];

  return (
    <div className="p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">All Orders</h1>

      {loading ? (
        <div className="text-center py-10">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          dataSource={orders}
          columns={columns}
          rowKey="id"
          scroll={{ x: "max-content" }}
          onRow={(record) => ({
            onClick: () => {
              setSelectedOrder(record);
              setDrawerVisible(true);
            },
          })}
        />
      )}

      <Drawer
        //@ts-ignore
        title={`Order Details - ORD-${selectedOrder?.id}`}
        placement="right"
        width={600}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        {selectedOrder ? (
          <OrderDetailsDrawer order={selectedOrder} />
        ) : (
          <p>No order selected</p>
        )}
      </Drawer>
      <ConfirmModal
        visible={showConfirmModal}
        title="Change Payment Status"
        content={`Are you sure you want to change status to "${
          orderToUpdate?.payment_status === "pending" ? "complete" : "pending"
        }"?`}
        onConfirm={handleConfirmStatusChange}
        onCancel={() => setShowConfirmModal(false)}
        confirmText="Yes, Change"
        cancelText="Cancel"
      />
    </div>
  );
};

export default OrdersTable;
