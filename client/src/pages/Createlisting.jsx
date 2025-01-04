import { set } from 'mongoose'
import React, { useState } from 'react'

export default function Createlisting() {
  const [file, setFile] = useState([])
  const [formData, setFormData] = useState({
    imageUrls: [],
  })

  const [imageUploadError, setImageUploadError] = useState(false)
  console.log(formData)

  const handleImageSubmit = (e) => {

    e.preventDefault()
    const Promises = []
    try {
      if (file.length > 0 && file.length + formData.imageUrls.length < 7) {

        for (let i = 0; i < file.length; i++) {
          Promises.push(storeImage(file[i]))
        }

        Promise.all(Promises).then((urls) => {
          setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) })

        })
        setImageUploadError(false)
        console.log(formData)

      }
      else {
        setImageUploadError('Please select between 1 and 6 images')
        console.log('Please select between 1 and 6 images')
      }
      console.log(file)
    } catch (err) {
      setImageUploadError("Upload failure because of some internal issue")
      console.log(err)
    }
  }


  const storeImage = async (file) => {
    return new Promise(async (resolve, reject) => {
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
        resolve(uploadedImageUrl.url)
      } catch (err) {
        reject(err.message)
        console.log(err.message)
        // return uploadedImageUrl.url
      }
    });

  }


  return (<>
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl text-center p-2'> Create Listing</h1>
      <form className='flex flex-col sm:flex-row'>
        <div className='flex flex-col p-3 gap-3 flex-1'>

          <input className='border p-2 rounded-lg'
            type='text' id='name' required placeholder='Name' />
          <textarea className='border p-2 rounded-lg'
            type='text' id='description' required placeholder='description' />
          <input className='border p-2 rounded-lg'
            type='text' id='address' required placeholder='Address' />


          <div className='flex flex-wrap gap-2'>
            <div className='flex p-1 gap-2'>
              <input type='checkbox' id='sale' className='w-4 ' />
              <span>Sell</span>
            </div>
            <div className='flex p-1 gap-2'>
              <input type='checkbox' id='rent' className='w-4 ' />
              <span>Rent</span>
            </div>
            <div className='flex p-1 gap-2'>
              <input type='checkbox' id='parkingspot' className='w-4 ' />
              <span>Parking Spot</span>
            </div>
            <div className='flex p-1 gap-2'>
              <input type='checkbox' id='furnished' className='w-4 ' />
              <span>Furnished</span>
            </div>
            <div className='flex p-1 gap-2'>
              <input type='checkbox' id='offer' className='w-4 ' />
              <span>Offer</span>
            </div>
          </div>

          <div className='flex flex-wrap gap-4 p-2'>
            <div className='flex gap-3 items-center'>
              <input className='p-3 border w-12 sm:w-20 rounded-lg'
                type='number' id='bedroom' min='1' required />
              <p>Beds</p>
            </div>
            <div className='flex gap-3 items-center'>
              <input className='p-3 border w-12 sm:w-20 rounded-lg'
                type='number' id='bathroom' min='1' required />
              <p>Baths</p>
            </div>
            <div className='flex gap-3 p-2 flex-wrap items-center'>
              <input className='p-3 border w-12 sm:w-20 rounded-lg'
                type='number' id='regularprice' min='1' />
              <div className=''>
                <p>Regular Price</p>
                <span className='text-sm'>($ / month)</span>
              </div>
            </div>
            <div className='flex gap-3 items-center'>
              <input className='p-3 border w-12 sm:w-20 rounded-lg'
                type='number' id='discountprice' min='1' />
              <div className='flex flex-col items-center'>
                <p>Discounted Price</p>
                <span className='text-sm'>($ / month)</span>
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col flex-1'>
          <p className='text-lg'>Images: <span className='ml-2 text-sm text-gray-600'>The first image will be the cover</span></p>
          <div className='p-2 m-2'>

            <input onChange={(e) => setFile(e.target.files)} type='file' id='images' accept='image/*' multiple />
            <button onClick={handleImageSubmit}
              className='rounded-lg uppercase text-green-600 border-green-600  p-1 border w-auto'> Upload</button>
            {imageUploadError && <p className='text-red-500'>{imageUploadError}</p>}
            <div>

              {formData.imageUrls.length > 0 && formData.imageUrls.map((url) => (
                <div className='flex justify-between p-2'>
                  <img src={url} alt='Image Listing' className='sm:h-20' />
                  <button className='p-2 text-red-600'>Delete</button>

                </div>
              ))}
            </div>
          </div>
          <button className='p-2 bg-slate-700 text-white uppercase'>Create Listing </button>
        </div>

      </form>
    </main>
  </>
  )
}
