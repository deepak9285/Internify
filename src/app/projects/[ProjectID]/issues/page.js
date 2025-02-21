"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getIssuesByProjectId } from "@/services/issueService";
import IssueForm from "@/components/IssueForm";
import IssueList from "@/components/IssueList";

export default function IssuesPage() {
  const { id: projectId } = useParams();
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    async function fetchIssues() {
      const data = await getIssuesByProjectId(projectId);
      setIssues(data || []);
    }
    fetchIssues();
  }, [projectId]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h1 className="text-3xl font-bold">Issues for Project</h1>

      <IssueForm projectId={projectId} onIssueCreated={setIssues} />
      
      <IssueList issues={issues} />
    </div>
  );
}
