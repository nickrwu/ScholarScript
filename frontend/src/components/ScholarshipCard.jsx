import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";

const ScholarshipCard = (scholarshipData) => {
    const [status, setStatus] = useState("");

    scholarshipData = {
        name: "Scholarship Name",
        amount: "$1000",
        status: "red"
    }
    


    useEffect(() => {
        // Make a call to the Node.js backend to get the status
        // Set the status based on the response
        // For example:
        // fetch("/api/getStatus")
        //     .then(response => response.json())
        //     .then(data => setStatus(data.status))
        setStatus("red"); // Replace with the actual logic to get the status
    }, []);

    return (
        <div className="container">
            <a href="#" className="text-decoration-none text-black">
                <div className="header-image rounded-3 position-relative mb-2">
                    {/* <img className="rounded" alt="scholarship"/> */}
                    <div style={{top: "12px", left: "12px", padding: "4px 12px"}} className="rounded-pill bg-white position-absolute d-flex align-items-end justify-content-center">
                        <p className="mb-0 body-text-sm-semibold me-1">24</p>
                        <p className="mb-0 body-text-sm text-secondary">days left</p>
                    </div>
                </div>
                <h3 className="body-text-lg-semibold mb-1">{scholarshipData.name}</h3>
                <p className="body-text-md mb-1">{scholarshipData.amount}</p>
                <div className="d-flex align-items-center">
                    <svg className="me-2" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 13" fill="none">
                        <circle cx="6" cy="6.5" r="6" fill={scholarshipData.status}/>
                    </svg>
                    <p className="body-text-sm text-secondary mb-0">Not Started</p>
                </div>
            </a>
        </div>
    )
}

export default ScholarshipCard;