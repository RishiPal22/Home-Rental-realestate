import React from 'react'

export default function Search() {
    return (<>
        <div className='flex flex-col md:flex-row gap-3 p-2 m-3'>
            <div className=' border-b-4 md:min-h-screen'>
                <form className='flex flex-col gap-5'>
                    <div className=' flex items-center p-2 gap-3'>
                        <span className='font-serif'>Search Results: </span>
                        <input className='rounded-lg p-2 m-2'
                            type='text' id='search' placeholder='Search here.....' />
                    </div>
                    <div className='flex flex-wrap gap-2'>
                        <label>Type: </label>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='all'
                                className='w-5'
                            />
                            <span>Sale & Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='rent'
                                className='w-5'
                            />
                            <span> Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='sale'
                                className='w-5'
                            />
                            <span>Sale</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='offer'
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
                                className='w-5'
                            />
                            <span>Parking</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='furnished'
                                className='w-5'
                            />
                            <span>Furnished</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <label className='font-semibold'>Sort:</label>
                        <select
                            id='sort_order'
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
            <div className='font-semibold m-2 p-2 text-3xl'>
                <h1>Listing Results</h1>
            </div>
        </div>
    </>
    )
}
