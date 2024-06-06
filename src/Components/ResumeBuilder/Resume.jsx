import React, { useState } from "react";
import { Link } from "react-router-dom";

const ResumeUploadForm = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await fetch("http://localhost:8000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("File uploaded successfully!");
      } else {
        alert("Failed to upload file.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred while uploading the file.");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h4 className="mb-4">Select a resume</h4>
            <p className="fs-6 fw-normal">
              upload your resume or create a new one :
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="resumeFile" className="form-label">
                  Upload Resume:
                </label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".docx,.pdf"
                  className="form-control"
                  onChange={handleFileChange}
                />
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary">
                  Upload the CV
                </button>
                <Link to="/CreateCV" className="btn btn-outline-primary">
                  Create CV
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeUploadForm;
