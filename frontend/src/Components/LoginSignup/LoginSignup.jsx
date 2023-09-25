import React, { useState } from 'react';
import './LoginSignup.css';
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import eye_icon from '../Assets/hide.png';
import eye_slash_icon from '../Assets/view.png';
import { useNavigate } from 'react-router-dom';

export const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [userType, setUserType] = useState("student"); // Initialize user type to "student"
  const [showPassword, setShowPassword] = useState(false); 

  const handleUserTypeChange = (type) => {
    setUserType(type);
  };

  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); };

  return (
    <div className='container1'>
      
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      
      <div className="inputs">

        {action === "Login" ? <div></div> : 
        <div className="input">
          <img src={user_icon} alt="" />
          <input type="text" placeholder='Name' />
        </div>}
        <div className="input1">
          <div className='email-icon'>
          <img src={email_icon} alt="" />
          </div>
          <input type="email" placeholder='Email' />
        </div>

        <div className="input1">
          <div className='password-icon'>
            <img src={password_icon} alt="" />
          </div>
          
          <input
            type={showPassword ? 'text' : 'password'} // Toggle input type based on showPassword state
            placeholder='Password'
          />
          <div className='password-viewer' onClick={togglePasswordVisibility}>
            <img src={showPassword ? eye_slash_icon : eye_icon} alt="Toggle Password" />
          </div>
        </div>
        
        {action === "Login" ? (
          <div className="user-type">
            <button
              className={userType === "student" ? "user-type-button active" : "user-type-button"}
              onClick={() => navigate("/studenthomepage")}
            >
              Login as Student
            </button>
            <button
              className={userType === "teacher" ? "user-type-button active" : "user-type-button"}
              onClick={() => navigate('/teacherhomepage')}
            >
              Login as Teacher
            </button>
          </div>
        ) : null}
      </div>

      {action === "Login" ? (
          <div className="forgot-password"><span> Forgot Password?</span></div>
        ) : null}
      <div className="create-account">
      <p>Don't have an account yet? Create account as <a href='./teachersignup'>Teacher</a> or <a href='./studentsignup'>Student</a>.</p>
      </div>


      
    </div>
  );
}

