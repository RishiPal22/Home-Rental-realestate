import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';


export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (!formData.username || !formData.email || !formData.password) {
      setErrors(true)
      
      setSuccess(false)
      setLoading(false);
      
    }

    try {
      const res = await fetch(`${__API_BASE_URL__}/auth/signup`, {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json()
      console.log(data)

      if (data.success === false){
        setErrors(data.message)
        setLoading(false)
        console.log(data.message)
        return
      }

      setLoading(false)
      setErrors(false)
      console.log(formData)
      setSuccess(true)
      setFormData({})
      navigate('/signin')

    } catch (error) {
      setLoading(false)
      setSuccess(false)
    };
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value

    })
  }
  console.log(formData);


  return (
    <>
      <h1 className='sm:text-5xl font-semibold text-center p-4'>SignUp</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-2 items-center  p-6 border-gray-800'>

      {errors && <p className='sm:text-3xl p-1 my-1 bg-red-500 text-white' >{errors}</p>}
      <div  className='sm:text-4xl p-1 my-1 bg-lime-500 text-white' style={{ display: success ? 'block' : "none" }}>User Created sucessfully!</div>

        <input type='text' id='username' placeholder='Username' onChange={handleChange}
          className='bg-slate-100 w-36 sm:w-80 sm:h-14 p-2 rounded-lg'></input><br />

        <input type='email' id='email' placeholder='Email' onChange={handleChange}
          className='bg-slate-100 w-36 sm:w-80 sm:h-14 p-2 rounded-lg'></input><br />

        <input type='password' id='password' placeholder='Password' onChange={handleChange}
          className='bg-slate-100 w-36 sm:w-80 sm:h-14 p-2 rounded-lg'></input><br />

        <button type='submit' disabled={loading}
          className='text-white sm:w-80 w-36 focus:ring-0 bg-blue-700 hover:bg-blue-800  sm:h-12  rounded-lg'>
          {loading ? 'Loading...' : 'Sign Up'}
        </button><br />

        <OAuth />

        <p>Have an account? <Link to='/signin' className='text-blue-600'>SignIn</Link></p>

      </form>
    </>
  )
}
