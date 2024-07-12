"use client"
import React, { useEffect, useState } from 'react'
import AddNewButton from './_components/AddNewButton'
import { db } from '@/utils/db';
import { desc, eq } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';
import { MockInterview } from '@/utils/schema';
import PastInterviews from './_components/PastInterviews';

const DashboardPage = () => {
  const [pastInterviews, setPastInterviews] = useState([])
  const {user}=useUser();
  useEffect(() => {
    user&&GetPastInterviews();
  }, [user]);

  const GetPastInterviews = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(MockInterview.id));
    
    console.log(result);
    setPastInterviews(result);
    //console.log(interviewData);
  };
  return (
    <div className='p-10 flex flex-col'>
      <h2 className='text-primary font-extrabold text-3xl '>Dashboard</h2>
      <p className='text-gray-500 font-light'>Let's start your AI mockup Interview test!</p>
      <div>
        <AddNewButton/>
      </div>
      <div className='flex flex-col justify-center mt-10'>
        <h2 className='text-primary font-semibold text-lg'>Previous Interviews</h2>
        <PastInterviews interviews={pastInterviews}/>
      </div>
    </div>
  )
}

export default DashboardPage
