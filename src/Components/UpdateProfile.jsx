import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FormField = ({ label, type, value, onChange, placeholder, accept }) => {
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
    };
    // Send data to the backend
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h4 className="mb-4">Update Profile</h4>
            <form onSubmit={handleSubmit}>
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
               className="mb-3"
               style={{ maxWidth: "200px", maxHeight: "200px" }} // Adjust the dimensions as needed
         />
             )}

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
              <button type="submit" className="btn btn-primary w-100 mb-3">Update Profile</button>
              <Link to="/EditProfile" className="btn btn-secondary w-100">Cancel</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
