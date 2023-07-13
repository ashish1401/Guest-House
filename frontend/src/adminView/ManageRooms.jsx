import React, { useEffect, useState } from 'react';
import { NavBar } from '../components/NavBar';
import axios from "axios";
export const ManageRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [submit, setSubmit] = useState(false);
    const [post, setPost] = useState({
        roomNum: "",
        roomType: "",
        price: ""
    })
    useEffect(() => {
        axios.get("http://localhost:3001/rooms").then(data => {
            setRooms(data.data.rooms);
        }).catch(err => {
            console.log(err);
        })
    }, [""])

    const handleInput = (event) => {
        setPost({ ...post, [event.target.name]: event.target.value });
    }

    const handleSubmit = (event) => {
        setSubmit(true);
        event.preventDefault();
        setPost(post);
        axios.post("http://localhost:3001/rooms", post).then(response => {
            console.log(response);
        }).catch(err => {
            console.log(err);
        });
    }



    return (
        <>
            <NavBar />
            <div className="my-12">
                <h1 className=' text-2xl my-4 md:text-5xl text-black text-center mx-auto font-bold '> Add a Room </h1>
                <div className="mx-auto w-full max-w-[550px] border-2 border-black p-4 rounded-md ">
                    <form onSubmit={handleSubmit}>
                        <div className="-mx-3 flex flex-wrap">
                            <div className="w-full px-3 ">
                                <div className="mb-5 text-red-600">
                                    <label
                                        className="mb-3 block text-base font-medium  "
                                    >
                                        Room Number
                                    </label>
                                    <input
                                        required
                                        value={post.roomNum}
                                        onChange={handleInput}
                                        type="text"
                                        name="roomNum"
                                        id="roomNum"
                                        placeholder="Room Number"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    />
                                </div>
                            </div>

                        </div>
                        <div className="-mx-3 flex flex-wrap">
                            <div className="w-full px-3">
                                <div className="mb-5 text-red-600">
                                    <label
                                        for="Descriptiom"
                                        className="mb-3 block text-base font-medium "
                                    >
                                        Enter Description
                                    </label>
                                    <input
                                        required
                                        value={post.roomType}
                                        onChange={handleInput}
                                        type="text"
                                        name="roomType"
                                        id="roomType"
                                        placeholder="Enter a brief description for the room"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base h-32 font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mb-5 text-red-600">
                            <label
                                className="mb-3 block text-base font-medium "
                            >
                                Price
                            </label>
                            <input
                                required
                                value={post.price}
                                onChange={handleInput}
                                type="number"
                                name="price"
                                id="price"
                                placeholder="XXXX Rs"


                                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
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
            <div class="my-12 p-2">
                <h1 className=' text-2xl my-4 md:text-5xl text-black text-center mx-auto font-bold '>  Listed Rooms </h1>

                <table className='w-full p-2 border-[2px] border-black'>
                    <tr className='mx-auto text-center border-[2px] border-black'>
                        <th className='mx-auto border-[2px] border-black'>Room ID</th>
                        <th className='mx-auto border-[2px] border-black'>Room Number</th>
                        <th className='mx-auto border-[2px] border-black'>Description</th>
                        <th className='mx-auto border-[2px] border-black'>Price Per Night</th>

                    </tr>
                    {rooms.map(room => (
                        <tr className='mx-auto text-center  p-10' key={room.roomId}>
                            <td className='mx-auto border-[2px] border-black'>{room.roomId}</td>
                            <td className='mx-auto border-[2px] border-black'>{room.roomNum}</td>
                            <td className='mx-auto border-[2px] border-black'>{room.description}</td>
                            <td className='mx-auto border-[2px] border-black'>{room.price}</td>

                            <td className='p-4 border-b-[2px] border-black '>
                                <button className='border-b-[2px] border-black hover:bg-black transition-all p-2 w-24 rounded-md bg-red-500 text-white'>
                                    Edit
                                </button>
                            </td>
                            <td className='border-b-[2px] border-black '>
                                <button className='border-b-[2px]  border-red-500 hover:bg-red-500 p-2 w-24 rounded-md bg-black text-white'>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>



        </>
    )
}
