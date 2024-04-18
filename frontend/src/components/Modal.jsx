import { useState, useEffect, setStatus } from 'react';
import { Modal, Tab, Tabs } from 'react-bootstrap';
import EssaySelect from './EssaySelect';
import axios from 'axios';
import starSVG from '../assets/Stars.svg';
import "../styles/Dashboard.css";
import "../styles/Buttons.css";
import "../styles/Typography.css";

const ScholarshipModal = (scholarshipData, isOpen, closeModal) => {
    const user = {
        "_id": {"$oid": "6607696977096d1969218881"},
        "name": "Nick Wu",
        "email": "nrw9167@stern.nyu.edu",
        "essays": [{"$oid": "66076a7d77096d1969218883"}, {"$oid": "6607a11af9393d6bd1d69f11"}]
    };

    const [activeTab, setActiveTab] = useState('overview');
    const [showModal, setShowModal] = useState(true);
    const [status, setStatus] = useState("");
    const [essays, setEssays] = useState([]);
    const [formInputs, setFormInputs] = useState({
        title: '',
        promptTemplate: '',
        promptInput: '',
        essay: '',
        category: []
    });
    
    scholarshipData = scholarshipData.scholarshipData;

    const fetchEssays = async (uid) => {
        try {
            let result = await axios.post(
                'http://localhost:3000/getEssays', { userId: uid });
            setEssays(result.data);
        } catch (error) {
            console.error('Error fetching scholarships:', error.response.data);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormInputs(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    let newCategory = '';
    const handleTagInputChange = (e) => {
        newCategory = e.target.value.trim();
    };

    const handleRemoveTag = (index) => {
        setFormInputs(prevState => {
            const updatedTags = [...prevState.category];
            updatedTags.splice(index, 1);
            return {
                ...prevState,
                category: updatedTags
            };
        });
    };

    const handleEssaySubmit = async (e) => {
        e?.preventDefault();
        console.log("Form Inputs:", formInputs);
        if (formInputs.title !== '' && formInputs.essay !== '') {
            try {
                const response = await axios.post('http://localhost:3000/uploadEssay', 
                { 
                    title: formInputs.title, 
                    text: formInputs.essay, 
                    userId: user._id.$oid, 
                    category: formInputs.category
                });

                // Reset form inputs
                setFormInputs({
                    title: '',
                    promptTemplate: '',
                    promptInput: '',
                    essay: '',
                    category: []
                });

                handleTabChange('essay');
            } catch (error) {
                console.error('Error uploading essay:', error.response.data);
            }
        } else {
            return;
        }
    };

    const handleAddTag = async (newCategory) => {
        if (formInputs.category.length >= 3) {
            return;
        } else if(newCategory !== '') {
            setFormInputs(prevState => ({
                ...prevState,
                category: [...prevState.category, newCategory]
            }));
        } else {
            return;
        }
    };

    useEffect(() => {
        fetchEssays(user._id.$oid);
    }, [user._id.$oid]);
    
    const handleTabChange = async (tab) => {
        setActiveTab(tab);
        if (tab === 'essay') {
            const fetchEssays = async (uid) => {
                try {
                    let result = await axios.post(
                        'http://localhost:3000/getEssays', { userId: uid });
                    setEssays(result.data);
                } catch (error) {
                    console.error('Error fetching scholarships:', error.response.data);
                }
            };
    
            fetchEssays(user._id.$oid);
        }
    };

    const handleCloseModal = () => {
        console.log("Modal closed");
        setShowModal(false);
        closeModal(false);
    };

    if (!isOpen) {
        return null;
    }

    useEffect(() => {
        setStatus(scholarshipData.applicationStatus);
    }, [scholarshipData.applicationStatus]);

    // Check if the status field is present in scholarshipData

    let statusColor = "";
    let statusText ="";
    if (status === -1) {
        statusColor = "#F85E2E";
        statusText = "Not Started";
    } else if (status === 0) {
        statusColor = "#FF9E0C";
        statusText = "In Progress";
    } else if (status === 1) {
        statusColor = "#37D210";
        statusText = "Completed";
    }

    let modalBody;

    if (activeTab === 'overview') {
        modalBody = (
            <div>
                <div className="container-fluid px-4 py-2">
                    <a href={scholarshipData.url} className='d-flex text-decoration-none text-black'>
                        <h2 className="heading-display-md me-2 mb-4">{scholarshipData.name}</h2><i className="fs-5 bi bi-box-arrow-up-right"></i>
                    </a>
                    <div className="d-inline-block bg-white px-4 py-2 rounded-2">
                        <div className="p-2 d-flex align-items-flex-end align-self-stretch align-items-end">
                            <div className="flex-direction-column me-5 justify-content-center align-items-flex-start">
                                <h3 className="heading-display-md">{scholarshipData.amount}</h3>
                                <p className="body-text-lg text-secondary">Award</p>
                            </div>
                            <div className="flex-direction-column me-5 justify-content-center align-items-flex-start">
                                <h3 className="heading-display-md">{scholarshipData.winners}</h3>
                                <p className="body-text-lg text-secondary">Winners</p>
                            </div>
                            <div className="flex-direction-column me-5 justify-content-center align-items-flex-start">
                                <h3 className="heading-display-md">{scholarshipData.deadline}</h3>
                                <p className="body-text-lg text-secondary">Deadline</p>
                            </div>
                        </div>
                    </div>
                    <div style={{gap: "96px"}}className="row my-3">
                        <div className="col-7">
                            <div className="row my-3">
                                <div className="d-flex justify-content-between">
                                    <div className="d-flex ">
                                        <div style={{borderLeft: `4px solid ${statusColor}`}} className="indicator"/>
                                            <div className='flex-row'>
                                                <div className="row"><span className="heading-title-sm text-secondary">ESSAY STATUS</span></div>
                                                <div className="row"><span className="heading-heading-lg">{statusText}</span></div>
                                            </div>
                                        </div>
                                        <button style={{background: "var(--primary-blue, #4D62CE)"}} className="btn btn-primary body-text-md-semibold" onClick={() => handleTabChange('essay')}>Start Writing</button>
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
                            <h3 className="heading-heading-lg">Application Requirements</h3>
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
            <div className='d-flex align-items-center justify-content-between'>
                <div style={{borderLeft:"5px", borderColor: "black", overflowY: "auto"}} className='col-7 mx-4'>
                    <h2 className='heading-display-sm'>Choose the essay(s) you want to use</h2>
                    <p className='body-text-lg text-secondary'>Select the stories that are relevant and we'll tailor the essay for you!</p>
                    {essays.map((essay) => (
                        <EssaySelect key={essay._id} essayData={essay} fetchEssays={fetchEssays} userId={user._id.$oid} />
                    ))}
                    <a className="text-decoration-none body-text-lg-semibold m-0 outline-button" onClick={() => handleTabChange('input')}>Add a new essay</a>
                </div>
                <div className='col-4 me-4'>
                    <h2 className='heading-display-sm'>Choose the essay(s) you want to use</h2>
                    <p className='body-text-lg text-secondary'></p>
                    <a className="text-decoration-none body-text-lg-semibold m-0 tailor-button" onClick={() => handleTabChange('model')}> <img src={starSVG} className='me-2' />Tailor my essay</a>
                </div>
            </div>
        );
    } else if (activeTab === 'input') {
        modalBody = (
            <form id="essayInput" onSubmit={handleEssaySubmit}>
                <div className='d-flex align-items-start justify-content-center'>
                    <div className='col-7 mx-4'>
                        <h2 className='heading-display-sm'>Insert an essay you want to use</h2>
                        <div className='body-text-lg text-secondary'>
                            <p className='heading-heading-md text-black mb-1'>Essay Title</p>
                            <input required name="title" className="form-control form-control-md body-text-lg" type="text" placeholder="Enter title here..." onChange={handleInputChange}></input>
                            <p className='heading-heading-md text-black mb-1'>Choose a prompt</p>
                            <p className='body-text-md text-secondary'>Recommended</p>
                            <select name="promptTemplate" defaultValue="select" className="form-select my-2 heading-heading-md" onChange={handleInputChange}>
                                <option value="select">Select</option>
                                <option value="prompt1">Prompt 1</option>
                                <option value="prompt2">Prompt 2</option>
                                <option value="prompt3">Prompt 3</option>
                            </select>
                            <p className='body-text-md text-secondary mb-2'>or</p>
                            <p className='heading-heading-md text-black mb-1'>Write your own</p>
                            <input name="promptInput" className="form-control form-control-md body-text-lg" type="text" placeholder="Type here..." onChange={handleInputChange}></input>
                        </div>
                        <textarea required name="essay" onChange={handleInputChange} style={{resize: "None", overflowY: "scroll"}} className="form-control my-3 body-text-lg" id="formControlTextarea" rows={12} placeholder="Paste or type your essay here..."></textarea>
                        <button type="submit" onClick={() => handleEssaySubmit()} className="text-decoration-none body-text-lg-semibold m-0 tailor-button align-items-center align-self-stretch">Save</button>
                    </div>
                    <div className='col-3 mx-2'>
                        <p className='heading-heading-md text-black mb-1'>Add up to 3 tags</p>
                        <input name="tagInput" className="form-control form-control-md body-text-lg mb-3" type="text" placeholder="Type here..." onChange={handleTagInputChange}></input>
                        <button type="button" onClick={() => handleAddTag(newCategory)} className="text-decoration-none body-text-lg-semibold m-0 tailor-button align-items-center align-self-stretch">Add Tag</button>
                        <div>
                            {formInputs.category.map((tag, index) => (
                                <div key={index} className="align-items-center">
                                    <span style={{color: "#4D62CE", border: "2px solid #4D62CE", backgroundColor: "transparent" }} className="mt-4 badge rounded-pill body-text-md-semibold me-1">
                                        {tag}
                                        <button type="button" className="btn-close ms-2" style={{btnCloseColor: "#4D62CE", fontSize:".75rem"}} aria-label="Close" onClick={() => handleRemoveTag(index)}></button>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </form>
        );
    } else if (activeTab === 'model') {
        modalBody = (
            <form id="essayInput" onSubmit={handleEssaySubmit}>
                <div className='d-flex align-items-end justify-content-center'>
                    <div className='col-7 mx-4'>
                        <div style={{backgroundColor: "white"}} className='row rounded-2 p-4'>
                            <h2 className='heading-heading-lg'>Title</h2>
                            <p className='body-text-lg text-black mb-1'>Paragraph here</p>
                        </div>
                    </div>
                    <div className='col-4 mx-4'>
                            <h2 className='heading-display-sm'>Insert an essay you want to use</h2>
                            <a className="text-decoration-none body-text-lg-semibold m-0 outline-button align-items-center" onClick={() => handleTabChange('input')}><i className="bi bi-clipboard text-black fs-4 me-2"></i>Copy Essay</a>
                            <button type="submit" style={{width:"80%"}} onClick={() => handleEssaySubmit()} className="text-decoration-none body-text-md-semibold m-0 tailor-button align-items-center align-self-stretch">Save</button>
                    </div>
                </div>
            </form>
        );
    }

    return (
        <Modal data-backdrop="static" centered className="scholarshipModal" show={showModal} onHide={() => handleCloseModal()}>
            <Modal.Header style={{borderBottomWidth:"0px"}}>
                <nav className="nav container-fluid justify-content-between">
                    <div style={{gap:"12px"}}className="d-flex">
                        <a className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`} aria-current="page" onClick={() => handleTabChange('overview')}>
                            <i className="bi bi-eye-fill me-2"></i><span className="text-black body-text-lg-semibold m-0">Overview</span>
                        </a>
                        <a className={`nav-link ${activeTab === 'essay' ? 'active' : ''}`} onClick={() => handleTabChange("essay")}>
                            <i className="bi bi-text-paragraph me-2"></i><span className="text-black body-text-lg-semibold m-0">Essay Writer</span>
                        </a>
                    </div>
                    <a className="text-decoration-none body-text-lg-semibold m-0 nav-close" onClick={() => handleCloseModal()}>Close</a>
                </nav>
            </Modal.Header>
            <Modal.Body>
                {modalBody}
            </Modal.Body>
        </Modal>
    );
};

export default ScholarshipModal;