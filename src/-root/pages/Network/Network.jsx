import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Network.css";

const Network = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const currentUserId = sessionStorage.getItem('userId'); // Assuming the current user's ID is stored in session storage

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/getUsers");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const jsonData = await response.json();
        
        // Filter out the current user from the data
        const filteredData = jsonData.filter(user => user.id !== currentUserId);
        
        setData(filteredData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData(); // Call the function to fetch data on component mount
  }, [currentUserId]);

  return (
    <div className="container-md-fluid p-2 mt-3" style={{ overflowX: "hidden" }}>
      <div className="row px-md-5">
        <div className="col-lg-3">
          <div className="sections">
            <ul className="list-group list-group-light">
              <li className="list-group-item px-3">
                <h4>Manage My Network</h4>
                <div className="mt-3">
                  <Link to="/Connections" className="d-flex fw-bold py-1 ps-md-2 text-dark">
                    <i className="bi bi-person-vcard-fill me-2 icon12"></i>
                    <p className="mt-1">Connection</p>
                  </Link>
                </div>
                <div>
                  <Link to='/Follow' className="d-flex fw-bold py-1 ps-md-2 text-dark">
                    <i className="bi bi-person-fill-add me-2 icon12"></i>
                    <p className="mt-1">Following & followers</p>
                  </Link>
                </div>
                <div>
                  <Link to="/Groups" className="d-flex fw-bold py-1 ps-md-2 text-dark">
                    <i className="fa-solid fa-people-group me-2 mt-1 icon12"></i>
                    <p className="mt-1">Group</p>
                  </Link>
                </div>
                <div>
                  <Link to="/MynetworkEvent" className="d-flex fw-bold py-1 ps-md-2 text-dark">
                    <i className="bi bi-calendar-event me-2 icon12"></i>
                    <p className="mt-1">Event</p>
                  </Link>
                </div>
                <Link to="/Page">
                  <a href="#" className="d-flex fw-bold py-1 ps-md-2 text-dark">
                    <i className="bi bi-file-earmark me-2 icon12"></i>
                    <p className="mt-1">Page</p>
                  </a>
                </Link>
                <div>
                  <a href="#" className="d-flex fw-bold py-1 ps-md-2 text-dark">
                    <i className="bi bi-newspaper me-2 icon12"></i>
                    <p className="mt-1">NewsLetter</p>
                  </a>
                </div>
                <div>
                  <a href="#" className="d-flex fw-bold py-1 ps-md-2 text-dark">
                    <i className="fa-sharp fa-solid fa-hashtag me-2 mt-1 icon12"></i>
                    <p className="mt-1">Hashtag</p>
                  </a>
                </div>
              </li>
              <li className="list-group-item px-3">
                <div className="p-2 text-center my-2">
                  <p id="text1">Get the latest jobs and industry news</p>
                </div>
                <div className="d-flex justify-content-center">
                  <img src="https://i.pinimg.com/736x/a9/62/ef/a962ef5ea8dfa25418c0a2b0057a64d4.jpg" alt="" className="rounded-circle" style={{ height: "80px", width: "80px" }} />
                </div>
                <div className="p-2 text-center my-2">
                  <p id="text1">16-oct-frontend, explore relevant opportunities </p>
                  <button className="btn btn-primary">Follow</button>
                </div>
              </li>
              {/* ***** Import part****** */}
              <li className="list-group-item">
                <div className="text-center">
                  <div className="d-flex flex-wrap justify-content-around m-3 p-2 text-center" style={{ cursor: "pointer" }}>
                    <p className="mx-2">About</p>
                    <p>Accessibility</p>
                    <p>Help Center</p>
                    <p>Privacy & Terms </p>
                    <p>Ad Choices</p>
                    <p>Advertising</p>
                    <p>Business Services</p>
                    <p>Get the LinkedIn app</p>
                    <p>More</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-lg-9 pt-lg-0 pt-5">
          {loading ? (
            <div className="container">
              <div className="row">
                <div className="spinner-border mt-4 mx-auto col-12" role="status"></div>
              </div>
            </div>
          ) : (
            <>
              <div className="sections card-follower p-3 mt-2">
                <div className="d-flex justify-content-between">
                  <p id="text1">People in the IT Services and IT Consulting industry you may know</p>
                  <p className="button px-2 rounded-2">
                    <a href="#" id="text1">See all</a>
                  </p>
                </div>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                  {/* Render user cards */}
                  {data.map((user) => (
                    <div className="col" key={user.id}>
                      <div className="card">
                        <div className="d-flex justify-content-end me-2 mt-2 cross">
                          <i className="fa-regular fa-circle-xmark"></i>
                        </div>
                        <div className="d-flex justify-content-center">
                          <img src={`http://localhost:8000/${user.pfp}`} alt={`${user.full_name}'s profile`} className="rounded-circle" style={{ height: "80px", width: "80px" }} />
                        </div>
                        <div className="card-body">
                          <div className="d-flex justify-content-center">
                            <h5 className="card-title">{user.full_name}</h5>
                          </div>
                          <p className="card-text">{user.bio}</p>
                          <div className="d-flex justify-content-center">
                            <button className="btn btn-primary px-5" id="btn-122">Connect</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="d-flex justify-content-center">
                    <button className="btn btn-outline-primary fw-bold px-5 m-4" id="btn-122">Show More</button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Network;
