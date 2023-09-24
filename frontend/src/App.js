import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import { LoginSignup} from './Components/LoginSignup/LoginSignup';
import { TeacherHomePage} from './Components/TeacherHomePage/TeacherHomePage';


function App() {
  return (
    <>
      <Routes>
        <Route path = '/' element = {<LoginSignup/>}/>
        <Route path = '/teacherhomepage' element = {<TeacherHomePage/>}/>
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