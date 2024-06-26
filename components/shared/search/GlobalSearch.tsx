"use client";

import Image from "next/image";
import React from "react";
import { Input } from "@/components/ui/input";

// interface GlobalsearchProps {
// children: ReactNode
// }

const GlobalSearch = () => {
  // const [state, setState] = useState()
  // useEffect(() => {

  // }, [])
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Image
          src="/assets/icons/search.svg"
          height={24}
          width={24}
          alt="search"
          className="cursor-pointer"
        />
        <Input
          type="text"
          placeholder="Search everywhere..."
          value=""
          onChange={() => console.log("jssdd")}
          className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
        />
      </div>
    </div>
  );
};

export default GlobalSearch;
