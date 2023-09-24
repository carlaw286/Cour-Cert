import React from "react";
import AboutBackground from "../public/Bg.png";
import "./About.css";

export const About = () => {
    return(
        <section id="about">
        <div className="about-section-container">
            <div className="about-background-image-container">
                 <image src = {AboutBackground} alt="" />
            </div>
            <div className="about-section-text-container">
                 <p className="primary-subheading"> About</p>
                 <h1 className="primary-heading">
                    About Our Online Courses: Empowering Your Learning Journey"
                </h1>
                <p className="primary-text">
                    At Cour-Cert, we're dedicated to transforming your learning experience. Join us on a journey of knowledge and growth, where every click takes you closer to your goals
                </p>
                <p className="primary-text">
                    Our team of passionate educators and experts is committed to providing you with high-quality, engaging content that's tailored to your needs. Whether you're looking to advance your career, acquire new skills, or explore a personal interest, our online courses offer a convenient and flexible way to achieve your objectives. Discover the endless possibilities of online learning with us.
                </p>
                <div className="about-buttons-container">
                    <button className="button">Learn More</button>
                </div>
            </div>
        </div>
        </section>
    );
};


