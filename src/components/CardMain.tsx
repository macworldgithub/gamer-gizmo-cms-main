// "use client";

// import React, { useState, useEffect } from "react";
// import { FaUserPlus, FaUsers, FaBoxOpen, FaChartLine } from "react-icons/fa";
// import axios from "axios";
// import Card from "./Card";

// interface Stat {
//   value: string;
//   label: string;
//   icon: React.ComponentType<{ className?: string }>;
// }

// const CardMain: React.FC = () => {
//   const [stats, setStats] = useState<Stat[]>([
//     { value: "0", label: "Daily Signup", icon: FaUserPlus },
//     { value: "0", label: "Daily Visitors", icon: FaUsers },
//     { value: "15,503", label: "Daily Orders", icon: FaBoxOpen },
//     { value: "$98,503", label: "Daily Revenue", icon: FaChartLine },
//   ]);

//   useEffect(() => {
//     const fetchAnalytics = async () => {
//       try {
//         const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/analytics/daily`, {
//           headers: {
//             Authorization: "Bearer your_jwt_token_here", 
//           },
//         });

        
//         const today = new Date().toISOString().split('T')[0];
//         const todayData = response.data.find((record: { date: string }) => record.date === today);

//         if (todayData) {
//           setStats((prevStats) =>
//             prevStats.map((stat) => {
//               if (stat.label === "Daily Signup") {
//                 return { ...stat, value: todayData.signups.toLocaleString() };
//               }
//               if (stat.label === "Daily Visitors") {
//                 return { ...stat, value: todayData.visitors.toLocaleString() };
//               }
//               return stat;
//             })
//           );
//         } else {
//           console.warn("No data found for today:", today);
//         }
//       } catch (error) {
//         console.error("Error fetching analytics:", error);
//       }
//     };

//     fetchAnalytics();
//   }, []);

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-5 overflow-auto">
//       {stats.map((stat, index) => (
//         <Card
//           key={index}
//           value={stat.value}
//           label={stat.label}
//           Icon={stat.icon}
//         />
//       ))}
//     </div>
//   );
// };

// export default CardMain;

// "use client";

// import React, { useState, useEffect } from "react";
// import { FaUserPlus, FaUsers, FaBoxOpen, FaChartLine } from "react-icons/fa";
// import axios from "axios";
// import Card from "./Card";
// import { format, startOfMonth, endOfMonth, startOfYear, endOfYear } from "date-fns";

// interface Stat {
//   value: string;
//   label: string;
//   icon: React.ComponentType<{ className?: string }>;
// }

// interface DailyAnalyticsResponse {
//   date: string;
//   signups: number;
//   visitors: number;
// }

// interface OrderAnalyticsResponse {
//   totalSalesInPeriod: number;
//   orders: { orderId: number; cost: number; salesPercentage: number; createdAt: string }[];
// }

// const CardMain: React.FC = () => {
//   const [stats, setStats] = useState<Stat[]>([
//     { value: "0", label: "Signups", icon: FaUserPlus },
//     { value: "0", label: "Visitors", icon: FaUsers },
//     { value: "0", label: "Orders", icon: FaBoxOpen },
//     { value: "AED 0.00", label: "Revenue", icon: FaChartLine },
//   ]);
//   const [range, setRange] = useState<"Daily" | "Monthly" | "Yearly">("Daily");

//   useEffect(() => {
//     const fetchAnalytics = async () => {
//       try {
//         // Determine date range
//         const today = new Date();
//         let startDate: string;
//         let endDate: string;

//         if (range === "Daily") {
//           startDate = format(today, "yyyy-MM-dd");
//           endDate = startDate;
//         } else if (range === "Monthly") {
//           startDate = format(startOfMonth(today), "yyyy-MM-dd");
//           endDate = format(endOfMonth(today), "yyyy-MM-dd");
//         } else {
//           startDate = format(startOfYear(today), "yyyy-MM-dd");
//           endDate = format(endOfYear(today), "yyyy-MM-dd");
//         }

//         // Fetch signups and visitors
//         const dailyResponse = await axios.get<DailyAnalyticsResponse[]>(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/analytics/daily`,
//           {
//             params: { startDate, endDate },
//             headers: {
//               Authorization: "Bearer your_jwt_token_here", // Replace with actual token
//             },
//           }
//         );

//         // Fetch orders and revenue
//         const orderResponse = await axios.get<OrderAnalyticsResponse>(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/analytics/orders`,
//           {
//             params: { startDate, endDate },
//             headers: {
//               Authorization: "Bearer your_jwt_token_here", // Replace with actual token
//             },
//           }
//         );

//         // Process signups and visitors
//         let signups = 0;
//         let visitors = 0;

//         if (range === "Daily") {
//           const todayData = dailyResponse.data.find((record) => record.date === startDate);
//           if (todayData) {
//             signups = todayData.signups;
//             visitors = todayData.visitors;
//           }
//         } else {
//           // Sum for Monthly/Yearly
//           signups = dailyResponse.data.reduce((sum, record) => sum + record.signups, 0);
//           visitors = dailyResponse.data.reduce((sum, record) => sum + record.visitors, 0);
//         }

//         // Process orders and revenue
//         const ordersCount = orderResponse.data.orders.length;
//         const revenue = orderResponse.data.totalSalesInPeriod;

//         // Update stats
//         setStats([
//           { value: signups.toLocaleString(), label: `${range} Signups`, icon: FaUserPlus },
//           { value: visitors.toLocaleString(), label: `${range} Visitors`, icon: FaUsers },
//           { value: ordersCount.toLocaleString(), label: `${range} Orders`, icon: FaBoxOpen },
//           { value: `AED ${revenue.toLocaleString('en-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, label: `${range} Revenue`, icon: FaChartLine },
//         ]);
//       } catch (error) {
//         console.error("Error fetching analytics:", error);
//         setStats((prevStats) =>
//           prevStats.map((stat) => ({
//             ...stat,
//             value: stat.label.includes("Revenue") ? "AED 0.00" : "0",
//             label: `${range} ${stat.label.replace(/^(Daily|Monthly|Yearly)\s/, '')}`,
//           }))
//         );
//       }
//     };

//     fetchAnalytics();
//   }, [range]);

//   return (
//     <div className="py-5">
//       <div className="flex justify-end mb-4">
//         <select
//           className="p-1 border text-xs w-24 rounded-lg bg-gray-100 text-black focus:outline-none"
//           value={range}
//           onChange={(e) => setRange(e.target.value as "Daily" | "Monthly" | "Yearly")}
//         >
//           <option value="Daily">Daily</option>
//           <option value="Monthly">Monthly</option>
//           <option value="Yearly">Yearly</option>
//         </select>
//       </div>
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-auto">
//         {stats.map((stat, index) => (
//           <Card
//             key={index}
//             value={stat.value}
//             label={stat.label}
//             Icon={stat.icon}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CardMain;

"use client";

import React, { useState, useEffect } from "react";
import { FaUserPlus, FaUsers, FaBoxOpen, FaChartLine } from "react-icons/fa";
import axios from "axios";
import Card from "./Card";
import { format, startOfMonth, endOfMonth, startOfYear, endOfYear, startOfWeek, endOfWeek } from "date-fns";

interface Stat {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface DailyAnalyticsResponse {
  date: string;
  signups: number;
  visitors: number;
}

interface OrderAnalyticsResponse {
  totalSalesInPeriod: number;
  orders: { orderId: number; cost: number; salesPercentage: number; createdAt: string }[];
}

const CardMain: React.FC = () => {
  const [stats, setStats] = useState<Stat[]>([
    { value: "0", label: "Signups", icon: FaUserPlus },
    { value: "0", label: "Visitors", icon: FaUsers },
    { value: "0", label: "Orders", icon: FaBoxOpen },
    { value: "AED 0.00", label: "Revenue", icon: FaChartLine },
  ]);
  const [range, setRange] = useState<"Daily" | "Weekly" | "Monthly" | "Yearly">("Daily");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Determine date range
        const today = new Date();
        let startDate: string;
        let endDate: string;

        if (range === "Daily") {
          startDate = format(today, "yyyy-MM-dd");
          endDate = startDate;
        } else if (range === "Weekly") {
          startDate = format(startOfWeek(today, { weekStartsOn: 1 }), "yyyy-MM-dd"); // Monday as start of week
          endDate = format(endOfWeek(today, { weekStartsOn: 1 }), "yyyy-MM-dd");     // Sunday as end of week
        } else if (range === "Monthly") {
          startDate = format(startOfMonth(today), "yyyy-MM-dd");
          endDate = format(endOfMonth(today), "yyyy-MM-dd");
        } else {
          startDate = format(startOfYear(today), "yyyy-MM-dd");
          endDate = format(endOfYear(today), "yyyy-MM-dd");
        }

        // Fetch signups and visitors
        const dailyResponse = await axios.get<DailyAnalyticsResponse[]>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/analytics/daily`,
          {
            params: { startDate, endDate },
            headers: {
              Authorization: "Bearer your_jwt_token_here", // Replace with actual token
            },
          }
        );

        // Fetch orders and revenue
        const orderResponse = await axios.get<OrderAnalyticsResponse>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/analytics/orders`,
          {
            params: { startDate, endDate },
            headers: {
              Authorization: "Bearer your_jwt_token_here", // Replace with actual token
            },
          }
        );

        // Process signups and visitors
        let signups = 0;
        let visitors = 0;

        if (range === "Daily") {
          const todayData = dailyResponse.data.find((record) => record.date === startDate);
          if (todayData) {
            signups = todayData.signups;
            visitors = todayData.visitors;
          }
        } else {
          // Sum for Weekly/Monthly/Yearly
          signups = dailyResponse.data.reduce((sum, record) => sum + record.signups, 0);
          visitors = dailyResponse.data.reduce((sum, record) => sum + record.visitors, 0);
        }

        // Process orders and revenue
        const ordersCount = orderResponse.data.orders.length;
        const revenue = orderResponse.data.totalSalesInPeriod;

        // Update stats
        setStats([
          { value: signups.toLocaleString(), label: `${range} Signups`, icon: FaUserPlus },
          { value: visitors.toLocaleString(), label: `${range} Visitors`, icon: FaUsers },
          { value: ordersCount.toLocaleString(), label: `${range} Orders`, icon: FaBoxOpen },
          { value: `AED ${revenue.toLocaleString('en-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, label: `${range} Revenue`, icon: FaChartLine },
        ]);
      } catch (error) {
        console.error("Error fetching analytics:", error);
        setStats((prevStats) =>
          prevStats.map((stat) => ({
            ...stat,
            value: stat.label.includes("Revenue") ? "AED 0.00" : "0",
            label: `${range} ${stat.label.replace(/^(Daily|Weekly|Monthly|Yearly)\s/, '')}`,
          }))
        );
      }
    };

    fetchAnalytics();
  }, [range]);

  return (
    <div className="py-5">
      <div className="flex justify-end mb-4">
        <select
          className="p-1 border text-xs w-24 rounded-lg bg-gray-100 text-black focus:outline-none"
          value={range}
          onChange={(e) => setRange(e.target.value as "Daily" | "Weekly" | "Monthly" | "Yearly")}
        >
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option> {/* Added Weekly option */}
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-auto">
        {stats.map((stat, index) => (
          <Card
            key={index}
            value={stat.value}
            label={stat.label}
            Icon={stat.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default CardMain;