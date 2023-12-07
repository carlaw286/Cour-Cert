import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentHomePage.css";
import "./addlogo.png";
import axios from "axios";
import { useUserDataAtom } from "../../hooks/user_data_atom";
import { Link } from "react-router-dom";

export const StudentHomePage = () => {
  const [userData, setUserData] = useUserDataAtom();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);
  const [initialRequestComplete, setInitialRequestComplete] = useState(false);
  const [courses, getCourses] = useState([])
  const [currentPage, setCurrentPage] = useState(0);
  console.log(userData);

  //jwt
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:3002/studenthomepage")
      .then((result) => {
        console.log(result);
        
      console.log("Token: " +result.data);
        if (result.data !== "Success") {
          navigate("/loginsignup");
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setInitialRequestComplete(true);
      });
  }, []);

  const handleSearch = () => {
    axios
      .get(`http://localhost:3002/searchcourse?query=${searchQuery}`)
      .then((result) => {
        console.log(result);
        setSearchResults(result.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setSearchButtonClicked(true);
      })
  };


  const coursesPerPage = 5;
  const offset = currentPage * coursesPerPage;
  const currentCourses = courses.slice(offset, offset + coursesPerPage);
  const hiddenCourses = courses.slice(coursesPerPage);



  if (coursesPerPage == 6)
  {}
  
  useEffect(() => { 
    const userId = userData._id;

    axios.get('http://localhost:3002/getEnrolledcourses', {
        params: {
            id: userId
        }
    })
    .then(response => {
        getCourses(response.data);
        console.log("Token2: " + response.data);
    })
    .catch(err => console.log(err));
}, [setUserData, userData._id]);


  if (!initialRequestComplete) {
    // Initial request still in progress
    return null; // or loading indicator if needed
  }

  return (
    <div className="studenthomepage">
      <nav className="navHomepage">
        <div className="app-logo1">
          <img src="logo.png" alt="Cour-Cert" height={160} width={100}></img>
        </div>
        <div className="searchBar2">
          <input
            type="search"
            id="search-input"
            placeholder="Search here"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          ></input>
          <button id="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
        {searchResults !== null && searchResults.length > 0 ? (
  <div className="search-results">
    <h2>Search Results:</h2>
    <ul>
      {searchResults.map((course) => (
        <li key={course.id}>
          <Link to={`/course/${course.id}`}>{course.course_title}</Link>
        </li>
      ))}
    </ul>
  </div>
) : (
  searchButtonClicked && searchResults.length === 0 && (
    <div className="no-results-found">
      <p>No results found</p>
    </div>
  )
)}
        <div className="nav-link2">
          <ul>
            <li>
              <Link to="/studentviewcourse">My Course</Link>
            </li>
            <li>
              <Link to="/">Certifications</Link>
            </li>
            <li>
              <Link to="/profilepage">My Profile</Link>
            </li>
            <li>
              <Link to="/">Signout</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="addcoursebutton">
        <button id="addbutton" onClick={() => navigate("/allcourselist")}></button>
      </div>

      {
        courses.length > 0 &&(
          <ul className="app-cards">
            {
              currentCourses.map(course =>{
                return(
                  <div className="app-cards-card">
                    <li key={course._id}>
                <div className="app-cards-title">
                  <h1>{course.course_title}</h1>
                </div>
                <div className="app-cards-description">
                  <h3>{course.course_description}</h3>
                </div>
              </li>
                </div>
                )
              })
            }
               {hiddenCourses.length > 0 && (
          <div className="app-cards-card">
            <li>
              <div className="app-cards-title">
                <h1>See More</h1>
              </div>
              <div className="app-cards-description">
                <h3>
                  {/* Add the link or handle redirection logic here */}
                  <a href="/your-link">Click to see more</a>
                </h3>
              </div>
            </li>
          </div>
        )}


          </ul>
        )
      }



    </div>
  );
};