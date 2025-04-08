import React from "react";

const CustomLoader = () => {
  return (
    <div className="absolute top-0 overflow-hidden left-0 w-screen h-full min-h-screen bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className=" p-6 rounded-lg shadow-lg flex flex-col items-center">
        <div className="mt-3 w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-lg mt-2 font-semibold text-white">
          Loading ...
        </span>
      </div>
    </div>
  );
};

export default CustomLoader;
