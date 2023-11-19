import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserDataAtom } from "../../hooks/user_data_atom";

export const ProfilePage = () => {
  const navigate = useNavigate();
  // State to track whether the form is in edit mode
  const [editMode, setEditMode] = useState(false);
  // State to store form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showDropdown, setShowDropdown] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [userData, setUserData] = useUserDataAtom();
  
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
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
    setEditMode(!editMode);
  };

  const [studentUser, setStudentUser] = useState({});
  
    //jwt
    axios.defaults.withCredentials = true;
    
   
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
    
    console.log(userData);
    axios
      .get(
        `http://localhost:3002/studentprofile?userId=${_id}`
      )
      .then((result) => {setStudentUser(result.data)
      console.log(result);
      console.log("Result: " +result.data);
      if (result.data !== "Success") {
        navigate("/loginsignup");
      }
    })
      
      .catch((err) => console.log(err));
  }, []);
  
  
  
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Send updated data to the server
    axios
      .put(`http://localhost:3002/updatestudentprofile?userId=${_id}`, formData)
      .then((response) => {
        // Assuming your server sends back the updated user data
        setUserData(response.data);
        localStorage.setItem('userData', JSON.stringify(response.data));
        // Disable edit mode after successful update
        setEditMode(false);
        setSuccessMessage("Profile details updated successfully"); // Set success message
        setTimeout(() => setSuccessMessage(""), 3000);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  return (
    <div className="profilepage">
      <form onSubmit={handleFormSubmit}>
        <div className="row-1">
          <div className="prof-container">
            <div className="user-avatar">
              <img src="./default_profile.webp"></img>
            </div>
            <div className="user-about">
              <h1> About </h1>
            </div>
            <div className="about1">
              <div className=""></div>
            </div>
          </div>
          <div className="info-container">
            <div className="label0">
              <p> Personal Information</p>
            </div>

            <div className="col-1">
              <p>First Name</p>
              <p>Last Name</p>
            </div>

            <div className="col-2">
              <input
                type="name"
                id="firstName"
                placeholder="Enter first name"
                value={editMode ? formData.firstName : firstName}
                onChange={handleInputChange}
                disabled={!editMode}
              >
                {/* // Disable input if not in edit mode */}
              </input>
              <input
                type="name"
                id="lastName"
                placeholder="Enter last name"
                value={editMode ? formData.lastName : lastName}
                onChange={handleInputChange}
                disabled={!editMode}
              >
                {/* // Disable input if not in edit mode */}
              </input>
            </div>
            <div className="col-3">
          <p>Email</p>
        </div>
        <div className="col-4">
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            value={editMode ? formData.email : email}
            onChange={handleInputChange}
            disabled={!editMode}
              >
                {/* // Disable input if not in edit mode */}
              </input>
            </div>
            <div>
              <button
                className="dropdown-toggle"
                type = "button"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {showDropdown ? "Hide" : "Change Password"}
              </button>

              {showDropdown && (
                <div>
                  <div className="col-5">
                    <p>Password</p>
                    <p>Confirm Password</p>
                  </div>
                  <div className="col-6">
                    <input
                      type="password"
                      id="password"
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={handleInputChange}
                      disabled={!editMode}
                    />
                    <input
                      type="password"
                      id="confirmPassword"
                      placeholder="Enter confirm password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      disabled={!editMode}
                    />
                  </div>
                </div>
              )}
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
              <div className="success-message" style={{ color: "green" }}>
             {successMessage}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
