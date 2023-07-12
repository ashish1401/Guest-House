import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
export const Room = (props) => {
    const [room, setRoom] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3001/rooms").then((response) => {
            setRoom(response.data.rooms);
            console.log(response.data?.rooms);
        })
    }, []);
    return (
        <div>
            <h3 className='text-6xl font-bold my-10 text-black text-center'>ROOMS AVAILABLE</h3>
            <div className='flex flex-wrap gap-y-3 m-2'>
                {room.map(data => (
                    <div className='bg-black w-auto h-auto rounded-md text-white p-2 mx-auto'>
                        <div className='max-w-5xl'>
                            <img src='./images/banner.jpeg' alt="404" className='h-56 mx-auto rounded-md' />
                        </div>
                        <div className='mt-10 mx-auto p-4'>
                            <h4><span className='text-red-600 font-bold'>Room Num : </span>{data?.roomNum}</h4>
                            <p><span className='text-red-600 font-bold'>Description : </span> {data?.description.substring(0, 20)}...</p>
                            <div><span className='text-red-600 font-bold'>Price : </span> {data?.price}</div>
                        </div>

                        <div className='mx-auto mt-6  flex'>
                            <button className='bg-red-500 rounded-md p-2 mx-auto'>
                                <Link to={`/rooms/${data?.roomNum}`} state={data}>View Details</Link>
                            </button>
                            <button className='bg-red-500 rounded-md p-2 mx-auto'>
                                <Link to="/customers" state={data?.roomNum}>Book Now</Link>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
};


