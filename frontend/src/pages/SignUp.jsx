import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie'
export const SignUp = () => {
    const navigate = useNavigate();
    const [post, setPost] = useState({
        "empId": "",
        "email": "",
        "password": "",
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
        axios.post("http://localhost:3001/user/signup", post, {
            headers: {
                'authorization': `Bearer ${Cookie.get('token')}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(data => {
            console.log(data.data);
            navigate("/login", { state: data.data });

        }).catch(err => {
            console.log(err.response.data);
            navigate("/err", { state: err.response.data });
            // window.alert("Room already booked");
        })

    }
    return (
        <div>
            <div className='grid gird-rows-2 md:grid-cols-2'>
                <div className='m-10 self-center'>
                    <form onSubmit={handleSubmit} className=' flex justify-center gap-4 rounded-md  border-red-500 border-2  p-10 flex-col '>
                        <h1 className='text-4xl font-bold  text-center'>
                            Sign Up
                        </h1>
                        <div className='my-4 flex flex-col' >
                            <label htmlFor="empId">Employee Id</label>
                            <input onChange={handleInput} name='empId' type="empId" placeholder='' className='border-black border-2   rounded-md' />
                        </div>
                        <div className='my-4 flex flex-col' >
                            <label htmlFor="e-mail">E-Mail`</label>
                            <input onChange={handleInput} name='email' type="email" placeholder='' className='border-black border-2   rounded-md' />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="password">Password</label>
                            <input onChange={handleInput} name='password' type="password" placeholder='' className='border-black border-2  rounded-md' />
                        </div>
                        <button type="submit" name="submit" className='my-4 bg-red-500 rounded-md md:w-1/2 mx-auto p-2 font-bold'>
                            Sign Up
                        </button>
                        <button className='my-4 bg-red-500 rounded-md md:w-1/2 mx-auto p-2 font-bold'>
                            <Link to="/login">Have an account? Log In</Link>
                        </button>
                    </form>
                </div>
                <div className=''>
                    <img src="./images/success.png" alt="" />
                </div>
            </div>

        </div>
    )
}