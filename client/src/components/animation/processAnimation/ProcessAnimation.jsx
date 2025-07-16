import React from 'react'
import './processAnimation.scss'
function ProcessAnimation({ status }) {
    return (
        <div className='load-container'>
            <div className="loader"></div>
            <p>{status}</p>
            <p><i>Once it verified you will be redirect </i></p>
        </div>
    )
}

export default ProcessAnimation