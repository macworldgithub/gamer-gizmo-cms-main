"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const CredentialSide = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");

    if (!username || !password) {
      setError("Email and password are required.");
      toast.error("Email and password are required.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/admin/signin`,
        { email: username, password }
      );

      if (response.status === 201) {
        console.log(response.data, "response");
        localStorage.setItem("admin-x-token", response.data.token);
        localStorage.setItem(
          "admin",
          JSON.stringify({
            email: response.data.email,
            name: response.data.name,
            id: response.data.id,
            created_at: response.data.created_at,
            type: response.data.type,
          })
        );

        toast.success("Successfully logged in");
        setTimeout(() => {
          router.push("/admin/dashboard");
        }, 2000);
      } else {
        setError("Invalid credentials. Please try again.");
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err); // Log the error for debugging
      setError("Failed to login. Please check your credentials.");
      toast.error("Failed to login. Please check your credentials.");
    }
  };

  // const handleSubmit = async () => {
  //   setError("");

  //   if (!username || !password) {
  //     setError("Email and password are required.");
  //     toast.error("Email and password are required.");
  //     return;
  //   }

  //   const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/admin/signin`;
  //   const payload = { email: username, password };

  //   console.log(" Submitting login to:", url);
  //   console.log(" Payload:", payload);

  //   try {
  //     const response = await axios.post(url, payload);

  //     console.log("✅ Raw response:", response);

  //     if (response.status === 201) {
  //       const token = response.data.token;
  //       console.log("🎫 Received Token:", token);

  //       localStorage.setItem("admin-x-token", token);
  //       localStorage.setItem(
  //         "admin",
  //         JSON.stringify({
  //           email: response.data.email,
  //           name: response.data.name,
  //           id: response.data.id,
  //           created_at: response.data.created_at,
  //           type: response.data.type,
  //         })
  //       );

  //       toast.success("Successfully logged in");
  //       setTimeout(() => {
  //         router.push("/admin/dashboard");
  //       }, 2000);
  //     } else {
  //       console.warn("⚠️ Unexpected status code:", response.status);
  //       setError("Invalid credentials. Please try again.");
  //       toast.error("Invalid credentials. Please try again.");
  //     }
  //   } catch (err: any) {
  //     console.error("❌ Login error:", err);

  //     if (err.response) {
  //       console.error(
  //         "📩 Server responded with:",
  //         err.response.status,
  //         err.response.data
  //       );
  //     } else if (err.request) {
  //       console.error("📭 No response received:", err.request);
  //     } else {
  //       console.error("🚨 Error setting up request:", err.message);
  //     }

  //     setError("Failed to login. Please check your credentials.");
  //     toast.error("Failed to login. Please check your credentials.");
  //   }
  // };

  return (
    <div className="md:w-2/3 w-full p-10 flex flex-col items-center bg-black text-white shadow-neon-purple md:border-r md:border-neon-blue">
      <h1 className="text-3xl font-extrabold text-neon-purple mb-6">
        Admin Login
      </h1>

      <input
        type="email"
        className="w-full p-3 mb-4 rounded bg-gray-900 text-white border border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-purple"
        placeholder="Email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        className="w-full p-3 mb-4 rounded bg-gray-900 text-white border border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-purple"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="text-red-500">{error}</p>}

      {/* <div className="w-full">
        <label htmlFor="rememberMe" className="text-black dark:text-white">
          <input type="checkbox" id="rememberMe" className="mr-2" />
          Remember Me
        </label>
      </div> */}

      <button
        onClick={handleSubmit}
        className="w-full py-2 stylishbutton mt-4 bg-neon-purple hover:bg-neon-blue transition-all rounded-full flex items-center justify-center text-white font-bold"
      >
        <Image
          className="mr-2"
          src="/send.svg"
          width={16}
          height={13}
          alt="login"
        />
        Sign In
      </button>
    </div>
  );
};

export default CredentialSide;
