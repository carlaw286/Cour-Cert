import React from "react";
import "./Contact.css";

export const Contact = () => {
    return (
        <section id="contact">
        <div className="contact-page-wrapper">
            <h1 className="primary-h">Have Question In Mind?</h1>
            <h1 className="primary-h">Let Us Help</h1>
            <div className="contact-form-container">
                <input type="text" placeholder="yourmail@gmail.com" />
                <button className="secondary-button">Submit</button>

            </div>
        </div>
        </section>
    );
};
