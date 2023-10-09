import React, {useState} from 'react';
import './TeacherHomePage.css'
import { useNavigate } from 'react-router-dom';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from 'axios'

export const TeacherHomePage = () => 
{
  const [open, setOpen] = useState(false);
  const [course_title, setCourseTitle] = useState('');
  const [course_description, setCourseDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        //backend website for database storing
        const response = await axios.post('http://localhost:3002/teacher_AddCourse', {
          course_title,
          course_description,
        });
    
        console.log(response.data);
    
        // Check if the response contains an error message
        if (response.data === 'Course already added') {
          setErrorMessage('Course already added');
        } else {
           // Successful registration
          setSuccessMessage('Add Course Success!');
          setErrorMessage(''); // Clear any existing error message            // Redirect to view course after a delay
           setTimeout(() => {
            navigate('/teacherviewcourse');
          }, 2000); // Adjust the delay as needed
        }
      } catch (error) {
        console.error(error);
        // Handle other errors if needed
        setErrorMessage('An error occurred. Please try again.');
  }};


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  return(
      <div className='teacherhomepage'>
       <nav className='navHomepage'>
          <div class ="app-logo1">
            <img src = "logo.png" alt= "Cour-Cert" height={160} width={100}></img>
          </div>
          <div class = "searchBar1">
            <input type = "text" id="search-input" placeholder="Search here"></input>
            <button id="search-button">Search</button>
          </div>
          <div class ="nav-links1">
            <ul>
              <li><a href = "./teacherviewcourse"> View Course</a> </li>
              <li><a href = "./teacherprofile"> Account Profile</a> </li>
              <li><a href = "./"> Signout</a> </li>
             </ul>
           </div>
       </nav>
        <div className='addCourse'>
      <Button variant="outlined" onClick={handleClickOpen} >
        Add Course
      </Button>
      <Dialog open={open} onClose={handleClose} onSubmit={handleSubmit}>
        <DialogTitle>Add Courses</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Input Details Below:
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title of the Course?"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setCourseTitle(e.target.value)}
          />

          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setCourseDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          {/* Display error or success message if present */}
          {successMessage && <div className='success-message'>{successMessage}</div>}
          {errorMessage && <div className='error-message'>{errorMessage}</div>}
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
     </div>           
  );
}

