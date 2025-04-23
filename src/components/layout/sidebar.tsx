// "use client";

// import React from "react";
// import { useRouter } from "next/navigation";
// import { Menu } from "antd";
// import Image from "next/image";
// import { TbLayoutDashboard } from "react-icons/tb";

// // Importing images
// import user from "../../../public/Users.png";
// import category from "../../../public/Categories.png";
// import product from "../../../public/products.png";
// import order from "../../../public/Cart.png";
// import reviews from "../../../public/Review.png";
// import logout from "../../../public/Sign Out.png";

// const SideBar = () => {
//   const router = useRouter();

//   const handleNavigation = (path: string) => {
//     router.push(path);
//   };

//   const navItems = [
//     {
//       key: "1",
//       icon: <TbLayoutDashboard size={22} />,
//       label: "Dashboard",
//       onClick: () => handleNavigation("/admin/dashboard"),
//     },
//     {
//       key: "2",
//       icon: <Image src={user} alt="User" width={24} height={24} />,
//       label: "Vendors",
//       children: [
//         {
//           key: "3",
//           label: "Vendor Profile",
//           onClick: () => handleNavigation("/admin/VendorsProfile"),
//         },
//         {
//           key: "4",
//           label: "Vendor List",
//           onClick: () => handleNavigation("/admin/VendorsProfile"),
//         },
//       ],
//     },
//     {
//       key: "5",
//       icon: <Image src={category} alt="Categories" width={24} height={24} />,
//       label: "Categories",
//       children: [
//         {
//           key: "6",
//           label: "Main Category",
//           onClick: () => handleNavigation("/admin/MainCategory"),
//         },
//         {
//           key: "7",
//           label: "Sub Category",
//           onClick: () => handleNavigation("/admin/SubCategory"),
//         },
//       ],
//     },
//     {
//       key: "8",
//       icon: <Image src={product} alt="Products" width={24} height={24} />,
//       label: "Products",
//       children: [
//         {
//           key: "9",
//           label: "Add Product",
//           onClick: () => handleNavigation("/admin/AddProduct"),
//         },
//         {
//           key: "10",
//           label: "Product List",
//           onClick: () => handleNavigation("/admin/list"),
//         },
//       ],
//     },
//     {
//       key: "11",
//       icon: <Image src={order} alt="Orders" width={24} height={24} />,
//       label: "Orders",
//       children: [
//         {
//           key: "12",
//           label: "New Order",
//           onClick: () => handleNavigation("/admin/NewOrder"),
//         },
//         {
//           key: "13",
//           label: "Order History",
//           onClick: () => handleNavigation("/admin/Order_History"),
//         },
//       ],
//     },
//     {
//       key: "14",
//       icon: <Image src={reviews} alt="Reviews" width={24} height={24} />,
//       label: "Reviews",
//       onClick: () => handleNavigation("/admin/review"),
//     },
//     {
//       key: "15",
//       icon: <Image src={logout} alt="Logout" width={24} height={24} />,
//       label: "Logout",
//       onClick: () => handleNavigation("/"),
//     },
//   ];

//   return (
//     <Menu
//       mode="inline"
//       defaultSelectedKeys={["1"]}
//       defaultOpenKeys={["sub1"]}
//       style={{ height: "100%", borderRight: 0 }}
//       items={navItems}
//     />
//   );
// };

// export default SideBar;

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
import { TbAirConditioningDisabled, TbBoxModel2, TbBrandSketch, TbLayoutDashboard } from "react-icons/tb";
import Image from "next/image";
import toast from "react-hot-toast";
import { FaMicroblog } from "react-icons/fa";
import { LuComponent, LuStore } from "react-icons/lu";
import { MdOutlineSdStorage, MdOutlineVerifiedUser, MdOutlineViewCompact } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi2";
import { RiRam2Line, RiVerifiedBadgeFill } from "react-icons/ri";
import { BsBoxes, BsGpuCard } from "react-icons/bs";
import { GiProcessor } from "react-icons/gi";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
// import ClientSideBar from "../another_folder/ClientSideBar";

// const items2: MenuProps["items"] = [
//   UserOutlined,
//   LaptopOutlined,
//   NotificationOutlined,
// ].map((icon, index) => {
//   const key = String(index + 1);

//   return {
//     key: sub${key},
//     icon: React.createElement(icon),
//     label: subnav ${key},

//     children: new Array(4).fill(null).map((_, j) => {
//       const subKey = index * 4 + j + 1;
//       return {
//         key: subKey,
//         label: option${subKey},
//       };
//     }),
//   };
// });

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
      icon:<HiOutlineUsers size={20}/>,
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
          icon:<MdOutlineVerifiedUser size={18}/>,
          label: "Verified Users",
          onClick: () => handleNavigation("/admin/verified-users"),
        },
        {
          key: "93028",
          icon:<RiVerifiedBadgeFill size={18}/>,
          label: "Verification Requests",
          onClick: () => handleNavigation("/admin/verification-requests"),
        },
      ],
    },
    {
      key: " User Products",
      icon: <BsBoxes size={18}/>,
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
      icon: <MdOutlineViewCompact size={18}/>,
      label: "Categories",
      onClick: () => handleNavigation("/admin/category"),
    },
    {
      key: "components",
      icon: <LuComponent size={18}/>,
      // icon: <Image src={category} alt="Categories" width={24} height={24} />,
      label: "Components",
      onClick: () => handleNavigation("/admin/components"),
    },

    {
      key: "Adds",
      icon: <LuComponent size={18}/>,
      // icon: <Image src={category} alt="Categories" width={24} height={24} />,
      label: "Adds",
      onClick: () => handleNavigation("/admin/Adds"),
    },
    {
      key: "3",
      icon: <TbBrandSketch size={18}/>,
      label: "Brands",
      onClick: () => handleNavigation("/admin/brand-list"),
    },
    {
      key: "4",
      icon: <TbBoxModel2 size={18}/>,
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
          icon:<GiProcessor size={18}/>,
          label: "Processor Variant",
          onClick: () =>
            handleNavigation("/admin/configuration/processor-variant"),
        },
        {
          key: "112",
          icon: <GiProcessor size={18}/>,
          label: "Processor",
          onClick: () => handleNavigation("/admin/configuration/processor"),
        },
        {
          key: "123",
          icon:<MdOutlineSdStorage size={18}/>,
          label: "Storage Type",
          onClick: () => handleNavigation("/admin/configuration/storage-type"),
        },
        {
          key: "442",
          icon: <MdOutlineSdStorage size={18}/>,
          label: "Storage",
          onClick: () => handleNavigation("/admin/configuration/storage"),
        },
        {
          key: "23",
          icon: <RiRam2Line size={18}/>,
          label: "RAM",
          onClick: () => handleNavigation("/admin/configuration/ram"),
        },
        {
          key: "14",
          icon: <BsGpuCard size={18}/>,
          label: "GPU",
          onClick: () => handleNavigation("/admin/configuration/gpu"),
        },
        {
          key: "19090",
          icon:<TbAirConditioningDisabled size={20}/>,
          label: "Conditions",
          onClick: () => handleNavigation("/admin/configuration/condition"),
        },
        {
          key: "199",
          icon:<CiLocationOn size={20}/>,
          label: "Location",
          onClick: () => handleNavigation("/admin/configuration/location"),
        },
      ],
    },

    // {
    //   key: "orders",
    //   icon: <Image src={order} alt="Orders" width={24} height={24} />,
    //   label: "ORDERS",
    //   children: [
    //     {
    //       key: "new-order",
    //       label: "NEW ORDER",
    //       onClick: () => handleNavigation("/admin/NewOrder"),
    //     },
    //     {
    //       key: "order-history",
    //       label: "ORDER HISTORY",
    //       onClick: () => handleNavigation("/admin/Order_History"),
    //     },
    //     {
    //       key: "order-detail",
    //       label: "ORDER DETAIL",
    //       onClick: () => handleNavigation("/admin/detail"),
    //     },
    //     {
    //       key: "invoice",
    //       label: "INVOICE",
    //       onClick: () => handleNavigation("/admin/invoice"),
    //     },
    //   ],
    // },
    // {
    //   key: "reviews",
    //   icon: <Image src={reviews} alt="Reviews" width={24} height={24} />,
    //   label: "REVIEWS",
    //   onClick: () => handleNavigation("/admin/review"),
    // },
    {
      key: "settings",
      icon: <IoSettingsOutline size={18}/>,
      label: "Settings",
      onClick: () => handleNavigation("/admin/settings"),
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
        className="max-md:hidden pt-4"
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
