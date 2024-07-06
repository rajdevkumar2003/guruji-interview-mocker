"use client"
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon, WebcamIcon } from "lucide-react";
import React, { useState } from "react";
import Webcam from "react-webcam";

const WebCam = () => {
    const [webCamEnable, setWebCamEnable] = useState(false);
  return (
    <div className="mt-10">
          {webCamEnable ? (
            <div className="flex flex-col items-center gap-3">
              <Webcam
                mirrored={true}
                onUserMedia={() => setWebCamEnable(true)}
                onUserMediaError={() => setWebCamEnable(false)}
                className="h-64  border-gray-200 rounded-sm"
              />
              <Button className={'flex gap-2'} variant={"ghost"} onClick={() => setWebCamEnable(false)}>
              <EyeOffIcon/>
                Disable Webcam
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <WebcamIcon className="h-64 w-64 bg-gray-100 p-10 rounded-sm" />
              <Button className={'flex gap-2'} variant={"ghost"} onClick={() => setWebCamEnable(true)}>
                <EyeIcon/>
                Enable Webcam
              </Button>
            </div>
          )}
        </div>
  )
}

export default WebCam
