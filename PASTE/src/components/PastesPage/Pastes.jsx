import React from 'react'
import Navbar from '../reusedComponents/Navbar'
import PastesMain from './otherComponents/PastesMain'
import { useSelector } from 'react-redux'

const Pastes = () => {
  console.log(pastes)
  return (
    <div className='h-screen bg-[#000000]'>
      <Navbar />
      <PastesMain />
    </div>
  )
}

export default Pastes