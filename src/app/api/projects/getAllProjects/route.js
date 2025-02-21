
import Project from "@/models/Projects.model";
import { connectDB } from "@/utils/connectDb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    
    const projects = await Project.find({}); 
    console.log(projects);
    
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch projects" }, { status: 500 });
  }
}
