import React from 'react'

export default function Header() {
  return (
    <>
      <ul className='flex space-x-6 px-8 py-4 bg-gray-200' >
        <p className=''>PalEstate</p>
        <div className='justify-end flex px-4 space-x-4 border-x-4 '>
          <li >Home</li>
          <li>About</li>
          <li>SignIn</li>
        </div>
      </ul>
    </>
  )
}
