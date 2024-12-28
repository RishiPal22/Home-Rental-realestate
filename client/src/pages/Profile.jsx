import React from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import { useState, useEffect } from 'react'

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user)
  const fileRef = useRef(null)
  const [error, setError] = useState(null)
  const [imageUrl, setImageUrl] = useState(currentUser.avatar)
  const [file, setFile] = useState(undefined);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    avatar: currentUser.avatar,
    password: '',
  }); 

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };


  // useEffect(() => {
  //   if (file) {
  //     handlefileupload(file);
  //   }
  // }, [file]);



  const handlefileupload = async (e) => {
    const file = e.target.files[0]
    if (!file) {
      setError('Please select an image')
      return
    }

    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', 'first_time_using_cloudinary')
    data.append('cloud_name', 'dkk6lmgxq')

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dkk6lmgxq/image/upload', {
        method: "POST",
        body: data
      })

      if (!res.ok) {
        throw new Error('File upload failed')
      }

      const uploadedImageUrl = await res.json()
      console.log(uploadedImageUrl)
      setImageUrl(uploadedImageUrl.url)
      setFormData((prev) => ({ ...prev, avatar: uploadedImageUrl.url }));
      // setFile(file)

      console.log(file)
    } catch (err) {
      setError(err.message)
    }
  }


  return (<>
    <h1 className='sm:text-5xl font-semibold text-center p-2'>Profile</h1>
    <div className='flex flex-col items-center'>

      <form className='flex flex-col items-center m-1 p-3'>
        <input type='file' onChange={handlefileupload}
          ref={fileRef} accept='images/*' hidden />

        <img className='rounded-full h-40 w-40 p-1 m-2' src={imageUrl} alt='Profile' onClick={() => fileRef.current.click()} /><br />
        {error && <p className='text-red-500'>{error}</p>}

        <input className='bg-slate-100 w-40 sm:w-80 sm:h-14 p-2 rounded-lg'
          type='text' id='username' value={formData.username}
          onChange={handleChange} /><br />

        <input className='bg-slate-100 w-40 sm:w-80 sm:h-14 p-2 rounded-lg'
          type='text' id='email' value={formData.email}
          onChange={handleChange} /><br />

        <input className='bg-slate-100 w-40 sm:w-80 sm:h-14 p-2 rounded-lg'
          type='text' id='password' placeholder='Password' value={formData.password}
          onChange={handleChange} /><br />

        <button className='text-white  w-40 sm:w-80 bg-slate-700 hover:bg-slate-800 rounded-lg sm:h-9 sm:5 m-1 ' >UPDATE</button>

      </form>
      <div className="flex justify-between  sm:w-80 mt-2 px-3">
        <span className='text-red-600 cursor-pointer'>Delete Account</span>
        <span className='text-red-600 cursor-pointer' >Sign Out</span>
      </div>
    </div>

  </>
  )
}

