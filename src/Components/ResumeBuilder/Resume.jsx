import React, { useState } from "react";
import { Link } from "react-router-dom";

const ResumeUploadForm = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // If file is selected, you can handle the file here
    // For example, you can upload the file to the server

    // Redirect to CreateCV page
    window.location.href = "/CreateCV";
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h4>Select a resume</h4>
        <p className="fs-6 fw-normal">
          Get insights for formatting issues, keywords, and more.
        </p>
      </div>
      <div>
        <label htmlFor="resumeFile" className="form-label">
          Upload Resume:
        </label>
        <input
          type="file"
          id="resumeFile"
          accept=".docx,.pdf"
          className="form-control"
          onChange={handleFileChange}
        />
      </div>
      <div>
        <button type="submit" className="btn btn-primary mt-3">
          Upload & Create CV
        </button>
      </div>
      <div>
        <Link to="/CreateCV" className="btn btn-primary mt-3">
          Create CV
        </Link>
      </div>
    </form>
  );
};

export default ResumeUploadForm;
