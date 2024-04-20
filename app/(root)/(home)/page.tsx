import React from "react";
import { UserButton } from "@clerk/nextjs";

const page = () => {
  return (
    <div className="h1-bold text-red-500">
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default page;
