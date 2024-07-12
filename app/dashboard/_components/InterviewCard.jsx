import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

const InterviewCard = ({interview}) => {
    const router=useRouter();
    const onFeed=()=>{
       router.push('/dashboard/interview/'+interview.mockId+'/feedback')
    }
    const onStart =()=>{
       router.push('/dashboard/interview/'+interview.mockId+'/');
    }
  return (
    <div className='p-5 bg-blue-200 shadow-md text-blue-950 rounded-lg'>
      <h2 className='text-lg font-medium'>{interview.jobPosition}</h2>
      <h2><span className='font-semibold'>{interview.jobExperience} Years</span> of experience</h2>
      <h2>Created at: <span className='font-semibold'>{interview.createdAt}</span></h2>
      <div className='flex gap-4 mt-4'>
      <Button onClick={onFeed} className="bg-white text-black">Feedback</Button>
      <Button onClick={onStart}>Start</Button>
      </div>
    </div>
  )
}

export default InterviewCard
