import React, { useState } from 'react'
import { HomeIcon, ArrowLeftOnRectangleIcon, PlusIcon } from "@heroicons/react/24/solid"
import Modal from './Modal';
import Link from "next/link"
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/api/auth.api';

function Header() {
    const [visible, setVisible] = useState(false);
    const isLoggedIn = useSelector(state => state.auth.uid)
    const dispatch = useDispatch()

    function onLogout() {
        dispatch(logout())
    }

    return (
        <nav className='border-b bg-white sticky top-0 left-0 px-3 sm:px-20 flex py-3 items-center justify-between z-10'>
            <div>
                <h2 className='text-xl font-bold text-blue-600'>HuntingCoder</h2>
            </div>
            <div className='flex justify-between'>
                <Link href={'/'}>
                    <div className='ml-10 text-gray-700 group flex flex-col items-center cursor-pointer'>
                        <HomeIcon className='h-6 sm:group-hover:animate-bounce group-hover:text-blue-600' />
                    </div>
                </Link>
                {
                    isLoggedIn && (

                        <Link href={'/create'}>
                            <div className='ml-10 text-gray-700 group flex flex-col items-center cursor-pointer'>
                                <PlusIcon className='h-6 sm:group-hover:animate-bounce group-hover:text-blue-600' />
                            </div>
                        </Link>
                    )
                }

                {
                    isLoggedIn ? (
                        <h2 className='text-blue-600 font-bold ml-5'><button onClick={onLogout}>Logout</button></h2>
                    ) : (
                        <div className='ml-10  group flex flex-col items-center cursor-pointer'>
                            <ArrowLeftOnRectangleIcon onClick={() => setVisible(!visible)} className='h-6 sm:group-hover:animate-bounce group-hover:text-blue-600' />
                        </div>
                    )
                }

            </div>
            <Modal visible={visible} onClose={() => setVisible(false)} />
        </nav>
    )
}

export default Header