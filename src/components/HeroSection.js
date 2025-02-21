import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute rotate-45 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-96 h-96 border-8 border-white rounded-3xl" />
        <div className="absolute -rotate-45 transform translate-x-1/2 translate-y-1/2 right-1/2 bottom-1/2 w-96 h-96 border-8 border-white rounded-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Content */}
          <div className="md:w-1/2 space-y-8">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1 bg-blue-500/20 rounded-full text-sm font-medium">
                AI-Powered Project Management
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Manage Projects with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-100">
                  AI-Powered Tasking
                </span>
              </h1>
              <p className="text-lg md:text-xl text-blue-100 max-w-lg">
                Create, track, and automate project workflows with intelligent task management that adapts to your team's needs.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/register" 
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a 
                href="/demo" 
                className="inline-flex items-center px-6 py-3 border-2 border-white/20 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-200"
              >
                Watch Demo
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8 border-t border-white/10">
              <div>
                <div className="text-3xl font-bold">10k+</div>
                <div className="text-blue-200">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold">98%</div>
                <div className="text-blue-200">Satisfaction</div>
              </div>
              <div>
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-blue-200">Support</div>
              </div>
            </div>
          </div>

          {/* Image/Illustration Placeholder */}
          <div className="md:w-1/2">
            <div className="relative aspect-square max-w-lg">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/30 to-blue-300/10 backdrop-blur-xl rounded-2xl">
                <img
                  src="assets\AiProject Manager.webp"
                  alt="Project Management Dashboard"
                  className="object-cover rounded-2xl opacity-90"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}