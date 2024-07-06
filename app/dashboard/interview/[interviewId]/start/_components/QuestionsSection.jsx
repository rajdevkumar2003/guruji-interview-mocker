"use client";
import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

const QuestionsSection = ({ questionNumber,setQuestionNumber, mockInterviewQuestions }) => {
    function textToSpeech(text){
       if('speechSynthesis' in window){
        const speech= new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);
       }
       else{
        alert('Sorry, your browser does not support speech')
       }
    }
  return (
    <div className="flex flex-col gap-2">
    <div className=" flex flex-col gap-10 p-5 border rounded-lg bg-gray-50">
      <div className=" mt-5 grid grid-cols-2 md:grid-cols-4 gap-2 items-center justify-between">
        {mockInterviewQuestions &&
          mockInterviewQuestions.map((question, ind) => (
            <h2 onClick={()=>setQuestionNumber(ind)}
              className={`${
                ind == questionNumber ? "bg-primary text-white" : "bg-white"
              } p-2 text-black rounded-lg shadow-sm cursor-pointer text-center `}
              key={ind}
            >
              Question.{ind + 1}
            </h2>
          ))}
      </div>
      
      <div className="border p-5 bg-white rounded-md shadow-sm font-semibold">
        {"Q." + mockInterviewQuestions[questionNumber]?.question}
        <Volume2 className="cursor-pointer" onClick={()=>textToSpeech(mockInterviewQuestions[questionNumber].question)}/>
      </div>
      

      
    </div>
    <div className="mt-5 flex border p-5 rounded-md bg-blue-50">
        <Lightbulb className="h-16 w-16 mt-[-20px]" />
        <h2 className="text-primary">
          <strong>Information:</strong> Enable video Web Cam and Microphone to
          start your AI Generated Mock Interview. It has 5 questions with which
          you can answer and at the last you will get a report on the basis of
          your performance. NOTE: We never record your videos.
        </h2>
      </div>
</div>
  );
};

export default QuestionsSection;
