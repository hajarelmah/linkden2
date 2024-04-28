import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProfileImg from "../images/imagedeProfile.jpg";
import axios from "axios";

const Profile = () => {
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const id = sessionStorage.getItem('id');
        const response = await axios.get(`http://localhost:8000/api/getuserById/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []); // Pass an empty dependency array to run this effect only once after the initial render

  return (
    <div className="container-fluid d-flex justify-content-center">
      <div className="row d-flex flex-column" style={{ width: "260px" }}>
        {user && (
          <>
            <div className="col-12 d-flex p-0 gap-2">
              <div className="w-25 p-1">
                <img
                  src={ProfileImg}
                  alt=""
                  className="h-50 w-100 rounded-circle"
                />
              </div>
              <div className="w-75 text-start fs-6">
                <div className="fw-bold">{user.user_name}</div>
                {user.bio}
              </div>
            </div>
            <Link to="/EditProfile"
              className="col-11 text-primary border border-primary mt-2 text-center fs-5 mx-3"
              style={{ borderRadius: "20px" }}
            >
              View Profile
            </Link>
            <hr className="dropdown-divider"></hr>
          </>
        )}
        <div className="col-12 ">
          <div className="fw-bold fs-6">Account</div>
          <div className="mt-1 fs-6" style={{cursor:"pointer"}}></div>
          <Link to="/EditProfile" className="mt-1 fs-6" style={{cursor:"pointer"}}>Setting my Privacy </Link><br></br>
          <Link to="/EditProfile"  className="mt-1 fs-6" style={{cursor:"pointer"}}>Help </Link><br></br>
          <Link to="/EditProfile"  className="mt-1 fs-6" style={{cursor:"pointer"}}>Language </Link>
        </div>
        <hr className="dropdown-divider"></hr>
        <div className="col-12">
          <div className="fw-bold fs-6">Manage</div>
          <div className=" fs-6"style={{cursor:"pointer"}}>Posts & Activity</div>
          <div className="mt-1 fs-6"style={{cursor:"pointer"}}>Job Posting Account</div>
        </div>
        <hr className="dropdown-divider"></hr>
        <Link to="/" className=" fs-6 text-dark"style={{cursor:"pointer"}}>Sign Out</Link>
      </div>
    </div>
  );
};

export default Profile;
