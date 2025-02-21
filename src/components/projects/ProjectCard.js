import Link from "next/link";

export default function ProjectCard({ project }) {
    return (
        <div className="p-4 border rounded-lg shadow-md">
            <h2 className="text-lg font-bold">{project.title}</h2>
            <p>{project.description}</p>
            <p className="text-sm text-gray-500">Industry: {project.industry}</p>
            <Link href={`/projects/${project._id}`} className="text-blue-500">View Details</Link>
        </div>
    );
}
