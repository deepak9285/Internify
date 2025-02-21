export default function Features() {
    const features = [
      { title: "AI Task Management", description: "AI auto-assigns and schedules tasks for your team." },
      { title: "GitHub Integration", description: "Track commits and progress with GitHub API." },
      { title: "Real-Time Dashboard", description: "Monitor project progress and team updates." },
      { title: "Automated Notifications", description: "Get email updates for new tasks & deadlines." },
    ];
  
    return (
      <section className="py-10 px-6 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-6">Key Features</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="p-4 bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  