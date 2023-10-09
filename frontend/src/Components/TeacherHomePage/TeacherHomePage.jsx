import React from 'react';
import './TeacherHomePage.css'
import { useNavigate } from 'react-router-dom';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const TeacherHomePage = () => 
{
  const [open, setOpen] = React.useState(false);

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
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Course
      </Button>
      <Dialog open={open} onClose={handleClose}>
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
          />

          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => navigate('/teacheraddcourse')}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
     </div>           
  );
}

