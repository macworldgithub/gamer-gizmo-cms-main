
"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  format,
  eachDayOfInterval,
  eachMonthOfInterval,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  eachWeekOfInterval,
  startOfWeek,
  endOfWeek,
} from "date-fns";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Product {
  id: number;
  name: string;
}

interface OrderAnalyticsResponse {
  totalCost: number;
  totalSalesOverall: number;
  totalSalesInPeriod: number;
  orders: {
    orderId: number;
    cost: number;
    salesPercentage: number;
    createdAt: string;
  }[];
  products: {
    productId: number;
    productName: string;
    costInPeriod: number;
    salesPercentageInPeriod: number;
    costOverall: number;
    salesPercentageOverall: number;
  }[];
}

const SalesChart = () => {
  const [selectedRange, setSelectedRange] = useState<"Daily" | "Weekly" | "Monthly" | "Yearly">("Weekly");
  const [startDate, setStartDate] = useState<string>(
    format(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), "yyyy-MM-dd")
  );
  const [endDate, setEndDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [selectedProductId, setSelectedProductId] = useState<string>("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [salesData, setSalesData] = useState<OrderAnalyticsResponse | null>(null);
  const [productsError, setProductsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/store-products-with-orders`);
        setProducts(response.data);
        setProductsError(null);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProductsError("Unable to load products. Please try again later.");
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const params: { startDate: string; endDate: string; productId?: string } = { startDate, endDate };
        if (selectedProductId !== "all") {
          params.productId = selectedProductId;
        }
        const response = await axios.get<OrderAnalyticsResponse>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/analytics/orders`,
          { params }
        );
        setSalesData(response.data);
      } catch (error) {
        console.error("Failed to fetch sales data:", error);
        setSalesData(null);
      }
    };

    fetchSalesData();
  }, [startDate, endDate, selectedProductId]);

  const colors = [
    { border: "#1e90ff", background: "rgba(30, 144, 255, 0.2)" },
    { border: "#ff6347", background: "rgba(255, 99, 71, 0.2)" },
    { border: "#32cd32", background: "rgba(50, 205, 50, 0.2)" },
    { border: "#ff69b4", background: "rgba(255, 105, 180, 0.2)" },
  ];

  const getChartData = () => {
    if (!salesData) {
      return { labels: [], datasets: [] };
    }

    let labels: string[] = [];
    const datasets: any[] = [];

    if (selectedRange === "Daily") {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = eachDayOfInterval({ start, end });
      labels = days.map((day) => format(day, "MM-dd"));

      const productSales: Record<string, number[]> = {};
      salesData.products.forEach((product) => {
        productSales[product.productId] = new Array(days.length).fill(0);
      });

      salesData.orders.forEach((order) => {
        const orderDate = new Date(order.createdAt);
        const dayIndex = days.findIndex((day) => format(day, "yyyy-MM-dd") === format(orderDate, "yyyy-MM-dd"));
        if (dayIndex >= 0) {
          salesData.products.forEach((product) => {
            if (selectedProductId === "all" || product.productId.toString() === selectedProductId) {
              productSales[product.productId][dayIndex] += order.cost * (product.salesPercentageInPeriod / 100);
            }
          });
        }
      });

      salesData.products.forEach((product, index) => {
        if (selectedProductId === "all" || product.productId.toString() === selectedProductId) {
          const color = colors[index % colors.length];
          datasets.push({
            label: product.productName,
            data: productSales[product.productId],
            borderColor: color.border,
            backgroundColor: color.background,
            fill: true,
          });
        }
      });
    } else if (selectedRange === "Weekly") {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const weeks = eachWeekOfInterval({ start, end }, { weekStartsOn: 1 });
      labels = weeks.map((weekStart) => {
        const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
        return `${format(weekStart, "MM-dd")} to ${format(weekEnd, "MM-dd")}`;
      });

      const productSales: Record<string, number[]> = {};
      salesData.products.forEach((product) => {
        productSales[product.productId] = new Array(weeks.length).fill(0);
      });

      salesData.orders.forEach((order) => {
        const orderDate = new Date(order.createdAt);
        const weekIndex = weeks.findIndex((weekStart) => {
          const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
          return orderDate >= weekStart && orderDate <= weekEnd;
        });
        if (weekIndex >= 0) {
          salesData.products.forEach((product) => {
            if (selectedProductId === "all" || product.productId.toString() === selectedProductId) {
              productSales[product.productId][weekIndex] += order.cost * (product.salesPercentageInPeriod / 100);
            }
          });
        }
      });

      salesData.products.forEach((product, index) => {
        if (selectedProductId === "all" || product.productId.toString() === selectedProductId) {
          const color = colors[index % colors.length];
          datasets.push({
            label: product.productName,
            data: productSales[product.productId],
            borderColor: color.border,
            backgroundColor: color.background,
            fill: true,
          });
        }
      });
    } else if (selectedRange === "Monthly") {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = eachDayOfInterval({ start, end });
      labels = days.map((day) => format(day, "MM-dd"));

      const productSales: Record<string, number[]> = {};
      salesData.products.forEach((product) => {
        productSales[product.productId] = new Array(days.length).fill(0);
      });

      salesData.orders.forEach((order) => {
        const orderDate = new Date(order.createdAt);
        const dayIndex = days.findIndex((day) => format(day, "yyyy-MM-dd") === format(orderDate, "yyyy-MM-dd"));
        if (dayIndex >= 0) {
          salesData.products.forEach((product) => {
            if (selectedProductId === "all" || product.productId.toString() === selectedProductId) {
              productSales[product.productId][dayIndex] += order.cost * (product.salesPercentageInPeriod / 100);
            }
          });
        }
      });

      salesData.products.forEach((product, index) => {
        if (selectedProductId === "all" || product.productId.toString() === selectedProductId) {
          const color = colors[index % colors.length];
          datasets.push({
            label: product.productName,
            data: productSales[product.productId],
            borderColor: color.border,
            backgroundColor: color.background,
            fill: true,
          });
        }
      });
    } else {
      const start = startOfMonth(new Date(startDate));
      const end = endOfMonth(new Date(endDate));
      const months = eachMonthOfInterval({ start, end });
      labels = months.map((month) => format(month, "MMM"));

      const productSales: Record<string, number[]> = {};
      salesData.products.forEach((product) => {
        productSales[product.productId] = new Array(months.length).fill(0);
      });

      salesData.orders.forEach((order) => {
        const orderDate = new Date(order.createdAt);
        const monthIndex = months.findIndex((month) => format(month, "yyyy-MM") === format(orderDate, "yyyy-MM"));
        if (monthIndex >= 0) {
          salesData.products.forEach((product) => {
            if (selectedProductId === "all" || product.productId.toString() === selectedProductId) {
              productSales[product.productId][monthIndex] += order.cost * (product.salesPercentageInPeriod / 100);
            }
          });
        }
      });

      salesData.products.forEach((product, index) => {
        if (selectedProductId === "all" || product.productId.toString() === selectedProductId) {
          const color = colors[index % colors.length];
          datasets.push({
            label: product.productName,
            data: productSales[product.productId],
            borderColor: color.border,
            backgroundColor: color.background,
            fill: true,
          });
        }
      });
    }

    return { labels, datasets };
  };

  return (
    <div className="w-full h-[29rem] p-4 bg-white shadow-lg rounded-lg relative" id="sales-chart">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-start">Sales History</h2>
        <div className="flex space-x-2">
          <input
            type="date"
            className="p-1 border text-xs rounded-full bg-custom-gradient text-black focus:outline-none"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className="p-1 border text-xs rounded-full bg-custom-gradient text-black focus:outline-none"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          {productsError ? (
            <span className="text-red-500 text-xs">Product list unavailable</span>
          ) : (
            <select
              className="p-1 border text-xs w-24 rounded-full bg-custom-gradient text-black focus:outline-none"
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
            >
              <option value="all">All Products</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          )}
          <select
            className="p-1 border text-xs w-20 rounded-lg bg-custom-gray text-black focus:outline-none"
            value={selectedRange}
            onChange={(e) => {
              const newRange = e.target.value as "Daily" | "Weekly" | "Monthly" | "Yearly";
              setSelectedRange(newRange);
              if (newRange === "Daily") {
                setStartDate(format(new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"));
                setEndDate(format(new Date(), "yyyy-MM-dd"));
              } else if (newRange === "Weekly") {
                setStartDate(format(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"));
                setEndDate(format(new Date(), "yyyy-MM-dd"));
              } else if (newRange === "Monthly") {
                setStartDate(format(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"));
                setEndDate(format(new Date(), "yyyy-MM-dd"));
              } else {
                setStartDate(format(startOfYear(new Date()), "yyyy-MM-dd"));
                setEndDate(format(endOfYear(new Date()), "yyyy-MM-dd"));
              }
            }}
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </div>
      </div>

      {salesData ? (
        <div className="mb-4 text-sm">
          <p>Total Sales in Period: AED {salesData.totalSalesInPeriod.toFixed(2)}</p>
          <p>Total Sales Overall: AED {salesData.totalSalesOverall.toFixed(2)}</p>
          {selectedProductId !== "all" && salesData.products[0] && (
            <>
              <p>
                {salesData.products[0].productName} in Period: AED {salesData.products[0].costInPeriod.toFixed(2)} (
                {salesData.products[0].salesPercentageInPeriod.toFixed(2)}%)
              </p>
              <p>
                {salesData.products[0].productName} Overall: AED {salesData.products[0].costOverall.toFixed(2)} (
                {salesData.products[0].salesPercentageOverall.toFixed(2)}%)
              </p>
            </>
          )}
        </div>
      ) : (
        <div className="mb-4 text-sm text-gray-500">No sales data available for the selected period.</div>
      )}

      <div className="h-[70%]">
        <Line
          data={getChartData()}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: "top" },
            },
            scales: {
              y: { beginAtZero: true },
            },
          }}
        />
      </div>
    </div>
  );
};

export default SalesChart;