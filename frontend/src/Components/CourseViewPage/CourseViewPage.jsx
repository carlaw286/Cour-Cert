import React from 'react';
import './CourseViewPage.css'
import { Link} from 'react-router-dom';

export const CourseViewPage = () => 
{
    return(
        <div className='addcoursecontainer1'>
        <nav className='first-nav1'>
            <div class ="first-nav-logo1">
                <Link to='/studenthomepage'>
                     <img src = "Logo1.1.png" alt=    "Cour-Cert"></img>
                </Link>
         </div>
            <div className='first-nav-title1'>
                <p className='p1'> Course-Certification</p>
            <div className='first-nav-title1'>
            <p className='p3'> "Empowering Your Learning Journey"</p>
            </div>
        </div>
    </nav>
    <nav className='second-nav2'>
    <div class ="second-nav-links2">
        <ul>
          <li><Link to = "/allcourselist"> View Course</Link> </li>
          <li><Link to = "/allcourselist"> Back</Link> </li>
         </ul>
       </div>
    </nav>
    </div>
    )
}