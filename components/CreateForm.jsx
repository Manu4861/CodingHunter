import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getBlogPostById, postBlog, updateBlog } from '../store/api/blog.api';
import { BlogSelector } from '../store/blog.slice';
import Loader from './Loader'

function CreateForm({ update }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [link, setLink] = useState('');
    const isPosting = useSelector(state => state.blogposts.isPosting)
    const dispatch = useDispatch()
    const router = useRouter()
    const { blogId } = router.query;
    const blogPost = useSelector(state => BlogSelector.selectById(state, blogId))

    useEffect(() => {
        dispatch(getBlogPostById(blogId))
    }, [blogId])

    useEffect(() => {
        setTitle(blogPost?.title);
        setContent(blogPost?.content);
    }, [blogPost])

    async function onPost() {
        const parsedContent = content.replace(/\n/g, "<br/>")
        await dispatch(postBlog({ title, link, content: parsedContent }))
        setTitle('')
        setContent('')
        setLink('')
    }

    async function onUpdate() {
        const parsedContent = content.replace(/\n/g, "<br/>")
        await dispatch(updateBlog({ bid: blogId, link, title, content: parsedContent }))
        setTitle('')
        setContent('')
        setLink('')
        router.push("/")
    }

    return (
        <div className='py-5'>
            <div className='flex flex-col w-full'>
                <h1 className='text-center font-bold text-xl'>Create Blog</h1>
                <input disabled={isPosting} value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' className='disabled:bg-gray-300 disabled:animate-pulse rounded-md outline-blue-600 outline-2 border-blue-600 border p-2 mt-3' />
                <input disabled={isPosting} value={link} onChange={(e) => setLink(e.target.value)} placeholder='Banner Image URL' className='disabled:bg-gray-300 disabled:animate-pulse rounded-md outline-blue-600 outline-2 border-blue-600 border p-2 mt-3' />
                <textarea disabled={isPosting} value={content} onChange={(e) => setContent(e.target.value)} className='disabled:bg-gray-300 disabled:animate-pulse resize-none h-80 p-2 outline-blue-600 outline-2 rounded-md border-blue-600 border mt-3' placeholder='Type the content here...' />
                <button
                    onClick={update ? onUpdate : onPost}
                    className='disabled:bg-gray-300 disabled:text-black flex justify-center items-center mt-2 active:scale-95 outline-none bg-blue-600 w-36 py-1 text-lg text-white rounded-md'
                    disabled={
                        update ? blogPost?.title == title && blogPost?.content == content && blogPost?.link == link
                            : !title || !content}
                >
                    {isPosting ? <Loader color={"sec"} /> : update ? "update" :
                        "Publish"}
                </button>
            </div>
        </div>
    )
}

export default CreateForm