import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import './TeacherViewCourse.css';
import axios from 'axios'

export const TeacherViewCourse = () => {
    const [courses, getCourses] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3002/getTeachercourses')
            .then(courses => getCourses(courses.data))
            .catch(err => console.log(err))
    }, [])

    // console.log(userData)

    // useEffect(() => {


    //     if(userData){
    //         console.log("dapat nnaay value" + userData);
    //         // const { _id } = userData

    //     // const params = {
    //     //     user_id: _id
    //     // }

    //     axios.get('http://localhost:3002/getTeachercourses'
    //     // , 
    //     // { params }
    //     )
    //         .then(courses => {
    //             if (courses.data.status === "Found one") {
    //                 setUserData(courses.data.userCourses);
    //             } else {
    //             }
    //         })
    //         .catch(err => console.log(err))

    //     }


    // }, [])

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
                        <li><a href="#"> View Course</a> </li>
                        <li><a href="./teacherprofile"> Account Profile</a> </li>
                        <li><a href="/teacherhomepage"> Back</a> </li>
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


