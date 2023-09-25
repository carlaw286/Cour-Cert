import React from 'react';
// import './App.css';
import {Routes, Route} from 'react-router-dom';
import {LandingPage} from './Components/LandingPage/LandingPage';
import { LoginSignup} from './Components/LoginSignup/LoginSignup';
import { TeacherHomePage} from './Components/TeacherHomePage/TeacherHomePage';
import { TeacherSignup} from './Components/TeacherSignup/TeacherSignup';
import { StudentSignup} from './Components/StudentSignup/StudentSignup';
import {StudentHomePage} from './Components/StudentHomePage/StudentHomePage';





function App() {
  return (
    <>
      <Routes>
        <Route path = '/' element = {<LoginSignup/>}/>
        <Route path = '/loginsignup' element = {<LoginSignup/>}/>
        <Route path = '/teacherhomepage' element = {<TeacherHomePage/>}/>
        <Route path = '/teachersignup' element = {<TeacherSignup/>}/>
        <Route path = '/studentsignup' element = {<StudentSignup/>}/>
        <Route path = '/studenthomepage' element = {<StudentHomePage/>}/>
      </Routes>
    </>
    

    
  )
}

export default App;


// function HomePageTeacher()
// {
//   return(
//     <div>
//     <TeacherHomePage/>
//   </div>     
//   );
// }
// function Loginpage() {
//   return (
//     <div>
//       <LoginSignup/>
//     </div>
//   );
// }


// export default LoginSignup;