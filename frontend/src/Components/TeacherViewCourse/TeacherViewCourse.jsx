import React, { useState } from 'react';
import './TeacherViewCourse.css';

export const TeacherViewCourse = () => 
{
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
        <nav className='second-nav'>
        <div class ="second-nav-links">
            <ul>
              <li><a href = "#"> View Course</a> </li>
              <li><a href = "./teacherprofile"> Account Profile</a> </li>
              <li><a href = "/teacherhomepage"> Back</a> </li>
             </ul>
           </div>
        </nav>

        <div className='detail'> 
            <div>
                List of courses
            </div>
            <div className='title1'>
                <a href='teacheraddcourse'> Title of the Course
                </a>
            </div>
        </div>
    </div>
  )
}
