import { useState, useEffect } from "react";
import "../styles/Dashboard.css";
import ScholarshipModal from "./Modal";

const ScholarshipCard = (scholarshipData, userId) => {
    const [status, setStatus] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    scholarshipData = scholarshipData.scholarshipData;

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        setStatus(scholarshipData.applicationStatus);
    }, [scholarshipData.applicationStatus]);

    // Check if the status field is present in scholarshipData
    let circleColor = "";
    let statusText ="";
    if (status === -1) {
        circleColor = "#F85E2E";
        statusText = "Not Started"
    } else if (status === 0) {
        circleColor = "#FF9E0C";
        statusText = "In Progress"
    } else if (status === 1) {
        circleColor = "#37D210";
        statusText = "Completed"
    }

    return (
        <div className="container card-link ">
            <a onClick={openModal} className=" text-decoration-none text-black">
                <div style={{backgroundImage: `url(../src/assets/scholarshipImages/${scholarshipData._id}.png)`}} className="header-image rounded-3 position-relative mb-2">
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
                    <p className="body-text-sm text-secondary mb-0">{statusText}</p>
                </div>
            </a>
            {isModalOpen && <ScholarshipModal isOpen={isModalOpen} closeModal={() => setIsModalOpen()} scholarshipData={scholarshipData} />}

        </div>
    )
}

export default ScholarshipCard;