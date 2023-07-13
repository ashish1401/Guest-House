import React from 'react'
import { Link } from 'react-router-dom'

export const NavBar = () => {
    return (
        <div className='bg-red-500'>
            <ul className='flex md:flex-row gap-10 justify-center items-center flex-col p-4 md:justify-evenly text-white font-bold'>
                <li>
                    <Link to="/admin/bookings">Manage Bookings</Link>
                </li>
                <li>
                    <Link to="/admin/customers">Manage Customers</Link>
                </li>
                <li>
                    <Link to="/admin/rooms">Manage Rooms</Link>
                </li>
            </ul>
        </div>
    )
}
