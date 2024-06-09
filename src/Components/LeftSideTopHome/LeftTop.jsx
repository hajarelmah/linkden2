import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProfileImg from "../../images/imagedeProfile.jpg";
import LeftBottom from "../LeftSideBottomHome/LeftBottom";
import axios from "axios";

const Left = () => {
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
    <>
      {user && (
        <div className="container sections p-0 ">
          <Link to="/EditProfile" className=" row mx-0 py-4 d-flex justify-content-center"
            style={{
              borderTopRightRadius: "9px",
              borderTopLeftRadius: "9px",
              // backgroundColor: "#5ABBF0",
              background: "linear-gradient(135deg, #00b5d1, #0073b1)", // Gradient background
            }}>
            <div className="col-7 " style={{ height: "90px", position: "absolute", width: "100px", left: "185px", top: "90px", }}>
              <img src={`http://localhost:8000/${user.pfp}`} alt="" className="h-100 w-100  rounded-circle" />
            </div>
          </Link>

          <div className="row mt-5 mx-0 p-2">
            <div className="col-12 fs-5 fw-bold text-center mt-3">{user.full_name}</div>
          </div>
          <div className="row  mx-0 p-2 mt-1">
            <div className="col-12 fs-6 text-center " style={{ color: "#5E5E5E" }}>
              {user.bio}
            </div>
          </div>
          <Link to="/Network" className="row button mx-0 p-2 mt-1 d-flex justify-content-center" style={{
            boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
          }}>
            <div className="row p-0 mt-2">
              <div className="col fs-6 fw-bold" style={{ color: "#5E5E5E" }}>Connections</div>
            </div>
            <div className="row p-0 ">
              <div className="col fw-bold fs-6 text-dark">Grow your Network</div>
            </div>
          </Link>
          <div className="row button mx-0  p-2 d-flex justify-content-center" style={{
            boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
          }}>
            <div className="row p-0 mt-2">
              <div className="col fs-6 fw-bold" style={{ color: "#5E5E5E" }}>Drive leads with Sales Nav</div>
            </div>
            <div className="row p-0 ">
              <div className="col fw-bold fs-6 text-dark">Try For Rs=0</div>
            </div>
          </div>
          <Link to="/MyItems" className="row button mx-0 p-2  d-flex justify-content-center" style={{
            boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
            borderBottomRightRadius: "9px",
            borderBottomLeftRadius: "9px",
          }}>
            <div className="row p-0 ">
              <div className="col fw-bold fs-6 text-dark">
                <i className="fa-solid fa-bookmark mx-2"></i> My items
              </div>
            </div>
          </Link>
        </div>
      )}

      <div>
        <LeftBottom />
      </div>
    </>
  );
};

export default Left;
