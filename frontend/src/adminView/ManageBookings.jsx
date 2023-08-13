//View ALL Bookings
//Handle Patch requests
import React, { useEffect, useState } from 'react';
import { NavBar } from '../components/NavBar.jsx';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactTable from "react-table";
export const ManageBookings = () => {
    const { variable } = useParams();
    const [bookings, setBookings] = useState([]);
    // const [approve, setApprove] = useState(false);


    useEffect(() => {
        axios.get("http://localhost:3001/bookings").then(response => {
            console.log(response)
            setBookings(response.data.rooms);
        }).catch(err => {
            console.log(err);
        })
    }, [""])

    function handleApprove(resId) {
        let val = window.confirm("APPROVE BOOKING?");
        if (val === true) {
            axios.patch(`http://localhost:3001/bookings/${resId}`, { status: 2 })
                .then(res => {
                    console.log(res);
                    window.alert("Request approved, please refresh");
                })
                .catch(err => {
                    window.alert(err);
                })
        }
        else {
            return;
        }
    }



    function handleDelete(resId) {
        let val = window.confirm("DELETE BOOKING?");
        if (val === true) {
            axios.patch(`http://localhost:3001/bookings/${resId}`, { status: 0 })
                .then(res => {
                    console.log(res);
                    window.alert("Request deleted, please refresh");
                })
                .catch(err => {
                    window.alert(err);
                })
        }
        else {
            return;
        }
    }

    return (
        <div>
            <NavBar />
            <div className='bg-red-500 my-8 shadow-black shadow-lg w-1/3 mx-auto p-10 rounded-md'>
                <ul className='mx-auto  '>
                    <li>
                        <strong>Status:0</strong>  Rejected
                    </li>
                    <li>
                        <strong>Status:1</strong>  Waiting for Approval
                    </li>
                    <li>
                        <strong>Status:2</strong>  Accepted
                    </li>
                </ul>
            </div>
            <div>

                <div className=''>

                    <div className=" my-12 p-2  w-full">
                        <h1 className=' text-2xl my-4 md:text-5xl text-black text-center mx-auto font-bold '>  Bookings </h1>
                        <table className='w-full p-2 border-[2px] border-black'>
                            <tr className='mx-auto text-center border-[2px] border-black'>
                                <th className='mx-auto border-[2px] border-black'>Room ID</th>
                                <th className='mx-auto border-[2px] border-black'>Room Number</th>
                                <th className='mx-auto border-[2px] border-black'>Employee ID</th>
                                <th className='mx-auto border-[2px] border-black'>Check In Date</th>
                                <th className='mx-auto border-[2px] border-black'>Check Out Date</th>
                                <th className='mx-auto border-[2px] border-black'>Reservation ID</th>
                                <th className='mx-auto border-[2px] border-black'>Status</th>
                            </tr>
                            {bookings.map(booking => (
                                <tr className='mx-auto text-center  p-10' key={booking.resId}>
                                    <td className='mx-auto border-[2px] border-black'>{booking.resId}</td>
                                    <td className='mx-auto border-[2px] border-black'>{booking.roomNum}</td>
                                    <td className='mx-auto border-[2px] border-black'>{booking.empId}</td>
                                    <td className='mx-auto border-[2px] border-black'>{booking.checkIn}</td>
                                    <td className='mx-auto border-[2px] border-black'>{booking.checkOut}</td>
                                    <td className='mx-auto border-[2px] border-black'>{booking.resId}</td>
                                    <td className='mx-auto border-[2px] border-black'>{booking.status}</td>
                                    <td className='p-4 border-b-[2px] border-black '>
                                        <button onClick={() => handleApprove(booking.resId)} className='border-b-[2px] border-black hover:bg-black transition-all p-2 w-24 rounded-md bg-red-500 text-white'>
                                            Approve
                                        </button>
                                    </td>
                                    <td className='border-b-[2px] border-black '>
                                        <button onClick={() => handleDelete(booking.resId)} className='border-b-[2px]  border-red-500 hover:bg-red-500 p-2 w-24 rounded-md bg-black text-white'>
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </table>


                    </div>

                </div>
            </div>
        </div>
    )
}
