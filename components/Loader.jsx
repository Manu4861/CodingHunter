import React from 'react'

function Loader({ color }) {
    return (
        <div className='w-7 h-7 border-4 rounded-full border-[rgba(0,0,0,0.1)] border-l-blue-600 animate-spin'></div>
    )
}

export default Loader