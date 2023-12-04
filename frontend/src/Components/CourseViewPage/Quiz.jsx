import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Quiz = ({id}) => {
  const [quizzes, setQuizzes] = useState([]);
  const currentCourseID = id;/*display courseid here*/
  console.log("Course ID from cView = " +currentCourseID);

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
 // State to track user's selected answers
 const [userAnswers, setUserAnswers] = useState({});
 // State to track whether the quiz has been submitted
 const [submitted, setSubmitted] = useState(false);

 // Function to handle radio button selection
 const handleRadioChange = (questionId, choice) => {
   setUserAnswers((prevAnswers) => ({
     ...prevAnswers,
     [questionId]: choice,
   }));
 };

 // Function to handle quiz submission
 const handleSubmit = () => {
   setSubmitted(true);
   // You can now compare userAnswers with correct answers for scoring, etc.
 };

 return (
  <div className="courseQuiz">
    <div className='QuizTitle'>
        <h2>Quiz</h2>
      </div>
    <ul>
      {filteredQuizzes.map((quiz) => (
        <li key={quiz._id}>
          {/* ... (your existing code) */}
          <ul className="choices-list">
            {quiz.questions.map((question) => (
              <li key={question._id}>
                <p>{question.questionText}</p>
                <ul>
                  {question.choices.map((choice, index) => (
                    <li key={index}>
                      <input
                        type="radio"
                        id={`${question._id}_${index}`}
                        name={question._id}
                        value={choice}
                        onChange={() => handleRadioChange(question._id, choice)}
                        disabled={submitted}
                      />
                      <label htmlFor={`${question._id}_${index}`}>{choice}</label>
                    </li>
                  ))}
                </ul>
                {submitted && <p>Correct Answer: {question.correctAnswer}</p>}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
    <button
      className="Quiz_submit-button"
      type="button"
      onClick={handleSubmit}
      disabled={submitted}
    >
      Submit Quiz
    </button>
  </div>
);
};

export default Quiz;