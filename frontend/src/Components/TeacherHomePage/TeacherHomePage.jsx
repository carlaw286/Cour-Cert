import React from 'react';
import './TeacherHomePage.css'
import { useNavigate } from 'react-router-dom';
export const TeacherHomePage = () => 
{
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
              <li><a href = "#"> View Course</a> </li>
              <li><a href = "./teacherprofile"> Account Profile</a> </li>
              <li><a href = "./"> Signout</a> </li>
             </ul>
           </div>
       </nav>
       <div class ="addCourse">
          <button id="addbutton">Add Course</button>
       </div>
     </div>     



      // <div className='homepage'>
      //   <nav className='teachernav'>
      //     <div class ="app-logo1">
      //       <img src = "Logo.png" alt= "Cour-Cert" height={150} width={100}></img>
      //     </div>
      //     <div class = "searchBar">
      //       <input type = "text" id="search-input" placeholder="Search here"></input>
      //       <button id="search-button">Search</button>
      //     </div>
      //     <div class ="nav-links">
      //       <ul>
      //         <li><a href = "#"> View Course</a> </li>
      //         <li><a href = "#"> Account</a> </li>
      //         <li><a href = "./"> Signout</a> </li>
      //       </ul>
      //     </div>
      //   </nav>
      //   {/* <div class="container"></div> */}
      //   <div class ="addCourse">

      //       <button id="add-button">Add Course</button>
      //     </div>
      // </div>      
  );
}

