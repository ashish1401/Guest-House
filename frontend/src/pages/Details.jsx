import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { DetailsCard } from '../components/DetailsCard';
import { Map } from '../components/Map';
import Cookie from 'js-cookie';
export const Details = (props) => {
    let { roomNum } = useParams();
    const [details, setDetails] = useState({});

    useEffect(() => {
        axios.get("http://localhost:3001/rooms", {
            headers: {
                'authorization': `Bearer ${Cookie.get('token')}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'empId': `${Cookie.get('empId')}`
            }
        }).then((response) => {
            const data = response.data.rooms;
            data.forEach(element => {
                if (element.roomNum === roomNum) setDetails(element);
            });
        })
    }, []);
    console.log(details);
    return (

        < div className='grid md:grid-cols-2'>
            <div className=''><DetailsCard {...details} /><div className=' m-4 bg-red-600 w-1/3 rounded-sm text-white text-xl sm:text-3xl md:text-4xl  md:mt-14 p-4 '>
                <button>
                    <Link to="/customers" state={roomNum}>Book Now!</Link>
                </button>
            </div></div>
            <div className='bg-red-600 p-6 '>
                <div className='max-w-72 mb-10'>
                    <img src="../images/banner.jpeg" alt="room-pic" className='w-5/6 rounded-xl mx-auto' />
                </div>
                <Map className="" />
            </div>

        </div >
    )
}
