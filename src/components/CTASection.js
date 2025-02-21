import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-10 text-center bg-blue-600 text-white">
      <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
      <p className="text-lg">Create a project now and let AI manage your workflow.</p>
      <div className="mt-6">
        <Link href="/projects/create">
          <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg">
            Create a Project
          </button>
        </Link>
      </div>
    </section>
  );
}
