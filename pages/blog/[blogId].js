import Head from 'next/head';
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getBlogPostById } from '../../store/api/blog.api';
import { BlogSelector } from '../../store/blog.slice';

function Blog() {
    const router = useRouter();
    const { blogId } = router.query;
    const blogPost = useSelector(state => BlogSelector.selectById(state, blogId))
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBlogPostById(blogId))
    }, [blogId])
    return (
        <div className='py-5'>
            <Head>
                <title>CodingHunter | {blogPost?.title}</title>
                <meta name="description" content="Huntig coder is a blog where programmers can find to the particular problem" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='h-52 sm:h-72 w-ful'>
                <img src={blogPost?.link} className={'object-fill h-full w-full'} />
            </div>
            <h1 className='font-bold text-xl py-3'>{blogPost?.title}</h1>
            <p dangerouslySetInnerHTML={{ __html: blogPost?.content }}></p>
        </div>
    )
}

export default Blog