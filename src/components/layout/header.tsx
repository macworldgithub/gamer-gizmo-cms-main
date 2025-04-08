"use client";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className="max-md:w-full max-md:h-20 h-16 bg-white flex max-md:justify-center lg:justify-between md:justify-between md:px-8 items-center lg:px-10 shadow-xl shadow-gray-300">
      {/* Logo */}
      <Link href="/">
        <Image
          src="/gameIcon.png"
          alt="logo-img"
          width={100}
          height={100}
          className="max-sm:w-[4rem] md:w-[2rem] md:ml-[0.2rem] lg:w-[5rem] md:h-[1.8rem] lg:h-12 max-sm:mx-auto"
        />
      </Link>
      {/* Search Bar */}
      {/* <div className="flex items-center justify-center min-h-screen rounded-full bg-white">
        <SearchBar />
      </div> */}

      {/* Right Section */}
      <div className="flex items-center space-x-3">
        {/* Theme Toggle Button */}
        {/* <div className="flex items-center bg-white shadow-md rounded-full px-2 py-1">
          <button className="bg-custom-gradient text-white px-4 py-1 rounded-full">
            <Image src={light} alt="light mode" width={20} height={20} />
          </button>
          <button className="text-gray-500 px-2 py-1 w-1/2">
            <Image src={moon} alt="dark mode" width={20} height={20} />
          </button>
        </div> */}

        {/* Profile Image - Centered */}
        {/* {isLogin ? (
          <div className="flex items-center justify-center bg-white shadow-md rounded-full p-1">
            <Image
              src="/profile .png"
              alt="Profile"
              width={32}
              height={32}
              className="rounded-full"
            />
          </div>
        ) : (
          <Link href="/admin/login">
            <div className="flex items-center bg-custom-gradient rounded-full px-4 py-2 cursor-pointer">
              <Image src="/images/btnIcon.png" width={18} height={18} alt="btnIcon" />
              <p className="text-white font-bold text-sm ml-2">Login</p>
            </div>
          </Link>
        )} */}
      </div>
    </div>
  );
};

export default Header;
