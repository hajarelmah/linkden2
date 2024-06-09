import { useState, useEffect, useRef } from "react";
import ProfileImg from "../../images/ProfileImage.jpg";
import axios from "axios";

const Media = () => {
  const [Loader, setLoader] = useState(true);
  const [user, setUser] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const fileInputRef = useRef(null);
  const dateInputRef = useRef(null);
  // Fetch CSRF token from meta tag
 
  useEffect(() => {

    const fetchUser = async () => {
      try {
        const id = sessionStorage.getItem('id');
        const response = await axios.get(`http://localhost:8000/api/getuserById/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoader(false);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFilePreview(URL.createObjectURL(selectedFile));
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleSubmit = async () => {
    const id = sessionStorage.getItem('id');
  
    const formData = new FormData();
    formData.append('post_owner_id', id);
    formData.append('username', user.full_name);
    formData.append('comment', document.getElementById("floatingTextarea2").value);
    formData.append('date', selectedDate);
  
    if (file) {
      formData.append('image', file); // Append the file to the form data
    }
  
    try {
      const response = await axios.post('http://localhost:8000/api/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        let old = sessionStorage.getItem('post_flag') === 'true'; // Interpret as boolean
        console.log("old", old);
        
        sessionStorage.setItem('post_flag', !old); // Update sessionStorage based on old value
  
        console.log('Post created successfully:', response.data);
        alert('Post created successfully');
      } else {
        console.error('Error creating post:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <>
      {user && (
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content p-2" style={{ borderRadius: "20px" }}>
            {Loader ? (
              <div className="spinner-border mx-auto" role="status"></div>
            ) : (
              <>
                <div className="modal-header">
                  <div className="button d-flex p-2 cursor" style={{ borderRadius: "20px" }}>
                    <img
                      src={`http://localhost:8000/${user.pfp}`}
                      alt="Profile"
                      className="rounded-circle"
                      style={{ height: "50px", width: "50px" }}
                    />
                    <div>
                      <div className="fs-5 fw-bold mx-1 text-dark" id="staticBackdropLabel">
                        {user.full_name}
                      </div>
                      <div className="fs-6 mx-1">creer un post</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    style={{ boxShadow: "none" }}
                    onClick={() => {
                      if (!Loader) {
                        setLoader(true);
                      }
                    }}
                  ></button>
                </div>
                <div className="modal-body p-2">
                  <div className="form-floating mb-3">
                    <textarea
                      className="form-control"
                      placeholder={`Leave a comment as ${user.full_name}`}
                      id="floatingTextarea2"
                      style={{ height: "180px", border: "none", outline: "none", boxShadow: "none" }}
                    ></textarea>
                    <label htmlFor="floatingTextarea2">Comments</label>
                  </div>
                  {filePreview && (
                    <div className="mb-3">
                      <img
                        src={filePreview}
                        alt="Preview"
                        style={{ width: "100%", borderRadius: "10px" }}
                      />
                    </div>
                  )}
                  <div className="p-2 mt-3 d-flex gap-4">
                    <div onClick={() => fileInputRef.current.click()}>
                      <i className="fa-solid fa-photo-film fs-md-4 fs-4 cursor"></i>
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                      />
                    </div>
                    <div onClick={() => dateInputRef.current.showPicker()}>
                      <i className="fa-regular fa-calendar-days fs-4 cursor"></i>
                      <input
                        type="date"
                        ref={dateInputRef}
                        style={{ display: 'none' }}
                        onChange={handleDateChange}
                      />
                    </div>
                    <div>
                      <i className="fa-solid fa-ellipsis fs-4 cursor"></i>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <div className="button rounded-circle cursor">
                    <i className="bi bi-clock fs-3 mx-2"></i>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary rounded-pill"
                    data-bs-dismiss="modal"
                    onClick={handleSubmit}
                  >
                    Post
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Media;
