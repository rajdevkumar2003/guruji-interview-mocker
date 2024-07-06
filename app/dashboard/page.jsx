
import React from 'react'
import AddNewButton from './_components/AddNewButton'

const DashboardPage = () => {
  return (
    <div className='p-10 flex flex-col'>
      <h2 className='text-primary font-extrabold text-3xl '>Dashboard</h2>
      <p className='text-gray-500 font-light'>Let's start your AI mockup Interview test!</p>
      <div>
        <AddNewButton/>
      </div>
    </div>
  )
}

export default DashboardPage
