import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";

const ScholarshipCard = (scholarshipData) => {
    const [status, setStatus] = useState("");
    scholarshipData = scholarshipData.scholarshipData;
    
    useEffect(() => {
        // Make a call to the Node.js backend to get the status
        // Set the status based on the response
        // For example:
        // fetch("/api/getStatus")
        //     .then(response => response.json())
        //     .then(data => setStatus(data.status))
        setStatus("red"); // Replace with the actual logic to get the status
    }, []);

    // Check if the status field is present in scholarshipData

    console.log(scholarshipData)

    let circleColor = "";
    if (status === "-1" || status === "") {
        circleColor = "red";
    } else if (status === "0") {
        circleColor = "yellow";
    } else if (status === "1") {
        circleColor = "green";
    }

    return (
        <div className="container">
            <a href="#" className="text-decoration-none text-black">
                <div className="header-image rounded-3 position-relative mb-2">
                    {/* <img className="rounded" alt="scholarship"/> */}
                    <div style={{top: "12px", left: "12px", padding: "4px 12px"}} className="rounded-pill bg-white position-absolute d-flex align-items-end justify-content-center">
                        <p className="mb-0 body-text-sm-semibold me-1">{scholarshipData.deadline}</p>
                    </div>
                </div>
                <h3 className="body-text-lg-semibold mb-1">{scholarshipData.name}</h3>
                <p className="body-text-md mb-1">{scholarshipData.amount}</p>
                <div className="d-flex align-items-center">
                    <svg className="me-2" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 13" fill="none">
                        <circle cx="6" cy="6.5" r="6" fill={circleColor}/>
                    </svg>
                    <p className="body-text-sm text-secondary mb-0">Not Started</p>
                </div>
            </a>
        </div>
    )
}

export default ScholarshipCard;