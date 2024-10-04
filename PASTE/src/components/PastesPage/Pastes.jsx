import React from 'react'
import Navbar from '../reusedComponents/Navbar'
import PastesMain from './otherComponents/PastesMain'

const Pastes = () => {
  return (
    <div className='h-screen bg-[#000000]'>
      <Navbar />
      <PastesMain />
    </div>
  )
}

export default Pastes