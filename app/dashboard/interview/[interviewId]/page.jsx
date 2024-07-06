"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";

import React, { useEffect, useState } from "react";

import LobbyInfo from "../../_components/LobbyInfo";
import WebCam from "../../_components/WebCam";
import { useRouter } from "next/navigation";

const Interview = ({ params }) => {
  const [interviewData, setInterviewData] = useState([]);
  const router=useRouter();

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    setInterviewData(result[0]);
    //console.log(interviewData);
  };
  return (
    <div className="my-10 p-10 flex flex-col max-md:items-center justify-center">
      <h2 className="text-4xl font-bold text-primary">Let's get started!</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <LobbyInfo interviewData={interviewData}/>
        <WebCam/>
        <Button onClick={()=>router.push('/dashboard/interview/'+params.interviewId+'/start')}>Start Interview</Button>
      </div>
    </div>
  );
};

export default Interview;
