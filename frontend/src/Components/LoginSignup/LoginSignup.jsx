import React, { useState } from 'react';
import './LoginSignup.css';

import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [userType, setUserType] = useState("student"); // Initialize user type to "student"

  const handleUserTypeChange = (type) => {
    setUserType(type);
  };

  return (
    <div className='container'>
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">

        {action === "Login" ? <div></div> : <div className="input">
          <img src={user_icon} alt="" />
          <input type="text" placeholder='Name' />
        </div>}
        <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" placeholder='Email' />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" placeholder='Password' />
        </div>
        
        {action === "Login" ? (
          <div className="user-type">
            <button
              className={userType === "student" ? "user-type-button active" : "user-type-button"}
              onClick={() => handleUserTypeChange("student")}
            >
              Login as Student
            </button>
            <button
              className={userType === "teacher" ? "user-type-button active" : "user-type-button"}
              onClick={() => handleUserTypeChange("teacher")}
            >
              Login as Teacher
            </button>
          </div>
        ) : null}
      </div>

      {action === "Login" ? (
          <div className="forgot-password"><span> Forgot Password?</span></div>
        ) : null}
      


      <div className="submit-container">
        <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => { setAction("Sign Up") }}>Create Account</div>
        <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => { setAction("Login") }}>Login</div>
      </div>
    </div>
  );
}

export default LoginSignup;
