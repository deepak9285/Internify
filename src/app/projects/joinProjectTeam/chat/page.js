"use client";

import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";

const genAI = new GoogleGenerativeAI("AIzaSyA8l7ivFdyYSygG_1vJJ6Gmr_WoOPVr0Fg");

export default function AIProjectManager() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  // Temporary data (replace or fetch these as needed)
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
      description:
        "A system that uses AI to analyze resumes and provide feedback.",
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
      // user data (omit sensitive information in production)
    ]
  };

  const generateProjectPlan = async () => {
    setLoading(true);
    setResponse(null);

    // Map tasks (using task title from tempData)
    const taskDescriptions = tempData.project.tasks
      .map(() => tempData.task.task)
      .join(", ");

    const prompt = `Hi, I am a project manager. I need a project plan for "${tempData.project.title}" in the ${tempData.project.industry} industry. The project description is: ${tempData.project.description}. The required skills are: ${tempData.project.skills_required.join(
      ", "
    )}. The project deadline is ${tempData.project.deadline}. The team size is ${tempData.project.TotalteamMembersRequired} with ${tempData.project.RemainingMembers} member(s) remaining to be assigned. The tasks include: ${taskDescriptions}. The project documents are available at: ${tempData.project.documents.join(
      ", "
    )}. The project repository is located at ${tempData.project.repo.url}.`;

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
    <div className="min-h-screen w-full bg-gradient-to-r from-indigo-500 to-purple-600 flex flex-col">
      {/* Header */}
      <header className="w-full py-6 text-center">
        <h1 className="text-4xl font-extrabold text-white">
          AI Project Manager
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-white rounded-t-3xl p-8 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <p className="mb-8 text-center text-lg text-gray-700">
            Generate a comprehensive project plan using Gemini’s AI.
            Click the button below to get started.
          </p>
          <div className="flex justify-center">
            <button
              onClick={generateProjectPlan}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
              disabled={loading}
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
              )}
              <span>{loading ? "Generating..." : "Generate Project Plan"}</span>
            </button>
          </div>
          {response && (
            <>
              <section className="mt-12">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                  Project Plan Details
                </h2>
                <ProjectPlanTable />
              </section>
              <section className="mt-12">
                <div className="bg-white shadow-xl rounded-xl p-6">
                  <div className="flex justify-between items-center border-b pb-3">
                    <h2 className="text-3xl font-bold text-gray-800">
                      Generated Project Plan
                    </h2>
                    <button
                      onClick={() => navigator.clipboard.writeText(response)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                      Copy Plan
                    </button>
                    
                  </div>
                  <div className="mt-6">
                    <GeneratedPlanContent response={response} />
                  </div>
                </div>
              </section>
              <TeamOverview />
            </>
          )}


        </div>
      </main>
    </div>
  );
}

function GeneratedPlanContent({ response }) {
  // If the response doesn't include markdown section headings ("##"), show the whole plan.
  if (!response.includes("## ")) {
    return (
      <div className="prose prose-lg">
        <ReactMarkdown>{response}</ReactMarkdown>
      </div>
    );
  }
  // Split the markdown content into sections based on headings (assumes sections start with "##")
  const sections = response.split(/\n(?=##\s)/);
  return (
    <div className="space-y-4">
      {sections.map((section, idx) => {
        const lines = section.split("\n");
        let title = lines[0];
        let content = lines.slice(1).join("\n");
        if (title.startsWith("##")) {
          title = title.replace(/^##\s*/, "");
        } else {
          title = "Overview";
          content = section;
        }
        return <Accordion key={idx} title={title} content={content} />;
      })}
    </div>
  );
}

function Accordion({ title, content }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="border rounded-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-left bg-gray-100 hover:bg-gray-200 transition"
      >
        <div className="flex justify-between items-center">
          <span className="text-xl font-semibold text-gray-800">
            {title}
          </span>
          <span className="text-gray-600">{isOpen ? "-" : "+"}</span>
        </div>
      </button>
      {isOpen && (
        <div className="px-4 py-2">
          <div className="prose prose-lg">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}

function TeamOverview() {
  // You can derive these values from your project data.
  const totalTeam = 5;
  const remaining = 2;
  const assigned = totalTeam - remaining;

  return (
    <div className="bg-white shadow-xl rounded-xl p-6 mt-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Team Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Team Size Card */}
        <div className="bg-gray-50 p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Team Size</h3>
          <p className="text-gray-600">{totalTeam} Members</p>
          <div className="mt-2">
            <div className="h-4 w-full bg-gray-300 rounded-full">
              <div
                className="h-4 bg-blue-600 rounded-full"
                style={{ width: `${(assigned / totalTeam) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {assigned} filled, {remaining} positions open
            </p>
          </div>
        </div>
        {/* Team Roles (To be Assigned) Card */}
        <div className="bg-gray-50 p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Team Roles (To be Assigned)</h3>
          <ul className="list-disc list-inside text-gray-600">
            <li>
              <span className="font-medium">Data Scientist (1):</span> Focus on model building, training, and evaluation.
            </li>
            <li>
              <span className="font-medium">Frontend Developer (1):</span> Responsible for designing the UI.
            </li>
          </ul>
        </div>
        {/* Existing Team Members Card */}
        <div className="bg-gray-50 p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Existing Team Members</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mr-2">
                M1
              </div>
              <div>
                <p className="font-medium text-gray-700">Member 1 Name</p>
                <p className="text-sm text-gray-500">Backend Developer</p>
              </div>
            </li>
            <li className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center mr-2">
                M2
              </div>
              <div>
                <p className="font-medium text-gray-700">Member 2 Name</p>
                <p className="text-sm text-gray-500">Project Architect/Team Lead</p>
              </div>
            </li>
            <li className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center mr-2">
                M3
              </div>
              <div>
                <p className="font-medium text-gray-700">Member 3 Name</p>
                <p className="text-sm text-gray-500">DevOps Engineer</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function InteractiveProjectPlan({ response }) {
  // Split the response by markdown headings ("##"). If none exist, display the full plan.
  const sections = response.includes("##")
    ? response.split(/\n(?=##\s)/)
    : [response];

  // Display each section as an interactive flip card in a responsive grid.
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {sections.map((section, idx) => {
        const lines = section.split("\n");
        let title = lines[0];
        let content = lines.slice(1).join("\n");
        if (title.startsWith("##")) {
          title = title.replace(/^##\s*/, "");
        } else {
          title = "Overview";
          content = section;
        }
        return (
          <FlipCard key={idx} title={title} content={content} />
        );
      })}
    </div>
  );
}

function FlipCard({ title, content }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-full h-full"
      style={{ perspective: "1000px" }} // Enables 3D effect
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform ${
          flipped ? "rotate-y-180" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Side */}
        <div
          className="absolute inset-0 bg-white rounded-lg shadow p-6 backface-hidden flex flex-col justify-between cursor-pointer"
          style={{ WebkitBackfaceVisibility: "hidden", backfaceVisibility: "hidden" }}
          onClick={() => setFlipped(true)}
        >
          <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
          <div className="mt-4 text-gray-600">
            <ReactMarkdown>
              {content.substring(0, 100) + (content.length > 100 ? "..." : "")}
            </ReactMarkdown>
          </div>
          <button
            className="mt-4 self-end bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            onClick={(e) => {
              e.stopPropagation();
              setFlipped(true);
            }}
          >
            View Details
          </button>
        </div>
        {/* Back Side */}
        <div
          className="absolute inset-0 bg-white rounded-lg shadow p-6 backface-hidden transform rotate-y-180 flex flex-col justify-between overflow-y-auto"
          style={{ WebkitBackfaceVisibility: "hidden", backfaceVisibility: "hidden" }}
          onClick={() => setFlipped(false)}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{title} Details</h3>
          <div className="text-gray-600" style={{ maxHeight: "300px" }}>
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
          <button
            className="mt-4 self-end bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
            onClick={(e) => {
              e.stopPropagation();
              setFlipped(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}



function ProjectPlanTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Field</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Example</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-4 py-2">Project Name</td>
            <td className="px-4 py-2">Text</td>
            <td className="px-4 py-2">Name of the project</td>
            <td className="px-4 py-2">AI-Powered Resume Analyzer</td>
          </tr>
          <tr>
            <td className="px-4 py-2">Project Goal</td>
            <td className="px-4 py-2">Text</td>
            <td className="px-4 py-2">Overall objective of the project</td>
            <td className="px-4 py-2">
              To develop an AI-powered system that analyzes resumes and provides insightful feedback.
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2">Project Deadline</td>
            <td className="px-4 py-2">Date</td>
            <td className="px-4 py-2">Target completion date</td>
            <td className="px-4 py-2">2025-06-15</td>
          </tr>
          <tr>
            <td className="px-4 py-2">Project Manager</td>
            <td className="px-4 py-2">Text</td>
            <td className="px-4 py-2">Name of the project manager</td>
            <td className="px-4 py-2">[Your Name]</td>
          </tr>
          <tr>
            <td className="px-4 py-2">Team Size</td>
            <td className="px-4 py-2">Number</td>
            <td className="px-4 py-2">Total number of team members</td>
            <td className="px-4 py-2">5</td>
          </tr>
          <tr>
            <td className="px-4 py-2">Team Members</td>
            <td className="px-4 py-2">List</td>
            <td className="px-4 py-2">Names of team members (including unassigned)</td>
            <td className="px-4 py-2">Member 1, Member 2, Member 3, [Unassigned], [Unassigned]</td>
          </tr>
          <tr>
            <td className="px-4 py-2">Required Skills</td>
            <td className="px-4 py-2">List</td>
            <td className="px-4 py-2">Technical skills needed for the project</td>
            <td className="px-4 py-2">Python, NLP, Machine Learning, UI/UX Design</td>
          </tr>
          <tr>
            <td className="px-4 py-2">Project Documents</td>
            <td className="px-4 py-2">List</td>
            <td className="px-4 py-2">Links to relevant project documentation</td>
            <td className="px-4 py-2">
              <a href="https://example.com/project-doc1.pdf" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                Document 1
              </a>,{" "}
              <a href="https://example.com/project-doc2.pdf" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                Document 2
              </a>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2">Project Repository</td>
            <td className="px-4 py-2">URL</td>
            <td className="px-4 py-2">Link to the project's source code repository</td>
            <td className="px-4 py-2">
              <a href="https://github.com/example/resume-analyzer" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                GitHub Repository
              </a>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2">
              Phase 1: Requirements Gathering &amp; Design (Start: 2024-06-15, End: 2024-09-15)
            </td>
            <td className="px-4 py-2">Section</td>
            <td className="px-4 py-2">Define project scope, detailed specs, UI/UX design, and initial architecture.</td>
            <td className="px-4 py-2">
              Documentation, UI Mockups, Database Schema, Architecture Diagram
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2">Phase 1 Tasks</td>
            <td className="px-4 py-2">List</td>
            <td className="px-4 py-2">Tasks within Phase 1</td>
            <td className="px-4 py-2">
              Requirements Document, Database Design, UI/UX Mockups, Architecture Diagram
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2">
              Phase 2: Development (Start: 2024-09-16, End: 2025-03-15)
            </td>
            <td className="px-4 py-2">Section</td>
            <td className="px-4 py-2">Develop AI model, backend, frontend, and integrate NLP/ML components.</td>
            <td className="px-4 py-2">
              Data Collection, Model Training, API Development, Frontend Integration
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2">Phase 2 Tasks</td>
            <td className="px-4 py-2">List</td>
            <td className="px-4 py-2">Tasks within Phase 2</td>
            <td className="px-4 py-2">
              Data Collection, NLP Model, ML Training, API, Frontend, Integration Testing
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2">
              Phase 3: Testing and Deployment (Start: 2025-03-16, End: 2025-06-15)
            </td>
            <td className="px-4 py-2">Section</td>
            <td className="px-4 py-2">Test, fix bugs, and deploy to production.</td>
            <td className="px-4 py-2">
              Unit Testing, Integration Testing, UAT, Deployment, Documentation
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2">Risk Management</td>
            <td className="px-4 py-2">Section</td>
            <td className="px-4 py-2">Potential risks and mitigation strategies.</td>
            <td className="px-4 py-2">
              Data bias, model accuracy, project delays (Mitigations: careful data selection, testing, Agile practices)
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2">Communication Plan</td>
            <td className="px-4 py-2">Section</td>
            <td className="px-4 py-2">Plan for team and stakeholder communication.</td>
            <td className="px-4 py-2">
              Weekly meetings, progress reports, stakeholder updates.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
