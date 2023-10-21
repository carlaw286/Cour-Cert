import { useNavigate } from 'react-router-dom';
import React, { useEffect,useState } from 'react';
import axios from 'axios'
import './StudentAddCourse.css';


export const StudentAddCourse = () => 
{
    const [courses, getCourses] = useState([])

    useEffect( ()=>{
        axios.get('http://localhost:3002/getTeachercourses')
        .then(courses => getCourses(courses.data))
        .catch( err => console.log(err))
    },[])
    
    const navigate = useNavigate();
    return(
        <div className='addcoursecontainer1'>
        <nav className='first-nav1'>
            <div class ="first-nav-logo1">
               <img src = "Logo1.1.png" alt=    "Cour-Cert"></img>
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
          <li><a href = "#"> View Course</a> </li>
          <li><a href = "./studentprofile"> Account Profile</a> </li>
          <li><a href = "/studenthomepage"> Back</a> </li>
         </ul>
       </div>
    </nav>

    <div className='details1'> 
        {courses.map(course => {
            return <div className='course-box'>
                <div className='titles1'>
                    {course.course_title}
                </div>
                <div className='Courses'>
                    <div className='description1'>
                        <p>{course.course_description}</p>
                    </div>
                    <div className='enrollcourse'>
                        <button type='submit'>
                            Enroll Course
                        </button>
                    </div>
                </div>
                           
        </div>
        })
    }
    </div>
</div>
    )
}