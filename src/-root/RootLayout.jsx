import { Outlet } from "react-router-dom";
import NaveBar from "../Components/NaveBar";
import Loading from "../Components/Loader";
import { useEffect, useState } from "react";
// import FixMessaing from "../Components/FixMessaging/FixMessaing";



const RootLayout = () => {
  const [Loader,setLoader] =useState(true)
  useEffect(()=>{
     setInterval(() => {
       setLoader(false)
     }, 3000);
  })
  return (
    <>
      {Loader ? (
        <section
          className=""
          style={{
            height: "100vh",
            width: "100vw",
            backgroundColor: "#FFFFFF",
          }}
        >
          <Loading/>
        </section>
      ) : (
        <div className="w-100 h-100">
          <NaveBar />
          {/* <FixMessaing/> */}
{/* ------------------------------------------HAJAR ----------------------------------------- 
this is where i centred resume this is basically rootLayout of ur app (how its devided to sections) 
            so i centred anything thats under the header i added justfy.... 
        if any page get auto centred in the future consider making this css rule apply only to resume page */}
        
          <section className="d-flex w-100" style={{ backgroundColor: "#F4F2EE", justifyContent: "center" }}>
            <Outlet />
          </section>
        </div>
      )}
    </>
  );
};

export default RootLayout;
