import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentHomePage.css";
import "./addlogo.png";
import axios from "axios";
import { useUserDataAtom } from "../../hooks/user_data_atom";
import { Link } from "react-router-dom";

export const StudentHomePage = () => {
  const [userData, setUserData] = useUserDataAtom();
  const navigate = useNavigate();

  console.log(userData);

  //jwt
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:3002/studenthomepage")
      .then((result) => {
        console.log(result);
        if (result.data !== "Success") {
          navigate("/loginsignup");
        }
      })
      .catch((err) => console.log(err));
  }, []);
  //jwt
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
          ></input>
          <button id="search-button">Search</button>
        </div>
        <div class="nav-link2">
          <ul>
            <li>
              <Link to="/studentviewcourse">My Course</Link>
              {/* <Link to="./studentviewcourse"> My Course</Link>{" "} */}
            </li>
            <li>
              <Link to="/">Certifications</Link>
              {/* <Link to="#"> Certifications</Link>{" "} */}
            </li>
            <li>
              <Link to="/">Support</Link>
              {/* <Link to="#"> Support</Link>{" "} */}
            </li>
            <li>
              <Link to="/profilepage">My Profile</Link>
              {/* <Link to="./profilepage"> My Profile</Link>{" "} */}
            </li>
            <li>
              <Link to="/">Signout</Link>
              {/* <Link to="./"> Signout</Link>{" "} */}
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
