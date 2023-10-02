import React from "react";
import "./LandingPage.css";
import {Home} from "./Home";
import {About} from "./About";
import {Services} from "./Services";
import {Contact} from "./Contact";
import {LoginSignup} from "../LoginSignup/LoginSignup";
import App from "../../App";


export const LandingPage = () =>{
  // console.log(window.location);
  return(
   // <BrowserRouter>
      <div className="courcert" >
         <Home />
         <About />
         <Services />
         <Contact />
         {/* <LoginSignup/> */}
      </div>
    //</BrowserRouter>
  );
}

export default App;

