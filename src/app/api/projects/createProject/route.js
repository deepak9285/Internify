// app/api/projects/route.js
import { NextResponse } from "next/server";

import ProjectsModel from "@/models/Projects.model";
import { connectDB } from "@/utils/connectDb";

export async function POST(req) {
  try {
    
    await connectDB()

   
    const body = await req.json();


    const requiredFields = [
      "title",
      "description",
      "industry",
      "skills_required",
      "deadline",
      "documents",
      "repo"
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

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
      skills_required: body.skills_required,
      deadline: body.deadline,
      assigned_students: body.assigned_students || [],
      tasks: body.tasks || [],
      TotalteamMembersRequired : body.TotalTeamMembersRequired || 5,
      documents: body.documents || [],
      admin: body._id ||[],
      repo: {
        name: body.repo.name,
        url: body.repo.url,
        owner: body.repo.owner
      }
    });
    console.log(project);

    return NextResponse.json(
      { 
        message: "Project created successfully",
        project
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
