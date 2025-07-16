import React, { useEffect, useState } from 'react';
import "./DisplayFunctionalRequirements.scss";
import { IoReload, IoChevronForwardSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
const DisplayFuntionalReq = () => {
    const [functionalRequirements, setFunctionalRequirements] = useState([]);
    const [nonFunctionalRequirements, setNonFunctionalRequirements] = useState([]);

    const navigate = useNavigate();
    const navigateHome = () => {
        navigate('/');
    }
    useEffect(() => {
        fetch("http://localhost:5000/api/latest-response")
            .then(res => res.json())
            .then(data => {
                const { functional, nonFunctional } = extractRequirements(data);
                setFunctionalRequirements(functional);
                setNonFunctionalRequirements(nonFunctional);
            })
            .catch(err => {
                console.error("Error fetching response:", err);
            });
    }, []);

    const extractRequirements = (obj) => {
        let functional = [];
        let nonFunctional = [];

        const search = (item) => {
            if (typeof item !== 'object' || item === null) return;

            if (Array.isArray(item)) {
                item.forEach(search);
            } else {
                for (let key in item) {
                    const lowerKey = key.toLowerCase();
                    if (lowerKey === 'functional_requirements') {
                        functional = item[key];
                    } else if (lowerKey === 'non_functional_requirements') {
                        nonFunctional = item[key];
                    } else {
                        search(item[key]);
                    }
                }
            }
        };

        search(obj);
        return { functional, nonFunctional };
    };

    return (
        <>

            <div style={{ padding: "20px" }}>

                <div className="requirements-container">
                    <div className="requirements-column">
                        <h2>Functional Requirements</h2>
                        {functionalRequirements.length > 0 ? (
                            functionalRequirements.map((req, index) => {
                                const key = Object.keys(req)[0];
                                return (
                                    <div key={index} className='requirement'>
                                        <strong>{key}</strong>: {req[key]}
                                    </div>
                                );
                            })
                        ) : (
                            <p>No Functional Requirements found.</p>
                        )}
                    </div>

                    <div className="requirements-column">
                        <h2 style={{ marginTop: '30px' }}>Non-Functional Requirements</h2>
                        {nonFunctionalRequirements.length > 0 ? (
                            nonFunctionalRequirements.map((req, index) => {
                                const key = Object.keys(req)[0];
                                return (
                                    <div key={index} className='requirement'>
                                        <strong>{key}</strong>: {req[key]}
                                    </div>
                                );
                            })
                        ) : (
                            <p>No Non-Functional Requirements found.</p>
                        )}
                    </div>


                </div>
                <div className="buttons-operation-nex">

                    <button onClick={navigateHome}>Missing Requirements Try Again <span><IoReload /></span></button>
                    <button>Continue Next <span><IoChevronForwardSharp /></span></button>
                </div>
            </div>

        </>
    );
};

export default DisplayFuntionalReq;
