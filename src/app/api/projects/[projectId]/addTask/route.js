import { NextResponse } from "next/server";
import Project from "@/models/Project";
import TaskProgress from "@/models/TaskProgress";

export async function POST(req, { params }) {
  try {
    const { projectId } = params;
    const { title, description, dueDate, assignedTo } = await req.json();

    if (!title || !description || !dueDate || !assignedTo) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 });
    }

    // Check if project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return NextResponse.json({ message: "Project not found." }, { status: 404 });
    }

    // Create new task
    const newTask = new TaskProgress({
      title,
      description,
      dueDate,
      assignedTo,
      project: projectId,
    });

    await newTask.save();

    // Add task to project
    project.tasks.push(newTask._id);
    await project.save();

    return NextResponse.json({ taskId: newTask._id, message: "Task added successfully" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error." }, { status: 500 });
  }
}
