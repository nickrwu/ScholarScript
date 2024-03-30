import ProfilePage from "../pages/ProfilePage";
import Sidebar from "../src/components/Sidebar";

const Profile = () => {
    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <Sidebar />
                <ProfilePage />
            </div>
        </div>
    );
  }

export default Profile;