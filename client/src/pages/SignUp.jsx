import React, { useState } from 'react'
import { Link } from 'react-router-dom'


export default function SignUp() {
  const [formData, setFormData] = useState({});

    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
      const res = await fetch('http://localhost:3000/api/auth/signup', {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json()
      console.log(data)
      // const a = await response.json()
      // console.log(a)
      console.log(formData)
    } catch (error) {
    console.log(error)
  };
    }
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value

    })
  }
  console.log(formData);


  return (<>
    <h1 className='sm:text-5xl font-semibold text-center p-4' >SignUp</h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-2 items-center  p-6 border-gray-800'>


      <input type='text' id='username' placeholder='Username' onChange={handleChange}
        className='bg-slate-100 w-36 sm:w-80 sm:h-14 p-2 rounded-lg'></input><br />

      <input type='email' id='email' placeholder='Email' onChange={handleChange}
        className='bg-slate-100 w-36 sm:w-80 sm:h-14 p-2 rounded-lg'></input><br />

      <input type='password' id='password' placeholder='Password' onChange={handleChange}
        className='bg-slate-100 w-36 sm:w-80 sm:h-14 p-2 rounded-lg'></input><br />

      <button type='submit'
        className='text-white sm:w-80 w-36 focus:ring-0 bg-blue-700 hover:bg-blue-800  sm:h-12  rounded-lg'>SignUp</button><br />

      <button type='button'
        className='bg-red-600 hover:bg-red-700 text-white sm:w-80 w-36 sm:h-12 rounded-lg'>Continue with Google</button>

      <p>Have an account? <Link to='/signin' className='text-blue-600'>SignIn</Link></p>
    </form>
  </>
  )}
