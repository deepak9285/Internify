"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

export default function SkillTest() {
  const searchParams = useSearchParams();
  const selectedSkill = searchParams.get("skill");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [passed, setPassed] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (selectedSkill) {
      fetchQuestions();
    }
  }, [selectedSkill]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.post("/api/gemini", { prompt: `Generate 10 multiple-choice questions for React js` });
      console.log(response);
      setQuestions(response.data.questions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleSelect = (index, option) => {
    setAnswers({ ...answers, [index]: option });
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.answer) {
        correctAnswers++;
      }
    });

    const calculatedScore = (correctAnswers / questions.length) * 100;
    setScore(calculatedScore);
    setPassed(calculatedScore >= 70);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800">Skill Test - {selectedSkill}</h1>
      {questions.length === 0 ? (
        <p className="text-gray-600 mt-4">Loading questions...</p>
      ) : (
        <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md mt-4">
          {questions.map((q, index) => (
            <div key={index} className="mb-4">
              <p className="font-medium">{index + 1}. {q.question}</p>
              <div className="flex flex-col">
                {q.options.map((option, i) => (
                  <label key={i} className="mt-1">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      checked={answers[index] === option}
                      onChange={() => handleSelect(index, option)}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={handleSubmit}
            className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
          >
            Submit Test
          </button>

          {score !== null && (
            <div className="mt-4">
              <p className="text-lg font-bold">Your Score: {score}%</p>
              {passed ? (
                <p className="text-green-600 font-bold">Congratulations! You are assigned to the project.</p>
              ) : (
                <p className="text-red-600 font-bold">You failed. Try again!</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
