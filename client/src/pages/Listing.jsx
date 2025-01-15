import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

export default function Listing() {
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
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
              <div
                  className='h-[500px]'
                  style={{
                    background: `url(${url}) center no-repeat`,
                  }}
                ></div>
              </SwiperSlide>
            )

            )}
          </Swiper>
        </div>
      )}
    </main>
  </>
  )
}
