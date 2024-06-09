import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UpdateProfile.css'; // Import CSS file for styling

const FormField = ({ label, type, value, onChange, placeholder, accept, children }) => {
  return (
    <div className="mb-3">
      <label htmlFor={label} className="form-label">{label}</label>
      {type === "file" ? (
        <input
          type={type}
          id={label}
          className="form-control"
          onChange={onChange}
          accept={accept}
        />
      ) : type === "select" ? (
        <select
          id={label}
          className="form-control"
          value={value}
          onChange={onChange}
        >
          {children} {/* Render the options */}
        </select>
      ) : (
        <input
          type={type}
          id={label}
          className="form-control"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};


const UpdateProfile = () => {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [gender, setGender] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [experience, setExperience] = useState('');
  const [competence, setCompetence] = useState('');
  const [formation, setFormation] = useState('');
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'username':
        setUsername(value);
        break;
      case 'fullName':
        setFullName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'bio':
        setBio(value);
        break;
      case 'gender':
        setGender(value);
        break;
      case 'city':
        setCity(value);
        break;
      case 'country':
        setCountry(value);
        break;
      case 'address':
        setAddress(value);
        break;
      case 'phoneNumber':
        setPhoneNumber(value);
        break;
      case 'experience':
        setExperience(value);
        break;
      case 'competence':
        setCompetence(value);
        break;
      case 'formation':
        setFormation(value);
        break;
      default:
        console.error(`Unknown field: ${name}`);
    }
  };
  

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfilePicture(reader.result);
      setPreviewImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username,
      fullName,
      email,
      password,
      bio,
      gender,
      profilePicture,
      city,
      country,
      address,
      phoneNumber,
      experience,
      competence,
      formation,
    };
    // Send data to the backend
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card shadow-lg p-4 custom-card">
            <h4 className="mb-4">Update Profile</h4>
            <form onSubmit={handleSubmit}>
              {/* Personal Information Section */}
              <div className="mb-5">
                <h5 className="mb-3">Personal Information</h5>
                <div className="row">
                  <div className="col-md-6">
                    <FormField
                      label="Username"
                      type="text"
                      value={username}
                      onChange={handleChange}
                      placeholder="Username"
                      name="username"
                    />
                    <FormField
                      label="Full Name"
                      type="text"
                      value={fullName}
                      onChange={handleChange}
                      placeholder="Full Name"
                      name="fullName"
                    />
                    <FormField
                      label="Email"
                      type="email"
                      value={email}
                      onChange={handleChange}
                      placeholder="Email"
                      name="email"
                    />
                    <FormField
                      label="Password"
                      type="password"
                      value={password}
                      onChange={handleChange}
                      placeholder="Password"
                      name="password"
                    />
                    <FormField
                      label="City"
                      type="text"
                      value={city}
                      onChange={handleChange}
                      placeholder="City"
                      name="city"
                    />
                    <FormField
                      label="Country"
                      type="text"
                      value={country}
                      onChange={handleChange}
                      placeholder="Country"
                      name="country"
                    />
                  </div>
                  <div className="col-md-6">
                    <FormField
                      label="Bio"
                      type="textarea"
                      value={bio}
                      onChange={handleChange}
                      placeholder="Bio"
                      name="bio"
                    />
                    <FormField
                      label="Gender"
                      type="select"
                      value={gender}
                      onChange={handleChange}
                      name="gender"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </FormField>
                    <FormField
                      label="Profile Picture"
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePictureChange}
                    />
                    {previewImage && (
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="mt-3 custom-preview-image"
                      />
                    )}
                    <FormField
                      label="Address"
                      type="text"
                      value={address}
                      onChange={handleChange}
                      placeholder="Address"
                      name="address"
                    />
                    <FormField
                      label="Phone Number"
                      type="text"
                      value={phoneNumber}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      name="phoneNumber"
                    />
                  </div>
                </div>
              </div>
              {/* Experience and Competence Section */}
              <div>
                <h5 className="mb-3">Experience and Competence</h5>
                <div className="row">
                  <div className="col-md-6">
                    <FormField
                      label="Experience"
                      type="textarea"
                      value={experience}
                      onChange={handleChange}
                      placeholder="Experience"
                      name="experience"
                    />
                  </div>
                  <div className="col-md-6">
                    <FormField
                      label="Competence"
                      type="textarea"
                      value={competence}
                      onChange={handleChange}
                      placeholder="Competence"
                      name="competence"
                    />
                    <FormField
                      label="Formation"
                      type="textarea"
                      value={formation}
                      onChange={handleChange}
                      placeholder="Formation"
                      name="formation"
                    />
                  </div>
                </div>
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-custom-primary mt-4">Update Profile</button>
                <Link to="/EditProfile" className="btn btn-custom-secondary mt-2">Cancel</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;

