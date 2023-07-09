import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { DetailsCard } from '../components/DetailsCard';
import { Map } from '../components/Map';

export const Details = (props) => {
    let { roomNum } = useParams();
    const [details, setDetails] = useState({});

    useEffect(() => {
        axios.get("http://localhost:3001/rooms").then((response) => {
            const data = response.data.rooms;
            data.forEach(element => {
                if (element.roomNum === roomNum) setDetails(element);
            });
        })
    }, []);
    console.log(details);
    return (

        < div className='grid md:grid-cols-2'>
            <div className=''><DetailsCard {...details} /></div>
            <div className='bg-red-600 p-6 '>
                <div className='max-w-72 mb-10'>
                    <img src="../images/banner.jpeg" alt="room-pic" className='w-5/6 rounded-xl mx-auto' />
                </div>
                <Map className="" />
            </div>

        </div >
    )
}
