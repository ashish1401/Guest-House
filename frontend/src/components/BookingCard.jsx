import React from 'react'

export const BookingCard = (props) => {
    const data = props.data;
    return (
        <div className='border-2 border-black m-4 md:w-1/3 bg-red-500 rounded-md text-sm p-4'>
            <ul>
                <li>
                    <span className='font-bold'>Reservation ID</span> {data.resId}
                </li>
                <li>
                    <span className='font-bold'>Room Number</span> {data.roomNum}
                </li>
                <li>
                    <span className='font-bold'>Status</span> {data.status}
                </li>
                <li>
                    <span className='font-bold'>Employee ID</span> {data.empId}
                </li>
                <li>
                    <span className='font-bold'>Check In Date</span> {data.checkIn.split("T")[0]}
                </li>
                <li>
                    <span className='font-bold'>Check Out Date</span> {data.checkOut.split("T")[0]}
                </li>
            </ul>
        </div>
    )
}
