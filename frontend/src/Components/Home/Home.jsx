import "./Home.css";
import { Component } from "react";
import BackGround from "../public/Bg.png";
import { FiArrowRight } from "react-icons/fi";
import Navbar from "./Navbar";


export class Home extends Component {
    render() {
    return (
        <section id="home">
        <div className = "home-container">
            <Navbar />
            <div className ="home-banner-container">
                <div className="home-bannerImage-container">
                    <img src ={BackGround} alt="My BackGround" className="Bg"/>      
                </div>
                <div className="home-text-section">
                    <h1 className="primary-heading">
                        Digital Solution <span>Explore Our Courses</span>
                    </h1>
                    <p className="primary-text">
                        "Education Elevated, Certification Validated"
                    </p>
                    <button className="secondary-button">
                        More Details <FiArrowRight/>
                    </button>
                </div>
            </div>
        </div>
        </section>
      )
    }
}
