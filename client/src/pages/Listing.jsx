import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
} from 'react-icons/fa';
export default function Listing() {
  SwiperCore.use([Navigation]);
  const [loading, setloading] = useState(true)
  const [errors, seterrors] = useState(false)
  const [listing, setlisting] = useState()
  const params = useParams()

  useEffect(() => {

    const fetchlisting = async (req, res, next) => {
      try {
        setloading(true)
        const res = await fetch(`/api/listing/get/${params.listingId}`)
        const data = await res.json()
        if (data.success === false) {
          setloading(false)
          seterrors(true)
        }

        setlisting(data)
        seterrors(false)
        setloading(false)

      }
      catch (error) {
        next(error)
        seterrors(true)
        setloading(false)
      }
    }

    fetchlisting()
  }, [])

  return (<>
    <main>
      {loading && <p className='text-3xl align-middle text-center m-2'>Loading...</p>}
      {errors && <p className='text-3xl align-middle text-center text-red-700 items-center'>Something went Wrong!</p>}

      {listing && !loading && !errors && (
        <div className=''>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[600px] m-1'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>

            ))}
          </Swiper>

          <div className='items-center  flex flex-col gap-2 m-1'>
            <p className='text-2xl font-semibold'>
              {listing.name} - ${' '}
              {listing.offer
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && ' / month'}
            </p>
            <p className='flex items-center gap-2 text-slate-600  text-sm'>
              <FaMapMarkerAlt className='text-green-700' />
              {listing.address}
            </p>
            <div className='flex gap-4'>
              <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
              {listing.offer && (
                <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                  ${+listing.regularPrice - +listing.discountPrice} OFF
                </p>

              )}
            </div>
            <p className='text-slate-800 text-center max-w-[800px] mx-auto'>
              <span className='font-semibold text-black'>Description - </span>
              {listing.description}
            </p>
            <p> </p>
            <p> </p>

            <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBed className='text-lg' />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBath className='text-lg' />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaParking className='text-lg' />
                {listing.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaChair className='text-lg' />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>

          </div>
        </div>
      )}
    </main>
  </>
  )
}
