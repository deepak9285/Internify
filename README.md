# Scrumlord : AI-Driven Internship Management System

## Overview
The **AI-Driven Internship Management System (AIDIMAS)** is a comprehensive platform designed to bridge the gap between students, colleges, and companies by providing a simulated, real-world internship experience. The system leverages AI to manage projects, track progress, and provide actionable feedback, ensuring students gain practical skills that align with industry expectations.

## Key Features
1. **AI as Project Manager**: Assigns, monitors, and reviews tasks daily, simulating real-world projects with sprints, deadlines, and feedback.
2. **GitHub Integration**: Tracks commits, pull requests, and code quality, providing instant AI feedback to improve skills.
3. **Real-World Simulations**: Students work on industry-like projects sourced from company requirements or datasets.
4. **Dynamic Learning Modules**: Replaces "tutorial hell" with task-specific, on-the-spot learning resources.
5. **Performance Analytics**: Dashboards with metrics like task completion rates, growth, and code quality.
6. **Industry Collaboration**: Companies access anonymous performance data to identify skilled candidates.
7. **Certification**: Verifiable certificates with detailed performance metrics.

## Benefits
- **For Students**: Hands-on, real-world experience.
- **For Companies**: Pre-trained, industry-ready candidates.
- **For Colleges**: Bridges skill gaps without additional infrastructure.

## User Stories
### 1. User Onboarding
- **Student**: Sign up and create a profile to begin the AI-driven internship experience.
- **Company**: Create a profile and upload project requirements for AI simulation.
- **College/School**: Create an institution profile to enroll multiple students and monitor their progress.
- **Admin**: Manage user accounts and validate registrations.

### 2. AI Project Assignment
- **Student**: Receive AI-assigned tasks daily based on skill level.
- **AI System**: Track project progress and reassign tasks dynamically.
- **College/School**: Assign specific project types to students based on curriculum and interests.

### 3. GitHub Integration
- **Student**: Track GitHub contributions automatically.
- **AI System**: Analyze code quality and provide actionable feedback.
- **College/School**: Monitor all enrolled students’ GitHub activities.

### 4. Real-World Simulations
- **Student**: Work on simulated projects with deadlines and sprints.
- **Company**: Provide realistic projects aligning with industry needs.
- **College/School**: View and approve project templates.

### 5. Dynamic Learning Modules
- **Student**: Access on-demand learning resources tailored to tasks.
- **AI System**: Deliver just-in-time learning modules when students struggle.
- **College/School**: Integrate custom learning materials into the AI system.

### 6. Performance Analytics
- **Student**: View detailed metrics (task completion, skill growth, code quality).
- **Mentor/Admin**: Access analytics to monitor performance and identify top candidates.
- **College/School**: Access collective analytics for all enrolled students.

### 7. Certification
- **Student**: Receive detailed, verifiable certificates upon project completion.
- **College/School**: Issue co-branded certificates to students.

### 8. Industry Collaboration
- **Company**: Access anonymized performance data to identify skilled candidates.
- **Student**: Reflect performance in industry-standard metrics.
- **College/School**: Connect with companies to secure internship opportunities.

### 9. Monetization and Subscription
- **College/School**: Subscribe to provide students access to practical, AI-managed internships.
- **Student**: Access freemium features to explore the platform.
- **Company**: Pay for specific services like accessing top candidates or providing project templates.

### 10. Admin Control
- **Admin**: Manage projects, users, and system configurations.
- **Admin**: Track system performance and resolve issues.
- **Admin**: Manage different subscription tiers for colleges, students, and companies.

## Architecture Design Documentation
### 1. High-Level System Architecture Diagram
The system architecture includes:
- **Frontend (Next.js)**: Displays project and task management interfaces.
- **API Layer (Next.js)**: Handles backend logic and AI integration.
- **AI Engine (LLM APIs + TensorFlow)**: Manages tasks, provides feedback, and adapts learning modules.
- **Database (PostgreSQL)**: Stores user, project, and task data.
- **GitHub Integration Service**: Tracks student activity on GitHub.
- **External Services (LLM APIs, Cloud Storage)**: Integrates with external APIs and cloud services.

### 2. Components Breakdown
- **Frontend (Next.js)**: Built with Next.js and React.js for rendering UI and handling routing.
- **Backend (API Layer in Next.js)**: Manages authentication, API requests, and interfaces with AI and GitHub services.
- **AI Engine (LLM APIs + TensorFlow)**: Handles task management, performance feedback, and adaptive learning.
- **GitHub Integration Service**: Fetches and monitors GitHub activity.
- **Database (PostgreSQL)**: Stores all user, project, and performance data.
- **External Services**: Integrates with LLM APIs, cloud services, and email/notification systems.

### 3. Data Flow and Interaction
- **User Flow**: Students sign up, receive tasks, and get feedback. Colleges and companies monitor progress.
- **GitHub Integration Flow**: Tracks student activity and feeds data into the backend.
- **AI Feedback Flow**: Evaluates performance and provides dynamic feedback.

## Getting Started
To get started with AIDIMAS, follow these steps:
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up the PostgreSQL database and configure the environment variables.
4. Run the application using `npm run dev`.
