import ProjectForm from "./form";

export default function CreateProjectPage() {
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Create a New Project</h2>
      <ProjectForm />
    </div>
  );
}
