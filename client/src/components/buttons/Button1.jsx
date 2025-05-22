import React from 'react'
import './button.scss'
const Button1 = (props) => {
    return (
        <button className='animated-border-button'>{props.name}</button>
    )
}

export default Button1