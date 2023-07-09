import React from 'react';
import { Link, useLocation } from "react-router-dom";
export const Form = (props) => {
    const location = useLocation();
    const ROOM_NUM = location.state;
    console.log(ROOM_NUM);
    return (
        <div className="flex items-center justify-center p-12 ">

            <div className="mx-auto w-full max-w-[550px] border-2 border-black p-4 rounded-md ">
                <form action="http://localhost:3001/customers" method="POST">
                    <div className="-mx-3 flex flex-wrap">
                        <div className="w-full px-3 ">
                            <div className="mb-5 text-red-600">
                                <label
                                    className="mb-3 block text-base font-medium  "
                                >
                                    First Name
                                </label>
                                <input
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
                            <Link to="/reservations">Submit</Link>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
