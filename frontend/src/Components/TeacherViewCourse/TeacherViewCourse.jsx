import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import './TeacherViewCourse.css';
import axios from 'axios'
import { useUserDataAtom } from '../../hooks/user_data_atom';

export const TeacherViewCourse = () => {
    const [courses, getCourses] = useState([])
    const [userData, setUserData] = useUserDataAtom();
    const userId = userData._id
    
    useEffect(() => {
        axios.get('http://localhost:3002/getTeachercourses', {
            params: {
                id: userId
            }
        })
        .then(response => {
            getCourses(response.data);
        })
        .catch(err => console.log(err));
    }, []);
    

    console.log("data from view course:" + userId)
    

    return (
        <div className='addcoursecontainer'>
            <nav className='first-nav'>
                <div class="first-nav-logo">
                    <img src="Logo1.1.png" alt="Cour-Cert"></img>
                </div>
                <div className='first-nav-title'>
                    <p className='p1'> Course-Certification</p>
                    <div className='first-nav-title1'>
                        <p className='p2'> "Empowering Your Learning Journey"</p>
                    </div>
                </div>
            </nav>
            <nav className='second-nav'>
                <div class="second-nav-links">
                    <ul>
                        <li><Link to="/teacherviewcourse"> View Course</Link> </li>
                        <li><Link to="/teacherprofile"> Account Profile</Link> </li>
                        <li><Link to="/teacherhomepage"> Back</Link> </li>
                    </ul>
                </div>
            </nav>

            <div className='detail'>
                <div>
                    List of courses
                </div>
                {courses.map(course => {
                    console.log(course)
                    return (
                        <div className='title1'>
                            <Link to={`/teacheraddcourse?title=${course.course_title}&description=${course.course_description}&id=${course._id}`}>
                                {course.course_title}
                            </Link>
                        </div>
                    )
                })}
            </div>
            </div>        
    )
}


