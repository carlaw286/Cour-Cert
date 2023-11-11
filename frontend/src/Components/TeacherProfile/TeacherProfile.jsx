import React, { useState, useEffect } from 'react';
import './TeacherProfile.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useUserDataAtom } from "../../hooks/user_data_atom";

export const TeacherProfile = () => 
{
  const navigate = useNavigate();
  // State to track whether the form is in edit mode
  const [editMode, setEditMode] = useState(false);
  // State to store form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [userData, setUserData] = useUserDataAtom();
  
  console.log(userData);
  const {
    birthDate = "",
    email = "",
    firstName = "",
    lastName = "",
    _id = "",
  } = userData || {};

    // Function to handle input changes
    const handleInputChange = (e) => {
      const { id, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    };

    const toggleEditMode = () => {
      if (editMode) {
        // If currently in edit mode, reset form data to initial state on cancel
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
      }
      setEditMode(!editMode);
    };

    const [teacherUser, setTeacherUser] = useState({});

  useEffect(() => {
    // Replace 'user@example.com' with the actual email you want to query
    axios
      .get(
        `http://localhost:3002/studentprofile?userId=carlo.amadeo286@gmail.com`
      )
      .then((result) => setTeacherUser(result.data))
      .catch((err) => console.log(err));
  }, []);

  return(
    <div className='profilepage'>
      <form>
        <div className='row-1'>
          <div className='prof-container'>
          <div className='user-avatar'> 
            <img src='./default_profile.webp'></img>           
          </div>
          <div className='user-about'> 
            <h1>About</h1>
          </div>
          <div className='about1'>
            <div className=''>

            </div>
          </div>
          </div>
          <div className='info-container'>
            <div className='label0'>
              <p> Personal Information</p>
            </div>
            <div className='col-1'>
              <p>First Name</p>
              <p>Last Name</p>
            </div>
            <div className="col-2">
              <input
                type="name"
                id="firstName"
                placeholder="Enter first name"
                value={firstName}
                onChange={handleInputChange}
                disabled={!editMode}
              >
                {/* // Disable input if not in edit mode */}
              </input>
              <input
                type="name"
                id="lastName"
                placeholder="Enter last name"
                value={lastName}
                onChange={handleInputChange}
                disabled={!editMode}
              >
                {/* // Disable input if not in edit mode */}
                </input>
            </div>
            <div className='col-3'>
              <p>Email</p>
            </div>
            <div className='col-4'>
              <input type='email' id='email' placeholder='Enter email' 
                value={email}
                onChange={handleInputChange}
                disabled={!editMode}> 

                {/* // Disable input if not in edit mode */}
                </input>
            </div>
            <div className="col-5">
              <p>Password</p>
              <p>Confirm Password</p>
            </div>
            <div className="col-6">
              <input
                type="name"
                id="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleInputChange}
                disabled={!editMode}
              >
                {/* // Disable input if not in edit mode */}
              </input>
              <input
                type="name"
                id="confirmPassword"
                placeholder="Enter confirm password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                disabled={!editMode}
              > 

                {/* // Disable input if not in edit mode */}
                </input>
            </div>

            <div className="col-7">
              <div className="but1">
                <button
                  type="button"
                  onClick={() => navigate("/studenthomepage")}
                >
                  {" "}
                  Back
                </button>
              </div>
              <div className="but2">
                <button type="button" id="edit" onClick={toggleEditMode}>
                  {editMode ? "Cancel" : "Edit"}
                </button>
              </div>
              <div className="but3">
                <button type="submit" id="update" disabled={!editMode}>
                  {" "}
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};