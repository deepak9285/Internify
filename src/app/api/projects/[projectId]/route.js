// app/api/projects/[id]/route.js
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/utils/connectDb";
import ProjectsModel from "@/models/Projects.model";

//Delete - Delete a project
//Put - Update a project
//Get - Get a project by ID

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 }
      );
    }

    // Check if project exists
    const existingProject = await ProjectsModel.findById(id);
    if (!existingProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Optional: Check if project has active students or tasks
    if (
      existingProject.assigned_students.length > 0 ||
      existingProject.tasks.length > 0
    ) {
      return NextResponse.json(
        { error: "Cannot delete project with active students or tasks" },
        { status: 400 }
      );
    }

    // Delete the project
    await ProjectsModel.findByIdAndDelete(id);

    return NextResponse.json(
      {
        message: "Project deleted successfully",
        projectId: id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Get single project by ID
export async function POST(req) {
  try {
    await connectDB();

    const { _id } = req.body;

    // // Validate ObjectId
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return NextResponse.json(
    //     { error: "Invalid project ID" },
    //     { status: 400 }
    //   );
    // }

    console.log(_id);

    // Find project and populate references
    const project = await ProjectsModel.findOne(_id)
      .populate("assigned_students", "name email")
      .populate("tasks");

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ project });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    // Connect to database
    await connectDB();

    const { id } = params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 }
      );
    }

    // Parse request body
    const body = await req.json();

    // Check if project exists
    const existingProject = await ProjectsModel.findById(id);
    if (!existingProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Validate deadline if it's being updated
    if (body.deadline) {
      const deadline = new Date(body.deadline);
      if (deadline < new Date()) {
        return NextResponse.json(
          { error: "Deadline must be a future date" },
          { status: 400 }
        );
      }
      body.deadline = deadline;
    }

    // Update project
    const updatedProject = await ProjectsModel.findByIdAndUpdate(
      id,
      {
        $set: {
          title: body.title || existingProject.title,
          description: body.description || existingProject.description,
          industry: body.industry || existingProject.industry,
          documents: body.documents || existingProject.documents,
          skills_required:
            body.skills_required || existingProject.skills_required,
          deadline: body.deadline || existingProject.deadline,
          assigned_students:
            body.assigned_students || existingProject.assigned_students,
          tasks: body.tasks || existingProject.tasks,
        },
      },
      { new: true, runValidators: true }
    );

    return NextResponse.json(
      {
        message: "Project updated successfully",
        project: updatedProject,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
