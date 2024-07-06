"use client"
import React from 'react'
import {
    Lightbulb,
  } from "lucide-react";

const LobbyInfo = ({interviewData}) => {
  return (
    <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5 mt-5 border p-5 shadow-sm rounded-sm">
            <h2 className="capitalize">
              <strong>Job Role / Job Position:</strong>{" "}
              {interviewData.jobPosition}
            </h2>
            <h2 className="capitalize">
              <strong>Job Description:</strong> {interviewData.jobDesc}
            </h2>
            <h2 className="capitalize">
              <strong>Job Experience:</strong> {interviewData.jobExperience}{" "}
              year
            </h2>
          </div>
          <div className="flex border p-5 rounded-md ">
            <Lightbulb className="h-16 w-16 mt-[-20px]" />
            <h2 className="text-primary">
              <strong>Information:</strong> Enable video Web Cam and Microphone
              to start your AI Generated Mock Interview. It has 5 questions with
              which you can answer and at the last you will get a report on the
              basis of your performance. NOTE: We never record your videos.
            </h2>
          </div>
        </div>
  )
}

export default LobbyInfo
