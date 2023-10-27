import Cookies from 'js-cookie'
import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
    return (
        <div className='  font-bold bg-black text-white' >

            {/* <div className='absolute   bg-black '><img src="./images/banner.jpg" alt=" " className='w-[150%]' /></div> */}
            <ul className='flex justify-around p-4'>
                <div className='flex justify-between '>
                    <li className='my-auto'>
                        <Link to="/admin">
                            Admin
                        </Link>
                    </li>
                    <li className='mx-2 my-auto'>
                        |
                    </li>
                    <li className='text-red-500 my-auto'>
                        <Link to={`/customers/${Cookies.get('empId')}`}>
                            Profile
                        </Link>
                    </li>
                </div>
                <li className='hidden sm:block'>
                    <img src="/logo.png" alt="" />
                </li>
                <li className='my-auto'>
                    <Link to="/rooms">
                        JayaShree Textiles <span className='text-red-500'>Guest House</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}
