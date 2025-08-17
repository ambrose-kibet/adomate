"use client";

import Image from "next/image";

const Logo: React.FC = () => {
  return (
    <Image
      alt="Adomate Logo"
      width={120}
      height={120}
      src="/images/logo.png"
      priority
      className="hover:scale-105 transition-transform duration-300 ease-in-out"
    />
  );
};

export default Logo;
