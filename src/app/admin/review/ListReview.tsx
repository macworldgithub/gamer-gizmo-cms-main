"use client";
import React, { useState } from "react";
import { StarFilled } from "@ant-design/icons";
import Image from "next/image";
import { Pagination } from "antd";

const data = [
  {
    key: "1",
    product: "Gaming Console",
    date: "2024-03-13 4:50PM",
    user: "WowTheme7",
    comment: "Lorem ipsum dolor sit.",
    rating: 5,
  },
  {
    key: "2",
    product: "Gaming Console",
    date: "2024-03-13 4:50PM",
    user: "WowTheme7",
    comment: "Lorem ipsum dolor sit.",
    rating: 5,
  },
  {
    key: "3",
    product: "Gaming Console",
    date: "2024-03-13 4:50PM",
    user: "WowTheme7",
    comment: "Lorem ipsum dolor sit.",
    rating: 5,
  },
  {
    key: "4",
    product: "Gaming Console",
    date: "2024-03-13 4:50PM",
    user: "WowTheme7",
    comment: "Lorem ipsum dolor sit.",
    rating: 5,
  },
  {
    key: "5",
    product: "Gaming Console",
    date: "2024-03-13 4:50PM",
    user: "WowTheme7",
    comment: "Lorem ipsum dolor sit.",
    rating: 5,
  },
  {
    key: "6",
    product: "Gaming Console",
    date: "2024-03-13 4:50PM",
    user: "WowTheme7",
    comment: "Lorem ipsum dolor sit.",
    rating: 5,
  },
  {
    key: "7",
    product: "Gaming Console",
    date: "2024-03-13 4:50PM",
    user: "WowTheme7",
    comment: "Lorem ipsum dolor sit.",
    rating: 5,
  },
];

const ListReview = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      <div className="container mx-auto py-8 px-4">
        <div className="overflow-x-auto bg-white p-4 rounded-2xl shadow-md">
          <div className="grid grid-cols-4 gap-4 items-center min-w-[700px] py-3 px-4 border-b-2 border-gray-400 pb-4">
            <div className="text-black font-bold text-center">
              Product | Date
            </div>
            <div className="text-black font-bold text-center">User</div>
            <div className="text-black font-bold text-center">Rating</div>
            <div className="text-black font-bold text-center">Action</div>
          </div>

          <div className="space-y-10">
            {paginatedData.map((row) => (
              <div
                key={row.key}
                className="border border-black rounded-2xl p-4 shadow-sm grid grid-cols-4 gap-4 items-center min-w-[700px] mt-7"
              >
                <div className="text-center">
                  <span className="font-bold">{row.product}</span>
                  <br />
                  <span className="text-gray-500 text-sm">{row.date}</span>
                </div>

                <div className="text-center">
                  <span className="font-bold">{row.user}</span>
                  <br />
                  <span className="text-gray-500 text-sm">{row.comment}</span>
                </div>

                <div className="text-yellow-500 text-lg flex justify-center gap-1">
                  {[...Array(row.rating)].map((_, i) => (
                    <StarFilled key={i} />
                  ))}
                </div>

                <div className="flex justify-center">
                  <Image
                    src="/Action.png"
                    alt="Action Icon"
                    width={40}
                    height={40}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6 px-4">
        <Pagination
          current={currentPage}
          total={data.length}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default ListReview;
