"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/app/util/axios';

const Navbar = ({checkUser, state}) => {
    const [username, setUsername] = useState("");
    
    const router = useRouter();
    let data = ''
    const logout = async (e) => {
        const res = await api.post("/logout/")
       
        if (res.status == "200"){
            checkUser("")
            setUsername("")
        }
        
    }
    useEffect(() => {
        async function fetchMyAPI() {
            const res = await api.get("/current-user/")

            setUsername(res.data['username'])
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
            </div>
        </div>
    );
};
export default Navbar;