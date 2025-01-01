import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {signinStart, signinsuccess, signinfailure} from '../redux/user/userSlice'
import OAuth from '../components/OAuth';


export default function signin() {
  const [formData, setFormData] = useState({});
  // const [loading, setLoading] = useState(false);
  // const [errors, setErrors] = useState(false);
  const { Loading: loading, Error: errors } = useSelector((state) => state.user);

  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    // if(!email && !password){
    //   return next(Errorhandler(400,"Please provide email and password."))
    // }
    dispatch(signinStart())

    // if (!formData.email || !formData.password) {
      // setErrors(true)      
      // setSuccess(false)
      // setLoading(false);
    //   dispatch(signinfailure())
    // }

    try {
      const res = await fetch('http://localhost:3000/api/auth/signin', {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(formData)  
      });
      const data = await res.json()
      console.log(data)

      if (data.success === false){
        dispatch(signinfailure(data.message))
        console.log(data.message)
        return
      }

      dispatch(signinsuccess(data))
      console.log(formData)
      setSuccess(true)
      setFormData({})
      navigate('/')

    } catch (error) {
      dispatch(signinfailure(error.message))
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
      <h1 className='sm:text-5xl font-semibold text-center p-4'>SignIn</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-2 items-center  p-6 border-gray-800'>

      {errors && <p className='sm:text-3xl p-1 my-1 bg-red-500 text-white' >{errors}</p>}
      <div  className='sm:text-4xl p-1 my-1 bg-lime-500 text-white' style={{ display: success ? 'block' : "none" }}>User LoggedIn sucessfully!</div>

        {/* <input type='text' id='username' placeholder='Username' onChange={handleChange}
          className='bg-slate-100 w-36 sm:w-80 sm:h-14 p-2 rounded-lg'></input><br /> */}

        <input type='email' id='email' placeholder='Email' onChange={handleChange}
          className='bg-slate-100 w-36 sm:w-80 sm:h-14 p-2 rounded-lg'></input><br />

        <input type='password' id='password' placeholder='Password' onChange={handleChange}
          className='bg-slate-100 w-36 sm:w-80 sm:h-14 p-2 rounded-lg'></input><br />

        <button type='submit' disabled={loading} id='submit'
          className='text-white sm:w-80 w-36 focus:ring-0 bg-blue-700 hover:bg-blue-800  sm:h-12  rounded-lg'>
          {loading ? 'Loading...' : 'Sign In'}
        </button><br />

        <OAuth />

        <p> Don't have an account? <Link to='/signup' className='text-blue-600'>SignUp</Link></p>

      </form>
    </>
  )
}
