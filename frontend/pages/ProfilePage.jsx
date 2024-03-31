import {React, useState} from "react";
import "../src/styles/Typography.css";
import "../src/styles/Dashboard.css";


const ProfilePage = () => {
    const user = {
        "_id": {"$oid": "6607696977096d1969218881"},
        "name": "Nick Wu",
        "email": "nrw9167@stern.nyu.edu",
        "age": 21,
        "university": "NYU",
        "essays": [{"$oid": "66076a7d77096d1969218883"}, {"$oid": "6607a11af9393d6bd1d69f11"}]
    };

    return ( 
        <div className="col-auto col-sm-10 col-md-9 col-xl-10 py-4 px-5">
            <div className="row">
                <h3 className="p-0 body-text-md text-secondary mb-4">Profile</h3>
                <h1 className="p-0 heading-display-md">{user.name}, {user.age} ({user.university})</h1>
            </div>
        </div>
    );
}

export default ProfilePage;