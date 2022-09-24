import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../components/Card'
import CardSkeleton from '../components/CardSkeleton'
import Header from '../components/Header'
import { fetchMoreBlogPosts, getIntialBlogPosts } from '../store/api/blog.api'
import { BlogSelector } from '../store/blog.slice'
import InfiniteScroll from "react-infinite-scroll-component"
import Loader from '../components/Loader'

export default function Home() {
  const blogPosts = useSelector(BlogSelector.selectAll);
  const isIntialLoading = useSelector(state => state.blogposts.intialloading)
  const hasMore = useSelector(state => state.blogposts.hasMore)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIntialBlogPosts())
  }, [])

  function fetchMore() {
    dispatch(fetchMoreBlogPosts())
  }

  return (
    <div>
      <Head>
        <title>CodingHunter</title>
        <meta name="description" content="Huntig coder is a blog where programmers can find to the particular problem" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='pb-10'>
        {
          <InfiniteScroll
            dataLength={blogPosts.length}
            hasMore={hasMore}
            next={fetchMore}
            className={"sm:grid sm:grid-cols-2 sm:gap-3"}
            endMessage={<h1 className='py-4 sm:col-span-2 text-center font-bold text-blue-600'>No more blogs !</h1>}
            style={{ overflowY: "hidden", width: "100%" }}
            loader={<div className='sm:col-span-2 py-3 flex items-center justify-center'><Loader /></div>}
          >
            {
              isIntialLoading ?
                new Array(5).fill(0).map((_, index) => {
                  return <CardSkeleton key={index} />
                })
                :
                blogPosts.map((blog) => {
                  return <Card key={blog.bid} blog={blog} />
                })}
          </InfiniteScroll>
        }
      </div>
    </div>
  )
}
