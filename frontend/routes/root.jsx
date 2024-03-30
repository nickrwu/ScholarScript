import HomePage from "../pages/HomePage";
import Sidebar from "../src/components/Sidebar";

const Root = () => {
    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <Sidebar />
                <HomePage />
            </div>
        </div>
    );
  }

export default Root;