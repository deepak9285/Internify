import { NextResponse } from "next/server";
import User from "@/models/user.model";
import ProjectsModel from "@/models/Projects.model";
import { connectDB } from "@/utils/connectDb";

export async function POST(request) {
  try {
    await connectDB();

    const { studentId, projectId } = await request.json();

    const student = await User.findById(studentId);
    const project = await ProjectsModel.findById(projectId);


    if (!student) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    if (project.assigned_students.includes(studentId)) {
      return NextResponse.json(
        { error: "Student already assigned to the project" },
        { status: 400 }
      );
    }

    project.assigned_students.push(studentId);
    await project.save();

    student.projects.push(projectId);
    await student.save();

    return NextResponse.json(
      { message: "Student assigned to project successfully", student, project },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error assigning student to project:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
