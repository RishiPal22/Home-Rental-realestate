import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Listingitem from '../components/Listingitem'
import { set } from 'mongoose'

export default function Search() {

    const navigate = useNavigate()
    const [listing,setlisting] = useState([])
    const [loading,setloading] = useState(false)
    const [showmore,setshowmore] = useState(true)

    const [sidebardata, setsidebardata] = useState({
        type: "all",
        searchTerm: "",
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc'
    })

    console.log(sidebardata)

    const handleChange = (e) => {

        if (e.target.id === 'searchTerm') {
            setsidebardata({ ...sidebardata, searchTerm: e.target.value })
        }

        if (e.target.id === 'rent' || e.target.id === 'all' || e.target.id === 'sale') {
            setsidebardata({ ...sidebardata, type: e.target.id })
        }

        if (e.target.id === 'offer' || e.target.id === 'furnished' || e.target.id === 'parking') {
            setsidebardata({ ...sidebardata, [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false, })
        }

        if (e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0] || 'created_at';

            const order = e.target.value.split('_')[1] || 'desc';

            setsidebardata({ ...sidebardata, sort, order });
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sidebardata.searchTerm);
        urlParams.set('type', sidebardata.type);
        urlParams.set('parking', sidebardata.parking);
        urlParams.set('furnished', sidebardata.furnished);
        urlParams.set('offer', sidebardata.offer);
        urlParams.set('sort', sidebardata.sort);
        urlParams.set('order', sidebardata.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');

        if (
            searchTermFromUrl ||
            typeFromUrl ||
            parkingFromUrl ||
            furnishedFromUrl ||
            offerFromUrl ||
            sortFromUrl ||
            orderFromUrl
        ) {
            setsidebardata({
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                parking: parkingFromUrl === 'true' ? true : false,
                furnished: furnishedFromUrl === 'true' ? true : false,
                offer: offerFromUrl === 'true' ? true : false,
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc',
            });
        }

        const fetchlisting = async () => {
            setshowmore(false)
            setloading(true);
            const searchQuery = urlParams.toString()
            const res = await fetch(`/api/listing/get?${searchQuery}`);
            const data = await res.json();
            if (data.length > 8) {
                setshowmore(true);
              } else {
                setshowmore(false);
              }
            
            setlisting(data);
            setloading(false);

        };

        fetchlisting();

        setloading(false)

    }, [location.search]);

    const handleClickshowmore = async () => {
        const noofListings = listing.length;
        const startIndex = noofListings;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);

        const data = res.json();
        if(data.length < 9){
            setshowmore(false)
        }

        setlisting([...listing, ...data]);

    }

    console.log("hellp", listing)

    return (<>
        <div className='flex flex-col md:flex-row gap-3 p-2 m-3'>
            <div className=' border-b-4 md:min-h-screen'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                    <div className=' flex items-center p-2 gap-3'>
                        <span className='font-serif'>Search Results: </span>
                        <input value={sidebardata.searchTerm} onChange={handleChange}
                            className='rounded-lg p-2 m-2'
                            type='text' id='searchTerm' placeholder='Search here.....' />
                    </div>
                    <div className='flex flex-wrap gap-2'>
                        <label>Type: </label>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='all'
                                onChange={handleChange}
                                checked={sidebardata.type === "all"}
                                className='w-5'
                            />
                            <span>Sale & Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='rent'
                                checked={sidebardata.type === 'rent'}
                                onChange={handleChange}
                                className='w-5'
                            />
                            <span> Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='sale'
                                onChange={handleChange}
                                checked={sidebardata.type === 'sale'}
                                className='w-5'
                            />
                            <span>Sale</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='offer'
                                onChange={handleChange}
                                checked={sidebardata.offer}
                                className='w-5'
                            />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-1'>
                        <label>Amneties: </label>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='parking'
                                onChange={handleChange}
                                checked={sidebardata.parking}
                                className='w-5'
                            />
                            <span>Parking</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='furnished'
                                onChange={handleChange}
                                checked={sidebardata.furnished}
                                className='w-5'
                            />
                            <span>Furnished</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <label className='font-semibold'>Sort:</label>
                        <select
                            id='sort_order'
                            onChange={handleChange}
                            defaultValue={'created_at_desc'}
                            className='border rounded-lg p-3'
                        >
                            <option value='regularPrice_desc'>Price high to low</option>
                            <option value='regularPrice_asc'>Price low to hight</option>
                            <option value='createdAt_desc'>Latest</option>
                            <option value='createdAt_asc'>Oldest</option>
                        </select>
                    </div>
                    <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
                        Search
                    </button>
                </form>
            </div>
            <div className='flex-1'>
                <h1 className='font-semibold m-2 p-2 text-3xl'>Listing Results</h1>
                <div className='p-2'>
            {!loading && listing.length === 0 && <p className='text-center text-slate-600 text-2xl'>No listings found!</p>}
            {loading  && <p className='text-center text-slate-600 text-2xl'>Loading...</p>}

            <div className='flex flex-wrap gap-3 m-2 p-4 items-center justify-star'>
                {!loading && listing.map((item) => (
                    <Listingitem key={item._id} item={item} />
                ))}
            </div>
                { showmore &&
            <div className='w-full text-center'>
                <button onClick={handleClickshowmore}
                 className='text-green-500 hover:underline'>Show More</button>
            </div>
                }
            </div>
            </div>
            
        </div>
    </>
    )
}
