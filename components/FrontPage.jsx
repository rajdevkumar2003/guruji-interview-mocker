"use client"

import React from 'react'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const FrontPage = () => {
    const router= useRouter();
  return (
    <div className="min-h-screen w-full flex min-md:flex flex-col gap-10 items-center justify-center">
      <h1 className="text-primary font-bold tracking-widest text-4xl">GURUJI</h1>
        <Image src={'logo.svg'} height={200} width={200} alt="logo"/>
        <Button onClick={()=>router.push('/dashboard')}>Go to Dashboard</Button>
      </div>
  )
}

export default FrontPage
