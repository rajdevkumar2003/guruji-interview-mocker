"use client";

import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Feedback = ({ params }) => {
  const [feedbackList, setFeedbackList] = useState([]);
  // const [overallRating, setOverallRating] = useState(0);
  // const [total, setTotal] = useState(0);

  // const [sum, setSum] = useState(0);

  const router=useRouter();
  useEffect(() => {
    GetFeedback();
  }, []);

  // useEffect(() =>{
  //   const n=feedbackList.length;
  //   let sum=0;

  //   for(let i=0; i<n; i++){
  //       setSum(prev=>prev+feedbackList[i]);
  //       setTotal(prev=>prev+10);
  //   }

  //   feedbackList&&setOverallRating(sum/total);
  // },[feedbackList]);

  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);
    
      setFeedbackList(result);
  };
  return (
    <div className="p-10 flex flex-col max-md:items-center">
      <h2 className="text-3xl font-bold text-green-500">Congratulations!</h2>
      <h2 className="text-lg font-semibold text-primary">
        Here is your Overall Interview analysis by GURUJI !
      </h2>
      
      <h2 className="my-6 font-semibold text-gray-900">
        Your overall Interview secured percentage:{" "}
        <strong className="text-orange-500">4/10</strong>
      </h2>

      <div>
        {feedbackList &&
          feedbackList.map((item, ind) => (
            <Collapsible key={ind} className="mt-7">
              <CollapsibleTrigger className="p-4 bg-gray-50 border rounded-lg flex justify-between w-full text-left">
               <h2><span className="font-semibold">Q.{ind+1}</span>{item.question}</h2> <ChevronsUpDownIcon className="size-6"/>
              </CollapsibleTrigger>
              <CollapsibleContent>
              <h2 className="mt-1 p-2 bg-orange-50 border rounded-lg  text-orange-600"><span className="font-semibold">Rating:</span>  {item.rating}</h2>
              <h2 className="mt-1 p-2 bg-red-50 border rounded-lg  text-red-600"><span className="font-semibold">Your Answer:</span> {item.userAns}</h2>
              <h2 className="mt-1 p-2 bg-green-50 border rounded-lg  text-green-600"><span className="font-semibold">Desired Answer:</span> {item.correctAns}</h2>
              <h2 className="mt-1 p-2 bg-blue-50 border rounded-lg  text-blue-600"><span className="font-semibold">Feedback:</span> {item.feedback}</h2>
              </CollapsibleContent>
            </Collapsible>
          ))}
      </div>

      <Button onClick={()=>router.push('/dashboard')} className="mt-10 w-28">Go back</Button>
    </div>
  );
};

export default Feedback;
