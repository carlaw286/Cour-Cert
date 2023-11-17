import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import './TeacherViewCourse.css';
import axios from 'axios'
import { useUserDataAtom } from '../../hooks/user_data_atom';
import ReactPaginate from 'react-paginate';

export const TeacherViewCourse = () => {
    const [courses, getCourses] = useState([])
    const [userData, setUserData] = useUserDataAtom();
    const userId = userData._id
    const [currentPage, setCurrentPage] = useState(0);
    const coursesPerPage = 6;


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

    function handlePageClick(selectedPage) {
        setCurrentPage(selectedPage.selected);
    }

    const offset = currentPage * coursesPerPage;
    const currentCourses = courses.slice(offset, offset + coursesPerPage);

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
                {currentCourses.map(course => {
                    console.log(course)
                    return (
                        <div className='title1' key={course._id}>
                            <Link to={`/teacheraddcourse?title=${course.course_title}&description=${course.course_description}&id=${course._id}`}>
                                {course.course_title}
                            </Link>
                        </div>
                    )
                })}
                <ReactPaginate
                className='Paginate'
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={Math.ceil(courses.length / coursesPerPage)}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                />
            </div>
            </div>        
    )
}


