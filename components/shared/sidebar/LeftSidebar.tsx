"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SignedOut } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { SignOutButton, SignedIn } from "@clerk/nextjs";

interface LeftSidebarProps {
  className: string;
}

const LeftSidebar = ({ className }: LeftSidebarProps) => {
  const pathname = usePathname();

  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex h-full flex-col gap-6">
        {sidebarLinks.map((item) => {
          const isActivePath =
            (pathname.includes(item.route) && item.route.length > 1) ||
            pathname === item.route;
          return (
            <Link
              href={item.route}
              className={`${
                isActivePath
                  ? "primary-gradient rounded-lg text-light-900"
                  : "text-dark300_light900"
              } flex items-center justify-start gap-4 bg-transparent p-4`}
              key={item.route}
            >
              <Image
                src={item.imgURL}
                width={20}
                height={20}
                alt={item.label}
                className={`${isActivePath ? "" : "invert-colors"}`}
              />
              <p
                className={`${isActivePath ? "base-bold" : "base-medium"} max-lg:hidden`}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>

      <SignedOut>
        <div className="flex flex-col gap-3">
          <Link href="/sign-in">
            <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <Image
                alt="login"
                src="/assets/icons/account.svg"
                height={20}
                width={20}
                className="invert-colors lg:hidden"
              />
              <span className="primary-text-gradient max-lg:hidden">
                Log In
              </span>
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="text-dark400_light900 small-medium btn-tertiary light-border-2 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <Image
                alt="sign up"
                src="/assets/icons/sign-up.svg"
                height={20}
                width={20}
                className="invert-colors lg:hidden"
              />

              <span className="max-lg:hidden">Sign Up</span>
            </Button>
          </Link>
        </div>
      </SignedOut>
      <SignedIn>
        <SignOutButton>
          <div className="flex cursor-pointer gap-4 p-4">
            <Image
              src="assets/icons/logout.svg"
              width={20}
              height={20}
              alt="logout"
              className="invert-colors"
            />
            <p className="base-medium text-dark300_light900 max-lg:hidden">
              Log Out
            </p>
          </div>
        </SignOutButton>
      </SignedIn>
    </section>
  );
};

export default LeftSidebar;
