import React from 'react'

export default function OAuth() {

    const handleGoogleClick = async () => {
        try{

        }
        catch(error){
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
