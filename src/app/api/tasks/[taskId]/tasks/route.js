import { NextResponse } from "next/server";
import Project from "@/models/Project";

export async function GET(req, { params }) {
    try {
      const { projectId } = params;
  
      // Check if project exists
      const project = await Project.findById(projectId).populate("tasks");
      if (!project) {
        return NextResponse.json({ message: "Project not found." }, { status: 404 });
      }
  
      return NextResponse.json({ tasks: project.tasks }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Internal server error." }, { status: 500 });
    }
  }
  