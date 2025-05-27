import React, { useEffect } from 'react'
import './UserInput.scss'

const UserInput = () => {

    const Alert = () => {
        alert("Sorry! BackEnd is under Development")
    }
    useEffect(() => {

    }, [Alert])

    return (
        <>

            <div className="target-category-container">

                <form action="">

                    <div className="user-req-input-container">
                        <input type="text" minLength={'200'} maxLength={'4000'} placeholder='write here your complete requirements at least( >250 char)' />
                        <button onClick={Alert}>Generate</button>
                    </div>

                    <div className="category-boxes">
                        <span>Select Target </span>
                        <div className="category-box">
                            <label htmlFor="erddigrame">ERD Digram</label>
                            <input type="checkbox" name="erd digrame" id="erddigrame" />
                        </div>

                        <div className="category-box">
                            <label htmlFor="seqdigrame">Sequence Digram</label>
                            <input type="checkbox" name="sequence digrame" id="seqdigrame" />
                        </div>

                        <div className="category-box">
                            <label htmlFor="lowlevel">Low Level Design</label>
                            <input type="checkbox" name="erd digrame" id="lowlevel" />
                        </div>

                        <div className="category-box">
                            <label htmlFor="highlevel">High Level Design</label>
                            <input type="checkbox" name="erd digrame" id="highlevel" />
                        </div>

                        <div className="category-box">
                            <label htmlFor="systemdesign">complete system design</label>
                            <input type="checkbox" name="system design" id="systemdesign" />
                        </div>
                    </div>




                </form>
            </div>
        </>
    )
}

export default UserInput