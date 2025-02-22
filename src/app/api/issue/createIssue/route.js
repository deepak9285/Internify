// app/api/createIssue/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/utils/connectDb";
import IssueModel from "@/models/Issue.model";

// Ensure MongoDB connection

export async function POST(request) {
  try {
    await connectDB();

    const { user_id, project_id, title, desc, issueCategory } =
      await request.json();

    // Validate the required fields
    if (!user_id || !project_id || !title || !desc || !issueCategory) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create a new issue
    const newIssue = new IssueModel({
      user_id,
      project_id,
      title,
      desc,
      issueCategory,
    });

    await newIssue.save();

    return NextResponse.json(
      { message: "Issue created successfully", issue: newIssue },
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
