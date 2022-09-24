import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/api/auth.api';
import Alert from './Alert';
import Loader from './Loader';

function Modal({ visible, onClose }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const isAuthloading = useSelector(state => state.auth.isLoading)
    const isLoggedIn = useSelector(state => state.auth.uid)
    const isError = useSelector(state => state.auth.error)
    const dispatch = useDispatch();

    function onModalClose(e) {
        e.target.id == 'Mcontainer' && onClose()
    }

    async function onLogin() {
        await dispatch(login({ email, password }))
        if (!isError) {
            setEmail('')
            setPassword('')
        }
    }

    if (!visible || isLoggedIn) return null;
    return (
        <div onClick={onModalClose} id='Mcontainer' className='fixed w-full h-full top-0 left-0 flex justify-center items-center bg-transparent backdrop-blur-sm'>
            {isError && <Alert message={isError} />}
            <div className='drop-shadow-2xl bg-white rounded-md px-10 flex flex-col justify-evenly h-72 items-center'>
                <h1 className='text-xl font-bold'>Admin</h1>
                <input value={email} onChange={(e) => setEmail(e.target.value)} className='outline-gray-500 mt-2 border-blue-600 border-2 py-2 px-3 rounded-md' placeholder='Enter your email' />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' className='outline-gray-500 mt-2 border-blue-600 border-2 py-2 px-3 rounded-md' placeholder='Enter your pasword' />
                <button onClick={onLogin} disabled={!email || !password || isAuthloading} className='flex justify-center items-center disabled:bg-gray-300 disabled:text-black mt-2 active:scale-95 outline-none bg-blue-600 w-full py-2 text-xl text-white rounded-md'>
                    {isAuthloading ? <Loader /> : "Login"}
                </button>
            </div>
        </div>
    )
}

export default Modal