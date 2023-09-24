import "./App.css";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";
import { BrowserRouter } from "react-router-dom";



export default function LandingPage() {
  console.log(window.location);
  return(
    <BrowserRouter>
      <div className="App">
         <Home />
         <About />
         <Services />
         <Contact />
      </div>
    </BrowserRouter>
  );
}