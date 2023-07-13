import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import { BookingCard } from '../components/BookingCard';
import { StatusCard } from '../components/StatusCard';


export const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [pending, setPending] = useState([]);
    const { empId } = useParams();
    // console.log(empId);
    const bookingUrl = "http://localhost:3001/bookings/reservations/" + empId;
    const pendingUrl = "http://localhost:3001/bookings/reservations/" + empId + "/pending";
    const endpoints = [bookingUrl, pendingUrl];
    useEffect(() => {
        axios.all(endpoints.map(endpoint => axios.get(endpoint)))
            .then(axios.spread((allBookings, allPending) => {
                setBookings(allBookings.data);
                setPending(allPending.data);
            })
            ).catch(err => {
                console.log(err);
            })
    }, []);


    console.log("Bookings");
    console.log(bookings);
    // 
    return (
        <div>
            <StatusCard />
            {/* <div className='w-5'>{JSON.stringify(bookings)}</div> */}
            <h1 className='text-3xl md:text-6xl font-bold my-5 text-center'>Your Reservations</h1>
            <div className='md:flex'>
                {bookings.map((data, id) => {
                    return <BookingCard key={id} data={data} />
                })}
            </div>
            <h1 className='text-3xl md:text-6xl font-bold my-5 text-center'>Pending Reservations</h1>
            <div className='md:flex'>
                {pending.map((data, id) => {
                    return <BookingCard key={id} data={data} />
                })}
            </div>
        </div>
    )
}
