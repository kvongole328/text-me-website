import {useState} from 'react'
import { logo } from '../assets'

const Navbar = () => {
  return (
    <nav className="w-full flex py-6 justify-between items-center
    navbar">
      <img src ={logo} alt="Logo" 
      className='w-[124px] h-[32px' /> 
      
    </nav>
  

  )
}

export default Navbar