import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie';
export const LogIn = () => {
    const navigate = useNavigate();
    const [post, setPost] = useState({
        "email": "",
        "password": "",
        "empId": " ",
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
        axios.post("http://localhost:3001/user/login", post).then(data => {
            console.log(data.data);
            Cookie.set('token', data.data.token, { expires: 7, path: '/' });
            Cookie.set('empId', post.empId, { expires: 7, path: '/' });
            navigate("/rooms");
        }).catch(err => {
            console.log(err.response.data);
            navigate("/", { state: err.response.data });
            // window.alert("Room already booked");
        })

    }
    return (
        <div>
            <div className='grid  md:grid-cols-2'>
                <div className='m-10 self-center'>
                    <form onSubmit={handleSubmit} className=' flex justify-center gap-4 rounded-md  border-red-500 border-2  p-10 flex-col '>
                        <h1 className='text-4xl font-bold  text-center'>
                            Sign In
                        </h1>
                        <div className='my-4 flex flex-col' >
                            <label htmlFor="empId">Employee Id`</label>
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
                        <button className='my-4 bg-red-500 rounded-md md:w-1/2 mx-auto p-2 font-bold' type=''>
                            Log In
                        </button>
                        <button className='my-4 bg-red-500 rounded-md md:w-1/2 mx-auto p-2 font-bold'>
                            <Link to="/signup">Don't have an account? Sign Up</Link>
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
