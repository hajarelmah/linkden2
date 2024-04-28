import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SigninForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });

      // Handle successful login (e.g., redirect user to another page)
      if (response.status === 200) {
        console.log(response.data.user.id);
        sessionStorage.setItem('id',response.data.user.id);
        sessionStorage.setItem('user_name',response.data.user.user_name);
        sessionStorage.setItem('email',response.data.user.email);
        sessionStorage.setItem('bio',response.data.user.bio);
        sessionStorage.setItem('full_name',response.data.user.full_name);

        Navigate("/Home");

        // Redirect to Home page
       window.location.href = "/Home";

      }
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card p-4" style={{ maxWidth: "400px" }}>
        <div className="text-center mb-4">
          <h2 className="mb-3">Sign In</h2>
          <p>Welcome back! Please sign in to your account.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-primary w-100">Sign in</button>
        </form>
        <div className="text-center mt-3">
          <Link to="/forgot-password">Forgot your password?</Link>
        </div>
        <hr />
        <div className="text-center">
          <p>Don't have an account? <Link to="/sign-up">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;




// import { useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const SigninForm = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:8000/api/login", {
//         email,
//         password,
//       });

//       // Handle successful login (e.g., redirect user to another page)
//       if (response.status === 200) {
//         // Redirect to Home page
//         window.location.href = "/Home";
//       }
//     } catch (error) {
//       setError("Invalid email or password");
//     }
//   };

//   return (
//     <div className="container  d-flex align-items-center flex-column">
//       {/* Your existing JSX code */}
//       <div className="row w-100  d-flex flex-column align-items-center p-1 scale-up-top">
//         {/* Your existing JSX code */}
//         <form
//           className="row mt-2"
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             width: "75%",
//           }}
//           onSubmit={handleSubmit}
//         >
//           {/* Email input */}
//           <input
//             type="email"
//             className="bg-white p-2 text-dark col-md-8 mt-3 fw-bold fs-3"
//             placeholder="Email"
//             style={{ border: "1px solid black", borderRadius: "5px" }}
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           {/* Password input */}
//           <input
//             type="password"
//             className="bg-white p-2 col-md-8 text-dark mt-3 fw-bold fs-3"
//             style={{ border: "1px solid black", borderRadius: "5px" }}
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           {/* Forgot password link */}
//           <Link
//             className="col-md-8 p-0 text-primary fs-5 fw-bold mt-3 "
//             to="/ForgotPassword"
//           >
//             Forgot Password?
//           </Link>
//           <Link
//             className="col-md-8 p-0 text-primary fs-5 fw-bold mt-3 "
//             to="/Sign-up"
//           >
//            Sign-Up 
//           </Link>
//           {/* Error message */}
//           {error && <div className="text-danger">{error}</div>}
//           {/* Submit button */}
//           <button
//             type="submit"
//             className="col-md-8 col-9 border text-center p-2 bg-primary text-white fs-5 mt-3"
//             style={{ borderRadius: "25px", cursor: "pointer" }}
//           >
//             Sign in
//           </button>
//         </form>
//         {/* Your existing JSX code */}
//       </div>
//     </div>
//   );
// };

// export default SigninForm;
