"use client"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"

  

export const NavList=()=>{
    const path=usePathname();
    return (
        <div className="hidden max-md:flex">
        <Sheet>
  <SheetTrigger>
    <MenuIcon className=" text-primary rounded-full mr-12"/>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle >
      <div className="flex items-center gap-2 font-medium ">
        <Image src={"/logo.svg"} height={30} width={30} alt="logo" />
        <h2 className="text-primary">GURUJI</h2>
      </div>
      </SheetTitle>
      <SheetDescription>
      <ul className="hidden max-md:flex flex-col gap-6 mt-5 text-left text-[19px]  text-gray-500  ">
        <li
          className={`capitalize${
            path == "/dashboard" && " font-semibold text-primary"
          }`}
        >
          About
        </li>
        <li
          className={`capitalize${
            path == "/about" && " font-semibold text-primary"
          }`}
        >FAQ</li>
        <li
          className={`capitalize${
            path == "/contact" && " font-semibold text-primary"
          }`}
        >Contact</li>
        <li
          className={`capitalize${
            path == "/help" && " font-semibold text-primary"
          }`}
        >Help</li>
      </ul>
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
</div>

    )
}