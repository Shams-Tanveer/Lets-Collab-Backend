import React from 'react';
import homeImage from "../Images/homeImage.jpg";
import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (
        <div  style={{height: "90vh"}} >
            <div  className="hero d-flex align-items-center">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 ps-5 pt-5" style={{textAlign: "justify"}}>
                            <h1 className='display-4'>Welcome to Lets Collab</h1>
                            <p className='w-50'>Welcome to Let's collab.
                            It’s a project management website with advanced features aiming to make your life easier. You can stay on track with every project even  when your track changes. Easily customize your tasks and projects as per yoir preference. You dont need to look into tiresome spreadsheets all day long. We got it covered for u. Update your progress much more efficiently. Lets collab promotes work smart, not hard.  so are you prepared to lessen your work load and collab conveniently? </p>
                            <Link className="btn btn-primary" to="/login">Get Started</Link>
                        </div>
                        <div className="col-lg-4 ps-sm-3" style={{marginTop:"20px"}}>
                            <img className="" src={homeImage} alt="Null" />
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}
