import React, { useState } from 'react'

export default function Listing() {
    const [loading, setloading] = useState(true)
    const [errors, seterrors] = useState(null)
    const [listing, setlisting] = useState()

  return (<>
    <main>
        {loading && <p className='text-3xl align-middle items-center m-2'>Loading...</p>}
        {errors && <p className='text-3xl align-middle text-red-700 items-center'>Something went Wrong!</p>}
    </main>
  </>
  )
}
