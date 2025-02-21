import Link from "next/link";

export default function ProjectCard({ project }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg border hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold text-gray-900">{project.title}</h2>
                <span className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded-full">
                    {project.industry}
                </span>
            </div>
            
            <p className="text-gray-700 mb-4 line-clamp-2">{project.description}</p>

            <div className="text-sm text-gray-500 mb-3">
                <span className="font-semibold">Deadline:</span> {new Date(project.deadline).toLocaleDateString()}
            </div>

            <Link href={`/projects/${project._id}`} passHref>
                <button className="w-full mt-3 py-2 px-4 text-white font-medium bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                    View Details
                </button>
            </Link>
        </div>
    );
}
