import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const NotificationSection = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/get-posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <>
      {posts.map((post, index) => (
        <div key={index} className="container sections">
          <div className="row mt-3 pt-1 p-1 d-flex justify-content-between" style={{ borderBottom: "1px solid #BEBDBA" }}>
            {/* Add username and post status */}
            <div className="col-md-10 col-10">
              <div className="fw-bold fs-5">{`${post.username} added a new post`}</div>
            </div>
            <div className="col-md-2 col-2">
              {/* Add redirection link */}
              <Link to="/home" className="text-decoration-none">
                <div className="rounded-circle button d-flex justify-content-center align-items-center" style={{ width: "100px", height: "100px", border: "2px solid #add8e6" }}>
                  <span className="fw-bold fs-5 text-dark" style={{ cursor: "pointer" }}>Check it</span>
                </div>
              </Link>
            </div>
          </div>
          <div className="row mt-3 d-flex justify-content-between">
            <div className="col-md-6 col-8 d-flex p-0 align-items-center">
              {/* Display creation time */}
              <div className="mx-2">
                <div className="fs-6">
                  <i className="fa-solid fa-earth-americas mx-1"></i>
                  {formatDate(post.created_at)}
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-12 p-0">
              {/* Display content */}
              <div style={{ width: "100%" }}>{post.comment}</div>
            </div>
          </div>
          {post.image && (
            <div className="row mt-3">
              <div className="col-12 p-0">
                <img src={`http://localhost:8000${post.image}`} alt="img" className="img-fluid rounded-3" />
              </div>
            </div>
          )}
          <div className="row mt-2" style={{ height: "2px", backgroundColor: "#BEBDBA" }}></div>
        </div>
      ))}
    </>
  );
};

export default NotificationSection;
