export default function HowItWorks() {
    return (
      <section className="py-10 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-6">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-200 rounded-lg text-center">
            <h3 className="text-xl font-semibold">1. Create a Project</h3>
            <p>Define project details, team size, and skills required.</p>
          </div>
          <div className="p-4 bg-gray-200 rounded-lg text-center">
            <h3 className="text-xl font-semibold">2. AI Assigns Tasks</h3>
            <p>AI generates a schedule and assigns tasks to team members.</p>
          </div>
          <div className="p-4 bg-gray-200 rounded-lg text-center">
            <h3 className="text-xl font-semibold">3. Track & Complete</h3>
            <p>Monitor progress with GitHub tracking and complete tasks.</p>
          </div>
        </div>
      </section>
    );
  }
  