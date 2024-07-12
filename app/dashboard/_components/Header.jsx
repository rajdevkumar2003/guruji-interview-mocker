"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NavList } from "./NavList";
import Link from "next/link";

export const Header = () => {
  const path = usePathname();
  return (
    <div className="flex justify-between items-center p-4 bg-gray-50 shadow-sm">
       <NavList/>
      <div className="flex items-center gap-2 font-medium max-md:mr-12">
        <Image src={"/logo.svg"} height={30} width={30} alt="logo" />
        <h2 className="text-primary">GURUJI</h2>
      </div>
      <ul className="hidden md:flex gap-6 items-center   text-gray-500  ">
        
      <li
          className={`capitalize${
            path == "/dashboard" && " font-semibold text-primary"
          }`}
        >
          <Link href={'/dashboard'}>Dashboard</Link>
        </li>
        <li
          className={`capitalize${
            path == "/about" && " font-semibold text-primary"
          }`}
        >
          <Link href={'/about'}>About</Link>
        </li>
        
        <li
          className={`capitalize${
            path == "/help" && " font-semibold text-primary"
          }`}
        ><Link href={'/help'}>Help</Link></li>
      </ul>
      
      <UserButton />
      
    </div>
  );
};
