import { useNavigate } from 'react-router-dom';
import React, { useEffect,useState } from 'react';
import { useUserDataAtom } from '../../hooks/user_data_atom';
import Button from "@mui/material/Button";
import axios from 'axios'
import './StudentAddCourse.css';


export const StudentAddCourse = () => 
{
    const [userData, setUserData] = useUserDataAtom();
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    console.log("data: " + userData._id);

    const handleSubmit = async (e) => {

        try {
          const { _id } = userData

          //backend website for database storing
          const response = await axios.post('http://localhost:3002/student_AddCourse', {
            user_id: _id,
            object_id: _id,
          });
      
          // Check if the response contains an error message
          if (response.data === 'Course already added') {
            setErrorMessage('Course already added');
          } else {
            // setUserData(response.data)
             // Successful registration
            setSuccessMessage('Add Course Success!');
            setErrorMessage(''); // Clear any existing error message            
            // Redirect to view course after a delay
             setTimeout(() => {
              navigate('/studentviewcourse'); //change to student view course
            }, 2000); // Adjust the delay as needed
          }
        } catch (error) {
          console.error(error);
          // Handle other errors if needed
          setErrorMessage('An error occurred. Please try again.');
    }};


    const [search, setSearch] = useState('');
    const [courses, getCourses] = useState([]);

    useEffect( ()=>{
        axios.get('http://localhost:3002/getStudentcourses')
        .then(courses => getCourses(courses.data))
        .catch( err => console.log(err))
    },[])
    
    const navigate = useNavigate();
    return(
        <div className='addcoursecontainer1'>
        <nav className='first-nav1'>
            <div class ="first-nav-logo1">
            <a href='/studenthomepage'>
                     <img src = "Logo1.1.png" alt=    "Cour-Cert"></img>
                </a>
         </div>
            <div className='first-nav-title1'>
                <p className='p1'> Course-Certification</p>
            <div className='first-nav-title1'>
            <p className='p2'> "Empowering Your Learning Journey"</p>
            </div>
        </div>
    </nav>
    <nav className='second-nav2'>
    <div className='studentsearch'>
    <input 
        type = "text" 
        id="search-input" 
        placeholder="Search here" 
        onChange={event=>{setSearch(event.target.value)}}></input>
    </div>
    <div class ="second-nav-links2">
        <ul>
          <li><a href = "/studenthomepage"> Back</a> </li>
         </ul>
       </div>
    </nav>

    <div className='Descript'>
        ALL COURSES AVAILABLE
    </div>
    <div className='details1'> 
    {successMessage && <div className='success-message'>{successMessage}</div>}
          {errorMessage && <div className='error-message'>{errorMessage}</div>}
        {courses.map(course => {
            return (<div className='course-box'>
                <div className='titles1'>
                    <a href='courseviewpage'>
                        {course.course_title}
                    </a>  
                </div>
                <div className='Courses'>
                    <div className='description1'>
                        <p>{course.course_description}</p>
                    </div>
                    <div className='enrollcourse'>
                        <Button type='submit' onClick={handleSubmit}>
                            Enroll Course
                        </Button>
                    </div>
                </div>                    
            </div>
        )})
        }
    </div>
    <div className='space'>
    </div>
    </div>
    )
}

