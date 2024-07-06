"use client"

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from 'react'
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";

const StartInterview = ({params}) => {
    const [interviewData, setInterviewData] = useState([]);
    const [questionNumber, setQuestionNumber] = useState(0)
    const [mockInterviewQuestions, setMockInterviewQuestions] = useState([]);

  //const router=useRouter();

  useEffect(() => {
     GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
    
    const jsonMockResp=JSON.parse(result[0].jsonMockResp);
    console.log(jsonMockResp);
    setMockInterviewQuestions(jsonMockResp);
    setInterviewData(result[0]);
   
  };
  return (
    <div className="">
      <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
         <QuestionsSection questionNumber={questionNumber} setQuestionNumber={setQuestionNumber} mockInterviewQuestions={mockInterviewQuestions} />

         <RecordAnswerSection/>
      </div>
    </div>
  )
}

export default StartInterview
