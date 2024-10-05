import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='bg-[#242424] py-4 fixed top-0 left-0 right-0'>
      <nav className='flex gap-10 ml-10'>
        <NavLink to={'/'} className={({ isActive }) =>
          `text-white font-normal text-2xl hover:underline underline-offset-[4px] decoration-[1.5px] ${isActive ? 'underline' : 'no-underline'
          }`
        }>Home</NavLink>
        <NavLink to={'/pastes'} className={({ isActive }) =>
          `text-white font-normal text-2xl hover:underline underline-offset-[4px] decoration-[1.5px] ${isActive ? 'underline' : 'no-underline'
          }`
        }>Pastes</NavLink>
      </nav>
    </div>
  )
}

export default Navbar