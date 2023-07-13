import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export const Success = () => {
    const location = useLocation();
    const props = location.state;
    const response = props.newReservation;
    return (
        <div className='md: grid  md:grid-cols-2 w-full bg-white '>
            <div className='w-full bg-red-600'>
                <img src="../images/success.png" alt="" className='mx-auto w-full' />
            </div>
            <div className='  p-10   '>
                <h1 className=' text-2xl md:text-5xl text-black px-2 mx-auto font-bold '> {props.message || "Invalid"}</h1>
                {/* Make it dynamic via mapping */}
                <ul className='px-2 mt-10 font-semibold'>

                    <li>
                        Room Number : {response.roomNum}
                    </li>
                    <li>
                        Name : {response.name}
                    </li>
                    <li>
                        Employee ID : {response.empId}
                    </li>
                    <li>
                        Reservation ID : {response.reservationId}
                    </li>
                </ul>
                <div className='h-auto bg-black mt-4 text-white'>
                    <button className='p-4 w-full'>
                        <Link to={`/customers/${response.empId}`} >View your application at the following URL </Link>
                    </button>
                </div>
            </div>

        </div>
    )
}