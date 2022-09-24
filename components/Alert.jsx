import React from 'react'

function Alert({ message, status }) {
    return (
        <div className='fixed top-10 text-white p-2 opacity-75 rounded-md animate-slidein' style={{ backgroundColor: status == "success" ? "green" : "red", transform: 'transalateY(-100%)' }}>{message}</div>
    )
}

export default Alert