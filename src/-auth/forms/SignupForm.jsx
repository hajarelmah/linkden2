import { useState } from "react";
import { Link } from "react-router-dom";
import "./SignupForm.css";
import axios from "axios";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:8000/api/signup", {
        email,
        password,
        fullname,
        username,
        gender,
        bio,
        dateOfBirth
      });

      // Handle successful sign up (e.g., redirect user to another page)
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container-fluid h-100" style={{ backgroundColor: "#F3F2F0" }}>
      <div className="px-4">
        <img
          src="https://logos-world.net/wp-content/uploads/2020/05/Linkedin-Logo.png"
          alt=""
          style={{ height: "80px", width: "130px" }}
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
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="col">
                <label className="form-label">Fullname</label>
                <input
                  type="text"
                  className="form-control"
                  value={fullname}
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
                  value={dateOfBirth}
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
                Already on LinkedIn? <Link to="/">Sign in</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
