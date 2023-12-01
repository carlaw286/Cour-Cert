// Questionnaire.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Questionnaire = () => {
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Fetch questionnaire data from the backend API
    axios.get('http://localhost:5000/questionnaire')
      .then((response) => setQuestions(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleInputChange = (e) => {
    // Update form data on input change
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Submit form data to the backend API
    axios.post('http://localhost:5000/questionnaire/response', formData)
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h2>Course Questionnaire</h2>
      <form>
        {questions.map((question) => (
          <div key={question._id}>
            <p>{question.text}</p>
            {/* Render input fields based on question type */}
            {question.type === 'multiple-choice' && (
              <select name={question._id} onChange={handleInputChange}>
                {question.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
            {/* Add other question types as needed */}
          </div>
        ))}
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Questionnaire;
