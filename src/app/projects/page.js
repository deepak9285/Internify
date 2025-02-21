"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getProjects } from "@/services/projectService";
import ProjectCard from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/button";

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      const data = await getProjects();
      setProjects(data?.data || []);
    }
    fetchProjects();
  }, []);

  const handleClick = (projectId) => {
    router.push(`/projects/${projectId}`);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Projects</h1>

      {projects.length === 0 ? (
        <p className="text-gray-500 text-center">No projects found.</p>
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => (
            <Button key={project._id} className="w-full text-left" onClick={() => handleClick(project._id)}>
              <ProjectCard project={project} />
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
