"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Tag,
  Popconfirm,
  Card,
  Avatar,
  Divider,
} from "antd";
import { IoShieldCheckmarkOutline } from "react-icons/io5";

import axios from "axios";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { EyeOutlined, DeleteOutlined, StopOutlined } from "@ant-design/icons";
import { FormatDate } from "@/components/dateFormate";
import Image from "next/image";

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_email_verified: boolean;
  is_seller: boolean;
  created_at: string;
  profile: string;
  phone: string;
  is_admin_verified: boolean;
  dob: string;
  gender: string;
  address: string;
  nic_front_image: string;
  nic_back_image: string;
  applied_for_verification: boolean;
  is_active: boolean;
}

const ListUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const token = localStorage.getItem("admin-x-token");
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    fetchUsers(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const fetchUsers = async (page: number, pageSize: number) => {
    try {
      console.log(token, "token");
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/getVerifiedByAdminUsers?pageNo=${page}&pageSize=${pageSize}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(response.data.data);
      setTotalUsers(response.data.total);
    } catch {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (user: User) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const HanldeRejection = async (id: number) => {
    try {
      await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/rejectUserVerification?userId=${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers(currentPage, pageSize);
      toast.success("Verification Status Removed successfully");
      fetchUsers(currentPage, pageSize);
    } catch {
      toast.error("Failed to deactivate user");
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "First Name", dataIndex: "first_name", key: "first_name" },
    { title: "Last Name", dataIndex: "last_name", key: "last_name" },
    {
      title: "Joined On",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: string) => <h1>{FormatDate(created_at)}</h1>,
    },
    {
      title: "Verified By Admin",
      dataIndex: "is_admin_verified",
      key: "is_admin_verified",
      render: (verified: boolean, user: User) =>
        verified ? (
          <Tag color="green">Verified</Tag>
        ) : user.applied_for_verification ? (
          <Tag color="orange">Applied</Tag>
        ) : (
          <Tag color="red">Not Applied</Tag>
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, user: User) => (
        <div className="flex gap-2">
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleViewDetails(user)}
          >
            View
          </Button>

          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => HanldeRejection(user.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger>
              Remove Verification
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-2xl">Verified Users</h1>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <Table
          columns={columns}
          dataSource={users}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: totalUsers,
            onChange: (page, size) => {
              setCurrentPage(page);
              setPageSize(size);
            },
          }}
          rowKey="id"
        />
      )}

      <Modal
        title="User Details"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {selectedUser && (
          <Card className="text-center space-y-3 shadow-md p-6">
            <div className="flex justify-center mb-4">
              {selectedUser.profile ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${selectedUser.profile}`}
                  alt="profile"
                  width={400}
                  height={250}
                  className="w-full h-36 sm:h-40 md:h-36 object-cover"
                />
              ) : (
                <Avatar size={100} icon={<UserOutlined />} />
              )}
            </div>
            <h2 className="text-xl font-semibold">{selectedUser.username}</h2>
            <p className="text-gray-500">{selectedUser.email}</p>
            <Divider />
            <p>
              <MailOutlined className="mr-2 text-blue-500" />
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>First Name:</strong> {selectedUser.first_name}
            </p>
            <p>
              <strong>Last Name:</strong> {selectedUser.last_name}
            </p>
            <p>
              <strong>Phone:</strong> {selectedUser.phone}
            </p>
            <p>
              <strong>Date of Birth:</strong> {FormatDate(selectedUser.dob)}
            </p>
            <p>
              <strong>Gender:</strong> {selectedUser.gender}
            </p>
            <p>
              <strong>Address:</strong> {selectedUser.address}
            </p>
            <p>
              <strong>Joined On:</strong> {FormatDate(selectedUser.created_at)}
            </p>

            <p>
              <strong>Email Verified:</strong>{" "}
              {selectedUser.is_email_verified ? (
                <Tag color="green">Verified</Tag>
              ) : (
                <Tag color="red">Not Verified</Tag>
              )}
            </p>

            <p>
              <strong>Seller:</strong>{" "}
              {selectedUser.is_seller ? (
                <Tag color="blue">Yes</Tag>
              ) : (
                <Tag color="gray">No</Tag>
              )}
            </p>

            <p>
              <strong>Admin Verified:</strong>{" "}
              {selectedUser.is_admin_verified ? (
                <Tag color="green">Verified</Tag>
              ) : selectedUser.applied_for_verification ? (
                <Tag color="orange">Applied</Tag>
              ) : (
                <Tag color="red">Not Applied</Tag>
              )}
            </p>
            <Divider />
            <h1 className="text-xl font-bold my-2">Verfication Document</h1>
            {selectedUser.nic_front_image && (
              <Image
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${selectedUser.nic_front_image}`}
                alt="profile"
                width={400}
                height={250}
                className="w-full h-36 sm:h-40 md:h-36 object-cover"
              />
            )}
            {selectedUser.nic_back_image && (
              <Image
                src={`${selectedUser.nic_back_image}`}
                alt="profile"
                width={400}
                height={250}
                className="w-full h-36 sm:h-40 md:h-36 object-cover"
              />
            )}
          </Card>
        )}
      </Modal>
    </div>
  );
};

export default ListUser;
