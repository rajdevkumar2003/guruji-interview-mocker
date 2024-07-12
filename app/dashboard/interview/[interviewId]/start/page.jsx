"use client";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const StartInterview = ({ params }) => {
  const [interviewData, setInterviewData] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [mockInterviewQuestions, setMockInterviewQuestions] = useState([]);

  //const router=useRouter();
  const handlePrev=()=>{
    if(questionNumber) {
      setQuestionNumber(prev=>prev-1);
    }
    else setQuestionNumber(mockInterviewQuestions?.length-1)
  }

  const handleNext=()=>{
    if(questionNumber<mockInterviewQuestions?.length-1) {
      setQuestionNumber(prev=>prev+1);
    }
    else setQuestionNumber(0);
  }
  

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    const jsonMockResp = JSON.parse(result[0].jsonMockResp);
    // console.log(jsonMockResp);
    setMockInterviewQuestions(jsonMockResp);
    setInterviewData(result[0]);
  };
  return (
    <div className="">
      <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
        <QuestionsSection
          questionNumber={questionNumber}
          setQuestionNumber={setQuestionNumber}
          mockInterviewQuestions={mockInterviewQuestions}
        />

        <RecordAnswerSection
          questionNumber={questionNumber}
          setQuestionNumber={setQuestionNumber}
          mockInterviewQuestions={mockInterviewQuestions}
          interviewData={interviewData}
        />
      </div>
      <div className="flex items-center justify-center gap-10 my-5">
        <Button onClick={handlePrev}>
          Prev Question
        </Button>
        <Button disabled={questionNumber===mockInterviewQuestions?.length-1} onClick={handleNext}>
          Next Question
        </Button>
        {
          questionNumber===mockInterviewQuestions?.length-1&&<Link href={'/dashboard/interview/'+params.interviewId+'/feedback'}> <Button className="bg-blue-500" >Submit</Button></Link>
        }
      </div>
    </div>
  );
};

export default StartInterview;
