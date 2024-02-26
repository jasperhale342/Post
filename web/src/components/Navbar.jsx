"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/app/util/axios';

const Navbar = ({ checkUser, state }) => {
    const [username, setUsername] = useState("");
    const [mounted, setMounted] = useState(false);
    const logout = async (e) => {
        const res = await api.post("/logout/")

        if (res.status == "200") {
            checkUser("")
            setUsername("")
        }

    }
    useEffect(() => {
        async function fetchMyAPI() {
            try {
                const res = await api.get("/current-user/")
                setUsername(res.data['username'])
                setMounted(true)
            }
            catch (error) {
                console.log(error)
            }
           

          
        }

        fetchMyAPI()
    }, [])


    return (
        <div className='z-50  w-full h-[80px] flex justify-between items-center px-4 bg-[#000000] text-gray-300'>
        {mounted ? <div>
                <ul className='hidden md:flex gap-x-8'>
                    <li className='link'>
                        <Link href='/' >
                            home
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
            </div>: <div>Loading...</div>}
            
        </div>
    );
};
export default Navbar;