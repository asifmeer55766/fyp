import React from 'react'
import './UserInput.scss'
const UserInput = () => {
    return (
        <>

            <div className="target-category-container">

                <form action="">

                    <div className="user-req-input-container">
                        <input type="text" minLength={'200'} maxLength={'4000'} placeholder='make a system design for my eCommerce Store' />
                        <button onClick={alert("Sorry! BackEnd is under Development")}>Generate</button>
                    </div>

                    <div className="category-boxes">
                        <span>Select Target </span>
                        <div className="category-box">
                            <input type="checkbox" name="erd digrame" id="erddigrame" />
                            <label htmlFor="erddigrame">ERD Digram</label>
                        </div>

                        <div className="category-box">
                            <input type="checkbox" name="sequence digrame" id="seqdigrame" />
                            <label htmlFor="seqdigrame">Sequence Digram</label>
                        </div>

                        <div className="category-box">
                            <input type="checkbox" name="erd digrame" id="lowlevel" />
                            <label htmlFor="lowlevel">Low Level Design</label>
                        </div>

                        <div className="category-box">
                            <input type="checkbox" name="erd digrame" id="highlevel" />
                            <label htmlFor="highlevel">High Level Design</label>
                        </div>

                        <div className="category-box">
                            <input type="checkbox" name="system design" id="systemdesign" />
                            <label htmlFor="systemdesign">complete system design</label>
                        </div>
                    </div>




                </form>
            </div>
        </>
    )
}

export default UserInput