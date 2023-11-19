import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import './StudentViewCourse.css';
import axios from 'axios'
import { useUserDataAtom } from '../../hooks/user_data_atom';
import ReactPaginate from 'react-paginate';

export const StudentViewCourse = () => {
    const [count, setCount] = useState(0);
    const [checked, setChecked] = useState(0);
    const [percentage, setPercentage] = useState(0)
    const [courses, getCourses] = useState([])
    const [userData, setUserData] = useUserDataAtom();
    const navigate = useNavigate();

    //jwt
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:3002/studentviewcourse")
      .then((result) => {
        console.log(result);
        
      console.log("Token: " +result.data);
        if (result.data !== "Success") {
          navigate("/loginsignup");
        }
      })
      .catch((err) => console.log(err));
  }, []);
//
    const userId = userData._id
    const [currentPage, setCurrentPage] = useState(0);
    const coursesPerPage = 6;

    console.log("user ID:" + userId);

    useEffect(() => {
        axios.get('http://localhost:3002/getEnrolledcourses', {
            params: {
                id: userId
            }
        })
        .then(response => {
            getCourses(response.data);
        })
        .catch(err => console.log(err));
    }, []);

    const offset = currentPage * coursesPerPage;
    const currentCourses = courses.slice(offset, offset + coursesPerPage);
  
    return(
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
                        <li><Link to="/studentviewcourse"> View Course</Link> </li>
                        <li><Link to="/studentprofile"> Account Profile</Link> </li>
                        <li><Link to="/studenthomepage"> Back</Link> </li>
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
                            <Link to={`/studentaddcourse?title=${course.course_title}&description=${course.course_description}&id=${course._id}`}>
                                {course.course_title}
                            </Link>
                        </div>
                    )
                })}
                <div>
                <ReactPaginate
                className='paginate'
                breakLabel="..."
                nextLabel="next >"
                pageRangeDisplayed={5}
                pageCount={Math.ceil(courses.length / coursesPerPage)}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                />
                </div>
               
            </div>
            </div>  
            );      
}



