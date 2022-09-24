import React from 'react'

function CardSkeleton() {
    return (
        <div className='my-5 py-3 z-0'>
            <div className='w-full h-52 bg-gray-200 animate-pulse'></div>
            <div className='h-2 w-52 rounded-lg mt-3 bg-gray-200 animate-pulse'></div>
            <div className='h-4 w-80 mt-5 rounded-md bg-gray-200 animate-pulse'></div>
            <div className='h-6 w-20 mt-5 rounded-md bg-gray-200 animate-pulse'></div>
        </div>
    )
}

export default CardSkeleton