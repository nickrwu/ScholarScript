import { useAuth0 } from "@auth0/auth0-react";
import starSVG from '../assets/Stars.svg'; 

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    if (!isAuthenticated) {
        return (
            <div className="center-button">
            <button className="login-button"
            onClick={() => loginWithRedirect()}>
            <img src={starSVG} style={{color:"#white", marginRight: "15px"}} alt="Star"/> Tailor my essay</button>
            </div>
        );
    }
};
 
export default LoginButton;