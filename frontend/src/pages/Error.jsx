import React from 'react'
import { useLocation } from 'react-router-dom'

export const Error = () => {
    const location = useLocation();
    const { props } = location.state;
    return (
        <div className='flex flex-col-reverse md:grid  md:grid-cols-2 w-full bg-red-600 '>
            <div className='w-full bg-white'>
                <img src="../images/error.png" alt="" className='mx-auto w-full' />
            </div>
            <div className='m-auto  '>
                <h1 className='text-3xl md:text-6xl text-black p-4 mx-auto font-bold'> {props}</h1>
            </div>

        </div>
    )
}
