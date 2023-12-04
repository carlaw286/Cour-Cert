import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const currentCourseID = '656d4a1fe79b118f6250f3d7';

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:3002/quiz');
        setQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, []);

  // Move filtering inside useEffect to ensure it happens after data fetching
  const filteredQuizzes = quizzes.filter((quiz) => quiz.courseID === currentCourseID);

  return (
    <div>
      <h1>Quizzes</h1>
      <ul>
        {filteredQuizzes.map((quiz) => (
          <li key={quiz._id}>
            <h2>{quiz.courseID}</h2>
            
            {console.log("CourseID: " + quiz.courseID)}
            <ul>
              {quiz.questions.map((question) => (
                <li key={question._id}>
                  <p>{question.questionText}</p>
                  <ul>
                    {question.choices.map((choice, index) => (
                      <li key={index}>{choice}</li>
                    ))}
                  </ul>
                  <p>Correct Answer: {question.correctAnswer}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Quiz;
