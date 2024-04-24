"use client";

import Image from "next/image";
import React from "react";
import { Input } from "@/components/ui/input";

interface LocalSearchbarProps {
  route: string;
  imgSrc: string;
  placeholder: string;
  iconPosition: string;
  className?: string;
}

const LocalSearchbar = ({
  route,
  imgSrc,
  iconPosition,
  placeholder,
  className,
}: LocalSearchbarProps) => {
  // const [state, setState] = useState()
  // useEffect(() => {

  // }, [])
  return (
    <div
      className={`background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${className}`}
    >
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          height={24}
          width={24}
          alt="search"
          className="cursor-pointer"
        />
      )}
      <Input
        type="text"
        placeholder={placeholder}
        value=""
        className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
      />
      {iconPosition === "right" && (
        <Image
          src={imgSrc}
          height={24}
          width={24}
          alt="search"
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearchbar;
