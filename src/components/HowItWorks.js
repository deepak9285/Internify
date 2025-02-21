import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      title: "Create a Project",
      description: "Define project details, team size, and skills required.",
    },
    {
      title: "AI Assigns Tasks",
      description: "AI generates a schedule and assigns tasks to team members.",
    },
    {
      title: "Track & Complete",
      description: "Monitor progress with GitHub tracking and complete tasks.",
    },
  ];

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-blue-50 to-white text-center">
      <motion.h2
        className="text-4xl font-extrabold mb-10 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        How It Works
      </motion.h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-blue-600 text-5xl font-bold mb-4">{index + 1}</div>
            <h3 className="text-2xl font-semibold mb-2 text-gray-700">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
