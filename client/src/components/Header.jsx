import React from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <>
      <header className='py-2 sm:py-3 bg-gray-200 shadow-lg justify-between flex w-full'>
        <h1 className='flex justify-between items-center border-black' >
          <p className='text-gray-900 font-serif text-sm sm:text-3xl font-medium mx-2 sm:mx-6 align-middle'>Pal<span className='text-gray-500 '>Estate</span></p>
        </h1> 
        <form className='bg-slate-100  flex items-center h-7 sm:h-10 rounded-lg'>
          <input type='text' placeholder='Search...' className='rounded-2xl align-middle w-24 sm:w-56 mx-1 sm:mx-2 focus:outline-none bg-transparent' />
          <IoSearchOutline className='text-gray-600 text-sm sm:text-xl mx-1' />
        </form>
        <div className='justify-end flex p-1 mx-2 sm:mx-6 space-x-4 border-x-4 cursor-pointer'>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/signin">SignIn</Link>
        </div>
      </header>
    </>
  )
}
