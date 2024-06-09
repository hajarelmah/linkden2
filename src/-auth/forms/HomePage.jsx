import React from 'react';
import { useNavigate } from 'react-router-dom';
import JobNestLogo1 from '../../images/jobnest.jpg'; // Mettez à jour le chemin de votre logo
import HomePagePic from '../../images/HomePage.jpg'; // Mettez à jour le chemin de votre illustration
import './HomePage.css'; // Importez le fichier CSS

const HomePage = () => {
  const navigate = useNavigate();

  const handleJoinNow = () => {
    navigate('/sign-up');
  };

  const handleSignIn = () => {
    navigate('/signin');
  };

  return (
    <div className="container-fluid bg-white  align-items-stretch" style={{ height: "99vh" }}>
      <div className="row p-3 ">
        <div className="col-md-6">
          <img src={JobNestLogo1} alt="JobNest Logo" className="img-fluid logo" />
        </div>
        <div className="col-md-6 d-flex justify-content-end align-items-center">
          <button onClick={handleJoinNow} className="btn btn-outline-primary custom-btn me-2">
            Sign up
          </button>
          <button onClick={handleSignIn} className="btn btn-outline-primary custom-btn">
            Sign in
          </button>
        </div>
      </div>
      <div className="row flex-grow-1 ">
        <div className="col-md-5 d-flex flex-column justify-center-center   h-100">
          <h2 className="fw-bold text-primary fs-2  mt-5 align-items-center">Welcome to JobNest</h2>
          <p className="fs-5 darker-black  ">
            Join us today and let JobNest help you achieve your professional ambitions, whether you are a job seeker or a recruiter.
          </p>
        </div>
        <div className="col-md-7 d-flex  height: 70%">
          <img src={HomePagePic} alt="Job search illustration" className="img-fluid" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
