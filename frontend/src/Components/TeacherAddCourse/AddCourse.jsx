import React, { useState } from 'react';
import './AddCourse.css';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useUserDataAtom } from '../../hooks/user_data_atom';
import { Textarea } from 'theme-ui';
import axios from 'axios';

export const TeacherAddCourse = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialTitle = queryParams.get('title');
  const initialDescription = queryParams.get('description');
  const [courseTitle, setCourseTitle] = useState(initialTitle);
  const [courseDescription, setCourseDescription] = useState(initialDescription);
  const id = queryParams.get('id');
  const [userData, setUserData] = useUserDataAtom();
  const [week, setWeek] = useState('')
  const [pdfTitle, setPdfTitle] = useState('');
  const [pdfFile, setPdfFile] = useState('');
  console.log("user id:" + id);

  const handleSaveChanges = async (e) => {
    e.preventDefault();


    const courseData = {
      id,
      course_title : courseTitle,
      course_description: courseDescription,
      weekNumber: week,
      title: courseTitle,
      file: pdfFile
    };

    console.log(courseTitle,courseDescription,week,pdfTitle,pdfFile,id)
    // Handle your axios request with the updated courseData
    const data = await axios.put("http://localhost:3002/updateCourse", courseData,{
      headers : {"Content-Type": "multipart/form-data"},
    });
    console.log(data);
  };
  
  

  return (
    <div className="addcoursecontainer">
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
            <li><Link to="/teacherviewcourse"> View Course</Link > </li>
            <li><Link to="/teacherprofile"> Account Profile</Link > </li>
            <li><Link to="/teacherviewcourse"> Back</Link > </li>
          </ul>
        </div>
      </nav>
      <form encType="multipart/form-data">
        <div className="details">
          <div className="title">
            <input
              type="text"
              id="title"
              placeholder="Your Title"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
            />
          </div>
          <div className="description">
            <Textarea
              placeholder="Course Description"
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
            />
          </div>
        </div>
          <div className="addcourse-row">
            <div className="addcourse-col">
              <div className="Forms">
                <input
                  className="form-input1"
                  type="text"
                  id="topicnumber"
                  placeholder="Week #"
                  value={week}
                  onChange= {(e) => setWeek(e.target.value)}
                />
                <input
                  type="text"
                  className="PdfFilename"
                  placeholder="Title of the file"
                  value={pdfTitle}
                  onChange={(e) => setPdfTitle(e.target.value)}
                />
                <div className="inputfile">
                  <input
                    type="file"
                    name="pdfFile"
                    accept=".pdf"
                    onChange={(e) => setPdfFile(e.target.files[0])}
                  />
                </div>
              </div>
            </div>
          </div>
        <div className="butts">
          <button type="button" >
            + Add new week
          </button>
          <button type="submit" onClick={handleSaveChanges}>
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};