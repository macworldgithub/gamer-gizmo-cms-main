import React from "react";
import Image from "next/image";

const PictureSide = () => {
  return (
    <div className="w-1/3 hidden md:block overflow-hidden border-l border-neon-blue">
      <Image
        src="/loginPicture.png"
        alt="login picture"
        width={500}
        height={500}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default PictureSide;
