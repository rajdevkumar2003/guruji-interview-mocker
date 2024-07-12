"use client"
import WebCam from '@/app/dashboard/_components/WebCam'
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db';
import { chatSession } from '@/utils/GeminiAiModal';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { MicIcon } from 'lucide-react';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import useSpeechToText from 'react-hook-speech-to-text';
import { toast } from "sonner"


const RecordAnswerSection = ({questionNumber, mockInterviewQuestions, interviewData}) => {
    const {user}=useUser();
    const [userAnswer, setUserAnswer] = useState('');
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClick=()=>{
        setShow(!show);
    }
    
    
    const {
        isRecording,
        results,
        setResults,
        startSpeechToText,
        stopSpeechToText,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });

      useEffect(() => {
        results.map((result)=>(
         setUserAnswer((prevAns)=>prevAns+result?.transcript)
       ))
     }, [results]);
      
    useEffect(() => {
       if(!isRecording&&userAnswer.length>10){
        UpdateUserAnswer();
       }
    }, [userAnswer]);

    const StartStopRecording = async()=>{
      if(isRecording) {
         stopSpeechToText();
         //setUserAnswer('');
      }
      else{
        startSpeechToText();
      }
    }

    const UpdateUserAnswer=async()=>{
      console.log(userAnswer);
      setLoading(true);
      const feedBackPrompt="Question:"+mockInterviewQuestions[questionNumber]?.question+", User Answer:"+ userAnswer +", Depends on user answer for given interview question."+
      " Please give us Rating on the scale of 1 to 10 for our answer and feedback as area of improvement if any. In just 3 to 5 lines, in JSON format with rating field and feedback field";

      const result = await chatSession.sendMessage(feedBackPrompt);

      const mockJsonResp= (result.response.text()).replace("```json","").replace("```","");
      console.log(mockJsonResp);
      const JsonFeedbackResp= JSON.parse(mockJsonResp);

     const resp=await db.insert(UserAnswer).values({
      mockIdRef:interviewData?.mockId,
      question:mockInterviewQuestions[questionNumber]?.question,
      correctAns:mockInterviewQuestions[questionNumber]?.answer,
      userAns:userAnswer,
      feedback:JsonFeedbackResp?.feedback,
      rating:JsonFeedbackResp?.rating,
      userEmail:user?.primaryEmailAddress?.emailAddress,
      createdAt:moment().format('DD-MM-yyyy')
     })

     if(resp){
      toast('User Answer Recorded Successfully');
      setResults([]);
    }
    setResults([]);
      
    setLoading(false);
    setUserAnswer('');
    }
    
  return (
    <div className='flex flex-col gap-5 items-center'>
      <WebCam/>
      
      <Button disabled={loading} className={'flex gap-2 p-4'} onClick={StartStopRecording}>
        <MicIcon/>
        {isRecording ? 'Recording...' : 'Start Recording'}
      </Button>
    </div>
  )
}

export default RecordAnswerSection
