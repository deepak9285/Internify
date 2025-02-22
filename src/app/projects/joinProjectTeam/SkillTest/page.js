"use client";

import { useState } from "react";
import Confetti from "react-confetti";

const questions = [
  {
    question: "What is React primarily used for?",
    options: [
      "Backend development",
      "Mobile development",
      "Building UI components",
      "Database management",
    ],
    answer: "Building UI components",
  },
  {
    question: "Which hook is used to manage state in functional components?",
    options: ["useEffect", "useState", "useReducer", "useContext"],
    answer: "useState",
  },
  {
    question: "What does JSX stand for?",
    options: [
      "JavaScript XML",
      "Java Syntax Extension",
      "JavaScript Extension",
      "Java XML",
    ],
    answer: "JavaScript XML",
  },
  {
    question: "Which method is used to update state in class components?",
    options: ["setState()", "updateState()", "modifyState()", "changeState()"],
    answer: "setState()",
  },
  {
    question: "What is the purpose of the useEffect hook?",
    options: [
      "To handle side effects in functional components",
      "To create reusable components",
      "To manage global state",
      "To handle form submissions",
    ],
    answer: "To handle side effects in functional components",
  },
  {
    question: "What is the virtual DOM in React?",
    options: [
      "A copy of the real DOM that React uses for updates",
      "A separate DOM for server-side rendering",
      "A built-in feature to improve CSS styling",
      "A method to store API responses",
    ],
    answer: "A copy of the real DOM that React uses for updates",
  },
];

const ReactQuiz = () => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [score, setScore] = useState(null);
  const [passed, setPassed] = useState(null);

  const handleSelect = (index, selectedOption) => {
    const newAnswers = [...answers];
    newAnswers[index] = selectedOption;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index].answer) {
        correctAnswers++;
      }
    });

    const calculatedScore = (correctAnswers / questions.length) * 100;
    setScore(calculatedScore);
    setPassed(calculatedScore >= 70);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-gradient-to-br from-blue-200 to-purple-300 rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
        🚀 React.js Quiz
      </h1>

      {questions.map((q, index) => (
        <div
          key={index}
          className="mb-6 p-4 bg-white rounded-lg shadow-md transition duration-300 hover:shadow-xl"
        >
          <p className="font-semibold text-lg mb-2">
            {index + 1}. {q.question}
          </p>
          <div className="grid gap-2">
            {q.options.map((option, optionIndex) => (
              <label
                key={optionIndex}
                className={`flex items-center p-3 rounded-lg border ${
                  answers[index] === option
                    ? "bg-blue-500 text-white border-blue-500 shadow-md"
                    : "bg-gray-100 border-gray-300 hover:bg-gray-200"
                } transition duration-200 cursor-pointer`}
              >
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  checked={answers[index] === option}
                  onChange={() => handleSelect(index, option)}
                  className="hidden"
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      ))}

      {/* Progress Bar */}
      <div className="w-full bg-gray-300 h-3 rounded-full overflow-hidden mt-4">
        <div
          className="bg-blue-600 h-full transition-all"
          style={{
            width: `${(answers.filter((a) => a !== null).length / questions.length) * 100}%`,
          }}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 w-full bg-blue-600 text-white text-lg py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        Submit Quiz
      </button>

      {score !== null && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow-md text-center transition transform scale-105">
          <p className="text-xl font-bold text-gray-900">
            🎯 Your Score: <span className="text-blue-600">{score}%</span>
          </p>
          {passed ? (
            <>
              <p className="text-green-600 font-bold mt-2 text-lg">
                🎉 Congratulations! You passed and are added to the project.
              </p>
              <Confetti />
            </>
          ) : (
            <p className="text-red-600 font-bold mt-2 text-lg">
              ❌ You failed. Try again!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ReactQuiz;
