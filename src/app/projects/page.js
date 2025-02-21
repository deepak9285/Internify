import { getProjects } from "@/app/services/projectService";
import ProjectCard from "@/components/projects/ProjectCard";

export default async function ProjectsPage() {
    const projects = await getProjects();
    console.log("projects",projects);

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-6">Projects</h1>
            <div className="grid gap-4">
                {projects.map((project) => (
                    <ProjectCard key={project._id} project={project} />
                ))}
            </div>
        </div>
    );
}
