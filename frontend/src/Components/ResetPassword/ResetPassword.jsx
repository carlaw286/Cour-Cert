import React from 'react'
//import from loginsignup.css
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import password_icon from '../Assets/password.png';
import axios from 'axios'


export function ResetPassword() {
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const {id, token} = useParams()

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:3002/resetpassword/${id}/${token}`, {password})
        .then(res => {
            if(res.data.Status === "Success") {
                navigate('/loginsignup')
            } else {
                 navigate('/resetpassword')
            }
        }).catch(err => console.log(err))
    }

    return(
        <div className='containers'>
        <div className='container1' id="login">
        <div className="FPheader">
        <div className="FPtext">Reset Password</div>
        <div className="FPunderline"></div>
      </div>
      <div className="messagebelowforgotpassword">
        <p>Enter the email address you registered for your Cour-Cert Account, and we will send you an email message with password reset information.</p>
        </div>

        <form onSubmit={handleSubmit}>
        <div className="input1">
          <div className='password-icon'>
          <img src={password_icon} alt="" />
          </div>
          <input type="password" placeholder='New Password' required onChange={(e) => setPassword(e.target.value)} />
        </div>
        
        <div className="FPheader"><div className="FPunderline"></div></div>

        <div className="FPbuttons">
        <button className="btn btn-cancel w-100 rounded-0" onClick={() => navigate('/loginsignup')}
          >
            Cancel
          </button>  

          <button type="submit" className="btn btn-success w-100 rounded-0"
          >
            Update
          </button>
          </div>
          </form>
      </div>
    </div>
    )
}