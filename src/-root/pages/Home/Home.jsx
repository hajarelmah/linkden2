import HomeRightSide from "../../../Components/HomeRightSide/HomeRightSide"
import Left from "../../../Components/LeftSideTopHome/LeftTop"
import Posts from "../../../Components/Posts/Posts"
import PostsData from "../../../Components/PostsData/PostsData"


const Home = () => {
  const isLoggedIn = sessionStorage.getItem('email'); // Check if the user is logged in

  if (!isLoggedIn) {
    // If user is not logged in, redirect to login page
    return <Redirect to="/login" />;
  }

  // If user is logged in, render the Home page
  return (
    <div className="container-fluid">
      <div className="row mb-2 px-lg-2 mx-md-5 mx-1 mt-3 d-flex justify-content-around">
        <div className="col-xl-3 col-12 px-4 py-2">
          <Left />
        </div>
        <div className="col-xl-6 col-12 px-3 py-2">
          <Posts />
          <PostsData />
        </div>
        <div className="col-xl-3 px-1 py-2 d-flex justify-content-center align-content-center">
          <HomeRightSide />
        </div>
      </div>
    </div>
  );
};

export default Home;