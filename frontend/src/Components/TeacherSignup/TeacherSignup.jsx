import React from 'react';
import './TeacherSignup.css';
import { useNavigate } from 'react-router-dom';

export function TeacherSignup()
{
  const navigate = useNavigate();
  
  return(
    <div className='createpagestudent'>
        <div className='container3'>
          <form>
            <h1> Sign Up</h1>
            <div className='createinput'>
            <img src='person.png' alt=''></img>
              <input type='name' id='firstname' placeholder='First Name' required>
              </input>
            </div>
            <div className='createinput'>
            <img src='person.png' alt=''></img>
              <input type='name' id='secondname' placeholder='Last Name' required>
              </input>
            </div>
            <div className='createinput'>
            <img src='email.png' alt=''></img>
              <input type='email' id='email' placeholder='Email' required>
              </input>
            </div>
            <div className='createinput'>
            <img src='password.png' alt=''></img>
              <input type='password' id='password' placeholder='Password' required>
              </input>
            </div>
            <div className='createinput'>
            <img src='password.png' alt=''></img>
              <input type='password' id='confirm' placeholder='Confirm Password' required>
              </input>
            </div>
            <div className='createinput'>
                <img src='link.png' alt=''></img>
                <input type = 'text' id='text' placeholder='Attach link of all the credentials'>
                 </input>
              </div>
              <div className='row'>
              <div className='date'>
              <input type='date' id='gender'></input>
              </div>
              <div className='Gender'>
              <select name='select' id='gender' defaultValue='Select Gender'>
              <option disabled={true} value='Select Gender'> Select Gender</option>
              <option value='Male'> Male</option>
              <option value='Female'> Female</option>
              </select>
              </div>
            </div>
            <div className='signupbutton'>
               <button type='submit' id='sub' onClick={() => navigate('/loginsignup')} >Sign Up</button>
            </div>
           
            <p>Already have an account? <a href='App1.jsx'>Login</a></p>
          </form>
        </div>
    </div>   
  )
}
