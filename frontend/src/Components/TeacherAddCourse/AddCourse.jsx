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
  const [weeklyData, setWeeklyData] = useState([]);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [addFileButtonEnabled, setAddFileButtonEnabled] = useState(false);

  
  console.log("data ID from view course: " + id);

  const handleAddFile = () => {
    // Check if the pdfFile is not empty
    if (!pdfFile) {
      // Alert the user or perform some action to inform them
      alert('Please submit a file before adding.');
      return;
    }
  
    // Check if the week already exists in the weeklyData array
    const existingWeekIndex = weeklyData.findIndex(entry => entry.weekNumber === week);
  
    if (existingWeekIndex !== -1) {
      // Week already exists, update the existing entry
      const updatedWeeklyData = [...weeklyData];
      updatedWeeklyData[existingWeekIndex] = {
        weekNumber: week,
        file: pdfFile,
        PDFdescription: pdfTitle,
      };
      setWeeklyData(updatedWeeklyData);
    } else {
      // Week doesn't exist, add a new entry to the weeklyData array
      setWeeklyData(prevData => [...prevData, { weekNumber: week, file: pdfFile, PDFdescription: pdfTitle }]);
    }
  
    // Disable the "Add File" button after adding a file
    setAddFileButtonEnabled(false);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const WeeklyData = {
      id,
      weekNumber: week,
      file: pdfFile,
      PDFdescription: pdfTitle,
    };

    for (const weeklyEntry of weeklyData) {
      const weekly = await axios.post("http://localhost:3002/AddFiles", weeklyEntry, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(weekly);
    }

    setFileUploaded(true);
    setAddFileButtonEnabled(true);
  }


  const handleSaveChanges = async (e) => {
    e.preventDefault();


    const courseData = {
      id,
      course_title : courseTitle,
      course_description: courseDescription,
    };

    

    console.log(courseTitle,courseDescription,week,pdfTitle,pdfFile,id)
    // Handle your axios request with the updated courseData
    const data = await axios.put("http://localhost:3002/updateCourse", courseData);
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
        {weeklyData.map((entry, index) => (
          <WeeklyTile key={index} weekNumber={entry.weekNumber} pdfTitle={entry.PDFdescription} pdfFile={entry.file} />
        ))}
        <div className="addcourse-row">
          <div className="addcourse-col">
            <div className="Forms">
              <input
                className="form-input1"
                type="text"
                id="topicnumber"
                placeholder="Week #"
                value={week}
                onChange={(e) => setWeek(e.target.value)}
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
            <button
              type="button"
              onClick={handleAddFile}
              disabled={!addFileButtonEnabled}
            >
              Add File
            </button>
            <button type="submit" onClick={handleSubmit}>
              Upload File
            </button>
          </div>
        </div>  
        <div className="butts">
          <button type="submit" onClick={handleSaveChanges}>
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

const WeeklyTile = ({ weekNumber, pdfTitle, pdfFile }) => (
  <div className="weekly-tile">
    <p>Week {weekNumber}</p>
    <p>Title: {pdfTitle}</p>
    {/* Add more details or styling as needed */}
  </div>
);