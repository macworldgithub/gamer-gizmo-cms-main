"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LaptopOutlined } from "@ant-design/icons";
import user from "../../../public/Users.png";
import category from "../../../public/Categories.png";
import product from "../../../public/products.png";
import logout from "../../../public/Sign Out.png";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import ClientSideBar from "./ClientSideBar";
import {
  TbAirConditioningDisabled,
  TbBoxModel2,
  TbBrandSketch,
  TbLayoutDashboard,
  TbMenuOrder,
} from "react-icons/tb";
import Image from "next/image";
import toast from "react-hot-toast";
import { FaMicroblog } from "react-icons/fa";
// import { FaComment } from "react-icons/fa";
import { LiaUsersSolid } from "react-icons/lia";
import { LuComponent, LuStore } from "react-icons/lu";
import {
  MdOutlineSdStorage,
  MdOutlineVerifiedUser,
  MdOutlineViewCompact,
} from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi2";
import { RiRam2Line, RiVerifiedBadgeFill } from "react-icons/ri";
import { BsBoxes, BsGpuCard } from "react-icons/bs";
import { GiProcessor } from "react-icons/gi";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { RxCardStackPlus } from "react-icons/rx";

const SideBar = () => {
  const router = useRouter();
  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const navItems: MenuProps["items"] = [
    {
      key: "dashboard",
      icon: <TbLayoutDashboard size={20} />,
      label: "Dashboard",
      onClick: () => handleNavigation("/admin/dashboard"),
    },
    // {
    //   key: "admin",
    //   icon: <Image src={user} alt="User" width={24} height={24} />,
    //   label: "Admin ",
    //   children: [
    //     {
    //       key: "vendor-profile",
    //       label: "ADMIN PROFILE",
    //       onClick: () => handleNavigation("/admin/AdminProfile"),
    //     },

    //   ],
    // },
    {
      key: "user",
      icon: <HiOutlineUsers size={20} />,
      label: "Users",
      children: [
        // {
        //   key: "user-profile",
        //   label: "User Profile",
        //   onClick: () => handleNavigation("/admin/User_Profile"),
        // },
        {
          key: "user-list",
          label: "Users List",
          onClick: () => handleNavigation("/admin/user"),
        },
        {
          key: "3123123",
          icon: <MdOutlineVerifiedUser size={18} />,
          label: "Verified Users",
          onClick: () => handleNavigation("/admin/verified-users"),
        },
        {
          key: "93028",
          icon: <RiVerifiedBadgeFill size={18} />,
          label: "Verification Requests",
          onClick: () => handleNavigation("/admin/verification-requests"),
        },
      ],
    },
    {
      key: " User Products",
      icon: <BsBoxes size={18} />,
      label: "User Products",
      children: [
        // {
        //   key: "add-product",
        //   label: "Add Product",
        //   onClick: () => handleNavigation("/admin/AddProduct"),
        // },
        // {
        //   key: "list-product",
        //   label: "LIST PRODUCT",
        //   onClick: () => handleNavigation("/admin/list"),
        // },
        {
          key: "product-lists",
          label: "Product List",
          onClick: () => handleNavigation("/admin/product-list"),
        },
      ],
    },
    {
      key: "My Store",
      icon: <LuStore size={18} />,
      label: "My Store",
      children: [
        {
          key: "product-432",
          label: "Product List",
          onClick: () => handleNavigation("/admin/store/product-list"),
        },
        {
          key: "add-product-331",
          label: "Add New Product",
          onClick: () => handleNavigation("/admin/store/add-product"),
        },
      ],
    },
    {
      key: "categories",
      // icon: <Image src={category} alt="Categories" width={24} height={24} />,
      icon: <MdOutlineViewCompact size={18} />,
      label: "Categories",
      onClick: () => handleNavigation("/admin/category"),
    },
    {
      key: "components",
      icon: <LuComponent size={18} />,
      // icon: <Image src={category} alt="Categories" width={24} height={24} />,
      label: "Components",
      onClick: () => handleNavigation("/admin/components"),
    },

    {
      key: "Adds",
      icon: <RxCardStackPlus size={18} />,

      label: "Live Ads",
      onClick: () => handleNavigation("/admin/Adds"),
    },
    {
      key: "3",
      icon: <TbBrandSketch size={18} />,
      label: "Brands",
      onClick: () => handleNavigation("/admin/brand-list"),
    },
    {
      key: "4",
      icon: <TbBoxModel2 size={18} />,
      label: "Models",
      onClick: () => handleNavigation("/admin/model-list"),
    },

    {
      key: "5",
      icon: React.createElement(LaptopOutlined),
      label: "Configurations",
      children: [
        {
          key: "1011",
          icon: <GiProcessor size={18} />,
          label: "Processor Variant",
          onClick: () =>
            handleNavigation("/admin/configuration/processor-variant"),
        },
        {
          key: "112",
          icon: <GiProcessor size={18} />,
          label: "Processor",
          onClick: () => handleNavigation("/admin/configuration/processor"),
        },
        {
          key: "123",
          icon: <MdOutlineSdStorage size={18} />,
          label: "Storage Type",
          onClick: () => handleNavigation("/admin/configuration/storage-type"),
        },
        {
          key: "442",
          icon: <MdOutlineSdStorage size={18} />,
          label: "Storage",
          onClick: () => handleNavigation("/admin/configuration/storage"),
        },
        {
          key: "23",
          icon: <RiRam2Line size={18} />,
          label: "RAM",
          onClick: () => handleNavigation("/admin/configuration/ram"),
        },
        {
          key: "14",
          icon: <BsGpuCard size={18} />,
          label: "GPU",
          onClick: () => handleNavigation("/admin/configuration/gpu"),
        },
        {
          key: "19090",
          icon: <TbAirConditioningDisabled size={20} />,
          label: "Conditions",
          onClick: () => handleNavigation("/admin/configuration/condition"),
        },
        {
          key: "199",
          icon: <CiLocationOn size={20} />,
          label: "Location",
          onClick: () => handleNavigation("/admin/configuration/location"),
        },
      ],
    },

    {
      key: "orders",
      icon: <TbMenuOrder size={16} />,
      label: "Store orders",
      onClick: () => handleNavigation("/admin/orders"),
    },

    {
      key: "community",
      // icon:<FaComment size={18}/>,
      icon: <LiaUsersSolid size={20} />,
      label: "Community",
      onClick: () => handleNavigation("/admin/community"),
    },

    {
      key: "blog",
      icon: <FaMicroblog size={22} />,
      label: "Blogs",
      children: [
        {
          key: "add-blog",
          label: "Add Blog",
          onClick: () => handleNavigation("/admin/AddBlog"),
        },
        {
          key: "blog-list",
          label: "Blog List",
          onClick: () => handleNavigation("/admin/BlogList"),
        },
      ],
    },

    {
      key: "logout",
      icon: <Image src={logout} alt="Logout" width={24} height={24} />,
      label: <p className="text-red-600 font-bold">Logout</p>,
      onClick: () => {
        localStorage.clear();
        toast.success("Successfylly logged out");
        setTimeout(() => {
          handleNavigation("/auth/login");
        }, 2000);
      },
    },
  ];

  // const SideBar = () => {
  return (
    <ClientSideBar>
      <Menu
        className="max-md:hidden"
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0 }}
        items={navItems}
      />
    </ClientSideBar>
  );
};

export default SideBar;
