import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ListOfStudents.css";

const ListOfStudents = () => {
  const [students, setStudents] = useState([]);

  async function fetchStudents() {
    const response = await axios.get("http://localhost:3002/getStudentUsers");

    setStudents(response.data);
  }

  console.log("students:", students);

  useEffect(() => {
    fetchStudents();

    return () => {};
  }, []);

  const deleteStudent = async (studentId) => {
    try {
    const response = await axios.delete(
      `http://localhost:3002/deleteStudentUser/${studentId}`
    );
    fetchStudents();
  } catch (error) {
    console.error("Error deleting student:", error);
  }
  };
  
  
  return (
    <div>
      <h1>List of Students</h1>
      {students.map((student) => {
        const { _id, firstName, lastName, gender } = student;
        return (      
          <div key ={_id}>
            <h2>
              Name: {lastName}, {firstName}
            </h2>
            <button onClick={() => deleteStudent(_id)}>Delete</button>
            </div>
        );
      })}
    </div>
  );
};

export default ListOfStudents;
