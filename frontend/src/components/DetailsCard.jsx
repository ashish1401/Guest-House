import React from 'react'
import { Link } from 'react-router-dom'

export const DetailsCard = ({ roomNum, description, price }) => {
    return (
        <div className='p-6'>
            <h1 className='text-3xl md:text-6xl font-bold my-5'>Room Details</h1>
            <ul className='text-xl sm:text-3xl md:text-4xl flex flex-col md:mt-32 p-4 gap-16 '>
                <li>
                    <span className='font-bold'>Room Number <br /></span>{roomNum}
                </li>
                <li>
                    <span className='font-bold'>Description <br /></span>
                    {description}

                </li>
                <li>
                    <span className='font-bold'>Price<br /></span>
                    {price}

                </li>
            </ul>
            <div className='bg-red-600 w-1/3 rounded-sm text-white text-xl sm:text-3xl md:text-4xl  md:mt-32 p-4 '>
                <button>
                    <Link to="/customers" state={roomNum}>Book Now!</Link>
                </button>
            </div>

        </div>
    )
}
