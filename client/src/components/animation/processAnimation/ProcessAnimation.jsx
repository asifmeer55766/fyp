import React from 'react'
import './processAnimation.scss'
function ProcessAnimation({ status }) {
    return (
        <div className='load-container'>
            <div className="loader"></div>
            <p>{status}</p>
            <p><i>Once processing is complete, you will be redirected </i></p>
        </div>
    )
}

export default ProcessAnimation