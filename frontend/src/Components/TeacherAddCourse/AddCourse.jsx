import React, { useState } from 'react';
import './AddCourse.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { Textarea } from 'theme-ui'
import axios from 'axios';

export const TeacherAddCourse = () => {
  const location = useLocation();
  const navigate = useNavigate();

  //extract the course title and description from url parameters
  const queryParams = new URLSearchParams(location.search);
  const initialTitle = queryParams.get('title');
  const initialDescription = queryParams.get('description');
  const [courseTitle, setCourseTitle] = useState(initialTitle);
  const [courseDescription, setCourseDescription] = useState(initialDescription);
  const [weekNumbers, setWeekNumbers] = useState([]);

  const [file, setFile] = useState(null);
  const [titlePDF, setTitlePDF] = useState('');
  const id = queryParams.get('id')

  const handleAddWeekNumber = () => {
    // Check if weekNumbers is an array and not empty
    if (Array.isArray(weekNumbers) && weekNumbers.length > 0) {
      // Add a new week number (you can replace 0 with the desired default value)

      // setWeekNumbers([...weekNumbers, 0]);
    } else {
      // If the array is empty, start with 1
      // setWeekNumbers([1]);
    }
  };

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    const courseData = {
      id,
      title: courseTitle,
      description: courseDescription,
      weekNumbers: weekNumbers,
      
    };
    console.log("week#:" + weekNumbers);

    const formData = new FormData();
    formData.append('file', file);

    console.log(courseData)

    await axios.put("http://localhost:3002/updateCourse", {
      ...courseData
    })


    
  };




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
            <li><a href="./teacherviewcourse"> View Course</a> </li>
            <li><a href="./teacherprofile"> Account Profile</a> </li>
            <li><a href="./teacherviewcourse"> Back</a> </li>
          </ul>
        </div>
      </nav>
      <form >
        <div className='details'>
          <div className='title'>
            <input
              type='text'
              id='title'
              placeholder='Your Title'
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
            />
          </div>
          <div className='description'>
            <Textarea
              placeholder='Course Description'
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
            />
          </div>
        </div>

        <div className='addcourse-row'>
          <div className='addcourse-col'>
            <div className='Forms'>
              <input className='form-input1'
                type='text'
                id='topicnumber'
                placeholder='Week #'
                onChange={(e) => {
                  const newWeekNumbers = [...weekNumbers];
                  newWeekNumbers[e.target.id] = e.target.value;

                  setWeekNumbers(newWeekNumbers);

                  console.log("zzzz", newWeekNumbers);

                }
                }>
              </input>
            </div>
            <div className='addfile'>
              <input
                type="text"
                className="callname"
                placeholder="Name of the file after adding the file"
                onChange={(e) => {
                  // const newWeekNumbers = [...weekNumbers];
                  // const index = parseInt(e.target.id, 10); // Parse the id to an integer
                  // newWeekNumbers[index] = e.target.value;

                  // setWeekNumbers(newWeekNumbers);

                  // console.log(newWeekNumbers);
                }}

              />
              <div className='inputfile'>
                <input
                  type='file' id='filename' onChange={handleFileUpload}>
                </input>
              </div>
            </div>
          </div>
          <div className='butts'>
            <button className='add' type='add' onClick={handleAddWeekNumber} > + Add new tile
            </button>
            <button type="submit" onClick={handleSaveChanges}>Save Changes</button>
          </div>
        </div>
      </form>
    </div>
  )
}
