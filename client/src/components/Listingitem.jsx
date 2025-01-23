import { MdLocationOn } from 'react-icons/md'
import { Link } from 'react-router-dom'

export default function Listingitem({item}) {
  return (
    <div className='border flex flex-wrap sm:w-72 place-items-start shadow-md hover:shadow-lg transition-shadow overflow-hidden '>
        <Link to={`/listing/${item._id}`} className="text-decoration-none">
        <img className='h-48 sm:h-60 sm:w-64 w-full object-contain hover:scale-105 transition-scale duration-300'
        src={item.imageUrls[0]}/>
         <div className='p-1 flex flex-col gap-2 w-full'>
          <p className='truncate text-lg font-semibold text-slate-700'>
            {item.name}
          </p>
          <div className='flex gap-2 items-center'>
            <p className='text-sm text-gray-600 truncate w-full'>
              {item.address}
            </p>
          </div>
          <p className='text-sm text-gray-600 line-clamp-3'>
            {item.description}
          </p>
          <p className='text-slate-500 mt-2 font-semibold '>
            $
            {item.offer
              ? item.discountPrice.toLocaleString('en-US')
              : item.regularPrice.toLocaleString('en-US')}
            {item.type === 'rent' && ' / month'}
          </p>
          <div className='text-slate-700 flex gap-4'>
            <div className='font-bold text-xs'>
              {item.bedrooms > 1
                ? `${item.bedrooms} beds `
                : `${item.bedrooms} bed `}
            </div>
            <div className='font-bold text-xs'>
              {item.bathrooms > 1
                ? `${item.bathrooms} baths `
                : `${item.bathrooms} bath `}
            </div>
          </div>
          </div>
        </Link>
    </div>
  )
}
