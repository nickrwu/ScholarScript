import logoSVG from '../assets/logo.svg';
import '../styles/Sidebar.css';
import '../styles/Typography.css';

const Sidebar = () => {
  return (
    <div className="col-auto col-sm-2 col-md-3 col-xl-2 px-sm-2 px-0 min-vh-100 d-flex justify-content-between flex-column">
      <div className="py-4 px-2">
        <a href="/" className="text-decoration-none text-dark d-none d-md-inline d-flex align-itemcenter p-3">
          <img src={logoSVG} alt="ScholarScript" className="mt-2 ms-1 fs-4 d-none d-sm-inline"/>
        </a>
        <hr className="text-secondary d-none d-md-block" />
        <ul className="nav nav-pills flex-column mt-3 mt-sm-0">
          <li className="nav-item text-dark fs-4 my-1 py-2 py-sm-0">
            <a href="/" className="nav-link text-dark fs-5" aria-current="page">
              <i className="bi bi-house-door-fill"></i>
              <span className="body-text-lg-semibold ms-3 d-none d-md-inline">Home</span>
            </a>    
          </li>
          <li className="nav-item text-dark fs-4 my-1 py-2 py-sm-0">
            <a href="#" className="nav-link text-dark fs-5" aria-current="page">
              <i className="bi bi-search"></i>
              <span className="body-text-lg-semibold ms-3 d-none d-md-inline">Scholarships</span>
            </a>    
          </li>
        </ul>
      </div>
      <div className="profile">
        <a href="/profile" className="text-decoration-none text-dark fs-2 p-4" type="button" id="triggerId" aria-expanded="false">
          <i className="bi bi-person-circle"></i>
          <span className="body-text-lg-semibold ms-3 d-none d-md-inline text-md-start">Profile</span>
        </a>
      </div>
    </div>
  );
}

export default Sidebar;