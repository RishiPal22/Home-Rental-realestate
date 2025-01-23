import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel'
import '../App.css'

export default function Home() {

  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);


  useEffect(() => {
    try {
      const fetchOfferListings = async () => {
        const res = await fetch(`/api/listing/get?offer=true&limit=4`)
        const data = await res.json()
        setOfferListings(data)
      }

    } catch (error) {
      console.log('Error fetching listings', error)
    }
  }, [])


  return (
    <>
      <div className='p-4 m-4 flex flex-col gap-8 max-w-6xl' >
        <p className='text-xl'>Pal Estates</p>
        <h1 className='uppercase text-3xl text-slate-500' >Welcome to your next Dream House....</h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          Pal Estate is the best place to find your next perfect place to
          live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>

        <Link
          to={'/search'}
          className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
        >
          Let's get started...
        </Link>
      </div>


      <div>
        <Carousel data-bs-theme="dark">
          <Carousel.Item>
            <img style={{ height: '85vh' }}
              className="d-block w-100"
              src="https://images.unsplash.com/photo-1640231026037-ffef7d41a14e?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="First slide"
            />
            {/* <Carousel.Caption>
              <h5>First slide label</h5>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption> */}
          </Carousel.Item>
          <Carousel.Item>
            <img style={{ height: '85vh' }}
              className="d-block w-100"
              src="https://images.unsplash.com/photo-1520636962706-211a957407f3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2ltcGxlJTIwaG91c2V8ZW58MHx8MHx8fDA%3D"
              alt="Second slide"
            />
            {/* <Carousel.Caption>
              <h5>Second slide label</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption> */}
          </Carousel.Item>
          <Carousel.Item>
            <img style={{ height: '85vh' }}
              className="d-block w-100"
              src="holder.js/800x400?text=Third slide&bg=e5e5e5"
              alt="Third slide"
            />
            {/* <Carousel.Caption>
              <h5>Third slide label</h5>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption> */}
          </Carousel.Item>
        </Carousel>
      </div>

      <div>
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
