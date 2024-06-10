import { useState, useEffect } from "react";
import axios from "axios";
import { useReducer } from 'react';

const PostsData = () => {
  const [posts, setPosts] = useState([]);
  const [showCommentInput, setShowCommentInput] = useState(-1);
  const [commentContent, setCommentContent] = useState('');
  const [newPost, setNewPost] = useState(sessionStorage.getItem('post_flag'));

  useEffect(() => {
    const fetchPosts = async () => {
      console.log('Fetching posts because newPost changed:', newPost);

      try {
        const response = await axios.get('http://localhost:8000/api/get-posts');

        const postsWithProfilePic = await Promise.all(
          response.data.map(async (post) => {
            let profilePic = '';
            let comments = [];

            // Fetch user profile picture
            try {
              const userResponse = await axios.get(`http://localhost:8000/api/getuserById/${post.post_owner_id}`);
              profilePic = userResponse.data.pfp;
            } catch (userError) {
              if (userError.response && userError.response.status === 404) {
                console.log('User not found for post owner id:', post.post_owner_id);
              } else {
                console.error('Error fetching user:', userError);
              }
            }

            // Fetch comments for this post
            try {
              const commentsResponse = await axios.get(`http://localhost:8000/api/get-comments/${post.id}`);
              if (commentsResponse.status === 200) {
                comments = commentsResponse.data;
              }
            } catch (commentsError) {
              if (commentsError.response && commentsError.response.status === 400) {
                console.log('No comments found for post:', post.id);
              } else {
                console.error('Error fetching comments:', commentsError);
              }
            }

            return { ...post, profilePic, comments };
          })
        );
         

         setPosts(postsWithProfilePic);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);
  const handleLikeUpdate = async (postId, index) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/likeUpdate/${postId}`);
      if (response.status === 200) {
        const updatedPosts = [...posts];
        updatedPosts[index].likes = response.data.likes;
        setPosts(updatedPosts);
        console.log('Like updated successfully:', response.data);
      } else {
        console.error('Error updating like:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCommentClick = (postIndex) => {
    setShowCommentInput(postIndex);
    setCommentContent('');
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
    return date.toLocaleDateString('en-US', options);
  };

  const handleCommentSubmit = async (postId) => {
    try {
      const userPfp = window.sessionStorage.getItem('pfp');
      const username = window.sessionStorage.getItem('user_name');

      const response = await axios.post(`http://localhost:8000/api/post-comment/${postId}`, {
        user_pfp: userPfp,
        username: username,
        content: commentContent,
      });

      if (response.status === 200) {
        console.log('Comment posted successfully:', response.data);

        // Update the comments array for the corresponding post
        const updatedPosts = [...posts];
        const postIndex = updatedPosts.findIndex(post => post.id === postId);
        updatedPosts[postIndex].comments.push(response.data);

        setPosts(updatedPosts);
        setShowCommentInput(-1);
        setCommentContent('');
      } else {
        console.error('Error posting comment:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className="container mt-3" style={{ height: "2px", backgroundColor: "#BEBDBA" }}></div>

      {posts.map((post, index) => (
        <div key={index} className="container sections">
          <div className="row mt-3 pt-1 p-1 d-flex justify-content-between" style={{ borderBottom: "1px solid #BEBDBA" }}>
            <div className="col-2 p-0 d-flex justify-content-center align-items-center">
              <div className="h-75">Suggested</div>
            </div>
            <div className="col-md-2 col-3 d-flex gap-2 mx-3">
              <div className="px-2 button" style={{ borderRadius: "50px" }}>
                <i className="bi bi-three-dots fs-3"></i>
              </div>
              <div className="px-2 rounded-circle button" style={{ borderRadius: "50px" }}>
                <i className="bi bi-x fs-3" style={{ cursor: "pointer" }}></i>
              </div>
            </div>
          </div>
          <div className="row mt-3 d-flex justify-content-between">
  <div className="col-md-6 col-8 d-flex p-0 align-items-center">
    <img src={`http://localhost:8000/${post.profilePic}`} alt="" className="rounded-circle" style={{ height: "60px", width: "60px" }} />
    <div className="mx-2">
      <div className="fw-bold fs-6">{post.username}</div>
      <div className="fs-6">
        {post.date}<i className="fa-solid fa-earth-americas mx-1"></i>
      </div>
    </div>
  </div>
  <div className="col-3 d-flex align-items-center justify-content-end p-1">
  <div className="text-center p-2 fs-6 fw-bold text-muted rounded" style={{ cursor: "pointer" }}>
    <span style={{ color: "#6c757d" }}>Posted: </span>{formatDate(post.created_at)}
  </div>
</div>

</div>
<div className="row mt-2">
  
  <div className="col-12 p-0">
    
    <div style={{ width: "100%" }}>{post.comment}</div> {/* Set width to 100% */}
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
          <div className="row p-2">
            <div className="col-3 button p-1 text-center rounded-3 cursor" onClick={() => handleLikeUpdate(post.id, index)}>
              {/* Lordicon for Like */}
              <script src="https://cdn.lordicon.com/lordicon.js"></script>
                             <lord-icon
                  src="https://cdn.lordicon.com/zjhryiyb.json"
                  trigger="hover"
                  style={{ width: "36px", height: "36px", cursor: "pointer" }}
                  onClick={() => handleLikeUpdate(post.id, index)}
                ></lord-icon>
                Like ({post.likes})
              </div>
              <div className="col-3 button p-1 text-center rounded-3 cursor" onClick={() => handleCommentClick(index)}>
  {/* Lordicon for Comment */}
  <script src="https://cdn.lordicon.com/lordicon.js"></script>
  <lord-icon
    src="https://cdn.lordicon.com/ylvuooxd.json"
    trigger="hover"
    state="in-dynamic"
    style={{ width: "36px", height: "36px"}}
    onClick={() => handleCommentClick(index)}
  ></lord-icon>
  Comment
</div>

<div className="col-3 button p-1 text-center rounded-3 cursor">
  {/* Lordicon for Repost */}
  <script src="https://cdn.lordicon.com/lordicon.js"></script>
  <lord-icon
    src="https://cdn.lordicon.com/rkiwwysn.json"
    trigger="hover"
    colors="primary:#30c9e8"
    style={{ width: "36px", height: "36px", cursor: "pointer" }}
  ></lord-icon>
  Repost
</div>

<div className="col-3 p-1 button text-center rounded-3 cursor">
  {/* Lordicon for Send */}
  <script src="https://cdn.lordicon.com/lordicon.js"></script>
  <lord-icon
    src="https://cdn.lordicon.com/sskjoohc.json"
    trigger="hover"
    state="hover-slide"
    colors="primary:#66d7ee,secondary:#ebe6ef"
    style={{ width: "36px", height: "36px", cursor: "pointer" }}
  ></lord-icon>
  Send
</div>

            </div>

            {/* Display existing comments */}
            {post.comments.length > 0 && (
              <div className="row mt-2">
                <div className="col-12">
                  
                  <h5>Comments</h5>
                  <hr></hr>
                  {post.comments.map((comment, commentIndex) => (
                    <div key={commentIndex} className="d-flex align-items-center my-2">
                      <img src={`http://localhost:8000/${comment.user_pfp}`} alt="" className="rounded-circle" style={{ height: "30px", width: "30px" }} />
                      <div className="ms-2">
                        <div className="fw-bold">{comment.username}</div>
                        <div>{comment.content}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {showCommentInput === index && (
              <div className="row my-2">
                <div className="col-12">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Write a comment..."
                      value={commentContent}
                      onChange={(e) => setCommentContent(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={() => handleCommentSubmit(post.id)}>
                      Send
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </>
    );
  };

  export default PostsData;

