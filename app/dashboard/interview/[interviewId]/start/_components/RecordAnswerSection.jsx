"use client"
import WebCam from '@/app/dashboard/_components/WebCam'
import { Button } from '@/components/ui/button'
import { MicIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import useSpeechToText from 'react-hook-speech-to-text';

const RecordAnswerSection = () => {
    const [userAnswer, setUserAnswer] = useState('');
    const [show, setShow] = useState(false);
    const handleClick=()=>{
        setShow(!show);
    }
    
    
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });
      
    useEffect(() => {
      results.map((result)=>(
        setUserAnswer((prev)=>prev+result?.transcript)
      ))
    }, [results])
    
      if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;
  return (
    <div className='flex flex-col gap-5 items-center'>
      <WebCam/>
      
      <Button className={'flex gap-2 p-4'} onClick={isRecording ? stopSpeechToText : startSpeechToText}>
        <MicIcon/>
        {isRecording ? 'Recording...' : 'Start Recording'}
      </Button>
      
      {userAnswer&&<><Button className={"mt-2 bg-black"} onClick={handleClick}>
        {show?'Hide Answer':'Show Answer'}
      </Button>
      {show&&(<div className="mt-5 flex border p-5 rounded-md bg-blue-50">
        {userAnswer}
      </div>)}</>}
    </div>
  )
}

export default RecordAnswerSection
