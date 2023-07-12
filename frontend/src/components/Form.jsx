import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
export const Form = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const ROOM_NUM = location.state;
    let formState = false;
    // console.log(ROOM_NUM);
    // action="http://localhost:3001/customers" method="POST"
    // name , empId , roomNum , checkIn , checkOut
    const [post, setPost] = useState({
        "name": "",
        "empId": "",
        "roomNum": ROOM_NUM,
        "checkIn": "",
        "checkOut": ""
    });
    const handleInput = (event) => {
        setPost({ ...post, [event.target.name]: event.target.value });
        console.log(post);
    }
    function handleSubmit(event) {
        setPost(post);
        console.log(post);
        // console.log(event.target);
        event.preventDefault();
        axios.post("http://localhost:3001/customers", post).then(data => {
            console.log(data.data);
            formState = true;
            navigate("/success", { state: data.data });

        }).catch(err => {
            console.log(err.response.data);
            navigate("/err", { state: err.response.data });
            // window.alert("Room already booked");
        })

    }

    return (
        <div className="flex items-center justify-center p-12 ">

            <div className="mx-auto w-full max-w-[550px] border-2 border-black p-4 rounded-md ">
                <form onSubmit={handleSubmit}>
                    <div className="-mx-3 flex flex-wrap">
                        <div className="w-full px-3 ">
                            <div className="mb-5 text-red-600">
                                <label
                                    className="mb-3 block text-base font-medium  "
                                >
                                    First Name
                                </label>
                                <input
                                    required
                                    value={post.name}
                                    onChange={handleInput}
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Name"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>

                    </div>
                    <div className="-mx-3 flex flex-wrap">

                        <div className="w-full px-3">
                            <div className="mb-5 text-red-600">
                                <label
                                    for="empId"
                                    className="mb-3 block text-base font-medium "
                                >
                                    Employee ID
                                </label>
                                <input
                                    required
                                    value={post.empId}
                                    onChange={handleInput}
                                    type="text"
                                    name="empId"
                                    id="empId"
                                    placeholder="Employee ID"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-5 text-red-600">
                        <label
                            className="mb-3 block text-base font-medium "
                        >
                            Enter Valid Room Num
                        </label>
                        <input
                            required
                            value={post.roomNum}
                            onChange={handleInput}
                            type="text"
                            name="roomNum"
                            id="roomNum"
                            placeholder="XX"
                            defaultValue={ROOM_NUM}

                            className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>

                    <div className="-mx-3 flex flex-wrap">

                        <div className="w-full px-3 sm:w-1/2">
                            <div className="mb-5 text-red-600">
                                <label
                                    for="date"
                                    className="mb-3 block text-base font-medium "
                                >
                                    Check-In Date
                                </label>
                                <input
                                    required
                                    value={post.checkIn}
                                    onChange={handleInput}
                                    type="date"
                                    name="checkIn"
                                    id="indate"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>
                        <div className="w-full px-3 sm:w-1/2">
                            <div className="mb-5">
                                <label
                                    for="date"
                                    className="mb-3 block text-base font-medium text-red-600"
                                >
                                    Check-Out Date
                                </label>
                                <input
                                    required
                                    value={post.checkOut}
                                    onChange={handleInput}
                                    type="date"
                                    name="checkOut"
                                    id="outdate"
                                    min={document.getElementById("indate") + 1}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <button
                            className="hover:shadow-form rounded-md bg-red-600 py-3 px-8 text-center text-base font-semibold text-white outline-none"
                        >
                            Submit

                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
