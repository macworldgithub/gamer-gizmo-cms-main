
// "use client";

// import React, { useState, useEffect } from "react";
// import { FaUserPlus, FaUsers, FaBoxOpen, FaChartLine } from "react-icons/fa";
// import axios from "axios";
// import Card from "./Card";
// import { format, startOfMonth, endOfMonth, startOfYear, endOfYear, startOfWeek, endOfWeek } from "date-fns";
// import html2canvas from "html2canvas";
// import { jsPDF } from "jspdf";

// interface Stat {
//   value: string;
//   label: string;
//   icon: React.ComponentType<{ className?: string }>;
// }

// interface ProductSale {
//   productName: string;
//   costInPeriod: number;
// }

// interface DailyAnalyticsResponse {
//   date: string;
//   signups: number;
//   visitors: number;
// }

// interface OrderAnalyticsResponse {
//   totalSalesInPeriod: number;
//   orders: { orderId: number; cost: number; salesPercentage: number; createdAt: string }[];
//   products: { productId: number; productName: string; costInPeriod: number; salesPercentageInPeriod: number }[];
// }

// const CardMain: React.FC = () => {
//   const [stats, setStats] = useState<Stat[]>([
//     { value: "0", label: "Signups", icon: FaUserPlus },
//     { value: "0", label: "Visitors", icon: FaUsers },
//     { value: "0", label: "Orders", icon: FaBoxOpen },
//     { value: "AED 0.00", label: "Revenue", icon: FaChartLine },
//   ]);
//   const [range, setRange] = useState<"Daily" | "Weekly" | "Monthly" | "Yearly">("Daily");

//   useEffect(() => {
//     const fetchAnalytics = async () => {
//       try {
//         const today = new Date();
//         let startDate: string;
//         let endDate: string;

//         if (range === "Daily") {
//           startDate = format(today, "yyyy-MM-dd");
//           endDate = startDate;
//         } else if (range === "Weekly") {
//           startDate = format(startOfWeek(today, { weekStartsOn: 1 }), "yyyy-MM-dd");
//           endDate = format(endOfWeek(today, { weekStartsOn: 1 }), "yyyy-MM-dd");
//         } else if (range === "Monthly") {
//           startDate = format(startOfMonth(today), "yyyy-MM-dd");
//           endDate = format(endOfMonth(today), "yyyy-MM-dd");
//         } else {
//           startDate = format(startOfYear(today), "yyyy-MM-dd");
//           endDate = format(endOfYear(today), "yyyy-MM-dd");
//         }

//         const dailyResponse = await axios.get<DailyAnalyticsResponse[]>(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/analytics/daily`,
//           {
//             params: { startDate, endDate },
//             headers: {
//               Authorization: "Bearer your_jwt_token_here",
//             },
//           }
//         );

//         const orderResponse = await axios.get<OrderAnalyticsResponse>(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/analytics/orders`,
//           {
//             params: { startDate, endDate },
//             headers: {
//               Authorization: "Bearer your_jwt_token_here",
//             },
//           }
//         );

//         let signups = 0;
//         let visitors = 0;

//         if (range === "Daily") {
//           const todayData = dailyResponse.data.find((record) => record.date === startDate);
//           if (todayData) {
//             signups = todayData.signups;
//             visitors = todayData.visitors;
//           }
//         } else {
//           signups = dailyResponse.data.reduce((sum, record) => sum + record.signups, 0);
//           visitors = dailyResponse.data.reduce((sum, record) => sum + record.visitors, 0);
//         }

//         const ordersCount = orderResponse.data.orders.length;
//         const revenue = orderResponse.data.totalSalesInPeriod;

//         setStats([
//           { value: signups.toLocaleString(), label: `${range} Signups`, icon: FaUserPlus },
//           { value: visitors.toLocaleString(), label: `${range} Visitors`, icon: FaUsers },
//           { value: ordersCount.toLocaleString(), label: `${range} Orders`, icon: FaBoxOpen },
//           {
//             value: `AED ${revenue.toLocaleString("en-AE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
//             label: `${range} Revenue`,
//             icon: FaChartLine,
//           },
//         ]);
//       } catch (error) {
//         console.error("Error fetching analytics:", error);
//         setStats((prevStats) =>
//           prevStats.map((stat) => ({
//             ...stat,
//             value: stat.label.includes("Revenue") ? "AED 0.00" : "0",
//             label: `${range} ${stat.label.replace(/^(Daily|Weekly|Monthly|Yearly)\s/, "")}`,
//           }))
//         );
//       }
//     };

//     fetchAnalytics();
//   }, [range]);

//   const generatePDF = async () => {
//     try {
//       const cardMain = document.getElementById("card-main");
//       const salesChart = document.getElementById("sales-chart");
//       const pdf = new jsPDF("p", "mm", "a4");
//       const pageWidth = 210;
//       const pageHeight = 297;
//       const margin = 10;
//       const dateStr = format(new Date(), "yyyy-MM-dd");
//       let currentY = 25; // Initialize currentY at the top

//       // Fetch product sales data for the table
//       let productSales: ProductSale[] = [];
//       try {
//         const today = new Date();
//         let startDate: string;
//         let endDate: string;
//         if (range === "Daily") {
//           startDate = format(today, "yyyy-MM-dd");
//           endDate = startDate;
//         } else if (range === "Weekly") {
//           startDate = format(startOfWeek(today, { weekStartsOn: 1 }), "yyyy-MM-dd");
//           endDate = format(endOfWeek(today, { weekStartsOn: 1 }), "yyyy-MM-dd");
//         } else if (range === "Monthly") {
//           startDate = format(startOfMonth(today), "yyyy-MM-dd");
//           endDate = format(endOfMonth(today), "yyyy-MM-dd");
//         } else {
//           startDate = format(startOfYear(today), "yyyy-MM-dd");
//           endDate = format(endOfYear(today), "yyyy-MM-dd");
//         }

//         const orderResponse = await axios.get<OrderAnalyticsResponse>(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/analytics/orders`,
//           {
//             params: { startDate, endDate },
//             headers: {
//               Authorization: "Bearer your_jwt_token_here",
//             },
//           }
//         );
//         productSales = orderResponse.data.products.map((p) => ({
//           productName: p.productName,
//           costInPeriod: p.costInPeriod,
//         }));
//       } catch (error) {
//         console.error("Error fetching product sales for PDF:", error);
//       }

//       // Helper to add header and footer
//       const addHeaderFooter = (pageNum: number, totalPages: number) => {
//         pdf.setFont("times", "bold");
//         pdf.setFontSize(14);
//         pdf.setTextColor(30, 144, 255); // Blue
//         pdf.text(`Analytics Report - ${dateStr}`, pageWidth / 2, 10, { align: "center" });
//         pdf.setFont("times", "normal");
//         pdf.setFontSize(10);
//         pdf.setTextColor(100); // Gray
//         pdf.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margin, pageHeight - 5);
//         pdf.setLineWidth(0.5);
//         pdf.setDrawColor(30, 144, 255);
//         pdf.line(margin, 15, pageWidth - margin, 15); // Header line
//         pdf.line(margin, pageHeight - 10, pageWidth - margin, pageHeight - 10); // Footer line
//       };

//       // Calculate total pages based on product sales table length
//       const tableRowHeight = 6;
//       const tableHeaderHeight = 16; // Title + line + header row
//       const tableSpaceNeeded = productSales.length > 0 ? tableHeaderHeight + productSales.length * tableRowHeight : 10;
//       const cardMainHeightEstimate = 100; // Approximate height for CardMain content
//       const totalPages = tableSpaceNeeded + cardMainHeightEstimate > pageHeight - 80 ? 3 : 2;

//       // Page 1: CardMain + Product Sales Table
//       if (cardMain) {
//         const canvas = await html2canvas(cardMain, {
//           scale: 3,
//           backgroundColor: "#f3f4f6",
//           useCORS: true,
//           logging: true,
//         });
//         const imgData = canvas.toDataURL("image/png", 1.0);
//         const imgWidth = canvas.width * 0.264583;
//         const imgHeight = canvas.height * 0.264583;
//         const ratio = Math.min((pageWidth - 2 * margin) / imgWidth, (pageHeight - 80) / imgHeight);
//         const scaledWidth = imgWidth * ratio;
//         const scaledHeight = imgHeight * ratio;

//         // Add light gray background
//         pdf.setFillColor(240, 240, 240);
//         pdf.rect(margin, 20, pageWidth - 2 * margin, scaledHeight + 10, "F");
//         pdf.addImage(imgData, "PNG", margin, 25, scaledWidth, scaledHeight);
//         currentY = 25 + scaledHeight + 10;

//         // Add product sales table
//         if (productSales.length > 0) {
//           pdf.setFont("times", "bold");
//           pdf.setFontSize(12);
//           pdf.setTextColor(30, 144, 255);
//           pdf.text(`${range} Product Sales`, margin, currentY);
//           currentY += 5;
//           pdf.setLineWidth(0.3);
//           pdf.setDrawColor(30, 144, 255);
//           pdf.line(margin, currentY, pageWidth - margin, currentY);
//           currentY += 5;

//           pdf.setFont("times", "normal");
//           pdf.setFontSize(10);
//           pdf.setTextColor(0);
//           const tableWidth = pageWidth - 2 * margin;
//           const col1Width = tableWidth * 0.6;
//           const col2Width = tableWidth * 0.4;
//           pdf.setFillColor(220, 220, 220);
//           pdf.rect(margin, currentY, tableWidth, 6, "F");
//           pdf.text("Product", margin + 2, currentY + 4);
//           pdf.text("Sales (AED)", margin + col1Width + 2, currentY + 4);
//           currentY += 6;

//           productSales.forEach((product) => {
//             if (currentY > pageHeight - 20) {
//               pdf.addPage();
//               addHeaderFooter(2, totalPages);
//               currentY = 20;
//               pdf.setFillColor(240, 240, 240);
//               pdf.rect(margin, currentY, pageWidth - 2 * margin, 10, "F");
//               currentY += 10;
//             }
//             pdf.setFillColor(255, 255, 255);
//             pdf.rect(margin, currentY, tableWidth, 6, "F");
//             pdf.text(product.productName, margin + 2, currentY + 4);
//             pdf.text(
//               product.costInPeriod.toLocaleString("en-AE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
//               margin + col1Width + 2,
//               currentY + 4
//             );
//             currentY += 6;
//           });
//         } else {
//           pdf.setFont("times", "italic");
//           pdf.setFontSize(10);
//           pdf.setTextColor(100);
//           pdf.text("No product sales data available.", margin, currentY);
//         }

//         addHeaderFooter(1, totalPages);
//       } else {
//         console.error("CardMain DOM element not found");
//       }

//       // Page 2 (or 3): SalesChart
//       if (salesChart) {
//         pdf.addPage();
//         const canvas = await html2canvas(salesChart, {
//           scale: 3,
//           backgroundColor: "#ffffff",
//           useCORS: true,
//           logging: true,
//         });
//         const imgData = canvas.toDataURL("image/png", 1.0);
//         const imgWidth = canvas.width * 0.264583;
//         const imgHeight = canvas.height * 0.264583;
//         const ratio = Math.min((pageWidth - 2 * margin) / imgWidth, (pageHeight - 30 - margin) / imgHeight);
//         const scaledWidth = imgWidth * ratio;
//         const scaledHeight = imgHeight * ratio;

//         pdf.setFillColor(240, 240, 240);
//         pdf.rect(margin, 20, pageWidth - 2 * margin, scaledHeight + 10, "F");
//         pdf.addImage(imgData, "PNG", margin, 25, scaledWidth, scaledHeight);
//         addHeaderFooter(totalPages, totalPages);
//       } else {
//         console.error("SalesChart DOM element not found");
//       }

//       pdf.save(`analytics-report-${dateStr}.pdf`);
//     } catch (error) {
//       console.error("PDF generation failed:", error);
//       alert("Failed to generate PDF. Please check the console for details.");
//     }
//   };

//   return (
//     <div className="py-5" id="card-main">
//       <div className="flex justify-end mb-4">
//         <select
//           className="p-1 border text-xs w-24 rounded-lg bg-gray-100 text-black focus:outline-none"
//           value={range}
//           onChange={(e) => setRange(e.target.value as "Daily" | "Weekly" | "Monthly" | "Yearly")}
//         >
//           <option value="Daily">Daily</option>
//           <option value="Weekly">Weekly</option>
//           <option value="Monthly">Monthly</option>
//           <option value="Yearly">Yearly</option>
//         </select>
//       </div>
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-auto">
//         {stats.map((stat, index) => (
//           <Card key={index} value={stat.value} label={stat.label} Icon={stat.icon} />
//         ))}
//       </div>
//       <div className="mt-4 flex justify-end">
//         <button
//           onClick={generatePDF}
//           className="p-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 focus:outline-none"
//         >
//           Generate Report
//         </button>
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
import { jsPDF } from "jspdf";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Stat {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface ProductSale {
  productName: string;
  costInPeriod: number;
}

interface DailyAnalyticsResponse {
  date: string;
  signups: number;
  visitors: number;
}

interface OrderAnalyticsResponse {
  totalSalesInPeriod: number;
  orders: { orderId: number; cost: number; salesPercentage: number; createdAt: string }[];
  products: { productId: number; productName: string; costInPeriod: number; salesPercentageInPeriod: number }[];
}

interface Colors {
  primary: [number, number, number];
  secondary: [number, number, number];
  accent: [number, number, number];
  success: [number, number, number];
  background: [number, number, number];
  text: [number, number, number];
  light: [number, number, number];
}

const CardMain: React.FC = () => {
  const [stats, setStats] = useState<Stat[]>([
    { value: "0", label: "Signups", icon: FaUserPlus },
    { value: "0", label: "Visitors", icon: FaUsers },
    { value: "0", label: "Orders", icon: FaBoxOpen },
    { value: "AED 0.00", label: "Revenue", icon: FaChartLine },
  ]);
  const [range, setRange] = useState<"Daily" | "Weekly" | "Monthly" | "Yearly" | "Custom">("Daily");
  const [customStartDate, setCustomStartDate] = useState<Date | null>(null);
  const [customEndDate, setCustomEndDate] = useState<Date | null>(null);
  const [showCustomRange, setShowCustomRange] = useState(false);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const today = new Date();
        let startDate: string;
        let endDate: string;

        if (range === "Custom" && customStartDate && customEndDate) {
          startDate = format(customStartDate, "yyyy-MM-dd");
          endDate = format(customEndDate, "yyyy-MM-dd");
        } else {
          if (range === "Daily") {
            startDate = format(today, "yyyy-MM-dd");
            endDate = startDate;
          } else if (range === "Weekly") {
            startDate = format(startOfWeek(today, { weekStartsOn: 1 }), "yyyy-MM-dd");
            endDate = format(endOfWeek(today, { weekStartsOn: 1 }), "yyyy-MM-dd");
          } else if (range === "Monthly") {
            startDate = format(startOfMonth(today), "yyyy-MM-dd");
            endDate = format(endOfMonth(today), "yyyy-MM-dd");
          } else {
            startDate = format(startOfYear(today), "yyyy-MM-dd");
            endDate = format(endOfYear(today), "yyyy-MM-dd");
          }
        }

        const dailyResponse = await axios.get<DailyAnalyticsResponse[]>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/analytics/daily`,
          {
            params: { startDate, endDate },
            headers: {
              Authorization: "Bearer your_jwt_token_here",
            },
          }
        );

        const orderResponse = await axios.get<OrderAnalyticsResponse>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/analytics/orders`,
          {
            params: { startDate, endDate },
            headers: {
              Authorization: "Bearer your_jwt_token_here",
            },
          }
        );

        let signups = 0;
        let visitors = 0;

        if (range === "Daily") {
          const todayData = dailyResponse.data.find((record) => record.date === startDate);
          if (todayData) {
            signups = todayData.signups;
            visitors = todayData.visitors;
          }
        } else {
          signups = dailyResponse.data.reduce((sum, record) => sum + record.signups, 0);
          visitors = dailyResponse.data.reduce((sum, record) => sum + record.visitors, 0);
        }

        const ordersCount = orderResponse.data.orders.length;
        const revenue = orderResponse.data.totalSalesInPeriod;

        setStats([
          { value: signups.toLocaleString(), label: `${range} Signups`, icon: FaUserPlus },
          { value: visitors.toLocaleString(), label: `${range} Visitors`, icon: FaUsers },
          { value: ordersCount.toLocaleString(), label: `${range} Orders`, icon: FaBoxOpen },
          {
            value: `AED ${revenue.toLocaleString("en-AE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            label: `${range} Revenue`,
            icon: FaChartLine,
          },
        ]);
      } catch (error) {
        console.error("Error fetching analytics:", error);
        setStats((prevStats) =>
          prevStats.map((stat) => ({
            ...stat,
            value: stat.label.includes("Revenue") ? "AED 0.00" : "0",
            label: `${range} ${stat.label.replace(/^(Daily|Weekly|Monthly|Yearly|Custom)\s/, "")}`,
          }))
        );
      }
    };

    fetchAnalytics();
  }, [range, customStartDate, customEndDate]);

  const handleRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const validRanges = ["Daily", "Weekly", "Monthly", "Yearly", "Custom"] as const;
    const newRange = e.target.value as typeof validRanges[number];

    if (validRanges.includes(newRange)) {
      setRange(newRange);
      setShowCustomRange(newRange === "Custom");
      if (newRange !== "Custom") {
        setCustomStartDate(null);
        setCustomEndDate(null);
      }
    } else {
      console.warn(`Invalid range value: ${e.target.value}`);
    }
  };

  const generatePDF = async () => {
    if (range === "Custom" && (!customStartDate || !customEndDate)) {
      alert("Please select both start and end dates for custom range.");
      return;
    }

    try {
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 20;
      const contentWidth = pageWidth - 2 * margin;
      const dateStr = format(new Date(), "dd MMM yyyy");
      let yPosition = 0;

      const colors: Colors = {
        primary: [99, 102, 241],
        secondary: [107, 114, 128],
        accent: [59, 130, 246],
        success: [34, 197, 94],
        background: [249, 250, 251],
        text: [17, 24, 39],
        light: [243, 244, 246],
      };

      let productSales: ProductSale[] = [];
      let totalRevenue = 0;
      let dailyAnalytics: DailyAnalyticsResponse[] = [];

      try {
        const today = new Date();
        let startDate: string;
        let endDate: string;

        if (range === "Custom" && customStartDate && customEndDate) {
          startDate = format(customStartDate, "yyyy-MM-dd");
          endDate = format(customEndDate, "yyyy-MM-dd");
        } else {
          if (range === "Daily") {
            startDate = format(today, "yyyy-MM-dd");
            endDate = startDate;
          } else if (range === "Weekly") {
            startDate = format(startOfWeek(today, { weekStartsOn: 1 }), "yyyy-MM-dd");
            endDate = format(endOfWeek(today, { weekStartsOn: 1 }), "yyyy-MM-dd");
          } else if (range === "Monthly") {
            startDate = format(startOfMonth(today), "yyyy-MM-dd");
            endDate = format(endOfMonth(today), "yyyy-MM-dd");
          } else {
            startDate = format(startOfYear(today), "yyyy-MM-dd");
            endDate = format(endOfYear(today), "yyyy-MM-dd");
          }
        }

        const dailyResponse = await axios.get<DailyAnalyticsResponse[]>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/analytics/daily`,
          {
            params: { startDate, endDate },
            headers: {
              Authorization: "Bearer your_jwt_token_here",
            },
          }
        );
        dailyAnalytics = dailyResponse.data.filter((d) => {
          try {
            new Date(d.date);
            return !isNaN(new Date(d.date).getTime());
          } catch {
            return false;
          }
        });

        const orderResponse = await axios.get<OrderAnalyticsResponse>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/analytics/orders`,
          {
            params: { startDate, endDate },
            headers: {
              Authorization: "Bearer your_jwt_token_here",
            },
          }
        );

        productSales = orderResponse.data.products.map((p) => ({
          productName: p.productName,
          costInPeriod: p.costInPeriod,
        }));
        totalRevenue = orderResponse.data.totalSalesInPeriod;
      } catch (error) {
        console.error("Error fetching product sales for PDF:", error);
      }

      const addModernHeader = (pageNum: number) => {
        pdf.setFillColor(...colors.primary);
        pdf.rect(0, 0, pageWidth, 35, "F");

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(24);
        pdf.setTextColor(255, 255, 255);
        pdf.text("Analytics Report", margin, 20);

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(12);
        pdf.text(dateStr, margin, 28);
        pdf.text(`Page ${pageNum}`, pageWidth - margin - 20, 28);

        return 45;
      };

      const addSectionHeader = (title: string, y: number) => {
        pdf.setFillColor(...colors.light);
        pdf.rect(margin, y, contentWidth, 12, "F");

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(16);
        pdf.setTextColor(...colors.text);
        pdf.text(title, margin + 5, y + 8);

        return y + 20;
      };

      const addModernFooter = () => {
        pdf.setDrawColor(...colors.light);
        pdf.setLineWidth(0.5);
        pdf.line(margin, pageHeight - 20, pageWidth - margin, pageHeight - 20);

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(10);
        pdf.setTextColor(...colors.secondary);
        pdf.text("Generated by Analytics Dashboard", margin, pageHeight - 10);
        pdf.text(format(new Date(), "dd MMM yyyy HH:mm"), pageWidth - margin - 40, pageHeight - 10);
      };

      const createBarChart = (
        data: { label: string; value: number; color: [number, number, number] }[],
        x: number,
        y: number,
        width: number,
        height: number
      ) => {
        if (!data || data.length === 0) {
          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(12);
          pdf.setTextColor(...colors.text);
          pdf.text("No data available for chart", x + width / 2, y + height / 2, { align: "center" });
          return;
        }

        const maxValue = Math.max(...data.map((d) => d.value), 1);
        const barWidth = Math.max(width / data.length - 5, 1);
        const chartHeight = height - 30;

        pdf.setFillColor(255, 255, 255);
        pdf.rect(x, y, width, height, "F");
        pdf.setDrawColor(...colors.light);
        pdf.rect(x, y, width, height, "S");

        data.forEach((item, index) => {
          const barHeight = Math.max((item.value / maxValue) * chartHeight, 0);
          const barX = x + 5 + index * (barWidth + 5);
          const barY = y + height - 20 - barHeight;

          if (barHeight >= 0 && barWidth >= 0 && !isNaN(barX) && !isNaN(barY)) {
            pdf.setFillColor(...item.color);
            pdf.rect(barX, barY, barWidth, barHeight, "F");

            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(8);
            pdf.setTextColor(...colors.text);
            const labelText = item.label.length > 8 ? item.label.substring(0, 8) + "..." : item.label;
            pdf.text(labelText, barX + barWidth / 2, y + height - 5, { align: "center" });

            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(9);
            pdf.text(item.value.toString(), barX + barWidth / 2, barY - 3, { align: "center" });
          }
        });
      };

      const createLineChart = (
        data: { x: string; y: number }[],
        x: number,
        y: number,
        width: number,
        height: number,
        title: string
      ) => {
        if (!data || data.length === 0) {
          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(12);
          pdf.setTextColor(...colors.text);
          pdf.text("No data available for chart", x + width / 2, y + height / 2, { align: "center" });
          return;
        }

        const maxValue = Math.max(...data.map((d) => d.y), 1);
        const minValue = Math.min(...data.map((d) => d.y), 0);
        const chartHeight = height - 40;
        const chartWidth = width - 40;

        pdf.setFillColor(255, 255, 255);
        pdf.rect(x, y, width, height, "F");
        pdf.setDrawColor(...colors.light);
        pdf.rect(x, y, width, height, "S");

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(12);
        pdf.setTextColor(...colors.text);
        pdf.text(title, x + width / 2, y + 15, { align: "center" });

        pdf.setDrawColor(...colors.light);
        pdf.setLineWidth(0.2);
        for (let i = 0; i <= 4; i++) {
          const gridY = y + 25 + (i * chartHeight / 4);
          pdf.line(x + 20, gridY, x + width - 20, gridY);
        }

        if (data.length > 1) {
          pdf.setDrawColor(...colors.primary);
          pdf.setLineWidth(2);

          for (let i = 0; i < data.length - 1; i++) {
            const x1 = x + 20 + (i * chartWidth / (data.length - 1));
            const y1 = y + 25 + chartHeight - ((data[i].y - minValue) / (maxValue - minValue)) * chartHeight;
            const x2 = x + 20 + ((i + 1) * chartWidth / (data.length - 1));
            const y2 = y + 25 + chartHeight - ((data[i + 1].y - minValue) / (maxValue - minValue)) * chartHeight;

            pdf.line(x1, y1, x2, y2);

            pdf.setFillColor(...colors.primary);
            pdf.circle(x1, y1, 1.5, "F");
          }

          const lastX = x + 20 + ((data.length - 1) * chartWidth / (data.length - 1));
          const lastY = y + 25 + chartHeight - ((data[data.length - 1].y - minValue) / (maxValue - minValue)) * chartHeight;
          pdf.circle(lastX, lastY, 1.5, "F");
        }

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8);
        if (data.length > 1) {
          data.forEach((item, index) => {
            if (index % Math.ceil(data.length / 5) === 0 && item.x) {
              const labelX = x + 20 + (index * chartWidth / (data.length - 1));
              if (!isNaN(labelX)) {
                pdf.text(item.x, labelX, y + height - 5, { align: "center" });
              }
            }
          });
        }
      };

      yPosition = addModernHeader(1);
      yPosition = addSectionHeader("Executive Summary", yPosition);

      const metrics = [
        {
          label: "Total Revenue",
          value: `AED ${totalRevenue.toLocaleString("en-AE", { minimumFractionDigits: 2 })}`,
          color: colors.success,
        },
        { label: "Total Orders", value: stats[2].value, color: colors.accent },
        { label: "Signups", value: stats[0].value, color: colors.primary },
        { label: "Visitors", value: stats[1].value, color: colors.secondary },
      ];

      const cardWidth = (contentWidth - 15) / 2;
      const cardHeight = 25;
      let cardX = margin;
      let cardY = yPosition;

      metrics.forEach((metric, index) => {
        if (index === 2) {
          cardY += cardHeight + 10;
          cardX = margin;
        }

        pdf.setFillColor(255, 255, 255);
        pdf.rect(cardX, cardY, cardWidth, cardHeight, "F");

        pdf.setDrawColor(...colors.light);
        pdf.setLineWidth(1);
        pdf.rect(cardX, cardY, cardWidth, cardHeight, "S");

        pdf.setFillColor(...metric.color);
        pdf.rect(cardX, cardY, 4, cardHeight, "F");

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(18);
        pdf.setTextColor(...colors.text);
        pdf.text(metric.value, cardX + 10, cardY + 12);

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(11);
        pdf.setTextColor(...colors.secondary);
        pdf.text(metric.label, cardX + 10, cardY + 20);

        cardX += cardWidth + 5;
      });

      yPosition = cardY + cardHeight + 30;

      if (productSales.length > 0) {
        yPosition = addSectionHeader("Top Products Performance", yPosition);

        const topProducts = productSales
          .sort((a, b) => b.costInPeriod - a.costInPeriod)
          .slice(0, 5)
          .map((product, index) => ({
            label: product.productName,
            value: Math.round(Math.max(product.costInPeriod, 0)),
            color: [
              colors.primary,
              colors.accent,
              colors.success,
              [255, 159, 64] as [number, number, number],
              [255, 99, 132] as [number, number, number],
            ][index] || colors.secondary,
          }));

        createBarChart(topProducts, margin, yPosition, contentWidth, 80);
        yPosition += 90;
      } else {
        yPosition = addSectionHeader("Top Products Performance", yPosition);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(12);
        pdf.setTextColor(...colors.text);
        pdf.text("No product data available", margin + 5, yPosition + 8);
        yPosition += 20;
      }

      if (productSales.length > 0) {
        yPosition = addSectionHeader("Product Performance", yPosition);

        pdf.setFillColor(...colors.primary);
        pdf.rect(margin, yPosition, contentWidth, 12, "F");

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(12);
        pdf.setTextColor(255, 255, 255);
        pdf.text("Product Name", margin + 5, yPosition + 8);
        pdf.text("Revenue (AED)", margin + contentWidth - 60, yPosition + 8);

        yPosition += 12;

        productSales.forEach((product, index) => {
          const rowColor: [number, number, number] = index % 2 === 0 ? [255, 255, 255] : colors.background;

          pdf.setFillColor(...rowColor);
          pdf.rect(margin, yPosition, contentWidth, 10, "F");

          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(10);
          pdf.setTextColor(...colors.text);

          const productName =
            product.productName.length > 30
              ? product.productName.substring(0, 30) + "..."
              : product.productName;
          pdf.text(productName, margin + 5, yPosition + 7);

          const revenue = Math.max(product.costInPeriod, 0).toLocaleString("en-AE", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
          pdf.text(revenue, margin + contentWidth - 60, yPosition + 7);

          yPosition += 10;

          if (yPosition > pageHeight - 60) {
            addModernFooter();
            pdf.addPage();
            yPosition = addModernHeader(2);
            yPosition = addSectionHeader("Product Performance (continued)", yPosition);

            pdf.setFillColor(...colors.primary);
            pdf.rect(margin, yPosition, contentWidth, 12, "F");
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(12);
            pdf.setTextColor(255, 255, 255);
            pdf.text("Product Name", margin + 5, yPosition + 8);
            pdf.text("Revenue (AED)", margin + contentWidth - 60, yPosition + 8);
            yPosition += 12;
          }
        });
      }

      addModernFooter();

      if (dailyAnalytics.length > 0) {
        pdf.addPage();
        yPosition = addModernHeader(2);
        yPosition = addSectionHeader("Analytics Trends", yPosition);

        const signupsData = dailyAnalytics.map((d) => ({
          x: format(new Date(d.date), "MM/dd"),
          y: Math.max(d.signups, 0),
        }));

        createLineChart(signupsData, margin, yPosition, contentWidth, 80, "Daily Signups Trend");
        yPosition += 90;

        const visitorsData = dailyAnalytics.map((d) => ({
          x: format(new Date(d.date), "MM/dd"),
          y: Math.max(d.visitors, 0),
        }));

        createLineChart(visitorsData, margin, yPosition, contentWidth, 80, "Daily Visitors Trend");

        addModernFooter();
      } else {
        pdf.addPage();
        yPosition = addModernHeader(2);
        yPosition = addSectionHeader("Analytics Trends", yPosition);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(12);
        pdf.setTextColor(...colors.text);
        pdf.text("No analytics data available", margin + 5, yPosition + 8);
        yPosition += 20;
        addModernFooter();
      }

      if (productSales.length > 0 && totalRevenue > 0) {
        pdf.addPage();
        yPosition = addModernHeader(3);
        yPosition = addSectionHeader("Revenue Analysis", yPosition);

        const revenueData = productSales
          .sort((a, b) => b.costInPeriod - a.costInPeriod)
          .slice(0, 6)
          .map((product, index) => ({
            label: product.productName.substring(0, 10),
            value: Math.round((Math.max(product.costInPeriod, 0) / totalRevenue) * 100),
            color: [
              colors.primary,
              colors.accent,
              colors.success,
              [255, 159, 64] as [number, number, number],
              [255, 99, 132] as [number, number, number],
              [153, 102, 255] as [number, number, number],
            ][index] || colors.secondary,
          }));

        createBarChart(revenueData, margin, yPosition, contentWidth, 100);
        yPosition += 110;

        yPosition = addSectionHeader("Summary Statistics", yPosition);

        const avgRevenue = totalRevenue / productSales.length;
        const topProduct = productSales.reduce((max, product) =>
          product.costInPeriod > max.costInPeriod ? product : max
        );

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(11);
        pdf.setTextColor(...colors.text);

        const summaryStats = [
          `Average Revenue per Product: AED ${avgRevenue.toLocaleString("en-AE", { minimumFractionDigits: 2 })}`,
          `Top Performing Product: ${topProduct.productName}`,
          `Top Product Revenue: AED ${topProduct.costInPeriod.toLocaleString("en-AE", { minimumFractionDigits: 2 })}`,
          `Total Products Analyzed: ${productSales.length}`,
          `Report Period: ${range}${range === "Custom" ? ` (${format(customStartDate!, "dd MMM yyyy")} - ${format(customEndDate!, "dd MMM yyyy")})` : ""}`,
        ];

        summaryStats.forEach((stat, index) => {
          pdf.text(`• ${stat}`, margin + 5, yPosition + index * 8);
        });

        addModernFooter();
      } else {
        pdf.addPage();
        yPosition = addModernHeader(3);
        yPosition = addSectionHeader("Revenue Analysis", yPosition);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(12);
        pdf.setTextColor(...colors.text);
        pdf.text("No revenue data available", margin + 5, yPosition + 8);
        yPosition += 20;
        addModernFooter();
      }

      const filename = `analytics-report-${format(new Date(), "yyyy-MM-dd")}.pdf`;
      pdf.save(filename);
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Failed to generate PDF. Please check the console for details.");
    }
  };

  return (
    <div className="py-5" id="card-main">
      <div className="flex justify-end mb-4 space-x-2">
        <select
          className="p-1 border text-xs w-24 rounded-lg bg-gray-100 text-black focus:outline-none"
          value={range}
          onChange={handleRangeChange}
        >
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
          <option value="Custom">Custom</option>
        </select>
        {showCustomRange && (
          <div className="flex space-x-2">
            <DatePicker
              selected={customStartDate}
              onChange={(date: Date | null) => setCustomStartDate(date)}
              selectsStart
              startDate={customStartDate}
              endDate={customEndDate}
              placeholderText="Start Date"
              className="p-1 border text-xs w-24 rounded-lg bg-gray-100 text-black focus:outline-none"
              dateFormat="dd/MM/yyyy"
            />
            <DatePicker
              selected={customEndDate}
              onChange={(date: Date | null) => setCustomEndDate(date)}
              selectsEnd
              startDate={customStartDate}
              endDate={customEndDate}
              minDate={customStartDate ?? undefined}
              placeholderText="End Date"
              className="p-1 border text-xs w-24 rounded-lg bg-gray-100 text-black focus:outline-none"
              dateFormat="dd/MM/yyyy"
            />
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-auto">
        {stats.map((stat, index) => (
          <Card key={index} value={stat.value} label={stat.label} Icon={stat.icon} />
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={generatePDF}
          className="p-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Generate Report
        </button>
      </div>
    </div>
  );
};

export default CardMain;