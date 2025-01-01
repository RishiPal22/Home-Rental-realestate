import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { updateuserFailure, updateusersuccess, updateuserStart, 
deleteUserStart, deleteUserFailure, deleteUserSuccess, signoutUserFailure, 
signoutUserStart,
signoutUserSuccess} from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function Profile() {
  const { currentUser, Loading: loading, Error: errors } = useSelector((state) => state.user)
  const fileRef = useRef(null)
  const [error, setError] = useState(null)
  const [imageUrl, setImageUrl] = useState(currentUser.avatar)
  const [file, setFile] = useState(undefined);
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    avatar: currentUser.avatar,
    password: currentUser.password,
  });

  console.log(formData)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
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

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
    
      // const token = document.cookie.split('; ').find(row => row.startsWith('access_token'))?.split('=')[1];
      // console.log("token", token)

      // if (!token) {
      //   console.error("No token found in cookies");
      //   setError("You are not logged in. Please log in to update your profile.");
      //   return;
      // }

      dispatch(updateuserStart())
      const res = await fetch(`api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`,
        },
        credentials: 'include', 
        body: JSON.stringify(formData)
      });

      const data = await res.json()
      if (data.success === false) {
        dispatch(updateuserFailure(data.message))
        console.log(data.message)
        return
      }

      dispatch(updateusersuccess(data))
    } catch (error) {
      dispatch(updateuserFailure(error.message))
      console.log(" hello ",error)
    }
  }

  const handleUserDelete = async () => {
    try{

      dispatch(deleteUserStart())

      const res = await fetch(`api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      })
      const data = await res.json()
      if (data.success === false){
        dispatch(deleteUserFailure(data.message))
      }
      dispatch(deleteUserSuccess())
    }catch(error){
      dispatch(deleteUserFailure(error.message))
      console.log(error)
    }
  }

  const handleUserSignout = async() => {
    try{
      dispatch(signoutUserStart())
      const res = await fetch('api/auth/signout', {
        method: 'GET'
      });
      const data = await res.json()
      if (data.success === false){
        dispatch(signoutUserFailure(data))
      }
      dispatch(signoutUserSuccess())
    }catch(error){
      dispatch(signoutUserFailure(error.message))
      console.log(error)
    }

  }

  return (<>
    <h1 className='sm:text-5xl font-semibold text-center p-2'>Profile</h1>
    <div className='flex flex-col items-center'>

      <form onSubmit={handleSubmit} className='flex flex-col items-center m-1 p-3'>
        <input type='file' onChange={handlefileupload}
          ref={fileRef} accept='images/*' hidden />

        <img className='rounded-full h-40 w-40 p-1 m-2' src={imageUrl} alt='Profile' onClick={() => fileRef.current.click()} /><br />
        {error && <p className='text-red-500'>{error}</p>}

        <input className='bg-slate-100 w-40 sm:w-80 sm:h-14 p-2 rounded-lg'
          type='text' id='username' defaultValue={formData.username}
          onChange={handleChange} /><br />  

        <input className='bg-slate-100 w-40 sm:w-80 sm:h-14 p-2 rounded-lg'
          type='text' id='email' defaultValue={formData.email}
          onChange={handleChange} /><br />

        <input className='bg-slate-100 w-40 sm:w-80 sm:h-14 p-2 rounded-lg'
          type='text' id='password' placeholder='Password' value={formData.password}
          onChange={handleChange} /><br />

        <button disabled={loading}
          className='text-white  w-40 sm:w-80 bg-slate-700 hover:bg-slate-800 rounded-lg sm:h-9 sm:5 m-1 '>
          {loading ? 'Loading...' : 'UPDATE'}
        </button>

      </form>
      <div className="flex justify-between  sm:w-80 mt-2 px-3">
        <span onClick={handleUserDelete} className='text-red-600 cursor-pointer'>Delete Account</span>
        <span onClick={handleUserSignout} className='text-red-600 cursor-pointer' >Sign Out</span>
      </div>
      <p className='text-red-600'>{errors ? error : ""}</p>
    </div>

  </>
  )
}

