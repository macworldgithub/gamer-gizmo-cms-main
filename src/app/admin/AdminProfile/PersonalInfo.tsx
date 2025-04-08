"use client";

import { useState } from "react";

export default function ProfileForm() {
  const [formData, setFormData] = useState({
    firstName: "Michel",
    lastName: "Smith",
    phone: "+880 15589 236 45",
    email: "michel15@gmail.com",
    city: "Dhaka",
    state: "USA",
    postCode: "1219",
    country: "USA",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="mx-auto bg-white p-6 rounded-lg shadow-md h-full min-h-min">
      <div className="flex border-b border-black mb-4">
        <button className="px-4 py-2 font-semibold">Personal Info</button>
        <button className="px-4 py-2 text-gray-400">Payouts</button>
        <button className="px-4 py-2 text-gray-400">Change Password</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: "First Name", name: "firstName" },
          { label: "Last Name", name: "lastName" },
          { label: "Phone Number", name: "phone" },
          { label: "Email Address", name: "email" },
          { label: "City", name: "city" },
          { label: "State/Region", name: "state" },
          { label: "Post Code", name: "postCode" },
          { label: "Country", name: "country" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-semibold mt-10 ">{field.label}</label>
            <input
              type="text"
              name={field.name}
              value={formData[field.name as keyof typeof formData]}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-lg border-gray-400"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-16">
        <button className="px-4 py-2 text-white text-xsm bg-custom-gradient rounded-full">
          Update Profile
        </button>
      </div>
    </div>
  );
}
