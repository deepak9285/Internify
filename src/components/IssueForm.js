"use client";

import { useState } from "react";
// import { raiseIssue } from "@/services/issueService";

export default function IssueForm({ projectId, onIssueCreated }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedRole: "Frontend Developer", // Default role
    priority: "Medium",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

  //   try {
  //     const response = await raiseIssue(projectId, form);
  //     if (response.success) {
  //       alert("Issue Raised Successfully!");
  //       onIssueCreated((prevIssues) => [...prevIssues, response.issue]);
  //       setForm({ title: "", description: "", assignedRole: "Frontend Developer", priority: "Medium" });
  //     } else {
  //       alert("Failed to raise issue: " + response.error);
  //     }
  //   } catch (error) {
  //     alert("Error: " + error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6 bg-gray-100 p-4 rounded-lg shadow">
      <h3 className="text-xl font-semibold">Raise a New Issue</h3>

      <input type="text" name="title" placeholder="Issue Title" className="w-full p-2 border" onChange={handleChange} required />
      <textarea name="description" placeholder="Issue Description" className="w-full p-2 border" onChange={handleChange} required />

      <select name="assignedRole" className="w-full p-2 border" onChange={handleChange}>
        <option>Frontend Developer</option>
        <option>Backend Developer</option>
        <option>Designer</option>
      </select>

      <select name="priority" className="w-full p-2 border" onChange={handleChange}>
        <option>Low</option>
        <option selected>Medium</option>
        <option>High</option>
      </select>

      <button type="submit" className="w-full p-3 bg-blue-600 text-white font-semibold rounded" disabled={loading}>
        {loading ? "Submitting..." : "Raise Issue"}
      </button>
    </form>
  );
}
