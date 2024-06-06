import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const EditTopLeft = () => {
  const [user, setUser] = useState(null);
  const fileInputRef = useRef(null);

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

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUser((prevState) => ({
        ...prevState,
        pfp: reader.result,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleProfilePictureClick = () => {
    fileInputRef.current.click();
  };

  const handleModifyProfileClick = () => {
    const formData = new FormData();
    formData.append("pfp", user.pfp);

    fetch("http://localhost:8000/api/modify", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    user && (
      <div className="container-md container-fluid sections pb-3">
        <div className="row p-3 rounded-3" style={{ height: "160px", border: "2px solid #E8E8E8" }}>
          <div
            className="col-7 p-1 rounded-circle"
            style={{
              height: "200px",
              position: "absolute",
              width: "200px",
              left: "100px",
              top: "130px",
            }}
          >
            <img
              src={`http://localhost:8000/${user.pfp}`}
              alt="Profile"
              className="h-100 w-100 rounded-circle"
            />
          </div>
          <div
            className="ms-auto h-25 rounded-circle d-flex justify-content-center align-items-center"
            style={{ width: "35px", backgroundColor: "#fff", cursor: "pointer" }}
            onClick={handleProfilePictureClick}
          >
            <i className="fa-solid fa-pen fs-4 rounded-circle"></i>
            <input
              ref={fileInputRef}
              id="pfp"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleProfilePictureChange}
            />
          </div>
        </div>
        <div className="row mt-5 pt-5">
          <div className="col p-2 fw-bold fs-4">
            {user.full_name}
            <p className="fs-6 fw-normal">{user.bio}</p>
          </div>
        </div>
        <div className="row mt-2 p-1 d-flex flex-wrap gap-md-3">
          <div className="col-md-2 col-12 fs-5 fw-bold p-1 text-center cursor text-white bg-primary rounded-pill" onClick={handleProfilePictureClick}>
            Profile Picture
          </div>
          <div className="col-md-5 col-xxl-3 col-8 fs-5 fw-bold mt-md-0 mt-1 p-1 cursor text-center text-primary rounded-pill" style={{ border: "2px solid #0D6EFD" }}>
            <Link to="/updateProfile" style={{ textDecoration: "none", color: "inherit" }} onClick={handleModifyProfileClick}>
              Modify Profile
            </Link>
          </div>
          <div
            className="col-md-2 col-3 fs-5 fw-bold mt-md-0 mt-1 mx-md-0 mx-2 p-1 cursor text-center rounded-pill"
            style={{ border: "2px solid #3B3B3B", color: "#99985E" }}
          >
            More
          </div>
        </div>
        <div className="row mt-3 p-1">
          <div
            className="col-md-9 col-12 p-2 px-3"
            style={{ backgroundColor: "#DDE7F1", borderRadius: "10px" }}
          >
            <div className="d-flex justify-content-between">
              <div className="fw-bold fs-6">Open to Work</div>
            </div>
            <div className="fs-6"></div>
            <div className="fs-6 fw-bold text-primary">Show details</div>
          </div>
        </div>
      </div>
    )
  );
};

export default EditTopLeft;
