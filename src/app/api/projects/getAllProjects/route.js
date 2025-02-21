import { connectDb } from "@/utils/connectDb";
import Project from "@/models/Projects.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();
    
    const projects = await Project.find([{}]); 
    
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch projects" }, { status: 500 });
  }
}
