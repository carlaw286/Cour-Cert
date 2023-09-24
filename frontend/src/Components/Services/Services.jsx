import React from "react";
import Contentdelivery from "../public/content-delivery.svg";
import InteractiveLearningTools from "../public/interactive.svg";
import ProgressTracking from "../public/tasks.svg";
import "./Services.css";


export const Services = () => {
    const serviceInfoData = [
        {
            image: Contentdelivery,
            title: "Content Delivery",
            text: "We provide course materials, such as video lectures, reading materials, assignments, and quizzes, in a user-friendly online format.",
        },
        {
            image: InteractiveLearningTools,
            title: "Interactive Learning Tools",
            text: "Offering tools like discussion forums for students to interact with instructors and peers.",
        },
        {
            image: ProgressTracking,
            title: "Progress Tracking",
            text: "Enabling students to monitor their course progress, view grades, and access certificates upon completion.",
        },
    ];
    return ( 
        <section id="services">
             <div className="service-section-wrapper">
                <div className="service-section-top">
                    <p className="primary-subheading">Services</p>
                    <h1 className="primary-heading">How It's Done:Navigating Our Services</h1>
                    <p className="primary-text">
                          Discovering and engaging with our courses is effortless at Cour-Cert. Begin by browsing our diverse course catalog, create a personal account for enrollment, explore course details, and make seamless payments or subscription selections. Accessing course materials, interacting with instructors and fellow learners, and tracking your progress is intuitive through our user-friendly interface. Our support team is readily available for any assistance you may need. Upon completion, you can earn certificates and achievements, and we encourage you to continue your learning journey with our array of courses and share your success stories within our vibrant learning community. Join us in making learning a seamless and rewarding experience!
                    </p>
                </div>
                <div className="service-section-bottom">
                    {serviceInfoData.map((data) =>(
                        <div className="service-section-info">
                            <div className="info-boxes-img-container">
                                <img src = {data.image} alt="" />
                            </div>
                            <h2>{data.title}</h2>
                            <p>{data.text}</p>
                        </div>
                    ))};

                </div>
           </div>
        </section>
    )
};

