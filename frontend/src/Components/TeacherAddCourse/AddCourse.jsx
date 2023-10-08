import React, { useState } from 'react';
import './AddCourse.css';
import { useNavigate } from 'react-router-dom';

export const TeacherAddCourse = () => 
{
  const navigate = useNavigate();
  return(
    <div className='addcoursecontainer'>
        <nav className='first-nav'>
            <div class ="first-nav-logo">
                <img src = "Logo1.1.png" alt= "Cour-Cert"></img>
            </div>
            <div className='first-nav-title'>
                <p className='p1'> Course-Certification</p>
                <div className='first-nav-title1'>
                <p className='p2'> "Empowering Your Learning Journey"</p>
                </div>
            </div>
        </nav>
        <nav className=' second-nav'>
        </nav>
        <div className='addcourse-row'>
            <div className='addcourse-col'>
                <div className='Forms'>
                    <input className='form-input1'
                        type='text' 
                        id='topicnumber' 
                        placeholder='Week #'>
                    </input>
                </div>
                <div className='addfile'>
                    <div className='callname'>
                        Call name
                    </div>
                    <div className='inputfile'>
                        <input 
                             type='file'>
                        </input>
                    </div>
                    

                </div>
            </div>
            <div className='butts'>
                <button className='add' type='add' > + Add new tile
                </button>
            </div>
        </div>
       
    </div>
  )
}
