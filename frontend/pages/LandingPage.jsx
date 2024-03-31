import logoSVG from '../src/assets/logo.svg';
import illustration from '../src/assets/illustration.svg';
import LoginButton from '../src/components/LoginButton';
import '../src/styles/Typography.css';
import '../src/styles/Buttons.css';

const LandingPage = () => {
    return (
        <div className='container-fluid vh-100 m-0 p-0'>
                <img src={illustration} alt="illustration" style={{width:"60%", bottom: "0", right: "0"}} className="position-absolute"/>
                <div style={{height:"10%"}} className='d-flex justify-content-center vw-100'>
                    <a href="/" className="text-decoration-none text-dark d-flex align-itemcenter p-3">
                        <img src={logoSVG} style={{color:"#272A39"}} alt="ScholarScript" className="mt-2 ms-1 fs-4"/>
                    </a>
                </div>
                <div style={{height:"80%"}} className="row justify-content align-items-center m-0">
                    <div style={{marginLeft:"15%"}}className="col-4">
                        <h1 className="heading-display mb-4">Tailor your scholarship with one click.</h1>
                        <LoginButton />
                        <ul style={{listStyleType: "none"}} className='my-5 p-0'>
                            <li className='mb-3 heading-heading-md'>
                            <i style={{color:"#272A39"}} className="bi bi-check-circle-fill me-2 fs-4"></i>
                                Find scholarships that match your background
                            </li>
                            <li className='mb-3 heading-heading-md'>
                            <i style={{color:"#272A39"}} className="bi bi-check-circle-fill me-2 fs-4"></i>
                                Use AI for rewriting essays to match requirements
                            </li>
                            <li className='mb-3 heading-heading-md'>
                            <i style={{color:"#272A39"}} className="bi bi-check-circle-fill me-2 fs-4"></i>
                                Track your applications and manage deadlines
                            </li>
                        </ul>
                    </div>
                </div>
        </div>
    )
}

export default LandingPage;