import HomePage from "../pages/HomePage";
import Sidebar from "../src/components/Sidebar";

const Root = () => {
    return (
        <div className="container-fluid position-relative">
            <div className="position-fixed col-12 col-sm-2 col-md-3 col-xl-2 p-0">
                <Sidebar />
            </div>
            <div className="position-static col-12 col-sm-10 col-md-9 col-xl-10">
                <HomePage />
            </div>
            {/* <div className="row flex-nowrap">
                <Sidebar />
                <HomePage />
            </div> */}
        </div>
    );
}

export default Root;