import { getProjectById } from "@/services/projectService";

export default async function ProjectPage({ params }) {
    const project = await getProjectById(params.id);

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
            <h1 className="text-3xl font-bold">{project.title}</h1>
            <p className="text-lg">{project.description}</p>
            <p className="text-gray-500">Industry: {project.industry}</p>
            <p className="text-gray-500">Deadline: {new Date(project.deadline).toDateString()}</p>

            <h3 className="text-xl font-bold mt-4">Team Members</h3>
            <ul>
                {project.assigned_students.map(student => (
                    <li key={student._id}>{student.name} ({student.email})</li>
                ))}
            </ul>

            <h3 className="text-xl font-bold mt-4">GitHub Repository</h3>
            <a href={project.repo.url} target="_blank" className="text-blue-500">
                {project.repo.name} (by {project.repo.owner})
            </a>
        </div>
    );
}
