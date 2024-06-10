import React, { useState } from "react";
import jsPDF from "jspdf";

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
    const pdf = new jsPDF();

    pdf.setTextColor(0, 0, 255); // Blue color
    pdf.setFontSize(22);
    pdf.text("Curriculum Vitae", 10, 10);

    pdf.setTextColor(0);
    pdf.setFontSize(16);
    pdf.text("Informations personnelles", 10, 30);
    pdf.setFontSize(12);
    pdf.text("Nom complet: " + formData.fullName, 10, 40);
    pdf.text("Email: " + formData.email, 10, 50);
    pdf.text("Numéro de téléphone: " + formData.phoneNumber, 10, 60);
    pdf.text("Adresse: " + formData.address, 10, 70);
    pdf.text("Profil: " + formData.profile, 10, 80);
    pdf.text("Statut: " + formData.status, 10, 90);
    pdf.text("Âge: " + formData.age, 10, 100);

    pdf.setTextColor(0, 0, 255);
    pdf.setFontSize(16);
    pdf.text("Détails de l'éducation", 10, 110);
    pdf.setTextColor(0);
    pdf.setFontSize(12);
    pdf.text("Nom de l'école: " + formData.education.schoolName, 10, 120);
    pdf.text("Diplôme: " + formData.education.degree, 10, 130);
    pdf.text("Domaine d'étude: " + formData.education.fieldOfStudy, 10, 140);
    pdf.text("Année de graduation: " + formData.education.graduationYear, 10, 150);

    pdf.setTextColor(0, 0, 255);
    pdf.setFontSize(16);
    pdf.text("Expérience", 10, 160);
    pdf.setTextColor(0);
    pdf.setFontSize(12);
    pdf.text("Nom de l'entreprise: " + formData.experience.companyName, 10, 170);
    pdf.text("Poste: " + formData.experience.position, 10, 180);
    pdf.text("Date de début: " + formData.experience.startDate, 10, 190);
    pdf.text("Date de fin: " + formData.experience.endDate, 10, 200);
    pdf.text("Responsabilités: " + formData.experience.responsibilities, 10, 210);

    pdf.setTextColor(0, 0, 255);
    pdf.setFontSize(16);
    pdf.text("Centre d'intérêt", 10, 220);
    pdf.setTextColor(0);
    pdf.setFontSize(12);
    pdf.text("Centre d'intérêt: " + formData.centerOfInterest, 10, 230);

    pdf.setTextColor(0, 0, 255);
    pdf.setFontSize(16);
    pdf.text("Langues", 10, 240);
    pdf.setTextColor(0);
    pdf.setFontSize(12);
    pdf.text("Langues: " + formData.languages, 10, 250);

    pdf.setTextColor(0, 0, 255);
    pdf.setFontSize(16);
    pdf.text("Compétences", 10, 260);
    pdf.setTextColor(0);
    pdf.setFontSize(12);
    pdf.text("Compétences: " + formData.skills.join(", "), 10, 270);

    pdf.save("cv.pdf");
  };

  return (
    <div className="container" id="cv-content" style={containerStyle}>
      <h1 style={headerStyle}>Générateur de CV</h1>
      <div className="cv-sections" style={cvSectionsStyle}>
        <div className="left-side" style={sideStyle}>
          <h2 style={subheaderStyle}>Informations personnelles</h2>
          <form onSubmit={handleSubmit} style={formStyle}>
            <div style={formGroupStyle}>
              <label style={formLabelStyle} htmlFor="fullName">Nom complet</label>
              <input style={formControlStyle} type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} />
            </div>
            <div style={formGroupStyle}>
              <label style={formLabelStyle} htmlFor="email">Email</label>
              <input style={formControlStyle} type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div style={formGroupStyle}>
              <label style={formLabelStyle} htmlFor="phoneNumber">Numéro de téléphone</label>
              <input style={formControlStyle} type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            </div>
            <div style={formGroupStyle}>
              <label style={formLabelStyle} htmlFor="address">Adresse</label>
              <input style={formControlStyle} type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
            </div>
            <div style={formGroupStyle}>
              <label style={formLabelStyle} htmlFor="profile">Profil</label>
              <input style={formControlStyle} type="text" id="profile" name="profile" value={formData.profile} onChange={handleChange} />
            </div>
            <div style={formGroupStyle}>
              <label style={formLabelStyle} htmlFor="status">Statut</label>
              <input style={formControlStyle} type="text" id="status" name="status" value={formData.status} onChange={handleChange} />
            </div>
            <div style={formGroupStyle}>
              <label style={formLabelStyle} htmlFor="age">Âge</label>
              <input style={formControlStyle} type="text" id="age" name="age" value={formData.age} onChange={handleChange} />
            </div>
          </form>
        </div>
        <div className="right-side" style={sideStyle}>
          <h2 style={subheaderStyle}>Centre d'intérêt</h2>
          <div style={formGroupStyle}>
            <label style={formLabelStyle} htmlFor="centerOfInterest">Centre d'intérêt</label>
            <input style={formControlStyle} type="text" id="centerOfInterest" name="centerOfInterest" value={formData.centerOfInterest} onChange={handleChange} />
          </div>
          <h2 style={subheaderStyle}>Langues</h2>
          <div style={formGroupStyle}>
            <label style={formLabelStyle} htmlFor="languages">Langues</label>
            <input style={formControlStyle} type="text" id="languages" name="languages" value={formData.languages} onChange={handleChange} />
          </div>
          <h2 style={subheaderStyle}>Compétences</h2>
          <div style={formGroupStyle}>
            <label style={formLabelStyle} htmlFor="skills">Compétences (séparées par une virgule)</label>
            <input style={formControlStyle} type="text" id="skills" name="skills" value={formData.skills} onChange={handleChange} />
          </div>
        </div>
      </div>
      <div className="cv-sections" style={cvSectionsStyle}>
        <div className="left-side" style={sideStyle}>
          <h2 style={subheaderStyle}>Détails de l'éducation</h2>
          <div style={formGroupStyle}>
            <label style={formLabelStyle} htmlFor="schoolName">Nom de l'école</label>
            <input style={formControlStyle} type="text" id="schoolName" name="education" data-field="schoolName" value={formData.education.schoolName} onChange={handleChange} />
          </div>
          <div style={formGroupStyle}>
            <label style={formLabelStyle} htmlFor="degree">Diplôme</label>
            <input style={formControlStyle} type="text" id="degree" name="education" data-field="degree" value={formData.education.degree} onChange={handleChange} />
          </div>
          <div style={formGroupStyle}>
            <label style={formLabelStyle} htmlFor="fieldOfStudy">Domaine d'étude</label>
            <input style={formControlStyle} type="text" id="fieldOfStudy" name="education" data-field="fieldOfStudy" value={formData.education.fieldOfStudy} onChange={handleChange} />
          </div>
          <div style={formGroupStyle}>
            <label style={formLabelStyle} htmlFor="graduationYear">Année de graduation</label>
            <input style={formControlStyle} type="text" id="graduationYear" name="education" data-field="graduationYear" value={formData.education.graduationYear} onChange={handleChange} />
          </div>
        </div>
        <div className="right-side" style={sideStyle}>
          <h2 style={subheaderStyle}>Expérience</h2>
          <div style={formGroupStyle}>
            <label style={formLabelStyle} htmlFor="companyName">Nom de l'entreprise</label>
            <input style={formControlStyle} type="text" id="companyName" name="experience" data-field="companyName" value={formData.experience.companyName} onChange={handleChange} />
          </div>
          <div style={formGroupStyle}>
            <label style={formLabelStyle} htmlFor="position">Poste</label>
            <input style={formControlStyle} type="text" id="position" name="experience" data-field="position" value={formData.experience.position} onChange={handleChange} />
          </div>
          <div style={formGroupStyle}>
            <label style={formLabelStyle} htmlFor="startDate">Date de début</label>
            <input style={formControlStyle} type="text" id="startDate" name="experience" data-field="startDate" value={formData.experience.startDate} onChange={handleChange} />
          </div>
          <div style={formGroupStyle}>
            <label style={formLabelStyle} htmlFor="endDate">Date de fin</label>
            <input style={formControlStyle} type="text" id="endDate" name="experience" data-field="endDate" value={formData.experience.endDate} onChange={handleChange} />
          </div>
          <div style={formGroupStyle}>
            <label style={formLabelStyle} htmlFor="responsibilities">Responsabilités</label>
            <textarea style={formControlStyle} id="responsibilities" name="experience" data-field="responsibilities" value={formData.experience.responsibilities} onChange={handleChange}></textarea>
          </div>
        </div>
      </div>
      <div style={btnContainerStyle}>
        <button onClick={handleDownloadPDF} style={btnStyle}>Télécharger votre CV</button>
      </div>
    </div>
  );
};

const containerStyle = {
  fontFamily: 'Arial, sans-serif',
  color: '#333',
  maxWidth: '900px',
  margin: '0 auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '20px',
  fontSize: '2em',
  color: '#007BFF'
};

const cvSectionsStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '20px'
};

const sideStyle = {
  flex: 1,
  padding: '10px'
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column'
};

const formGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '15px'
};

const formLabelStyle = {
  marginBottom: '5px',
  fontWeight: 'bold'
};

const formControlStyle = {
  padding: '10px',
  fontSize: '1em',
  borderRadius: '5px',
  border: '1px solid #ccc'
};

const subheaderStyle = {
  marginTop: '20px',
  marginBottom: '10px',
  fontSize: '1.5em',
  color: '#007BFF'
};

const btnContainerStyle = {
  textAlign: 'center',
  marginTop: '20px'
};

const btnStyle = {
  padding: '10px 20px',
  fontSize: '1em',
  color: '#fff',
  backgroundColor: '#007BFF',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

export default CreateCV;
