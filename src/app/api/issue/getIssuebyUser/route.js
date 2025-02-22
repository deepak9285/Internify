// app/api/createIssue/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/utils/connectDb";
import IssueModel from "@/models/Issue.model";

// Ensure MongoDB connection

export async function POST(request) {
  try {
    await connectDB();

    const { user_id, project_id} =
      await request.json();

    // Validate the required fields
    if (!user_id || !project_id) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const issue = await IssueModel.findOne({
      user_id,
      project_id,
    });

    return NextResponse.json(
      { message: "Issue created successfully", issue: issue },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating issue:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
