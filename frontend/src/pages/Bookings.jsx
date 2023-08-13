import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import { BookingCard } from '../components/BookingCard';
import { StatusCard } from '../components/StatusCard';
import Cookie from 'js-cookie';

export const Bookings = () => {

    const [pending, setPending] = useState([]);
    const [confirmed, setConfirmed] = useState([]);
    const { empId } = useParams();
    // console.log(empId);

    const pendingUrl = "http://localhost:3001/bookings/reservations/" + empId + "/pending";
    const confirmedUrl = "http://localhost:3001/bookings/reservations/" + empId + "/confirmed";
    const endpoints = [pendingUrl, confirmedUrl];
    // console.log(Cookie.get('empId'));
    useEffect(() => {
        axios.all(endpoints.map(endpoint => axios.get(endpoint, {
            headers: {
                'authorization': `Bearer ${Cookie.get('token')}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'empId': `${Cookie.get('empId')}`
            }
        })))
            .then(axios.spread((allPending, allConfirmed) => {

                setPending(allPending.data);
                setConfirmed(allConfirmed.data);
            })
            ).catch(err => {
                console.log(err);
            })
    }, []);



    return (
        <div>
            <StatusCard />
            {/* <div className='w-5'>{JSON.stringify(bookings)}</div> */}

            <h1 className='text-red-500 text-3xl md:text-6xl font-bold my-5 text-center'>Pending Reservations</h1>
            <div className='md:flex'>
                {pending.length ? pending.map((data, id) => {
                    return <BookingCard key={id} data={data} />
                })
                    :
                    <div className='rounded-lg m-4 md:w-1/3 h-40 mx-auto shadow-xl  text-sm p-4'>
                        <h3 className='font-bold text-center flex justify-center'>No Pending Reservations</h3>
                    </div>}
            </div>
            <h1 className='text-red-500 text-3xl md:text-6xl font-bold my-5 text-center'>Confirmed Reservations</h1>
            <div className='md:flex'>
                {confirmed.length ? confirmed.map((data, id) => {
                    return <BookingCard className="border-2" key={id} data={data} />
                }) :
                    <div className='rounded-lg m-4 md:w-1/3 h-40 mx-auto shadow-xl  text-sm p-4'>
                        <h3 className='font-bold text-center flex justify-center'>No Confirmed Reservations</h3>
                    </div>}
            </div>
        </div>
    )
}