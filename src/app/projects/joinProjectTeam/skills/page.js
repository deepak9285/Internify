'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';

const skills = ["React.js", "Node.js", "Figma", "Python", "AI"];

export default function JoinProject() {
  const [selectedSkill, setSelectedSkill] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const router = useRouter();

  const handleNext = () => {
    if (selectedSkill) {
      router.push('/projects/joinProjectTeam/skillTest');
    }
  };

  const handleSkillSelect = async (skill) => {
    setSelectedSkill(skill);
    try {
      const response = await axios.post('/api/generate-response', { prompt: `Tell me about ${skill}` });
      setAiResponse(response.data.text);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Join Project Team</h1>
      <p className="text-gray-600 mb-6 text-center">Select a skill to proceed:</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <button
            key={skill}
            className={`px-6 py-3 border rounded-lg text-lg font-medium transition duration-300 ${
              selectedSkill === skill
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white hover:bg-gray-200"
            }`}
            onClick={() => handleSkillSelect(skill)}
          >
            {skill}
          </button>
        ))}
      </div>
      {aiResponse && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
          <p className="text-gray-800">{aiResponse}</p>
        </div>
      )}
      <button
        className={`mt-6 px-6 py-3 text-lg font-medium rounded-lg transition ${
          selectedSkill
            ? "bg-blue-500 text-white hover:bg-blue-700"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        disabled={!selectedSkill}
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
}