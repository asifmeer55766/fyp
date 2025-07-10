import React from 'react'
import "./loaderverify.scss"
const LoaderVerify = (props) => {
    return (
        <>
            <div className="container-loader">
                <div className="loader"></div>
                <p>{props.verify}</p>
            </div>
        </>
    )
}

export default LoaderVerify