import { NextResponse } from "next/server";
import Issue from "@/models/Issue.model";
import { connectDB } from "@/utils/connectDb";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("project_id");

    if (!projectId) {
      return NextResponse.json({ success: false, error: "Project ID is required" }, { status: 400 });
    }

    const issues = await Issue.find({ project_id: projectId })
      .populate("user_id", "name email")  // Get user name & email
      .populate("assigned_to", "name email") // Get assigned user's name & email
      .populate("task_id", "title") // Get task title
      .select("-__v"); // Exclude unnecessary fields

    return NextResponse.json({ success: true, data: issues }, { status: 200 });

  } catch (error) {
    console.error("❌ Error fetching issues:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const requiredFields = ["user_id", "project_id", "task_id", "title", "desc", "issueCategory"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ success: false, error: `Missing required field: ${field}` }, { status: 400 });
      }
    }
    const issue = await Issue.create({
      user_id: body.user_id,
      project_id: body.project_id,
      task_id: body.task_id,
      assigned_to: body.assigned_to || null, // Optional
      title: body.title,
      desc: body.desc,
      issueCategory: body.issueCategory,
      priority: body.priority || "Medium",
      status: body.status || "Open",
    });

    const populatedIssue = await Issue.findById(issue._id)
      .populate("user_id", "name email")
      .populate("assigned_to", "name email")
      .populate("task_id", "title")
      .select("-__v");

    return NextResponse.json({ success: true, message: "Issue created successfully", data: populatedIssue }, { status: 201 });

  } catch (error) {
    console.error("❌ Error creating issue:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
