import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UpdateProfile.css'; // Import CSS file for styling
import axios from 'axios';

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
  const [companyLink, setCompanyLink] = useState('');
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
      case 'companyLink':
        setCompanyLink(value);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const profileUserData = {
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
      companyLink,
    };
  
    try {
      // Send data to create/update profileuser
      const profileUserResponse = await axios.post('/api/profileuser', profileUserData);
      console.log('Profile User Data:', profileUserResponse.data);
  
      // Optionally, handle success or redirect the user
    } catch (error) {
      console.error('Error:', error);
      // Optionally, display an error message to the user
    }
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
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">Username</label>
                      <input
                        type="text"
                        id="username"
                        className="form-control"
                        value={username}
                        onChange={handleChange}
                        placeholder="Username"
                        name="username"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="fullName" className="form-label">Full Name</label>
                      <input
                        type="text"
                        id="fullName"
                        className="form-control"
                        value={fullName}
                        onChange={handleChange}
                        placeholder="Full Name"
                        name="fullName"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={handleChange}
                        placeholder="Email"
                        name="email"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={handleChange}
                        placeholder="Password"
                        name="password"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="city" className="form-label">City</label>
                      <input
                        type="text"
                        id="city"
                        className="form-control"
                        value={city}
                        onChange={handleChange}
                        placeholder="City"
                        name="city"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="country" className="form-label">Country</label>
                      <input
                        type="text"
                        id="country"
                        className="form-control"
                        value={country}
                        onChange={handleChange}
                        placeholder="Country"
                        name="country"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="bio" className="form-label">Bio</label>
                      <textarea
                        id="bio"
                        className="form-control"
                        value={bio}
                        onChange={handleChange}
                        placeholder="Bio"
                        name="bio"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="gender" className="form-label">Gender</label>
                      <select
                        id="gender"
                        className="form-control"
                        value={gender}
                        onChange={handleChange}
                        name="gender"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="profilePicture" className="form-label">Profile Picture</label>
                      <input
                        type="file"
                        id="profilePicture"
                        className="form-control"
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
                    </div>
                    <div className="mb-3">
                      <label htmlFor="address" className="form-label">Address</label>
                      <input
                        type="text"
                        id="address"
                        className="form-control"
                        value={address}
                        onChange={handleChange}
                        placeholder="Address"
                        name="address"
                      />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                      <input
                        type="text"
                        id="phoneNumber"
                        className="form-control"
                        value={phoneNumber}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        name="phoneNumber"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Experience and Competence Section */}
              <div>
                <h5 className="mb-3">Experience and Competence</h5>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="experience" className="form-label">Experience</label>
                      <textarea
                        id="experience"
                        className="form-control"
                        value={experience}
                        onChange={handleChange}
                        placeholder="Experience"
                        name="experience"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="competence" className="form-label">Competence</label>
                      <textarea
                        id="competence"
                        className="form-control"
                        value={competence}
                        onChange={handleChange}
                        placeholder="Competence"
                        name="competence"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="formation" className="form-label">Formation</label>
                      <textarea
                        id="formation"
                        className="form-control"
                        value={formation}
                        onChange={handleChange}
                        placeholder="Formation"
                        name="formation"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="companyLink" className="form-label">Company Link</label>
                      <input
                        type="text"
                        id="companyLink"
                        className="form-control"
                        value={companyLink}
                        onChange={handleChange}
                        placeholder="Company Link"
                        name="companyLink"
                      />
                    </div>
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
