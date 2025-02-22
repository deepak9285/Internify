"use client";

import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY);

export default function AIProjectManager() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const tempData = {
    task: {
      assignee_id: "65d7a8c5f4a2b9e3d1c0a123",
      project_id: "65d7a8c5f4a2b9e3d1c0b456",
      task: "Design Homepage UI",
      desc: "Create a responsive homepage UI using Tailwind CSS.",
      taskCategory: "Frontend Development",
      submissionFormat: "Figma Link",
      status: "To Do",
      assignDate: "2025-02-22T10:00:00.000Z",
      submitDeadline: "2025-02-28T23:59:59.000Z",
      relief: "2025-03-01T00:00:00.000Z"
    },
    project: {
      title: "AI-Powered Resume Analyzer",
      description: "A system that uses AI to analyze resumes and provide feedback.",
      industry: "Tech",
      documents: [
        "https://example.com/project-doc1.pdf",
        "https://example.com/project-doc2.pdf"
      ],
      repo: {
        name: "resume-analyzer",
        url: "https://github.com/example/resume-analyzer",
        owner: "example-user"
      },
      company_id: "65d7b9e4f4a2b9e3d1c0a789",
      skills_required: ["Python", "NLP", "Machine Learning"],
      deadline: "2025-06-15T23:59:59.000Z",
      TotalteamMembersRequired: 5,
      RemainingMembers: 2,
      assigned_students: [
        "65d7c1f9a4b5c8e2d3e0f123",
        "65d7c1f9a4b5c8e2d3e0f456"
      ],
      tasks: [
        "65d7d2e6b5a6f9e4d2c1e789",
        "65d7d2e6b5a6f9e4d2c1e790"
      ],
      admin: "65d7c8e9f4b2d1e3c0a45678",
      createdAt: "2025-02-22T10:00:00.000Z",
      updatedAt: "2025-02-22T12:00:00.000Z"
    },
    users: [
      // ...user data (consider omitting sensitive info in production)
    ]
  };

  const generateProjectPlan = async () => {
    setLoading(true);
    setResponse(null);

    // Adjust task mapping if necessary – here using task title
    const taskDescriptions = tempData.project.tasks
      .map(() => tempData.task.task)
      .join(", ");

    const prompt = `Hi, I am a project manager. I need a project plan for "${tempData.project.title}" in the ${tempData.project.industry} industry. The project description is: ${tempData.project.description}. The project requires the following skills: ${tempData.project.skills_required.join(", ")}. The project deadline is ${tempData.project.deadline}. The team size is ${tempData.project.TotalteamMembersRequired} with ${tempData.project.RemainingMembers} member(s) remaining to be assigned. The tasks include: ${taskDescriptions}. The project documents are available at: ${tempData.project.documents.join(", ")}. The project repository is located at ${tempData.project.repo.url}.`;

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const text = await result.response.text();
      setResponse(text);
    } catch (error) {
      console.error("Error generating project plan:", error);
      setResponse("Error generating project plan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">AI Project Manager</h1>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <p className="mb-4">
          Click the button below to generate a comprehensive project plan using Gemini’s AI.
        </p>
        <button
          onClick={generateProjectPlan}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Project Plan"}
        </button>
        {response && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Generated Project Plan:</h2>
            <div className="prose max-w-none bg-gray-50 p-6 rounded shadow border border-gray-200">
              <ReactMarkdown>{response}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
