import {React, useState} from "react";
import "../src/styles/Typography.css";
import "../src/styles/Dashboard.css";

const ProfilePage = (user) => {

    user = {
        name: "John Doe",
        submitted: 3,
        value: "$5000",
        university: "University of Toronto",
        age: 20
    };

    return (
        <div className="col-auto col-sm-10 col-md-9 col-xl-10 py-4 px-5">
            <div className="row">
                <h3 className="p-0 body-text-md text-secondary mb-4">Profile</h3>
                <h1 className="p-0 heading-display-md">{user.name}, {user.age} ({user.university})</h1>
            </div>
        </div>
    )
}

export default ProfilePage;