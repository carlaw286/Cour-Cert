import React from 'react';
import './StudentSignup.css';
import { useNavigate } from 'react-router-dom';

export function StudentSignup() 
{

  const navigate = useNavigate();

  return(
    <div className='createpagestudent'>
      <body>
        <div className='container'>
          <form>
            <h1> Sign Up</h1>
            <div className='input'>
            <img src='person.png' alt=''></img>
              <input type='name' id='firstname' placeholder='First Name' required>
              </input>
            </div>
            <div className='input'>
            <img src='person.png' alt=''></img>
              <input type='name' id='secondname' placeholder='Last Name' required>
              </input>
            </div>
            <div className='input'>
            <img src='email.png' alt=''></img>
              <input type='email' id='email' placeholder='Email' required>
              </input>
            </div>
            <div className='input'>
            <img src='password.png' alt=''></img>
              <input type='password' id='password' placeholder='Password' required>
              </input>
            </div>
            <div className='input'>
            <img src='password.png' alt=''></img>
              <input type='password' id='confirm' placeholder='Confirm Password' required>
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
            <button type='submit' id='sub' onClick={() => navigate('/loginsignup')} >Sign Up</button>
            <p>Already have an account? <a href='App1.jsx'>Login</a></p>
          </form>
        </div>
      </body>
    </div>   
  );
}

