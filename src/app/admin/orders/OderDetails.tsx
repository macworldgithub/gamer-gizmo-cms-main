import React from "react";
import { Divider, Tag } from "antd";
import Image from "next/image";
import moment from "moment";

const OrderDetailsDrawer = ({ order }: { order: any }) => {
  if (!order) return null;

  const user = order.users;
  const transaction = order.transactions?.[0];

  return (
    <div className="space-y-6 text-sm text-black dark:text-white">
      {/* Order Info */}
      <div>
        <h3 className="font-semibold text-lg text-[#dc39fc]">Order Info</h3>
        <Divider />
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-gray-700 ">
              <strong className="text-gray-800 ">Order ID:</strong> ORD-
              {order.id}
            </p>
            <p className="text-gray-700 ">
              <strong className="text-gray-800 ">Status:</strong>{" "}
              <Tag
                color={
                  (transaction?.transaction_status ?? order.order_status) ===
                  "PENDING"
                    ? "orange"
                    : (transaction?.transaction_status ??
                        order.order_status) === "DELIVERED"
                    ? "green"
                    : "blue"
                }
              >
                {(
                  transaction?.transaction_status ?? order.order_status
                ).toUpperCase()}
              </Tag>
            </p>
            <p className="text-gray-700 ">
              <strong className="text-gray-800 ">Order Date:</strong>{" "}
              {moment(order.created_at).format("YYYY-MM-DD HH:mm")}
            </p>
            <p className="text-gray-700 ">
              <strong className="text-gray-800 ">Last Updated:</strong>{" "}
              {moment(order.updated_at).format("YYYY-MM-DD HH:mm")}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-gray-700 ">
              <strong className="text-gray-800 ">Payment Method:</strong>{" "}
              {order.payment_method.replace("_", " ")}
            </p>
            <p className="text-gray-700 ">
              <strong className="text-gray-800 ">Payment Status:</strong>{" "}
              {order.payment_status}
            </p>
            <p className="text-gray-700 ">
              <strong className="text-gray-800 ">Shipping Rate:</strong> AED{" "}
              {order.shipping_rate}
            </p>
            <p className="text-gray-800  font-semibold">
              <strong>Total Amount:</strong> AED {order.total_amount}
            </p>
          </div>
        </div>
      </div>

      {/* Customer Info */}
      <div>
        <h3 className="font-semibold text-lg text-gray-800 ">Customer Info</h3>
        <Divider />
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1 text-gray-700 ">
            <p>
              <strong className="text-gray-800 ">Name:</strong>{" "}
              {user?.first_name} {user?.last_name}
            </p>
            <p>
              <strong className="text-gray-800 ">Username:</strong>{" "}
              {user?.username}
            </p>
            <p>
              <strong className="text-gray-800 ">User ID:</strong> {user?.id}
            </p>
          </div>
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <Image
              src={user?.profile || "/profile2.webp"}
              alt="Profile"
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div>
        <h3 className="font-semibold text-lg text-gray-800 ">
          Shipping Address
        </h3>
        <Divider />
        <p className="text-gray-700 ">{order.shipping_address}</p>
      </div>

      {/* Order Items */}
      <div>
        <h3 className="font-semibold text-lg text-gray-800 ">
          Order Items ({order.order_items.length})
        </h3>
        <Divider />
        <div className="space-y-4">
          {order.order_items.map((item: any) => (
            <div key={item.id} className="border rounded p-3 bg-white ">
              <p className="text-gray-700 ">
                <strong className="text-gray-800 ">Item ID:</strong> {item.id}
              </p>
              <p className="text-gray-700 ">
                <strong className="text-gray-800 ">Quantity:</strong>{" "}
                {item.quantity}
              </p>
              <p className="text-gray-700 ">
                <strong className="text-gray-800 ">Price:</strong> AED{" "}
                {item.price}
              </p>
              <p className="text-gray-800 font-semibold">
                <strong>Subtotal:</strong> AED{" "}
                {(parseFloat(item.price) * item.quantity).toFixed(2)}
              </p>

              {item.product && (
                <>
                  <p className="text-gray-700 ">
                    <strong className="text-gray-800 ">Product Name:</strong>{" "}
                    {item.product.name}
                  </p>
                  <p className="text-gray-700 ">
                    <strong className="text-gray-800 ">Description:</strong>{" "}
                    {item.product.description}
                  </p>
                  <p className="text-gray-700 ">
                    <strong className="text-gray-800 ">Stock:</strong>{" "}
                    {item.product.stock}
                  </p>
                  {item.product.product_images?.[0]?.image_url && (
                    <Image
                      src={item.product.product_images[0].image_url}
                      alt={item.product.name}
                      width={100}
                      height={100}
                      className="rounded mt-2"
                    />
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Transactions */}
      {order.transactions?.length > 0 && (
        <div>
          <h3 className="font-semibold text-lg text-gray-800">Transactions</h3>
          <Divider />
          {order.transactions.map((txn: any) => (
            <div key={txn.id} className="border p-3 rounded mb-2 bg-white ">
              <p className="text-gray-700 ">
                <strong className="text-gray-800 ">Transaction ID:</strong>{" "}
                {txn.id}
              </p>
              <p className="text-gray-700 ">
                <strong className="text-gray-800 ">Payment Amount:</strong> AED{" "}
                {txn.payment_amount}
              </p>
              <p className="text-gray-700 ">
                <strong className="text-gray-800 ">Payment Intent:</strong>{" "}
                {txn.payment_intent}
              </p>
              <p className="text-gray-700 ">
                <strong className="text-gray-800 ">Transaction Date:</strong>{" "}
                {moment(txn.transaction_date).format("YYYY-MM-DD HH:mm")}
              </p>
              <p className="text-gray-700 ">
                <strong className="text-gray-800">Status:</strong>{" "}
                {txn.transaction_status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderDetailsDrawer;
