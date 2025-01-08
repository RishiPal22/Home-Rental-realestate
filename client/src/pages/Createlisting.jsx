import { set } from 'mongoose'
import React, { useState } from 'react'
import {useSelector} from 'react-redux' 
import {useNavigate} from 'react-router-dom'

export default function Createlisting() {
  const currentUser = useSelector(state => state.user.currentUser)
  const navigate = useNavigate() 
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [file, setFile] = useState([])
  const [imageUploading, setImageUploading] = useState(false)
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  })

  const [imageUploadError, setImageUploadError] = useState(false)
  console.log(formData)

  const handleImageSubmit = (e) => {

    e.preventDefault()
    const Promises = []
    try {

      if (file.length > 0 && file.length + formData.imageUrls.length < 7) {
        setImageUploading(true)

        for (let i = 0; i < file.length; i++) {
          Promises.push(storeImage(file[i]))
        }

        Promise.all(Promises).then((urls) => {
          setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) })

        }); 
        setImageUploadError(false)
        console.log(formData)
        setImageUploading(false)

      }
      else {
        setImageUploadError('Please select between 1 and 6 images')
        console.log('Please select between 1 and 6 images')
        setImageUploading(false)
      }
      console.log(file)
    } catch (err) {
      setImageUploadError("Upload failure because of some internal issue")
      console.log(err)
      setImageUploading(false)
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

  const handleRemoveImage = (index) => {
    setFormData({ ...formData, imageUrls: formData.imageUrls.filter((url, i) => i !== index)})
  }

  const handleChange = (e) =>{
    if(e.target.id === 'sale' || e.target.id === 'rent'){
      setFormData({...formData, type: e.target.id})
    }
    else if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
      setFormData({...formData, [e.target.id]: e.target.checked})
    }

    if(e.target.type === 'number' || e.target.type === 'textarea' || e.target.type === 'text'){
      setFormData({...formData , [e.target.id] : e.target.value}) 
  }
  }

  

  // const handleChange = (e) => {
  //   const { id, checked, value, type } = e.target;
  
  //   if (id === 'sale' || id === 'rent') {
  //     setFormData({ ...formData, type: id });
  //   } else if (type === 'checkbox') {
  //     setFormData({ ...formData, [id]: checked });
  //   } else {
  //     setFormData({ ...formData, [id]: value });
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      if(formData.imageUrls.length < 1){
        setError('Please upload at least one image')
        return
      }
      if(formData.regularPrice < formData.discountPrice){
        setError('Discount price must be less than regular price')
        return
      }
      setLoading(true)
      setError(false)

      const res = await fetch('/api/listing/create', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( {...formData, userRef: currentUser._id})
      });
      const data = await res.json()
      if(data.success === false){
        setError(data.message)
        setLoading(false)
      }
      console.log(data)

      setLoading(false)
      setError(false)
      navigate(`/listing/${data._id}`)

    }catch(err){
      setError(err.message)
      setLoading(false)
      console.log(err)
    }

  }
  

  return (<>
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl text-center p-2'> Create Listing</h1>
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row'>
        <div className='flex flex-col p-3 gap-3 flex-1'>

          <input onChange={handleChange}
          value={formData.name}
          className='border p-2 rounded-lg'
            type='text' id='name' required placeholder='Name' />

          <textarea onChange={handleChange}
          value={formData.description}
          className='border p-2 rounded-lg'
            type='text' id='description' required placeholder='description' />

          <input onChange={handleChange}
          value={formData.address}
          className='border p-2 rounded-lg'
            type='text' id='address' required placeholder='Address' />


          <div className='flex flex-wrap gap-2'>
            <div className='flex p-1 gap-2'>
              <input 
              checked={formData.type === 'sale'}
              onChange={handleChange} type='checkbox' id='sale' className='w-4 ' />
              <span>Sell</span>
            </div>
            <div className='flex p-1 gap-2'>
              <input onChange={handleChange} checked={formData.type === 'rent'}
               type='checkbox' id='rent' className='w-4 ' />
              <span>Rent</span>
            </div>
            <div className='flex p-1 gap-2'>
              <input onChange={handleChange} checked={formData.parking === true}
               type='checkbox' id='parking' className='w-4 ' />
              <span>Parking Spot</span>
            </div>
            <div className='flex p-1 gap-2'>
              <input onChange={handleChange} checked={formData.furnished}
              type='checkbox' id='furnished' className='w-4 ' />
              <span>Furnished</span>
            </div>
            <div className='flex p-1 gap-2'>
              <input onChange={handleChange} type='checkbox' id='offer' className='w-4 ' />
              <span>Offer</span>
            </div>
          </div>

          <div className='flex flex-wrap gap-4 p-2'>
            <div className='flex gap-3 items-center'>
              <input onChange={handleChange} value={formData.bedrooms} className='p-3 border w-12 sm:w-20 rounded-lg'
                type='number' id='bedrooms' min='1' required />
              <p>Beds</p>
            </div>
            <div className='flex gap-3 items-center'>
              <input onChange={handleChange} value={formData.bathrooms} className='p-3 border w-12 sm:w-20 rounded-lg'
                type='number' id='bathrooms' min='1' required />
              <p>Baths</p>
            </div>
            <div className='flex gap-3 p-2 flex-wrap items-center'>
              <input onChange={handleChange} value={formData.regularPrice} className='p-3 border w-12 sm:w-20 rounded-lg'
                type='number' id='regularPrice' min='1' required />
              <div className=''>
                <p>Regular Price</p>
                <span className='text-sm'>($ / month)</span>
              </div>
            </div>
            {formData.offer && (
            <div className='flex gap-3 items-center'>
              <input onChange={handleChange} value={formData.discountPrice}  className='p-3 border w-12 sm:w-20 rounded-lg'
                type='number' id='discountPrice' min='1' required/>
               <div className='flex flex-col items-center'>
                <p>Discounted Price</p>
                <span className='text-sm'>($ / month)</span>
              </div>
            </div>)}
          </div>
        </div>

        <div className='flex flex-col flex-1'>
          <p className='text-lg'>Images: <span className='ml-2 text-sm text-gray-600'>The first image will be the cover</span></p>
          <div className='p-2 m-2'>

            <input onChange={(e) => setFile(e.target.files)} type='file' id='images' accept='image/*' multiple />
            <button onClick={handleImageSubmit} disabled={imageUploading}
              className='rounded-lg uppercase text-green-600 border-green-600  p-1 border w-auto'> 
              {imageUploading ? "Uploading..." : "Upload" }
              </button>
            {imageUploadError && <p className='text-red-500'>{imageUploadError}</p>}
            <div>

              {formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                <div key={url} className='flex justify-between p-2'>
                  <img src={url} alt='Image Listing' className='sm:h-20' />
                  <button onClick={() => handleRemoveImage(index)}
                  className='p-2 text-red-600 uppercase hover:opacity-75'>Delete</button>

                </div>
              ))}
            </div>
          </div>
          <button className='p-2 bg-slate-700 text-white uppercase'>
            {loading ? 'Creating...' : 'Create Listing'}
          </button>
          {error && <p className='text-red-500'>{error}</p>}
        </div>

      </form>
    </main>
  </>
  )
}
