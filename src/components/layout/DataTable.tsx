"use client";
import { useState } from "react";
import { Table, Input, Select } from "antd";
import type { ColumnsType } from "antd/lib/table";

const { Option } = Select;

interface DataTableProps<T> {
  data: T[];
  columns: ColumnsType<T>;
  showSearch?: boolean;
  showEntries?: boolean;
}

const DataTable = <T extends Record<string, unknown>>({
  data,
  columns,
  showSearch = true,
  showEntries = true,
}: DataTableProps<T>) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / entries);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * entries,
    currentPage * entries
  );

  const changePage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="px-4 bg-white rounded-lg p-4">
      {/* Search and Entries Section */}
      <div className="flex justify-between mb-4">
        {showEntries && (
          <div className="flex items-center">
            <label className="mr-2">Show</label>
            <Select
              value={entries}
              onChange={(value) => {
                setEntries(value);
                setCurrentPage(1); // Reset to page 1 on changing entries
              }}
              className="p-1"
            >
              {[5, 10, 20, 50].map((num) => (
                <Option key={num} value={num}>
                  {num}
                </Option>
              ))}
            </Select>
            <span className="ml-2">Entries</span>
          </div>
        )}

        {showSearch && (
          <div className="flex items-center space-x-2">
            <label className="font-medium">Search</label>
            <Input
              placeholder="Type to search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-52"
            />
          </div>
        )}
      </div>

      {/* Data Table with Horizontal Scroll */}
      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={paginatedData}
          pagination={false}
          rowKey={(record, index) =>
            index !== undefined ? index.toString() : " "
          }
          bordered={false}
        />
      </div>

      {/* Custom Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end mt-4">
          <div className="inline-flex bg-gray-200 rounded-lg px-2 border">
            <button
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-2"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => changePage(index + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === index + 1
                    ? "bg-[#6345ed] text-white"
                    : "border-[#6345ed]"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-2"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
