import React, { useState, useEffect } from "react";
import axios from "axios";

const ListOfStudents = () => {
  const [students, setStudents] = useState();

  async function fetchStudents() {
    const response = await axios.get("http://localhost:3002/getStudentUsers");

    setStudents(response.data);
  }

  console.log("students:", students);

  useEffect(() => {
    fetchStudents();

    return () => {};
  }, []);

  return (
    <div>
      <h1>List of Students</h1>
      {students.map((student) => {
        const { firstName, lastName, gender } = student;
        return (
          <>
            <h2>
              Name: {lastName}, {firstName}
            </h2>
            <h3>Gender: {gender}</h3>
          </>
        );
      })}
    </div>
  );
};

export default ListOfStudents;
