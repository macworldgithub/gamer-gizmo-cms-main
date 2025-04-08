import Image from "next/image";
import profile from "../../../../public/profile.png";
import img1 from "../../../../public/img-1.png";
import img2 from "../../../../public/img-2.png";
import img3 from "../../../../public/img-3.png";
import img4 from "../../../../public/img-4.png";
import img5 from "../../../../public/img-5.png";
import img6 from "../../../../public/img-6.png";
import img7 from "../../../../public/img-7.png";

export default function Home() {
  const user = {
    name: "Michel Smith",
    username: "michel15",
    email: "michel15@gmail.com",
    image: "/Profile image.png",
    phone: "+880 15589 236 45",
    country: "Bangladesh",
    balance: "$0.00 USD",
    memberSince: "Jan. 01, 2024",
    purchasedItems: "0 Items",
  };

  const userDetails = [
    { label: "Username", value: user.username, icon: img1 },
    { label: "Email", value: user.email, icon: img2 },
    { label: "Phone", value: user.phone, icon: img3 },
    { label: "Country", value: user.country, icon: img4 },
    { label: "Balance", value: user.balance, icon: img5 },
    { label: "Member Since", value: user.memberSince, icon: img6 },
    { label: "Purchased", value: user.purchasedItems, icon: img7 },
  ];

  return (
    <div className="flex items-center justify-center bg-gray-100 h-full min-h-min">
      <ProfileCard user={user} userDetails={userDetails} />
    </div>
  );
}

// @ts-expect-error: user or userDetails type is not explicitly defined
const ProfileCard = ({ user, userDetails }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 text-center w-full h-full">
      {/* Profile Image */}
      <div className="relative mx-auto w-40 h-40">
        <Image
          src={user.image}
          alt={user.name}
          className="w-full h-full rounded-full border-4 border-white shadow-md"
        />
        <div className="absolute bottom-0 right-0 p-2 rounded-full bg-custom-gradient">
          <Image src={profile} width={20} height={20} alt="profile" />
        </div>
      </div>

      {/* Name and Title */}
      <h2 className="mt-3 text-lg lg:text-2xl font-semibold">{user.name}</h2>
      <p className="text-gray-500 text-sm lg:text-lg">Exclusive Author</p>

      {/* Dynamically Mapped User Details */}
      <div className="mt-4 text-left space-y-2 text-sm text-gray-700 ">
        {/* @ts-expect-error kjhkj */}
        {userDetails.map((detail, index) => (
          <div
            key={index}
            className="flex justify-between max-xl:flex-col max-lg:flex-row   border-dashed border-b border-gray-500 py-4 "
          >
            <div className="flex gap-4">
              <Image
                src={detail.icon}
                width={24}
                height={24}
                alt={detail.label}
              />
              <span className="font-semibold">{detail.label}:</span>
            </div>
            <div>
              <span className="lg:pl-10 xl:p-0">{detail.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
