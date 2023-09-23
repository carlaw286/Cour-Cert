import React from 'react';
import './App.css';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import TeacherHomePage from './Components/TeacherHomePage/TeacherHomePage';


function HomePageTeacher()
{
  return(
    <div>
    <TeacherHomePage/>
  </div>     
  );
}
function Loginpage() {
  return (
    <div>
      <LoginSignup/>
    </div>
  );
}


export default HomePageTeacher;