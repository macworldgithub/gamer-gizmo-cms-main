
"use client";
import React from "react";
import CredentialSide from "./CredentialSlide";
import PictureSide from "./PictureSlide";

interface layoutProps {
  children: React.ReactNode;
}

const LoginLayout = ({}: layoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-[80%] max-w-4xl flex shadow-lg shadow-neon-purple rounded-lg overflow-hidden border border-neon-blue">
        <CredentialSide />
        <PictureSide />
      </div>
    </div>
  );
};

export default LoginLayout;
