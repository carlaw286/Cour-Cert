import React, { useState } from 'react';
import './AddCourse.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { Textarea } from 'theme-ui'
import axios from 'axios';
import { useUserDataAtom } from '../../hooks/user_data_atom';

export const TeacherAddCourse = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const initialTitle = queryParams.get('title');
  const initialDescription = queryParams.get('description');
  const [courseTitle, setCourseTitle] = useState(initialTitle);
  const [courseDescription, setCourseDescription] = useState(initialDescription);
  const [weekNumbers, setWeekNumbers] = useState([{ topicnumber: '', callname: '' }]);
  const [file, setFile] = useState(null);
  const [titlePDF, setTitlePDF] = useState('');
  const id = queryParams.get('id');
  const [userData, setUserData] = useUserDataAtom();

  console.log("data from add course:" + userData.id)
  const handleAddWeekNumber = () => {
    setWeekNumbers([...weekNumbers, { topicnumber: '', callname: '' }]);
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
      weekNumbers,
    };

    const formData = new FormData();
    formData.append('file', file);

    console.log(courseData);

    await axios.put("http://localhost:3002/updateCourse", {
      ...courseData
    });
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
        {weekNumbers.map((week, index) => (
        <div className='addcourse-row' key={index}>
          <div className='addcourse-col'>
            <div className='Forms'>
              <input
                className='form-input1'
                type='text'
                id='topicnumber'
                placeholder='Week #'
                value={week.topicnumber}
                onChange={(e) => {
                  const newWeekNumbers = [...weekNumbers];
                  newWeekNumbers[index].topicnumber = e.target.value;
                  setWeekNumbers(newWeekNumbers);
                }}
              />
            </div>
            <div className='addfile'>
              <input
                type="text"
                className="callname"
                placeholder="Name of the file after adding the file"
                value={week.callname}
                onChange={(e) => {
                  
                }}
              />
              <div className='inputfile'>
                <input
                  type='file'
                  id='filename'
                  onChange={handleFileUpload}
                />
              </div>
            </div>
          </div>
        </div>
        ))}
        <div className='butts'>
        <button className='add' type='add' onClick={handleAddWeekNumber}>+ Add new tile</button>
        <button type="submit" onClick={handleSaveChanges}>Save Changes</button>
        </div>
        </form>
    </div>
  );
};
