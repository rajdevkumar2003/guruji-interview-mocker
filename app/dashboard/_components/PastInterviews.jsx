import React from 'react'
import InterviewCard from './InterviewCard'

const PastInterviews = ({interviews}) => {
  return (
    <div className='mt-5 grid max-sm:grid-cols-1 max-md:grid-cols-2 grid-cols-3 gap-5 '>
      {interviews&&interviews.map((interview,ind)=>(
        <InterviewCard interview={interview} key={ind}/>
      ))}
    </div>
  )
}

export default PastInterviews
