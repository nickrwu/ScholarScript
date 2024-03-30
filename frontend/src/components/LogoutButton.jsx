import { useAuth0 } from "@auth0/auth0-react";
import "../styles/Buttons.css";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return (
        <>
            <button
                className="d-none d-md-inline px-4 logout-button mx-2"
                onClick={() => logout({ returnTo: window.location.origin })}
            >
                <i className="bi bi-box-arrow-right me-2" /><span>Log Out</span>
            </button>
            <a
                className="d-md-none text-decoration-none text-dark fs-2 px-4 py-2"
                onClick={() => logout({ returnTo: window.location.origin })}
            >
                <i className="bi bi-box-arrow-right" />
            </a>
        </>
    );
  }
};

export default LogoutButton;