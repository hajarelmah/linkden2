import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UpdateProfile = () => {
  const [name, setName] = useState('username');
  const [bio, setBio] = useState('bio');
  const [newName, setNewName] = useState('');
  const [newBio, setNewBio] = useState('');


//   try {
//     const response = await axios.post("http://localhost:8000/api/signup", {
//       email,
//       password,
//     });

//     // Handle successful sign up (e.g., redirect user to another page)
//   } catch (error) {
//     setError(error.message);
//   }
// };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleBioChange = (e) => {
    setNewBio(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
        name: newName,
        bio: newBio,
      };
      axios.post('http://localhost:8000/api/UpdateProfile', data)
      .then(response => {
        // Handle successful response
        console.log('Response:', response.data);
        // Optionally, you can update the UI to reflect the changes
      })
      .catch(error => {
        // Handle error
        console.error('Error:', error);
      });
    // Here you can send the updated name and bio to your backend API
    //console.log('Updated Name:', newName);
    //console.log('Updated Bio:', newBio);
    // Reset the input fields
    setNewName('');
    setNewBio('');
  };

  return (
    <div className="container-fluid d-flex justify-content-center">
      <div className="row d-flex flex-column" style={{ width: "260px" }}>
        <div className="col-12 d-flex p-0 gap-2">
          {/* Display the input fields for name and bio */}
          <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
            value={newName}
            onChange={handleNameChange}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Enter Bio"
            value={newBio}
            onChange={handleBioChange}
          />
        </div>
        <div className="col-12">
          {/* Display the button to submit the updated profile */}
          <button onClick={handleSubmit} className="btn btn-primary mt-2" style={{ borderRadius: "20px" }}>
            Update Profile
          </button>
          <Link to="/EditProfile" className="btn btn-secondary mt-2" style={{ borderRadius: "20px" }}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
