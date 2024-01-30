"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = ({checkUser, state}) => {
    const [username, setUsername] = useState("");
    
    const router = useRouter();
    let data = ''
    const logout = async (e) => {
        const res = await fetch("http://localhost:8000/logout/", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            credentials: "include"

        });
        if (res.ok){
            checkUser("")
            setUsername("")
        }
        
    }
    useEffect(() => {
        async function fetchMyAPI() {

            const res = await axios({
                method: 'GET',
                url: "http://localhost:8000/current-user/",
                withCredentials: true


            })
            data = await res.data
            setUsername(data['username'])
        }

        fetchMyAPI()
    }, [])


    return (
        <div className='z-50 fixed w-full h-[80px] flex justify-between items-center px-4 bg-[#000000] text-gray-300'>
            {/* menu */}
            <div>
                <ul className='hidden md:flex gap-x-8'>
                    <li className='link'>
                        <Link href='/' >
                            Home
                        </Link>
                    </li>
                    {username ?
                        <React.Fragment>
                            <li className='link'>
                                <Link href='/' onClick={() => logout()} >
                                    Logout
                                </Link>

                            </li>

                            <li className='link'>
                                <Link href='/create-post' >
                                    Create Post
                                </Link>

                            </li>
                            <li className='link'>
                                <Link href='/user' >
                                    Hello {username}
                                </Link>

                            </li>

                        </React.Fragment>


                        :
                        <React.Fragment>
                            <li className='link'>
                                <Link href='/login' >
                                    Login
                                </Link>
                            </li>
                            <li className=''>
                                <Link href='/register'>
                                    Register
                                </Link>

                            </li>
                        </React.Fragment>

                    }


                </ul>
            </div>
        </div>
    );
};
export default Navbar;