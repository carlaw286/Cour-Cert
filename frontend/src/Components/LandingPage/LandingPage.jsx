import React from "react";
import "./LandingPage.css";
import {Home} from "./Home";
import {About} from "./About";
import {Services} from "./Services";
import {Contact} from "./Contact";
import App from "../../App";


export const LandingPage = () =>{
  // console.log(window.location);
  return(
      <div className="courcert" >
         <Home />
         <About />
         <Services />
         <Contact />
      </div>
  );
}

export default App;

