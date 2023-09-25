import "./LandingPage.css";
import {Home} from "./Home";
import {About} from "./About";
import {Services} from "./Services";
import {Contact} from "./Contact";
import { BrowserRouter } from "react-router-dom";


export const LandingPage = () =>{
  console.log(window.location);
  return(
   // <BrowserRouter>
      <div className="App">
         <Home />
         <About />
         <Services />
         <Contact />
      </div>
    //</BrowserRouter>
  );
}

export default LandingPage;