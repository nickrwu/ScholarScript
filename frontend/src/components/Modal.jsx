import React, { useState } from 'react';
import { Modal, Tab, Tabs } from 'react-bootstrap';
import "../styles/Dashboard.css";
import "../styles/Buttons.css";
import "../styles/Typography.css";

const ScholarshipModal = (scholarshipData, essays) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [showModal, setShowModal] = useState(true);
    
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    let modalBody;

    if (activeTab === 'overview') {
        modalBody = (
            <div>
                <div className="container-fluid px-4 py-2">
                    <a href={scholarshipData.url} className='d-flex text-decoration-none text-black'>
                        <h2 className="heading-display-md me-2 mb-4">New York Ramblers Scholarship</h2><i className="fs-5 bi bi-box-arrow-up-right"></i>
                    </a>
                    <div className="col-6 bg-white px-4 py-2 rounded-2">
                        <div className="p-2 d-flex align-items-flex-end align-self-stretch align-items-end">
                            <div className="flex-direction-column me-5 justify-content-center align-items-flex-start">
                                <h3 className="heading-display-md">$2500</h3>
                                <p className="body-text-lg text-secondary">Award</p>
                            </div>
                            <div className="flex-direction-column me-5 justify-content-center align-items-flex-start">
                                <h3 className="heading-display-md">2</h3>
                                <p className="body-text-lg text-secondary">Winners</p>
                            </div>
                            <div className="flex-direction-column me-5 justify-content-center align-items-flex-start">
                                <h3 className="heading-display-md">Jan 1 - May 1</h3>
                                <p className="body-text-lg text-secondary">Deadline</p>
                            </div>
                        </div>
                    </div>
                    <div style={{gap: "96px"}}className="row my-3">
                        <div className="col-7">
                            <div className="row my-3">
                                <div className="d-flex justify-content-between">
                                    <div className="d-flex ">
                                        <div className="orange"/>
                                            <div className='flex-row'>
                                                <div className="row"><span className="heading-title-sm text-secondary">ESSAY STATUS</span></div>
                                                <div className="row"><span className="heading-heading-lg">Not Started</span></div>
                                            </div>
                                        </div>
                                        <button style={{background: "var(--primary-blue, #4D62CE)"}} className="btn btn-primary" onClick={() => handleTabChange('essay')}>Start Writing</button>
                                    </div>
                                </div>
                            <div className="row my-3">
                                <h3 className="heading-heading-md">Eligibility & Criteria</h3>
                                <ul className="body-text-md ms-4">
                                    <li>Must be a high school senior</li>
                                    <li>Must be a resident of New York</li>
                                </ul>
                            </div>
                            <div className="row my-3">
                                <h3 className="heading-heading-md">Ideal Candidate</h3>
                                    <ul className="body-text-md ms-4">
                                        <li>Must be a high school senior</li>
                                        <li>Must be a resident of New York</li>
                                    </ul>
                            </div>
                        </div>
                        <div className="col-3 m-0">
                            <h3 className="heading-heading-md">Application Requirements</h3>
                            <ul style={{listStyleType: "none"}} className='my-1 p-0 body-text-lg'>
                            <li className='mb-1 heading-heading-md'>
                            <i className="bi bi-arrow-return-right me-2 fs-4"></i>
                                Completed application form
                            </li>
                            <li className='mb-1 heading-heading-md'>
                            <i className="bi bi-arrow-return-right me-2 fs-4"></i>
                                Five (5) brief essays
                            </li>
                            <li className='mb-1 heading-heading-md'>
                            <i className="bi bi-arrow-return-right me-2 fs-4"></i>
                                Two (2) letters of recommendation
                            </li>
                            <li className='mb-1 heading-heading-md'>
                            <i className="bi bi-arrow-return-right me-2 fs-4"></i>
                                List of relevant honors and extracurricular activities
                            </li>
                            <li className='mb-1 heading-heading-md'>
                            <i className="bi bi-arrow-return-right me-2 fs-4"></i>
                                Copy of transcripts
                            </li>
                        </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else if (activeTab === 'essay') {
        modalBody = (
            <div className='d-flex align-items-center justify-content-center'>
                <div style={{borderLeft:"5px", borderColor: "black", height:"500px"}} className='col-8'>
                    <h2 className='heading-display-sm'>Choose the essay(s) you want to use</h2>
                    <p className='body-text-lg text-secondary'>Select the stories that are relevant and we'll tailor the essay for you!</p>
                    <a className="text-decoration-none text-black body-text-lg-semibold m-0" onClick={() => handleTabChange('input')}>Add a new essay</a>
                </div>
                <div className='col-4'>
                    <h2 className='heading-display-sm'>Choose the essay(s) you want to use</h2>
                    <p className='body-text-lg text-secondary'></p>
                </div>
                
            </div>
        );
    } else if (activeTab === 'input') {
        modalBody = (
            <div className='d-flex align-items-center justify-content-center'>
                <div style={{borderLeft:"5px", borderColor: "black", height:"500px"}} className='col'>
                    <h2 className='heading-display-sm'>Insert an essay you want to use</h2>
                    <p className='body-text-lg text-secondary'>Select the stories that are relevant and we'll tailor the essay for you!</p>
                    <textarea className="form-control" rows={10} placeholder="Enter your paragraph here"></textarea>

                    <a className="text-decoration-none text-black body-text-lg-semibold m-0" onClick={() => handleTabChange('input')}>Submit your essay</a>
                </div>
                
            </div>
        );
    }

    return (
        <Modal className="scholarshipModal" show={showModal} onHide={handleCloseModal}>
            <Modal.Header style={{borderBottomWidth:"0px"}}>
                <nav className="nav container-fluid justify-content-between">
                    <div style={{gap:"12px"}}className="d-flex">
                        <a className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`} aria-current="page" onClick={() => handleTabChange('overview')}>
                            <i className="bi bi-eye-fill me-2"></i><span className="text-black body-text-lg-semibold m-0">Overview</span>
                        </a>
                        <a className={`nav-link ${activeTab === 'essay' ? 'active' : ''}`} onClick={() => handleTabChange('essay')}>
                            <i className="bi bi-text-paragraph me-2"></i><span className="text-black body-text-lg-semibold m-0">Essay Writer</span>
                        </a>
                    </div>
                    
                    <a className="text-decoration-none text-black body-text-lg-semibold m-0 nav-close" onClick={() => handleCloseModal()}>Close</a>
                </nav>
            </Modal.Header>
            <Modal.Body>
                {modalBody}
            </Modal.Body>
            <Modal.Footer>
                {/* Footer content */}
            </Modal.Footer>
        </Modal>
    );
};

export default ScholarshipModal;