"use client";

import { useState } from "react";
import { createProject } from "@/app/services/projectService";
import { useRouter } from "next/navigation"; // Redirect after form submission

export default function ProjectForm() {
  const router = useRouter();

  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user._id);

  const [form, setForm] = useState({
    title: "",
    description: "",
    industry: "",
    documents: [],
    repo: { name: "", url: "", owner: "" },
    skills_required: "",
    deadline: "",
    TotalTeamMembersRequired: "",
    _id: user._id,
  });

  const [filePreview, setFilePreview] = useState([]);
  const [loading, setLoading] = useState(false); // For button state

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("repo.")) {
      const field = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        repo: { ...prev.repo, [field]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    setForm((prev) => ({
      ...prev,
      documents: files.map((file) => file.name),
    }));

    const fileURLs = files.map((file) => URL.createObjectURL(file));
    setFilePreview(fileURLs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const userId = localStorage.getItem("user")._id;
    const formattedData = {
      ...form,
      skills_required: form.skills_required.split(",").map((s) => s.trim()),
      userId,
    };

    try {
      const response = await createProject(formattedData);
      alert(response.message);
    } catch (error) {
      alert("Error creating project: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        placeholder="Project Title"
        className="w-full p-2 border"
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Project Description"
        className="w-full p-2 border"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="industry"
        placeholder="Industry"
        className="w-full p-2 border"
        onChange={handleChange}
        required
      />

      <h3 className="text-lg font-semibold mt-4">Company & Team</h3>
      <input
        type="text"
        name="company_id"
        placeholder="Company ID"
        className="w-full p-2 border"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="TotalTeamMembersRequired"
        placeholder="Total Team Members Required"
        className="w-full p-2 border"
        onChange={handleChange}
        required
      />

      <h3 className="text-lg font-semibold mt-4">GitHub Repository</h3>
      <input
        type="text"
        name="repo.name"
        placeholder="Repo Name"
        className="w-full p-2 border"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="repo.url"
        placeholder="Repo URL"
        className="w-full p-2 border"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="repo.owner"
        placeholder="Repo Owner"
        className="w-full p-2 border"
        onChange={handleChange}
        required
      />

      <h3 className="text-lg font-semibold mt-4">Skills & Deadline</h3>
      <input
        type="text"
        name="skills_required"
        placeholder="Required Skills (comma-separated)"
        className="w-full p-2 border"
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="deadline"
        className="w-full p-2 border"
        onChange={handleChange}
        required
      />

      <h3 className="text-lg font-semibold mt-4">Upload Project Documents</h3>
      <input
        type="file"
        multiple
        className="w-full p-2 border"
        onChange={handleFileChange}
      />

      {filePreview.length > 0 && (
        <div className="mt-4">
          <h4 className="text-md font-semibold">File Preview:</h4>
          <ul>
            {filePreview.map((url, index) => (
              <li key={index} className="text-blue-500">
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {form.documents[index]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        type="submit"
        className="w-full p-3 bg-blue-600 text-white font-semibold rounded"
        disabled={loading}
      >
        {loading ? "Creating Project..." : "Create Project"}
      </button>
    </form>
  );
}
