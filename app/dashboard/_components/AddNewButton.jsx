"use client"

import { LoaderCircle, PlusIcon } from "lucide-react";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { v4 as uuidv4 } from 'uuid';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAiModal";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";

const AddNewButton = () => {
    const [jobPosition, setJobPosition] = useState("");
    const [jobDesc, setJobDesc] = useState("");
    const [experience, setExperience] = useState(0);
    const [loading, setLoading] = useState(false);
    const [dialog, setDialog] = useState(true);
    const router=useRouter();

    const {user}=useUser();

    const handleSubmit= async(e)=>{
        e.preventDefault();
        console.log(jobPosition, jobDesc,experience);

        const InputPrompt=`Job Position:${jobPosition} , Job Description:${jobDesc}, years of experience:${experience} , depend upon above these information generate 5 interview questions with their answers in json format, give questions and answers as field in JSON format . please dont give any note about yourself in the last`


        try {
            setLoading(true);
            const res= await chatSession.sendMessage(InputPrompt);
            const MockJsonResp=res.response.text().replace("```json","").replace("```","");
            console.log(MockJsonResp);

            const resp=await db.insert(MockInterview).values({
              mockId:uuidv4(),
              jsonMockResp:MockJsonResp,
              jobPosition:jobPosition,
              jobDesc:jobDesc,
              jobExperience:experience,
              createdBy:user?.primaryEmailAddress?.emailAddress,
              createdAt:moment().format("DD-MM-yyyy")
              
            }).returning({mockId:MockInterview.mockId});

            if(resp){
              setDialog(false);
              router.push(`/dashboard/interview/${resp.mockId}`);
            }

            console.log("inserted ID:", resp);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }

        setLoading(false);
    }

  return (
    <div className="mt-7">
      <Dialog className="">
        <DialogTrigger className="mx-auto max-w-4xl max-md:w-full">
          <div className=" flex gap-1 items-center justify-center p-3 border rounded-md max-w-4xl font-medium shadow-sm max-md:mx-auto ">
            <PlusIcon />
            Add New
          </div>
        </DialogTrigger>
        <DialogContent className="max-md:max-w-5xl">
          <DialogHeader>
            <DialogTitle>Tell us about your profession</DialogTitle>
            <DialogDescription className="flex flex-col max-md:justify-center  gap-4">
              <p>Add details about your Job or skills</p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <Label>Job Role/Position</Label>
                    <Input type="text" value={jobPosition} onChange={(e)=>setJobPosition(e.target.value)} required />
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Job Description/Tech-stack</Label>
                    <Textarea required type="text" placeholder="Ex. React , Nextjs , fullstack" value={jobDesc} onChange={(e)=>setJobDesc(e.target.value)}/>
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Years of Experience</Label>
                    <Input required max={70} min={0} type="number" value={experience} onChange={(e)=>setExperience(e.target.value)}/>
                </div>
                <div className="flex gap-6 mt-6 ">
                    <Button variant="ghost" className="outline-2">Canel</Button>
                    <Button type="submit">{!loading?"Start Interview":<><LoaderCircle className="animate-spin"/>Generating from AI</>}</Button>
                </div>
              </form>
              
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewButton;
