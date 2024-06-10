import React from 'react';
import ProfileImg from "../../images/imagedeProfile.jpg";
import img1 from "../../images/anapec.png";
import dreamjobImg from "../../images/dreamjob.png"; // Assuming this is the correct path for dreamjob.png
import { Link } from "react-router-dom";

const RightBottom = () => {
  return (
    <div id="Bottom" className="container-md container-fluid mt-lg-2 mt-3 w-100 p-3 sections">
      <div className="row p-1">
        <div className="col-1 fs-6 ms-auto text-center">
          Ad
        </div>
        <div className="col-1 fs-6 text-center">
          <i className="fa-solid fa-ellipsis"></i>
        </div>
      </div>
      <div className="row">
        <div className="col text-center fs-6" style={{ color: "gray" }}>
          Opportunities are knocking on your door
        </div>
      </div>
      <div className="row mt-3 d-flex justify-content-center gap-3">
        <div className="col-3 w-25 h-50">
          {/* <img
            src={ProfileImg}
            alt="Profile"
            className="w-100 h-100 col-3 rounded-circle"
            style={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}
          /> */}
        </div>
        <div className="col-3 w-25 h-25">
          <img src={img1} alt="Anapec" className="w-100 h-100" />
        </div>
        <div className="col-3 w-25 h-25">
          <img src={dreamjobImg} alt="Dreamjob" className="w-100 h-100" />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col text-center p-2 fs-6" style={{ color: "gray" }}>
          <a href="http://anapec.org/sigec-app-rv/" style={{ color: "black" }}>http://anapec.org/sigec-app-rv/</a> check for more infos
        </div>
      </div>
      <div className="row mt-3">
        <div className="col text-center p-2 fs-6" style={{ color: "gray" }}>
         <a href="https://www.dreamjob.ma/alwadifa/" style={{ color: "black" }}>https://www.dreamjob.ma/alwadifa/</a> check for more infos
        </div>
      </div>
    </div>
  );
};

export default RightBottom;
