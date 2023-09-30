import React from 'react';
import './StudentSignup.css';
import { useNavigate } from 'react-router-dom';

export function StudentSignup() 
{
  const navigate = useNavigate();
  return(
    <div className='createpagestudent'>
        <div className='container2'>
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
            <div className='row1'>
              <div className='datelabel'>
                <p> Date of Birth</p>
              </div>
              <div className='genderlabel'> 
                <p>Gender</p>
              </div>
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
            <div className='hrefs'><p>Already have an account? <a href='./loginsignup'>Login</a></p>
            </div>
          </form>
        </div>
    </div>   
  );
}

