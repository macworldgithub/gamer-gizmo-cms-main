
"use client";

import React, { useState, useEffect } from "react";
import { FaUserPlus, FaUsers, FaBoxOpen, FaChartLine } from "react-icons/fa";
import axios from "axios";
import Card from "./Card";
import { format, startOfMonth, endOfMonth, startOfYear, endOfYear, startOfWeek, endOfWeek } from "date-fns";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

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
        const today = new Date();
        let startDate: string;
        let endDate: string;

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
            label: `${range} ${stat.label.replace(/^(Daily|Weekly|Monthly|Yearly)\s/, "")}`,
          }))
        );
      }
    };

    fetchAnalytics();
  }, [range]);

  const generatePDF = async () => {
    try {
      const cardMain = document.getElementById("card-main");
      const salesChart = document.getElementById("sales-chart");
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 10;
      const dateStr = format(new Date(), "yyyy-MM-dd");
      let currentY = 25; // Initialize currentY at the top

      // Fetch product sales data for the table
      let productSales: ProductSale[] = [];
      try {
        const today = new Date();
        let startDate: string;
        let endDate: string;
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
      } catch (error) {
        console.error("Error fetching product sales for PDF:", error);
      }

      // Helper to add header and footer
      const addHeaderFooter = (pageNum: number, totalPages: number) => {
        pdf.setFont("times", "bold");
        pdf.setFontSize(14);
        pdf.setTextColor(30, 144, 255); // Blue
        pdf.text(`Analytics Report - ${dateStr}`, pageWidth / 2, 10, { align: "center" });
        pdf.setFont("times", "normal");
        pdf.setFontSize(10);
        pdf.setTextColor(100); // Gray
        pdf.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margin, pageHeight - 5);
        pdf.setLineWidth(0.5);
        pdf.setDrawColor(30, 144, 255);
        pdf.line(margin, 15, pageWidth - margin, 15); // Header line
        pdf.line(margin, pageHeight - 10, pageWidth - margin, pageHeight - 10); // Footer line
      };

      // Calculate total pages based on product sales table length
      const tableRowHeight = 6;
      const tableHeaderHeight = 16; // Title + line + header row
      const tableSpaceNeeded = productSales.length > 0 ? tableHeaderHeight + productSales.length * tableRowHeight : 10;
      const cardMainHeightEstimate = 100; // Approximate height for CardMain content
      const totalPages = tableSpaceNeeded + cardMainHeightEstimate > pageHeight - 80 ? 3 : 2;

      // Page 1: CardMain + Product Sales Table
      if (cardMain) {
        const canvas = await html2canvas(cardMain, {
          scale: 3,
          backgroundColor: "#f3f4f6",
          useCORS: true,
          logging: true,
        });
        const imgData = canvas.toDataURL("image/png", 1.0);
        const imgWidth = canvas.width * 0.264583;
        const imgHeight = canvas.height * 0.264583;
        const ratio = Math.min((pageWidth - 2 * margin) / imgWidth, (pageHeight - 80) / imgHeight);
        const scaledWidth = imgWidth * ratio;
        const scaledHeight = imgHeight * ratio;

        // Add light gray background
        pdf.setFillColor(240, 240, 240);
        pdf.rect(margin, 20, pageWidth - 2 * margin, scaledHeight + 10, "F");
        pdf.addImage(imgData, "PNG", margin, 25, scaledWidth, scaledHeight);
        currentY = 25 + scaledHeight + 10;

        // Add product sales table
        if (productSales.length > 0) {
          pdf.setFont("times", "bold");
          pdf.setFontSize(12);
          pdf.setTextColor(30, 144, 255);
          pdf.text(`${range} Product Sales`, margin, currentY);
          currentY += 5;
          pdf.setLineWidth(0.3);
          pdf.setDrawColor(30, 144, 255);
          pdf.line(margin, currentY, pageWidth - margin, currentY);
          currentY += 5;

          pdf.setFont("times", "normal");
          pdf.setFontSize(10);
          pdf.setTextColor(0);
          const tableWidth = pageWidth - 2 * margin;
          const col1Width = tableWidth * 0.6;
          const col2Width = tableWidth * 0.4;
          pdf.setFillColor(220, 220, 220);
          pdf.rect(margin, currentY, tableWidth, 6, "F");
          pdf.text("Product", margin + 2, currentY + 4);
          pdf.text("Sales (AED)", margin + col1Width + 2, currentY + 4);
          currentY += 6;

          productSales.forEach((product) => {
            if (currentY > pageHeight - 20) {
              pdf.addPage();
              addHeaderFooter(2, totalPages);
              currentY = 20;
              pdf.setFillColor(240, 240, 240);
              pdf.rect(margin, currentY, pageWidth - 2 * margin, 10, "F");
              currentY += 10;
            }
            pdf.setFillColor(255, 255, 255);
            pdf.rect(margin, currentY, tableWidth, 6, "F");
            pdf.text(product.productName, margin + 2, currentY + 4);
            pdf.text(
              product.costInPeriod.toLocaleString("en-AE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
              margin + col1Width + 2,
              currentY + 4
            );
            currentY += 6;
          });
        } else {
          pdf.setFont("times", "italic");
          pdf.setFontSize(10);
          pdf.setTextColor(100);
          pdf.text("No product sales data available.", margin, currentY);
        }

        addHeaderFooter(1, totalPages);
      } else {
        console.error("CardMain DOM element not found");
      }

      // Page 2 (or 3): SalesChart
      if (salesChart) {
        pdf.addPage();
        const canvas = await html2canvas(salesChart, {
          scale: 3,
          backgroundColor: "#ffffff",
          useCORS: true,
          logging: true,
        });
        const imgData = canvas.toDataURL("image/png", 1.0);
        const imgWidth = canvas.width * 0.264583;
        const imgHeight = canvas.height * 0.264583;
        const ratio = Math.min((pageWidth - 2 * margin) / imgWidth, (pageHeight - 30 - margin) / imgHeight);
        const scaledWidth = imgWidth * ratio;
        const scaledHeight = imgHeight * ratio;

        pdf.setFillColor(240, 240, 240);
        pdf.rect(margin, 20, pageWidth - 2 * margin, scaledHeight + 10, "F");
        pdf.addImage(imgData, "PNG", margin, 25, scaledWidth, scaledHeight);
        addHeaderFooter(totalPages, totalPages);
      } else {
        console.error("SalesChart DOM element not found");
      }

      pdf.save(`analytics-report-${dateStr}.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Failed to generate PDF. Please check the console for details.");
    }
  };

  return (
    <div className="py-5" id="card-main">
      <div className="flex justify-end mb-4">
        <select
          className="p-1 border text-xs w-24 rounded-lg bg-gray-100 text-black focus:outline-none"
          value={range}
          onChange={(e) => setRange(e.target.value as "Daily" | "Weekly" | "Monthly" | "Yearly")}
        >
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>
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