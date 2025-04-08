import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { FaSkype } from "react-icons/fa6";
import Image from "next/image";

interface User {
  name: string;
  email: string;
  image: string;
  friends: number;
  followers: number;
  following: number;
  phone: string;
  birthday: string;
  socials: {
    facebook: boolean;
    twitter: boolean;
    linkedin: boolean;
    skype: boolean;
  };
}

export default function Home() {
  const user: User = {
    name: "Michel Smith",
    email: "john.example@gmail.com",
    image: "/Profile image.png",
    friends: 1702,
    followers: 3005,
    following: 1150,
    phone: "+00 1234 5678 91",
    birthday: "Dec 10, 1991",
    socials: {
      facebook: true,
      twitter: true,
      linkedin: true,
      skype: true,
    },
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 h-full min-h-min">
      <ProfileCard user={user} />
    </div>
  );
}

const ProfileCard = ({ user }: { user: User }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 text-center w-full h-full">
      <Image
        src={user.image}
        alt={user.name}
        width={160}
        height={160}
        className="w-40 h-40 mx-auto rounded-full border-4 border-white shadow-md"
      />
      <h2 className="mt-4 lg:text-xl text-md font-semibold">{user.name}</h2>
      <p className="text-gray-500 text-[12px]">{user.email}</p>

      <button className="mt-3 bg-custom-gradient text-white py-1 px-8 rounded-full">
        Follow
      </button>

      <div className="flex justify-between text-gray-600 lg:text-[12px] text-[10px] mt-8">
        <div>
          <p className="font-semibold">{user.friends}</p>
          <p>Friends</p>
        </div>
        <div>
          <p className="font-semibold">{user.followers}</p>
          <p>Followers</p>
        </div>
        <div>
          <p className="font-semibold">{user.following}</p>
          <p>Following</p>
        </div>
      </div>

      <div className="mt-10 text-left text-gray-700">
        <h2 className="font-bold mb-4 text-md">Contact Information</h2>
        <h3 className="font-bold text-md mt-5">Email address</h3>
        <p className="text-xsm">{user.email}</p>
        <h3 className="font-bold text-md mt-5">Phone Number</h3>
        <p className="text-xsm">{user.phone}</p>
        <h3 className="font-bold text-md mt-5">Birthday</h3>
        <p className="text-xsm">{user.birthday}</p>
        <h3 className="font-bold text-md mt-5">Social Profile</h3>
      </div>

      <div className="mt-8 flex justify-center space-x-4">
        {user.socials.facebook && <FaFacebookF size={18} className="cursor-pointer" />}
        {user.socials.skype && <FaSkype size={18} className="cursor-pointer" />}
        {user.socials.twitter && <FaTwitter size={18} className="cursor-pointer" />}
        {user.socials.linkedin && <FaLinkedinIn size={18} className="cursor-pointer" />}
      </div>
    </div>
  );
};
