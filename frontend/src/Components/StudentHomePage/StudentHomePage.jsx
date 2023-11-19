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
  console.log("UserData: " +userData._id);

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
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = () => {
    axios
      .get(`http://localhost:3002/searchcourse?query=${searchQuery}`)
      .then((result) => {
        console.log(result);
        setSearchResults(result.data);
      })
      .catch((err) => console.log(err));
  };
  //jwt
  
  const handleSignout = async () => {
    localStorage.removeItem('token');
    try {
      // Make a request to the server to invalidate the session
      await axios.post("http://localhost:3002/signout");

      // Clear user data and navigate to the login/signup page
      setUserData(null);
      navigate("/loginsignup");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };


  return (
    <div className="studenthomepage">
      <nav className="navHomepage">
        <div class="app-logo1">
          <img src="logo.png" alt="Cour-Cert" height={160} width={100}></img>
        </div>
        <div class="searchBar2">
          <input
            type="search"
            id="search-input"
            placeholder="Search here"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          ></input>
          <button id="search-button" onClick={handleSearch}
          >Search</button>
        </div>
        {searchResults.length > 0 && (
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
        )}
        <div class="nav-link2">
          <ul>
            <li>
              <Link to="/studentviewcourse">My Course</Link>
              {/* <a href="./studentviewcourse"> My Course</a>{" "} */}
            </li>
            <li>
              <Link to="/">Certifications</Link>
              {/* <a href="#"> Certifications</a>{" "} */}
            </li>
            <li>
              <Link to="/profilepage">My Profile</Link>
              {/* <a href="./profilepage"> My Profile</a>{" "} */}
            </li>
            <li>
            <Link to="/" onClick={handleSignout}>
                Signout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div class="addcoursebutton">
        <button
          id="addbutton"
          onClick={() => navigate("/allcourselist")}
        ></button>
      </div>
    </div>
  );
};
