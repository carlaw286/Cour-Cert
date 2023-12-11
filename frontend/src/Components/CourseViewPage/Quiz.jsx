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
 const calculateScore = () => {
  let score = 0;
  filteredQuizzes.forEach((quiz) => {
    quiz.questions.forEach((question) => {
      const userAnswer = userAnswers[question._id];
      if (userAnswer === question.correctAnswer) {
        score += 1;
      }
    }

    return true;
  };

  const handleSubmit = () => {
    const allCorrect = checkAnswers();
    setShowCongrats(allCorrect);
    setSubmitted(true);
  };

  const handleRetakeQuiz = () => {
    setAnswers({});
    setShowCongrats(false);
    setSubmitted(false);
  };

  const questions = [
    {
      id: 1,
      text: 'What is the capital of France?',
      choices: ['Paris', 'Berlin', 'Madrid', 'Rome'],
    },
    {
      id: 2,
      text: 'Which planet is known as the Red Planet?',
      choices: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
    },
    {
      id: 3,
      text: 'What is the largest mammal in the world?',
      choices: ['Blue Whale', 'Elephant', 'Giraffe', 'Hippopotamus'],
    },
    {
      id: 4,
      text: 'Who wrote "Romeo and Juliet"?',
      choices: ['William Shakespeare', 'Jane Austen', 'Charles Dickens', 'Mark Twain'],
    },
    {
      id: 5,
      text: 'Which programming language is this quiz written in?',
      choices: ['JavaScript', 'Python', 'Java', 'C++'],
    },
  ];

  return (
    <div className='courseQuiz'>
      <div className='QuizTitle'>
        <h2>Quiz</h2>
      </div>
      {questions.map((question) => (
        <div key={question.id}>
          <p>{question.text}</p>
          <ul className='choices-list'>
            {question.choices.map((choice, index) => (
              <li key={index}>
                <label>
                  <input
                    type='radio'
                    name={`question-${question.id}`}
                    value={choice}
                    checked={answers[question.id] === choice}
                    onChange={() => handleChoiceChange(question.id, choice)}
                  />
                  {choice}
                </label>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
    {submitted && (
      <p>
        Your Score: {calculateScore()} / {filteredQuizzes.reduce((total, quiz) => total + quiz.questions.length, 0)}
      </p>
    )}
    <button
      className="Quiz_submit-button"
      type="button"
      onClick={handleSubmit}
      disabled={submitted}
    >
      Submit Quiz
    </button>
    <button
      className="Quiz_retake-button"
      type="button"
      onClick={handleRetake}
      disabled={!submitted}
    >
      Retake Quiz
    </button>
  </div>
);
};

export default Quiz;
