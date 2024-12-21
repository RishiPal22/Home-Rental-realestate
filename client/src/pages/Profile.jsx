import React from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user)
  const fileRef = useRef(null)

  return (<>
    <h1 className='sm:text-5xl font-semibold text-center p-2'>Profile</h1>
    <div className='flex flex-col items-center'>

      <form className='flex flex-col items-center m-1 p-3'>
      <input type='file' useref={fileRef}  />

        <img value={currentUser.avatar} alt='Profile' onClick={() => fileRef.current.click()}
          className='rounded-full p-1 m-2' />

        <input className='bg-slate-100 w-40 sm:w-80 sm:h-14 p-2 rounded-lg'
          type='text' id='username' value={currentUser.username} /><br />

        <input className='bg-slate-100 w-40 sm:w-80 sm:h-14 p-2 rounded-lg'
          type='text' id='email' value={currentUser.email} /><br />

        <input className='bg-slate-100 w-40 sm:w-80 sm:h-14 p-2 rounded-lg'
          type='text' id='password' placeholder='Password' value={currentUser.password} /><br />

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

// import React, { useEffect, useState } from 'react';

// export default function Profile() {
//   const [profileData, setProfileData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     avatar: '',
//   });

//   useEffect(() => {
//     // Fetch user data based on user ID from localStorage
//     const userId = localStorage.getItem('userId'); // Ensure this is set during login
//     if (userId) {
//       const fetchProfile = async () => {
//         try {
//           const response = await fetch(`/api/users/${userId}`);
//           if (!response.ok) throw new Error('Failed to fetch user data');
//           const data = await response.json();
//           setProfileData({
//             username: data.username,
//             email: data.email,
//             avatar: data.avatar || 'default-avatar.png',
//             password: '', // Never fetch real password
//           });
//         } catch (error) {
//           console.error('Error fetching profile:', error);
//         }
//       };
//       fetchProfile();
//     }
//   }, []);

//   return (
//     <>
//       <h1 className="sm:text-5xl font-semibold text-center p-2">Profile</h1>
//       <form className="flex flex-col items-center m-4 p-3">
//         <img
//           className="rounded-full p-1 m-2"
//           src={profileData.avatar}
//           alt="User Avatar"
//         />
//         <input
//           className="bg-slate-100 w-36 sm:w-80 sm:h-14 p-2 rounded-lg"
//           type="text"
//           id="username"
//           value={profileData.username}
//           onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
//         />
//         <br />
//         <br />
//         <input
//           className="bg-slate-100 w-36 sm:w-80 sm:h-14 p-2 rounded-lg"
//           type="text"
//           id="email"
//           value={profileData.email}
//           onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
//         />
//         <br />
//         <br />
//         <input
//           className="bg-slate-100 w-36 sm:w-80 sm:h-14 p-2 rounded-lg"
//           type="password"
//           id="password"
//           value={profileData.password}
//           onChange={(e) => setProfileData({ ...profileData, password: e.target.value })}
//         />
//       </form>
//     </>
//   );
// }
