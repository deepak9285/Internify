import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between p-10 bg-blue-600 text-white">
      <div className="md:w-1/2">
        <h1 className="text-4xl font-bold mb-4">
          Manage Projects with AI-Powered Tasking
        </h1>
        <p className="text-lg">
          Create, track, and automate project workflows with AI-powered task management.
        </p>
        <div className="mt-6">
          <Link href="/projects/create">
            <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg mr-4">
              Create a Project
            </button>
          </Link>
          <Link href="/projects">
            <button className="px-6 py-3 bg-gray-200 text-blue-600 font-semibold rounded-lg">
              View Projects
            </button>
          </Link>
        </div>
      </div>
      <div className="md:w-1/2 hidden md:block">
        <img src="/project-management.svg" alt="Project Management" className="w-full" />
      </div>
    </section>
  );
}
