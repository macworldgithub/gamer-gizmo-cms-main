import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <div className="flex items-center border  border-gray-300 rounded-full px-4 py-2 lg:w-[60rem] md:w-[20rem] max-w-md bg-white">
      <input
        type="text"
        placeholder="Find what you want."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 outline-none px-2 text-gray-700 bg-transparent"
      />
      <svg
        className="w-5 h-5 text-gray-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35m2.35-6.15a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"
        ></path>
      </svg>
    </div>
  );
}
