import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignupForm.css";
import axios from "axios";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user_name, setUsername] = useState("");
  const [full_name, setFullname] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");
  const [date_of_birth, setDateOfBirth] = useState("");
  const [error, setError] = useState(null);
  const [pfp, setPfp] = useState(null);

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("full_name", full_name);
      formData.append("user_name", user_name);
      formData.append("gender", gender);
      formData.append("bio", bio);
      formData.append("date_of_birth", date_of_birth);
      formData.append("pfp", pfp);

      const response = await axios.post("http://localhost:8000/api/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      // Redirect to the sign-in page upon successful sign-up
      navigate("/"); // Use the relative path to the sign-in page
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container-fluid h-100" style={{ backgroundColor: "#F3F2F0" }}>
      <div className="px-4">
        <img
          src="src/images/jobnest.jpg"
          alt=""
          style={{ height: "100px", width: "200px" }}
        />
      </div>
      <div className="d-flex justify-content-center align-items-center mb-1">
        <h2 className="scale-up-top"> Make the most of your professional life</h2>
      </div>
      <div className="d-flex justify-content-center align-items-center mt-2">
        <div id="form-main" className="scale-up-top">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Your Email </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Profile Picture</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) => setPfp(e.target.files[0])}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Your Password (6+ Character)</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3 row">
              <div className="col">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={user_name}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="col">
                <label className="form-label">Fullname</label>
                <input
                  type="text"
                  className="form-control"
                  value={full_name}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Bio</label>
              <textarea
                className="form-control"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            <div className="mb-3 row">
              <div className="col">
                <label className="form-label">Gender</label>
                <select
                  className="form-select"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="col">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  value={date_of_birth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-3">
              <div className="d-grid gap-2">
                <button className="btn btn-primary mt-3" type="submit">
                  Agree & Join
                </button>
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-4 form-label">
              <p>
                Already on JobNest ? <Link to="/">Sign in</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
