import React from 'react';
import { Link } from 'react-router-dom';
// import './PeopleAlsoViewed.css'; // Assuming you have a CSS file for styling

const PeopleAlsoViewed = () => {
  return (
    <div className="sections mt-2 p-3 fs-5 fw-bold">
      <div className="col text-center fs-6" style={{ color: "gray" }}>
        Create a CV or add more details about you by clicking below
      </div>
      
      <div className="row mt-1 d-flex justify-content-center mt-2 mb-3">
        <Link to="/UpdateProfile" className="col-4 text-center p-1 px-3 fs-6 fw-bold" style={{ border: "1px solid #0096FF", color: "#0096FF", borderRadius: "30px", cursor: "pointer", textDecoration: "none" }}>
          Update your profile
        </Link>
        <Link to="/CreateCV" className="col-4 text-center p-1 px-3 fs-6 fw-bold" style={{ border: "1px solid #0096FF", color: "#0096FF", borderRadius: "30px", cursor: "pointer", textDecoration: "none" }}>
          Create a new CV
        </Link>
      </div>
      <div className="col text-center fs-6" style={{ color: "gray" }}>
        Check our guide to help prepare for your interview
      </div>
      <div className="row mt-1 d-flex justify-content-center mt-2 mb-3">
        <Link to="/Interview" className="col-4 text-center p-1 px-3 fs-6 fw-bold" style={{ border: "1px solid #0096FF", color: "#0096FF", borderRadius: "30px", cursor: "pointer", textDecoration: "none" }}>
          Prepare for interview
        </Link>
      </div>
    </div>
  );
}

export default PeopleAlsoViewed;
