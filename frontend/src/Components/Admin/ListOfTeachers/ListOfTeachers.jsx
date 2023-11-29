import React, { useState, useEffect } from "react";
import axios from "axios";

const ListOfTeachers = () => {
  const [teachers, setTeachers] = useState();

  async function fetchTeachers() {
    const response = await axios.get("http://localhost:3002/getStudentUsers");

    setTeachers(response.data);
  }

  console.log("teachers:", teachers);

  useEffect(() => {
    fetchTeachers();
    return () => {};
  }, []);

    return (
      <div>
        <h1>List of Teachers</h1>
        {teachers.map((teacher) => {
          const { firstName, lastName, gender } = teacher;
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

export default ListOfTeachers;
