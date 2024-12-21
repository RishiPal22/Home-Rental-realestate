import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signinsuccess } from '../redux/user/userSlice'

// req,res
export default function OAuth() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleGoogleClick = async (req,res) => {
        try {
            const provider = new GoogleAuthProvider()
            const auth =  getAuth(app)

            const result = await signInWithPopup(auth, provider)

            const reso = await fetch('/api/auth/google', {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    name:result.user.displayName,
                    email:result.user.email,
                    photo:result.user.photoURL
                }),
            }
            );
            console.log(result)
            const data = await reso.json();
            dispatch(signinsuccess(data))
            navigate('/')
            console.log("It worked")
            

        }
        catch (error) {
            console.log("An error has occurred", error)
        };
    }

    return (
        <>
            <button type='button' id='googlesingin' onClick={handleGoogleClick}
                className='bg-red-600 hover:bg-red-700 text-white sm:w-80 w-36 sm:h-12 rounded-lg'>Continue with Google</button>
        </>
    )
}
