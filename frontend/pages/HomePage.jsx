import {React, useState, useEffect} from "react";
import "../src/styles/Typography.css";
import axios from 'axios';
import "../src/styles/Dashboard.css";
import ScholarshipCard from '../src/components/ScholarshipCard';
import ScholarshipModal from "../src/components/Modal";

const HomePage = () => {

    const user = {
        "_id": {"$oid": "6607696977096d1969218881"},
        "name": "Nicholas R. Wu",
        "email": "nrw9167@stern.nyu.edu",
        "essays": [{"$oid": "66076a7d77096d1969218883"}, {"$oid": "6607a11af9393d6bd1d69f11"}]
    };

    const isLoading = false;

    const [scholarships, setScholarships] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchScholarships = async () => {
            try {
                const response = await axios.post('http://localhost:3000/getAllScholarships', { userId: user._id.$oid });
                setScholarships(response.data);
            } catch (error) {
                console.error('Error fetching scholarships:', error);
            }
        };

        fetchScholarships();
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        <div className="col-auto col-sm-10 col-md-9 col-xl-10 py-4 px-5">
            <div className="row">
                <h3 className="p-0 body-text-md text-secondary mb-4">Dashboard</h3>
                <h1 className="p-0 heading-display-md">Hey there, {user.name}!</h1>
            </div>
            <div className="row justify-content-space-between my-4">
                <div style={{backgroundImage: "url(../src/assets/banner.png)", backgroundSize: "cover", height: "180px"}} className="container d-flex px-5 py-3 d-flex justify-content-between align-items-flex-end align-self-stretch rounded-3">
                    <div className="p-2 d-flex align-items-flex-end align-self-stretch align-items-end">
                        <div className="flex-direction-column me-5 justify-content-center align-items-flex-start">
                            <h3 className="heading-display-md text-white">3</h3>
                            <p className="body-text-lg text-white">Apps</p>
                        </div>
                        <div className="flex-direction-column justify-content-center align-items-flex-start">
                            <h3 className="heading-display-md text-white">5000</h3>
                            <p className="body-text-lg text-secondary text-white">In value</p>
                        </div>
                    </div>
                    <div className='d-flex justify-content-center align-items-end'>
                        <a href="#" className="text-black text-decoration-none d-flex p-4">
                            <h3 className="mb-0 me-2 heading-display-sm d-md-inline">Find More Scholarships</h3> <i className="fs-5 bi bi-arrow-right text-black"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div className="row justify-content-between">
                <div className="d-flex mt-4 justify-content-between align-items-center align-self-stretch">
                    <h2 className="mb-0 me-2 heading-heading-lg d-md-inline text-md-start">Active applications</h2>
                    <a href="#" className="text-decoration-none">
                        <h3 className="mb-0 me-2 body-text-lg d-md-inline text-md-start text-secondary"><strong>See all applications</strong></h3>
                    </a>
                </div>
            </div>
            <hr className="text-secondary d-sm-block" />
            <div className="container-fluid p-0">
                <div style={{overflowX: "auto"}} className="d-flex flex-row flex-nowrap">
                    {scholarships.map((scholarship) => (
                        <ScholarshipCard key={scholarship._id} scholarshipData={scholarship} />
                    ))}
                </div>
            </div>
            <button onClick={openModal}>Open Scholarship Modal</button>
            {isModalOpen && <ScholarshipModal closeModal={closeModal} />}
        </div>
    )
}

export default HomePage;