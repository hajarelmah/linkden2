import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
//import "./CreateCV.css";

const CreateCV = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    profile: "",
    status: "",
    age: "",
    education: {
      schoolName: "",
      degree: "",
      fieldOfStudy: "",
      graduationYear: ""
    },
    centerOfInterest: "",
    languages: "",
    experience: {
      companyName: "",
      position: "",
      startDate: "",
      endDate: "",
      responsibilities: ""
    },
    skills: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "education" || name === "experience") {
      setFormData({
        ...formData,
        [name]: {
          ...formData[name],
          [e.target.dataset.field]: value
        }
      });
    } else if (name === "skills") {
      setFormData({
        ...formData,
        [name]: value.split(",").map(skill => skill.trim())
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, if needed
  };

  const handleDownloadPDF = () => {
    const input = document.getElementById("cv-content");
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "PNG", 0, 0);
        pdf.save("cv.pdf");
      });
  };

  return (
    <div className="container" id="cv-content">
      <div className="left-side">
        <h1 className="header">Générateur de CV</h1>
        <form onSubmit={handleSubmit} className="form">
          {/* Personal information */}
          <div className="form-group">
            <label htmlFor="fullName" className="form-label">
              Nom complet
            </label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber" className="form-label">
              Numéro de téléphone
            </label>
            <input
              type="text"
              className="form-control"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address" className="form-label">
              Adresse
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="profile" className="form-label">
              Profil
            </label>
            <input
              type="text"
              className="form-control"
              id="profile"
              name="profile"
              value={formData.profile}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="status" className="form-label">
              Statut
            </label>
            <input
              type="text"
              className="form-control"
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="age" className="form-label">
              Âge
            </label>
            <input
              type="text"
              className="form-control"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </div>
          {/* Education details */}
          <h2 className="subheader">Détails de l'éducation</h2>
          <div className="form-group">
            <label htmlFor="schoolName" className="form-label">
              Nom de l'école
            </label>
            <input
              type="text"
              className="form-control"
              id="schoolName"
              name="education"
              data-field="schoolName"
              value={formData.education.schoolName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="degree" className="form-label">
              Diplôme
            </label>
            <input
              type="text"
              className="form-control"
              id="degree"
              name="education"
              data-field="degree"
              value={formData.education.degree}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="fieldOfStudy" className="form-label">
              Domaine d'étude
            </label>
            <input
              type="text"
              className="form-control"
              id="fieldOfStudy"
              name="education"
              data-field="fieldOfStudy"
              value={formData.education.fieldOfStudy}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="graduationYear" className="form-label">
              Année de graduation
            </label>
            <input
              type="text"
              className="form-control"
              id="graduationYear"
              name="education"
              data-field="graduationYear"
              value={formData.education.graduationYear}
              onChange={handleChange}
            />
          </div>
        </form>
      </div>
      <div className="right-side">
        <h2 className="subheader">Expérience</h2>
        <div className="form-group">
          <label htmlFor="companyName" className="form-label">
            Nom de l'entreprise
          </label>
          <input
            type="text"
            className="form-control"
            id="companyName"
            name="experience"
            data-field="companyName"
            value={formData.experience.companyName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="position" className="form-label">
            Poste
          </label>
          <input
            type="text"
            className="form-control"
            id="position"
            name="experience"
            data-field="position"
            value={formData.experience.position}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="startDate" className="form-label">
            Date de début
          </label>
          <input
            type="text"
            className="form-control"
            id="startDate"
            name="experience"
            data-field="startDate"
            value={formData.experience.startDate}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDate" className="form-label">
            Date de fin
          </label>
          <input
            type="text"
            className="form-control"
            id="endDate"
            name="experience"
            data-field="endDate"
            value={formData.experience.endDate}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="responsibilities" className="form-label">
            Responsabilités
          </label>
          <textarea
            className="form-control"
            id="responsibilities"
            name="experience"
            data-field="responsibilities"
            value={formData.experience.responsibilities}
            onChange={handleChange}
          ></textarea>
        </div>
        <h2 className="subheader">Centre d'intérêt</h2>
        <div className="form-group">
          <label htmlFor="centerOfInterest" className="form-label">
            Centre d'intérêt
          </label>
          <input
            type="text"
            className="form-control"
            id="centerOfInterest"
            name="centerOfInterest"
            value={formData.centerOfInterest}
            onChange={handleChange}
          />
        </div>
        <h2 className="subheader">Langues</h2>
        <div className="form-group">
          <label htmlFor="languages" className="form-label">
            Langues
          </label>
          <input
            type="text"
            className="form-control"
            id="languages"
            name="languages"
            value={formData.languages}
            onChange={handleChange}
          />
        </div>
        <h2 className="subheader">Compétences</h2>
        <div className="form-group">
          <label htmlFor="skills" className="form-label">
            Compétences (séparées par une virgule)
          </label>
          <input
            type="text"
            className="form-control"
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="btn-container">
        <button onClick={handleDownloadPDF} className="btn btn-primary btn-download">
          Télécharger votre CV 
        </button>
      </div>
    </div>
  );
};

export default CreateCV;
