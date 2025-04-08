"use client";

import { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { TiTick } from 'react-icons/ti';

export default function Home() {
    const [status, setStatus] = useState({
        email: false,
        phoneNumber: false,
        address: true,
        document: true,
    });

    const handleApprove = () => {
        setStatus((prev) => ({
            ...prev,
            email: true,
            phoneNumber: true,
            address: true,
            document: true,
        }));
    };

    const handleDecline = () => {
        setStatus((prev) => ({
            ...prev,
            email: false,
            phoneNumber: false,
            address: false,
            document: false,
        }));
    };

    return (
        <div className="py-10 bg-gray-100 flex">
            <div className="w-full p-6 bg-white shadow-lg rounded-lg">
                <div className="flex justify-between items-center mb-8">
                    <button
                        onClick={handleApprove}
                        className="px-8 py-1 bg-[#00d982] text-white font-semibold rounded-lg shadow-md hover:bg-green-600 lg:px-3 lg:text-[10px] xl:px-8 xl:text-md"
                    >
                        APPROVED
                    </button>
                    <button
                        onClick={handleDecline}
                        className="px-8 py-1 bg-[#d90004] text-white font-semibold rounded-lg shadow-md hover:bg-red-600 lg:px-3 lg:text-[10px] xl:px-8 xl:text-md"
                    >
                        DECLINE
                    </button>
                </div>

                <div className="space-y-4 text-gray-700">
                    {Object.entries(status).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center">
                            <span className="capitalize font-medium">
                                {key.replace(/([A-Z])/g, ' $1')}
                            </span>
                            {value ? (
                                <span className="bg-green-500 text-white rounded-full h-6 w-6 flex items-center justify-center">
                                    <TiTick size={16} />
                                </span>
                            ) : (
                                <span className="bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center">
                                    <RxCross2 size={16} />
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
