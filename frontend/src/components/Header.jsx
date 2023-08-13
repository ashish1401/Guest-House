import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
    return (
        <div className='  font-bold bg-black text-white' >

            {/* <div className='absolute   bg-black '><img src="./images/banner.jpg" alt=" " className='w-[150%]' /></div> */}
            <ul className='flex justify-around'>
                <div className='flex justify-between '>
                    <li className=''>
                        <Link to="/admin/rooms">
                            Admin
                        </Link>
                    </li>
                    <li className='mx-2'>
                        |
                    </li>
                    <li className='text-red-500'>
                        <Link to="/profile">
                            Profile
                        </Link>
                    </li>
                </div>
                <li>
                    <Link to="/rooms">
                        JayaShree Textiles <span className='text-red-500'>Guest House</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}
