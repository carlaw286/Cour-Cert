import React, { Component, useEffect, useState } from 'react';
import './StudentViewCourse.css'
import axios from "axios";
import { useUserDataAtom } from "../../hooks/user_data_atom";
import { useNavigate } from "react-router-dom";

export const StudentViewCourse = () => {
    const [count, setCount] = useState(0);
    const [checked, setChecked] = useState(0);
    const [percentage, setPercentage] = useState(0)
    const [userData, setUserData] = useUserDataAtom();
    const navigate = useNavigate();

    //jwt
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:3002/studentviewcourse")
      .then((result) => {
        console.log(result);
        
      console.log("Token: " +result.data);
        if (result.data !== "Success") {
          navigate("/loginsignup");
        }
      })
      .catch((err) => console.log(err));
  }, []);
//

    useEffect(() => {
      countBoxes();
      countChecked();
    }, []);
  
    function countBoxes() {
      const checkboxes = document.querySelectorAll("input[type='checkbox']");
      setCount(checkboxes.length);
    }
  
    function countChecked() {
      const checkedCheckboxes = document.querySelectorAll("input:checked");
      setChecked(checkedCheckboxes.length);
      const calculatedPercentage = parseInt((checkedCheckboxes.length / count) * 100, 10);
      setPercentage(calculatedPercentage);
    }
  
    return (
      <div>
            <input type="checkbox" onChange={countBoxes} onClick={countChecked} />
            <input type="checkbox" onChange={countBoxes} onClick={countChecked}/>
            <input type="checkbox"onChange={countBoxes} onClick={countChecked} />
            <input type="checkbox" onChange={countBoxes} onClick={countChecked}/>
            <input type="checkbox" onChange={countBoxes} onClick={countChecked}/>

        <div class="progressbar-container">
            <div className="progressbar-bar" style={{ width: `${percentage}%` }}></div>
            <div className="progressbar-label">{percentage}%</div>
        </div>
        
        <div class = "ready"></div>
      </div>
    );
  }
  