import React from 'react';
import './StudentHomePage.css';
import  './addlogo.png'

export const StudentHomePage = () => 
{
  return(
      <div className='studenthomepage'>
        <nav>
          <div class ="app-logo">
            <img src = "/logo/AppLogo.png" alt= "Cour-Cert" height={150} width={100}></img>
          </div>
          <div class = "searchBar">
            <input type = "text" id="search-input" placeholder="Search here"></input>
            <button id="search-button">Search</button>
          </div>
          <div class ="nav-links">
            <ul>
              <li><a href = "#"> My Course</a> </li>
              <li><a href = "#"> Certifications</a> </li>
              <li><a href = "#"> Support</a> </li>
              <li><a href = "#"> My Profile</a> </li>
            </ul>
          </div>
        </nav>
        <div class ="addcoursebutton">
            <button id="addbutton"></button>
        </div>
      </div>      
  );
}

