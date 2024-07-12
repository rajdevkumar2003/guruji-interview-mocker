import { Lightbulb } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='flex gap-10 max-md:flex-col justify-center items-center h-screen'>
      <div className="flex border p-5 rounded-md w-96 ">
            <Lightbulb className="h-16 w-16 mt-[-20px]" />
            <h2 className="text-primary">
              <strong>Information:</strong> Enable video Web Cam and Microphone
              to start your AI Generated Mock Interview. It has 5 questions with
              which you can answer and at the last you will get a report on the
              basis of your performance. NOTE: We never record your videos.
            </h2>
          </div>

          <h2 className='mt-10 text-lg font-normal text-black'>Made with Love by <Link href={'https://portfolio-rajeev.vercel.app/'} className='underline'>RajeevSingh</Link></h2>
    </div>
  )
}

export default page
