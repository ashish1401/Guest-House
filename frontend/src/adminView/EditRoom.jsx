import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { DetailsCard } from '../components/DetailsCard';
import { Map } from '../components/Map';
import Cookie from 'js-cookie'
export default function EditRoom() {
    const [details, setDetails] = useState({});

    useEffect(() => {
        axios.get("http://localhost:3001/rooms", {
            headers: {
                'authorization': `Bearer ${Cookie.get('token')}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            const data = response.data.rooms;
            data.forEach(element => {
                if (element.roomNum === roomNum) setDetails(element);
            });
        })
    }, []);
    const { roomNum } = useParams();
    return (
        <div>
            <h1 className=' text-2xl my-4 md:text-5xl text-black text-center mx-auto font-bold '>  Room Number : {roomNum} </h1>
            < div className='grid md:grid-cols-2'>



            </div >
        </div>
    )
}
