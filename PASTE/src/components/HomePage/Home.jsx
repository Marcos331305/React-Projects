import React from 'react'
import Navbar from '../reusedComponents/Navbar'
import PasteApp from './otherComponents/PasteApp'

const Home = () => {
  return (
    <div className='min-h-screen'>
     <Navbar />
     <PasteApp />
    </div>
  )
}

export default Home