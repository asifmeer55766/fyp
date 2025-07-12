import React, { useState } from 'react';
import './UserInput.scss';
import { toast } from 'react-toastify';
import { IoReloadSharp, IoPaperPlane } from "react-icons/io5";

const UserInput = () => {
    const [inputText, setInputText] = useState("");
    const [checked, setChecked] = useState({
        erd: false,
        sequence: false,
        low: false,
        high: false,
        system: false
    });
    const handleChange = (e) => {
        const { name, checked: isChecked } = e.target;

        if (name === "system") {
            // If complete system design is checked, turn off all others
            setChecked({
                erd: false,
                sequence: false,
                low: false,
                high: false,
                system: isChecked
            });
        } else {
            // Toggle the selected checkbox, and turn off system design
            setChecked(prev => ({
                ...prev,
                [name]: isChecked,
                system: false
            }));
        }
    };


    const handleForm = (e) => {
        e.preventDefault();
        const anyChecked = Object.values(checked).some(value => value === true);

        if (!anyChecked) {
            toast.warning("Please select at least one design option before submitting ")
            return;
        }
        else if (inputText === "") {
            toast.warning("Please enter your requirements in detail first ")
            return
        }



    };

    return (
        <div className="target-category-container">
            <form onSubmit={handleForm}>
                <div className="category-boxes">
                    <span>Select Target </span>

                    <div className="category-box">
                        <label htmlFor="erd">ERD Diagram</label>
                        <input type="checkbox"
                            name="erd"
                            id="erd"
                            checked={checked.erd}
                            onChange={handleChange}
                            disabled={checked.system}
                        />
                    </div>

                    <div className="category-box">
                        <label htmlFor="sequence">Sequence Diagram</label>
                        <input type="checkbox"
                            name="sequence"
                            id="sequence"
                            checked={checked.sequence}
                            onChange={handleChange}
                            disabled={checked.system}
                        />
                    </div>

                    <div className="category-box">
                        <label htmlFor="low">Low Level Design</label>
                        <input type="checkbox"
                            name="low"
                            id="low"
                            checked={checked.low}
                            onChange={handleChange}
                            disabled={checked.system}
                        />
                    </div>

                    <div className="category-box">
                        <label htmlFor="high">High Level Design</label>
                        <input type="checkbox"
                            name="high"
                            id="high"
                            checked={checked.high}
                            onChange={handleChange}
                            disabled={checked.system}
                        />
                    </div>

                    <div className="category-box">
                        <label htmlFor="system">Complete System Design</label>
                        <input type="checkbox"
                            name="system"
                            id="system"
                            checked={checked.system}
                            onChange={handleChange}
                            disabled={checked.erd || checked.sequence || checked.low || checked.high}
                        />
                    </div>
                </div>

                <div className="user-req-input-container">
                    <textarea name="input-data"
                        id="input-data"
                        placeholder='write your system requirements in detail here...'
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}>
                    </textarea>
                    <div className="btn-operation">
                        <button type='reset' onClick={() => setInputText('')}><IoReloadSharp /></button>
                        <button type='submit'><IoPaperPlane /></button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UserInput;
