import Image from 'next/future/image'
import Link from 'next/link'
import React from 'react'
import moment from "moment"
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog } from '../store/api/blog.api'

function Card({ blog }) {
    const isLoggedIn = useSelector(state => state.auth.uid)
    const dispatch = useDispatch()
    const isDeleting = useSelector(state => state.blogposts.isDeleting)

    function onDelete() {
        dispatch(deleteBlog({ bid: blog?.bid }))
    }

    return (
        // <Link href={'/blog/' + blog.bid}>
        <div className='mt-3 transition-all duration-300 ease-in-out sm:hover:border py-2 sm:hover:shadow-lg px-2 sm:hover:cursor-pointer rounded-lg'>
            <div className='bg-gray-300 overflow-hidden h-52 w-full border  rounded-md'>
                <img className='object-fill w-full h-full' src={blog?.link ? blog.link : "https://repository-images.githubusercontent.com/37153337/9d0a6780-394a-11eb-9fd1-6296a684b124"} />
            </div>
            <h1 className='text-ellipsis whitespace-nowrap overflow-hidden font-bold text-md sm:text-lg mt-2'>{blog?.title}</h1>
            <p className='text-md max-h-12 text-ellipsis whitespace-nowrap overflow-hidden max-w-full' dangerouslySetInnerHTML={{ __html: blog?.content }}></p>

            <div><span className='font-bold text-xs text-gray-600'>Posted {moment(blog?.createdAt).fromNow()}</span>
                {
                    blog?.updatedAt && (
                        <>
                            <span className='font-bold px-2 py-5 text-xs text-gray-600'>| Updated {moment(blog?.updatedAt).fromNow()}</span>
                        </>
                    )
                }
            </div>

            <Link href={'/blog/' + blog?.bid}>
                <button className='border border-blue-600 p-1 mt-2 text-blue-600 rounded-md transition-all duration-75 hover:scale-95 hover:bg-blue-600 hover:text-white outline-none'>Read More</button>
            </Link>
            {
                isLoggedIn && (
                    <>
                        <Link href={'/create/' + blog.bid}>
                            <button className='ml-2 border border-yellow-400 p-1 px-3 mt-2 text-yellow-400 rounded-md transition-all duration-75 active:scale-95 hover:bg-yellow-400 hover:text-white outline-none'>Edit</button>
                        </Link>
                        <button onClick={onDelete} className='ml-2 border border-red-400 p-1 px-3 mt-2 text-red-400 rounded-md transition-all duration-75 active:scale-95 hover:bg-red-400 hover:text-white outline-none'>Delete</button>
                    </>
                )
            }
        </div>
        // </Link>
    )
}

export default Card