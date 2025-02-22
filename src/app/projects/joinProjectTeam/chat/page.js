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

    // Example: map tasks (using task title from tempData)
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
    <div className="min-h-screen bg-gray-100 p-8 space-y-8">
      <h1 className="text-3xl font-bold text-center">AI Project Manager</h1>

      {/* AI Generated Project Plan Section */}
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
          <>
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-4">Generated Project Plan:</h2>
              
            </div>
            {/* Only show the table once we have a response */}
            <ProjectPlanTable />
          </>
        )}
      </div>
    </div>
  );
}

function ProjectPlanTable() {
  return (
    <div className="overflow-x-auto p-4 bg-gray-100">
      <table className="min-w-full divide-y divide-gray-200 bg-white shadow rounded">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Field
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Example
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {/* Project Information */}
          <tr>
            <td className="px-2 py-2 whitespace-nowrap">Project Name</td>
            <td className="px-2 py-2 whitespace-nowrap">Text</td>
            <td className="px-2 py-2 whitespace-nowrap">Name of the project</td>
            <td className="px-2 py-2 whitespace-nowrap">AI-Powered Resume Analyzer</td>
          </tr>
          <tr>
            <td className="px-2 py-2 whitespace-nowrap">Project Goal</td>
            <td className="px-2 py-2 whitespace-nowrap">Text</td>
            <td className="px-2 py-2 whitespace-nowrap">Overall objective of the project</td>
            <td className="px-2 py-2 whitespace-nowrap">
              To develop an AI-powered system that analyzes resumes and provides insightful feedback to improve candidate applications.
            </td>
          </tr>
          <tr>
            <td className="px-2 py-2 whitespace-nowrap">Project Deadline</td>
            <td className="px-2 py-2 whitespace-nowrap">Date</td>
            <td className="px-2 py-2 whitespace-nowrap">Target completion date</td>
            <td className="px-2 py-2 whitespace-nowrap">2025-06-15</td>
          </tr>
          <tr>
            <td className="px-2 py-2 whitespace-nowrap">Project Manager</td>
            <td className="px-2 py-2 whitespace-nowrap">Text</td>
            <td className="px-2 py-2 whitespace-nowrap">Name of the project manager</td>
            <td className="px-2 py-2 whitespace-nowrap">[Your Name]</td>
          </tr>
          <tr>
            <td className="px-2 py-2 whitespace-nowrap">Team Size</td>
            <td className="px-2 py-2 whitespace-nowrap">Number</td>
            <td className="px-2 py-2 whitespace-nowrap">Total number of team members</td>
            <td className="px-2 py-2 whitespace-nowrap">5</td>
          </tr>
          <tr>
            <td className="px-2 py-2 whitespace-nowrap">Team Members</td>
            <td className="px-2 py-2 whitespace-nowrap">List</td>
            <td className="px-2 py-2 whitespace-nowrap">Names of team members (including unassigned)</td>
            <td className="px-2 py-2 whitespace-nowrap">
              Member 1, Member 2, Member 3, [Unassigned], [Unassigned]
            </td>
          </tr>
          <tr>
            <td className="px-2 py-2 whitespace-nowrap">Required Skills</td>
            <td className="px-2 py-2 whitespace-nowrap">List</td>
            <td className="px-2 py-2 whitespace-nowrap">Technical skills needed for the project</td>
            <td className="px-2 py-2 whitespace-nowrap">
              Python, NLP, Machine Learning, UI/UX Design
            </td>
          </tr>
          <tr>
            <td className="px-2 py-2 whitespace-nowrap">Project Documents</td>
            <td className="px-2 py-2 whitespace-nowrap">List</td>
            <td className="px-2 py-2 whitespace-nowrap">Links to relevant project documentation</td>
            <td className="px-2 py-2 whitespace-nowrap">
              <a
                href="https://example.com/project-doc1.pdf"
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://example.com/project-doc1.pdf
              </a>,{" "}
              <a
                href="https://example.com/project-doc2.pdf"
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://example.com/project-doc2.pdf
              </a>
            </td>
          </tr>
          <tr>
            <td className="px-2 py-2 whitespace-nowrap">Project Repository</td>
            <td className="px-2 py-2 whitespace-nowrap">URL</td>
            <td className="px-2 py-2 whitespace-nowrap">Link to the project's source code repository</td>
            <td className="px-2 py-2 whitespace-nowrap">
              <a
                href="https://github.com/example/resume-analyzer"
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://github.com/example/resume-analyzer
              </a>
            </td>
          </tr>
          {/* Project Phases */}
          <tr>
            <td className="px-2 py-2 whitespace-nowrap">
              Phase 1: Requirements Gathering &amp; Design (Start Date: 2024-06-15, End Date: 2024-09-15)
            </td>
            <td className="px-2 py-2 whitespace-nowrap">Section</td>
            <td className="px-2 py-2 whitespace-nowrap">Description of the phase</td>
            <td className="px-2 py-2 whitespace-nowrap">
              Define project scope, detailed specifications, UI/UX design, database schema design, and initial architecture.
            </td>
          </tr>
          <tr>
            <td className="px-2 py-2 whitespace-nowrap">Phase 1 Tasks</td>
            <td className="px-2 py-2 whitespace-nowrap">List</td>
            <td className="px-2 py-2 whitespace-nowrap">Tasks within Phase 1</td>
            <td className="px-2 py-2 whitespace-nowrap">
              Detailed Requirements Document, Database Design, UI/UX Mockups, System Architecture Diagram
            </td>
          </tr>
          <tr>
            <td className="px-2 py-2 whitespace-nowrap">
              Phase 2: Development (Start Date: 2024-09-16, End Date: 2025-03-15)
            </td>
            <td className="px-2 py-2 whitespace-nowrap">Section</td>
            <td className="px-2 py-2 whitespace-nowrap">Description of the phase</td>
            <td className="px-2 py-2 whitespace-nowrap">
              Implement the AI model, develop the backend and frontend, integrate the NLP and ML components.
            </td>
          </tr>
          <tr>
            <td className="px-2 py-2 whitespace-nowrap">Phase 2 Tasks</td>
            <td className="px-2 py-2 whitespace-nowrap">List</td>
            <td className="px-2 py-2 whitespace-nowrap">Tasks within Phase 2</td>
            <td className="px-2 py-2 whitespace-nowrap">
              Data Collection and Preprocessing, NLP Model Development, ML Model Training and Evaluation, Backend API Development, Frontend Development, Integration Testing
            </td>
          </tr>
          <tr>
            <td className="px-2 py-2 whitespace-nowrap">
              Phase 3: Testing and Deployment (Start Date: 2025-03-16, End Date: 2025-06-15)
            </td>
            <td className="px-2 py-2 whitespace-nowrap">Section</td>
            <td className="px-2 py-2 whitespace-nowrap">Description of the phase</td>
            <td className="px-2 py-2 whitespace-nowrap">
              Thorough testing (unit, integration, system), bug fixing, deployment to a production environment.
            </td>
          </tr>
          <tr>
            <td className="px-2 py-2 whitespace-nowrap">Phase 3 Tasks</td>
            <td className="px-2 py-2 whitespace-nowrap">List</td>
            <td className="px-2 py-2 whitespace-nowrap">Tasks within Phase 3</td>
            <td className="px-2 py-2 whitespace-nowrap">
              Unit Testing, Integration Testing, System Testing, User Acceptance Testing (UAT), Deployment, Documentation
            </td>
          </tr>
          {/* Risk & Communication */}
          <tr>
            <td className="px-2 py-2 whitespace-nowrap">Risk Management</td>
            <td className="px-2 py-2 whitespace-nowrap">Section</td>
            <td className="px-2 py-2 whitespace-nowrap">
              Potential risks and mitigation strategies.
            </td>
            <td className="px-2 py-2 whitespace-nowrap">
              Data bias in training data (Mitigation: careful data selection and bias detection techniques), Model accuracy issues (Mitigation: rigorous testing and model tuning), Project delays (Mitigation: Agile methodology, regular progress monitoring)
            </td>
          </tr>
          <tr>
            <td className="px-2 py-2 whitespace-nowrap">Communication Plan</td>
            <td className="px-2 py-2 whitespace-nowrap">Section</td>
            <td className="px-2 py-2 whitespace-nowrap">
              How communication will be managed within the team and with stakeholders.
            </td>
            <td className="px-2 py-2 whitespace-nowrap">
              Weekly team meetings, progress reports, regular updates to stakeholders.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}



