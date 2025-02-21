// app/api/projects/route.js
import { NextResponse } from "next/server";
import { connectDb } from "@/utils/connectDb";
import ProjectsModel from "@/models/Projects.model";

export async function POST(req) {
  try {
    
    await connectDb()

    // Parse request body
    const body = await req.json();

    const requiredFields = [
      "title",
      "description",
      "industry",
      "company_id",
      "skills_required",
      "deadline"
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate deadline is a future date
    const deadline = new Date(body.deadline);
    if (deadline < new Date()) {
      return NextResponse.json(
        { error: "Deadline must be a future date" },
        { status: 400 }
      );
    }

    // Create new project
    const project = await ProjectsModel.create({
      title: body.title,
      description: body.description,
      industry: body.industry,
      documents: body.documents || [],
      company_id: body.company_id,
      skills_required: body.skills_required,
      deadline: deadline,
      assigned_students: body.assigned_students || [],
      tasks: body.tasks || []
    });

    return NextResponse.json(
      { 
        message: "Project created successfully",
        project
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}